const allowedLoanTypes = {
  "sss-pension": "SSS pension loan",
  "gsis-pension": "GSIS pension loan",
  "real-estate": "Real estate mortgage",
  other: "Not sure yet",
};

const htmlEscapes = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (character) => htmlEscapes[character] ?? character);
}

function reply(response, status, body) {
  return response.status(status).json(body);
}

export default async function handler(request, response) {
  response.setHeader("Cache-Control", "no-store");

  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return reply(response, 405, { error: "Method not allowed." });
  }

  const origin = request.headers.origin;
  const requestHost = request.headers.host;
  if (!origin || !requestHost) {
    return reply(response, 403, { error: "Request origin is not allowed." });
  }

  let originUrl;
  try {
    originUrl = new URL(origin);
  } catch {
    return reply(response, 403, { error: "Request origin is not allowed." });
  }

  if (originUrl.host.toLowerCase() !== requestHost.toLowerCase()) {
    return reply(response, 403, { error: "Request origin is not allowed." });
  }

  if (!String(request.headers["content-type"] ?? "").toLowerCase().includes("application/json")) {
    return reply(response, 415, { error: "Invalid request." });
  }

  const payload = request.body;
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return reply(response, 400, { error: "Invalid request." });
  }

  if (JSON.stringify(payload).length > 8192) {
    return reply(response, 413, { error: "Request is too large." });
  }

  // Quietly accept honeypot submissions without delivering an email.
  if (typeof payload.website === "string" && payload.website.trim()) {
    return reply(response, 200, { ok: true });
  }

  const name = typeof payload.name === "string" ? payload.name.replace(/[\r\n\t]/g, " ").trim() : "";
  const phone = typeof payload.phone === "string" ? payload.phone.trim() : "";
  const email = typeof payload.email === "string" ? payload.email.trim() : "";
  const loanType = typeof payload.loanType === "string" ? payload.loanType : "";
  const turnstileToken = typeof payload.turnstileToken === "string" ? payload.turnstileToken : "";

  if (
    name.length < 2 || name.length > 100 ||
    phone.length < 7 || phone.length > 24 || !/^[\d+(). -]+$/.test(phone) ||
    email.length > 254 || (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) ||
    !Object.hasOwn(allowedLoanTypes, loanType) ||
    payload.consent !== true ||
    !turnstileToken
  ) {
    return reply(response, 400, { error: "Please check the form and try again." });
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const recipient = process.env.APPLICATION_INBOX;
  const sender = process.env.RESEND_FROM_EMAIL;
  const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;

  if (!resendApiKey || !recipient || !sender || !turnstileSecret) {
    console.error("Callback email function is missing required environment variables.");
    return reply(response, 503, { error: "Email delivery is not configured." });
  }

  try {
    const forwardedFor = request.headers["x-forwarded-for"];
    const clientIp = typeof forwardedFor === "string" ? forwardedFor.split(",")[0].trim() : "";
    const verificationBody = new URLSearchParams({
      secret: turnstileSecret,
      response: turnstileToken,
    });
    if (clientIp) verificationBody.set("remoteip", clientIp);

    const verification = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: verificationBody,
    });

    if (!verification.ok) {
      return reply(response, 502, { error: "Could not verify the security check." });
    }

    const captcha = await verification.json();
    if (!captcha.success || captcha.hostname !== originUrl.hostname) {
      return reply(response, 400, { error: "Please complete the security check again." });
    }
  } catch {
    return reply(response, 502, { error: "Could not verify the security check." });
  }

  const safeName = escapeHtml(name);
  const safePhone = escapeHtml(phone);
  const safeEmail = escapeHtml(email || "Not provided");
  const safeLoanType = escapeHtml(allowedLoanTypes[loanType]);
  const emailPayload = {
    from: sender,
    to: [recipient],
    subject: `Website callback request: ${allowedLoanTypes[loanType]}`,
    text: [
      "New callback request from the YCFC website",
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Email: ${email || "Not provided"}`,
      `Loan type: ${allowedLoanTypes[loanType]}`,
      "Consent to contact: Yes",
    ].join("\n"),
    html: `
      <h2>New callback request</h2>
      <p><strong>Name:</strong> ${safeName}</p>
      <p><strong>Phone:</strong> ${safePhone}</p>
      <p><strong>Email:</strong> ${safeEmail}</p>
      <p><strong>Loan type:</strong> ${safeLoanType}</p>
      <p><strong>Consent to contact:</strong> Yes</p>
    `,
  };

  if (email) emailPayload.reply_to = email;

  try {
    const delivery = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailPayload),
    });

    if (!delivery.ok) {
      console.error("Resend rejected a callback email with status", delivery.status);
      return reply(response, 502, { error: "Email delivery failed." });
    }

    return reply(response, 200, { ok: true });
  } catch {
    console.error("Resend could not be reached for a callback email.");
    return reply(response, 502, { error: "Email delivery failed." });
  }
}
