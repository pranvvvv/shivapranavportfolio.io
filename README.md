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
