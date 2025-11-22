# shivapranavportfolio.io — Deploying the Gemini proxy

This repository serves a static portfolio site (`index.html`) and includes a small Node/Express proxy (`server.js`) that forwards requests to the Google Generative Language (Gemini) API using a server-side `GEMINI_KEY` to avoid exposing the key in client code.

This README describes how to deploy the proxy so the chat widget works for visitors.

---

## Recommended: Deploy to Render (quick HTTPS + easy GitHub integration)

1. Sign in to https://render.com and click **New** → **Web Service**.
2. Connect your GitHub account and select the repository `pranvvvv/shivapranavportfolio.io`.
3. Fill the service settings:
   - **Name**: `shivapranav-portfolio` (or any name)
   - **Region**: choose nearest region
   - **Branch**: `main`
   - **Build Command**: leave empty (Render will run `npm install` automatically), or set `npm ci`.
   - **Start Command**: `node server.js`
4. Add environment variables in the Render dashboard under **Environment** → **Environment Variables**:
   - `GEMINI_KEY` = your Gemini API key (keep this secret)
   - Optionally set `PORT` (Render provides one automatically)
5. Create the service. Render will build and deploy the app and provide an HTTPS URL like `https://shivapranav-portfolio.onrender.com`.

After deployment, update your static site to point to the deployed proxy (if your static host is separate) by setting the `proxy-url` meta tag in `index.html` to the new HTTPS base URL (no trailing slash), for example:

```html
<meta name="proxy-url" content="https://shivapranav-portfolio.onrender.com">
```

Or, if you serve static files from the same Render service (recommended), the frontend will call `/api/generate` and everything will be same-origin.

## Verify the deployed proxy

From your local machine (PowerShell), run:

```powershell
Invoke-RestMethod -Uri 'https://shivapranav-portfolio.onrender.com/api/generate' -Method Post -ContentType 'application/json' -Body '{"prompt":"Hello from test"}'
```

Expected: a JSON response from the proxy (Gemini response forwarded). If you see `405` or `404`, the server isn't handling POSTs at that path.

## Notes and troubleshooting
- If your site is HTTPS (recommended) and the proxy is HTTP, browsers will block requests (mixed content). Always use HTTPS for the proxy.
- Keep `GEMINI_KEY` server-side only; never add it to client code.
- Server logs are useful for debugging. On Render you can view logs in the service dashboard.

## Local development

Start locally (already set up in this repo):

```powershell
# install deps
npm install
# start local server (serves static files + /api/generate)
node server.js
# open http://localhost:3001
```

## Contact / Next steps
- If you want, I can generate a step-by-step screenshot guide for Render or produce a GitHub Actions workflow for automatic deploys (requires service API key).

## Automatic deploys (GitHub Actions -> Render)

You can have GitHub automatically trigger a Render deploy whenever you push to `main`.

1. Create a service in Render (see earlier section) and note the **Service ID** (in the service's settings or URL).
2. Create an API key in Render: Account → API Keys → New API Key (give it a name and copy the value).
3. In your GitHub repository settings, go to **Settings → Secrets and variables → Actions → New repository secret** and add two secrets:
   - `RENDER_API_KEY` = the API key you created
   - `RENDER_SERVICE_ID` = the Render Service ID
4. The repository already includes `.github/workflows/deploy-render.yml`. On each push to `main`, GitHub Actions will call the Render API to create a new deploy for your service.

Notes:
- The workflow simply triggers a deploy and prints the response; check Actions logs for details.
- Render will build and run your app (it will run `node server.js` as the start command configured in their dashboard).
- You still need to set `GEMINI_KEY` in the Render service environment variables.
# Shiva Pranav — Portfolio

This repository contains a static portfolio site with a small Node proxy for safely calling the Gemini API.

Local dev quick start

1. Copy `.env.example` to `.env` and set `GEMINI_KEY`:

```powershell
cd "C:\Users\shiva\OneDrive\Desktop\portfolio"
copy .env.example .env
notepad .env
```

2. Install server dependencies and start the proxy (also serves static files):

```powershell
npm install
npm start
# open http://localhost:3001
```

Notes
- `.env` is ignored by `.gitignore` to keep your key private.
- To publish to GitHub: add a remote and push (instructions below).

Push to GitHub (example)

```powershell
# create a repo on GitHub then:
git remote add origin https://github.com/<your-username>/<repo-name>.git
git branch -M main
git push -u origin main
```

If you want me to create the remote and push for you, provide the repository URL and confirm you have credentials configured on this machine (or give me permission to show the required commands for you to run).
