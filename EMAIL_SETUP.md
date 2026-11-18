# Callback email setup for Vercel and Gmail

Callback requests are sent to `earl0bluesky142226@gmail.com` through Google Apps Script and Gmail. The form does not store submissions in the website database. Cloudflare Turnstile is still checked by the Vercel Function before a message is sent.

Google's consumer Gmail accounts currently have an Apps Script email quota of 100 recipients per day. Quotas can change, and this setup is intended for modest traffic. See [Google Apps Script quotas](https://developers.google.com/apps-script/guides/services/quotas).

## 1. Create the Google Apps Script

1. Sign in to [Google Apps Script](https://script.google.com/) with `earl0bluesky142226@gmail.com` and create a new project.
2. Replace the starter code with the contents of [`google-apps-script/Code.gs`](google-apps-script/Code.gs), then save.
3. Open **Project Settings → Script Properties** and add `CALLBACK_SHARED_SECRET`. Generate a long random value and keep it private; you will enter the same value in Vercel.
4. In the function selector, choose `authorizeMail`, click **Run**, and approve the request to send email from this Google account.

Google Apps Script uses `MailApp` to send email from the account that owns the script. See [Google's MailApp documentation](https://developers.google.com/apps-script/reference/mail/mail-app).

## 2. Deploy the script as a web app

1. Click **Deploy → New deployment**.
2. Select **Web app** as the deployment type.
3. Set **Execute as** to **Me** and **Who has access** to **Anyone** so Vercel can call it.
4. Click **Deploy** and copy the web app URL ending in `/exec`.

The web app is publicly reachable, but it only sends mail when the shared secret matches. Keep that secret in Apps Script properties and Vercel environment variables; never put it in browser code. See [Google's web app deployment guide](https://developers.google.com/apps-script/guides/web).

## 3. Set up Cloudflare Turnstile

1. Create a Turnstile widget.
2. Add `yusay-valencia-website-v2.vercel.app` to its allowed hostnames.
3. Copy its public site key and secret key.

The Vercel Function validates each Turnstile token before forwarding a request to Gmail. See [Cloudflare's server-side validation guide](https://developers.cloudflare.com/turnstile/get-started/server-side-validation/).

## 4. Configure Vercel

In the Vercel project, open **Settings → Environment Variables** and add these values for **Production**:

| Variable | Value |
| --- | --- |
| `APPLICATION_INBOX` | `earl0bluesky142226@gmail.com` |
| `GOOGLE_APPS_SCRIPT_URL` | The deployed Apps Script URL ending in `/exec` |
| `GOOGLE_APPS_SCRIPT_SECRET` | The same private value as `CALLBACK_SHARED_SECRET` |
| `TURNSTILE_SECRET_KEY` | The Turnstile secret key |
| `VITE_TURNSTILE_SITE_KEY` | The Turnstile public site key |

`APPLICATION_INBOX` has already been added to Vercel. Do not prefix the Google Apps Script secret or Turnstile secret with `VITE_`; Vite exposes `VITE_` variables to browser code. After adding the remaining variables, redeploy the Production deployment.

For local development, place values in `.env.local` (ignored by Git) and run the project through `vercel dev` so the `/api/send-callback-request` endpoint is available.
