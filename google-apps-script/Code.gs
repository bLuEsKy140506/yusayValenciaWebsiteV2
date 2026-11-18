const ALLOWED_LOAN_TYPES = new Set([
  "SSS pension loan",
  "GSIS pension loan",
  "Real estate mortgage",
  "Not sure yet",
]);

function doPost(event) {
  try {
    const payload = JSON.parse(event?.postData?.contents || "{}");
    const expectedSecret = PropertiesService
      .getScriptProperties()
      .getProperty("CALLBACK_SHARED_SECRET");

    if (!expectedSecret || payload.secret !== expectedSecret) {
      return jsonResponse({ ok: false });
    }

    const recipient = typeof payload.recipient === "string" ? payload.recipient.trim() : "";
    const name = typeof payload.name === "string" ? payload.name.replace(/[\r\n\t]/g, " ").trim() : "";
    const phone = typeof payload.phone === "string" ? payload.phone.trim() : "";
    const email = typeof payload.email === "string" ? payload.email.trim() : "";
    const loanType = typeof payload.loanType === "string" ? payload.loanType : "";

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recipient) ||
      name.length < 2 || name.length > 100 ||
      phone.length < 7 || phone.length > 24 || !/^[\d+(). -]+$/.test(phone) ||
      email.length > 254 || (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) ||
      !ALLOWED_LOAN_TYPES.has(loanType) ||
      payload.consent !== true
    ) {
      return jsonResponse({ ok: false });
    }

    const message = {
      to: recipient,
      subject: `Website callback request: ${loanType}`,
      body: [
        "New callback request from the website",
        `Name: ${name}`,
        `Phone: ${phone}`,
        `Email: ${email || "Not provided"}`,
        `Loan type: ${loanType}`,
        "Consent to contact: Yes",
      ].join("\n"),
      name: "Website Callback Form",
    };

    if (email) message.replyTo = email;
    MailApp.sendEmail(message);

    return jsonResponse({ ok: true });
  } catch (error) {
    console.error("Callback email delivery failed.", error);
    return jsonResponse({ ok: false });
  }
}

function authorizeMail() {
  MailApp.getRemainingDailyQuota();
}

function jsonResponse(value) {
  return ContentService
    .createTextOutput(JSON.stringify(value))
    .setMimeType(ContentService.MimeType.JSON);
}
