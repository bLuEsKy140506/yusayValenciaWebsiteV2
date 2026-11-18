# Email callback form setup for Vercel

The website sends callback requests through a Vercel Function and Resend. Applicant details are emailed to `ebutlay@ycfc.com.ph` and are not stored in the website database. Resend and Turnstile secret keys stay in Vercel environment variables.

## 1. Use the existing Vercel deployment

The site is already deployed at `https://yusay-valencia-website-v2.vercel.app/`. Use the hostname `yusay-valencia-website-v2.vercel.app` when configuring Turnstile.

## 2. Set up Resend

1. Create a Resend account and add `ycfc.com.ph` as a sending domain.
2. Add the DNS records Resend provides, then wait for the domain to verify.
3. Create a sending-only API key for the verified domain.
4. Choose a sender address on the verified domain, such as `Website inquiries <forms@ycfc.com.ph>`.

Resend requires a verified domain before it can send email from that domain. See [Resend’s verified-domain guide](https://resend.com/docs/dashboard/domains/introduction).

## 3. Set up Turnstile for the deployed site

1. Create a Cloudflare Turnstile widget.
2. Add `yusay-valencia-website-v2.vercel.app` to its allowed hostnames. Add any custom domain later, after you attach one.
3. Copy the public site key and secret key from Cloudflare.

The server verifies each Turnstile token before sending email. See [Cloudflare’s server-side validation guide](https://developers.cloudflare.com/turnstile/get-started/server-side-validation/).

## 4. Add Vercel environment variables

In Vercel, open the project’s **Settings → Environment Variables** and add these values for Production:

| Variable | Value |
| --- | --- |
| `APPLICATION_INBOX` | `ebutlay@ycfc.com.ph` |
| `RESEND_API_KEY` | The Resend sending-only key |
| `RESEND_FROM_EMAIL` | A sender address on the verified domain |
| `TURNSTILE_SECRET_KEY` | The Cloudflare Turnstile secret key |
| `VITE_TURNSTILE_SITE_KEY` | The Cloudflare Turnstile public site key |

Do not prefix the Resend or Turnstile secret keys with `VITE_`; Vite exposes `VITE_` variables to browser code. After saving variables, redeploy so they apply to the site. For local work, use `.env.local` (ignored by Git) and run the site through `vercel dev` so `/api/send-callback-request` is available.

The email button stays disabled until the public Turnstile site key is configured. The function checks that the request comes from the same host, validates the submitted fields and consent, verifies the Turnstile token, and only then emails the request.
