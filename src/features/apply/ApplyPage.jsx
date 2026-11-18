import { useEffect, useRef, useState } from "react";
import { HiArrowRight, HiCheckCircle, HiLockClosed, HiPhone } from "react-icons/hi2";

import Button from "@/components/ui/Button";
import Section from "@/components/ui/Section";
import company from "@/constants/company";

const benefits = [
  "Guidance from a real local team",
  "A clear explanation of your next steps",
  "Loan options for pensioners and property owners",
];

export default function ApplyPage() {
  const [status, setStatus] = useState({ type: "idle", message: "" });
  const [captchaToken, setCaptchaToken] = useState("");
  const captchaContainer = useRef(null);
  const captchaWidget = useRef(null);
  const turnstileSiteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY;

  useEffect(() => {
    if (!turnstileSiteKey || !captchaContainer.current) return undefined;

    const renderCaptcha = () => {
      if (!window.turnstile || !captchaContainer.current || captchaWidget.current) return;

      captchaWidget.current = window.turnstile.render(captchaContainer.current, {
        sitekey: turnstileSiteKey,
        callback: (token) => setCaptchaToken(token),
        "expired-callback": () => setCaptchaToken(""),
        "error-callback": () => setCaptchaToken(""),
      });
    };

    const scriptUrl = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    let script = document.querySelector(`script[src="${scriptUrl}"]`);
    const addedScript = !script;

    if (!script) {
      script = document.createElement("script");
      script.src = scriptUrl;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }

    if (window.turnstile) {
      renderCaptcha();
    } else {
      script.addEventListener("load", renderCaptcha, { once: true });
    }

    return () => {
      script?.removeEventListener("load", renderCaptcha);
      if (captchaWidget.current && window.turnstile) {
        window.turnstile.remove(captchaWidget.current);
        captchaWidget.current = null;
      }
      if (addedScript && script?.isConnected) script.remove();
    };
  }, [turnstileSiteKey]);

  async function handleSubmit(event) {
    event.preventDefault();
    if (!turnstileSiteKey || !captchaToken) {
      setStatus({
        type: "error",
        message: "Secure email setup is not complete yet. Please call the Valencia team instead.",
      });
      return;
    }

    setStatus({ type: "sending", message: "Sending your request…" });
    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/send-callback-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          phone: formData.get("phone"),
          email: formData.get("email"),
          loanType: formData.get("loanType"),
          website: formData.get("website"),
          consent: formData.get("consent") === "on",
          turnstileToken: captchaToken,
        }),
      });

      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || "Email delivery failed.");

      setStatus({
        type: "success",
        message: "Your callback request has been sent. The Valencia team will be in touch.",
      });
      form.reset();
      setCaptchaToken("");
      window.turnstile?.reset(captchaWidget.current);
    } catch {
      setStatus({
        type: "error",
        message: "We couldn’t send your request. Please try again or call the Valencia team.",
      });
      setCaptchaToken("");
      window.turnstile?.reset(captchaWidget.current);
    }
  }

  return (
    <Section className="flex min-h-[calc(100svh-7rem)] items-center bg-[#F5F8F5] py-5 sm:py-6">
        <div className="mx-auto mb-5 max-w-3xl text-center sm:mb-6">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-green-700">A simple first step</p>
          <h1 className="mt-1 text-2xl font-black tracking-tight text-[#1F2937] sm:text-3xl">
            Let’s find the right loan for you.
          </h1>
          <p className="mx-auto mt-2 max-w-2xl text-sm leading-5 text-gray-600">
            Share a few details and our Valencia team can explain what happens next. No pressure to proceed.
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl items-center gap-5 lg:grid-cols-[1.08fr_0.92fr] lg:gap-8">
          <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-[0_14px_40px_rgba(31,41,55,0.08)] sm:p-6">
            <div className="mb-4">
              <h2 className="text-xl font-bold text-[#1F2937]">Start your inquiry</h2>
              <p className="mt-1 text-sm leading-5 text-gray-600">
                This is an initial inquiry, not a loan approval. Email is optional.
              </p>
            </div>

            <form className="space-y-3" onSubmit={handleSubmit}>
              <input
                aria-hidden="true"
                autoComplete="off"
                className="absolute -left-[10000px]"
                name="website"
                tabIndex={-1}
                type="text"
              />
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label htmlFor="applicant-name" className="mb-1 block text-xs font-semibold text-gray-800">
                    Full name <span className="text-green-700">*</span>
                  </label>
                  <input
                    id="applicant-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="e.g. Juan Dela Cruz"
                    required
                    className="w-full rounded-xl border border-gray-300 px-3.5 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-green-700 focus:ring-4 focus:ring-green-700/10"
                  />
                </div>
                <div>
                  <label htmlFor="applicant-phone" className="mb-1 block text-xs font-semibold text-gray-800">
                    Mobile number <span className="text-green-700">*</span>
                  </label>
                  <input
                    id="applicant-phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    inputMode="tel"
                    placeholder="09XX XXX XXXX"
                    required
                    className="w-full rounded-xl border border-gray-300 px-3.5 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-green-700 focus:ring-4 focus:ring-green-700/10"
                  />
                </div>
                <div>
                  <label htmlFor="applicant-email" className="mb-1 block text-xs font-semibold text-gray-800">
                    Email <span className="font-normal text-gray-500">(optional)</span>
                  </label>
                  <input
                    id="applicant-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-gray-300 px-3.5 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-green-700 focus:ring-4 focus:ring-green-700/10"
                  />
                </div>
                <div>
                  <label htmlFor="loan-type" className="mb-1 block text-xs font-semibold text-gray-800">
                    Loan type <span className="text-green-700">*</span>
                  </label>
                  <select
                    id="loan-type"
                    name="loanType"
                    defaultValue=""
                    required
                    className="w-full rounded-xl border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-gray-900 outline-none transition focus:border-green-700 focus:ring-4 focus:ring-green-700/10"
                  >
                    <option value="" disabled>Select a loan type</option>
                    <option value="sss-pension">SSS pension loan</option>
                    <option value="gsis-pension">GSIS pension loan</option>
                    <option value="real-estate">Real estate mortgage</option>
                    <option value="other">I’m not sure yet</option>
                  </select>
                </div>
              </div>

              <div className="flex items-start gap-2 rounded-xl bg-[#F5F8F5] px-3 py-2 text-xs leading-4 text-gray-600">
                <HiLockClosed className="mt-0.5 h-3.5 w-3.5 shrink-0 text-green-700" aria-hidden="true" />
                <p>Your details will be emailed to {" "}
                  <span className="font-semibold text-gray-700">ebutlay@ycfc.com.ph</span>. Don’t include account numbers, passwords, or ID document details.
                </p>
              </div>

              <label className="flex items-start gap-2 text-xs leading-4 text-gray-600">
                <input className="mt-0.5 accent-green-700" name="consent" required type="checkbox" />
                <span>I agree that YCFC may use these details to respond to this inquiry.</span>
              </label>

              {turnstileSiteKey ? (
                <div className="min-h-[65px]" ref={captchaContainer} />
              ) : (
                <p className="rounded-lg bg-amber-50 px-3 py-2 text-xs leading-4 text-amber-900">
                  Secure online requests are being set up. You can still call {company.phone}.
                </p>
              )}

              <Button
                type="submit"
                disabled={status.type === "sending" || !turnstileSiteKey || !captchaToken}
                className="w-full gap-2 py-3 text-sm shadow-md hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
              >
                {status.type === "sending" ? "Sending request…" : "Request a callback"}
                {status.type !== "sending" && <HiArrowRight aria-hidden="true" />}
              </Button>

              {status.message && (
                <div
                  role={status.type === "error" ? "alert" : "status"}
                  className={`rounded-xl p-3 text-sm leading-5 ${
                    status.type === "success"
                      ? "border border-green-200 bg-green-50 text-green-900"
                      : status.type === "error"
                        ? "border border-red-200 bg-red-50 text-red-900"
                        : "bg-gray-50 text-gray-700"
                  }`}
                >
                  {status.message}{" "}
                  {status.type === "error" && (
                    <a className="font-bold underline" href={`tel:${company.phone.replace(/[^\d+]/g, "")}`}>
                      Call {company.phone}
                    </a>
                  )}
                </div>
              )}
            </form>

            <p className="mt-3 text-center text-[11px] leading-4 text-gray-500">
              No loan is approved through this form. Availability, rates, and terms are subject to assessment.
            </p>
          </div>

          <aside className="space-y-4 lg:pt-2">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-green-700">Here to help</p>
              <h2 className="mt-1 text-xl font-bold text-[#1F2937] sm:text-2xl">A real person, every step of the way.</h2>
              <p className="mt-2 text-sm leading-5 text-gray-600">
                We’ll explain your options and help you understand the next steps.
              </p>
            </div>

            <ul className="space-y-2 text-sm">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3 text-gray-700">
                  <HiCheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-700" aria-hidden="true" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>

            <div
              className="rounded-3xl bg-[#246B3B] p-5 text-white shadow-lg sm:p-6"
              style={{ backgroundColor: "#246B3B", color: "#FFFFFF" }}
            >
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-white/75">Serving the community</p>
              <p className="mt-2 text-4xl font-black tracking-tight">65<span className="text-[#F6E84A]">+</span></p>
              <p className="mt-1 text-base font-semibold">Years of trusted service</p>
              <p className="mt-1 text-xs text-white/80">Valencia Branch · Personalized local service</p>
              <a
                href={`tel:${company.phone.replace(/[^\d+]/g, "")}`}
                className="mt-3 inline-flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 text-sm font-semibold transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white"
              >
                <HiPhone aria-hidden="true" />
                Call {company.phone}
              </a>
            </div>

            <p className="text-xs leading-4 text-gray-500">
              Your request is an initial inquiry; the company will confirm any applicable terms with you.
            </p>
          </aside>
        </div>
    </Section>
  );
}
