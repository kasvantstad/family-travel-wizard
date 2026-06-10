# Family Travel Readiness Wizard

A 5-step wizard that generates a personalised health, safety & planning report for families travelling with children to Africa, Asia, and Latin America.

---

## How to deploy (no coding needed — about 10 minutes)

### What you'll need
- A free [GitHub](https://github.com) account
- A free [Railway](https://railway.app) account
- Your Anthropic API key (from [console.anthropic.com](https://console.anthropic.com))

---

### Step 1 — Put the files on GitHub

1. Go to [github.com](https://github.com) and sign in
2. Click the **+** icon (top right) → **New repository**
3. Name it `family-travel-wizard`, set it to **Private**, click **Create repository**
4. On the next screen, click **uploading an existing file**
5. Drag and drop these files/folders into the window:
   - `server.js`
   - `package.json`
   - `public/` (the whole folder)
6. Click **Commit changes**

---

### Step 2 — Deploy on Railway

1. Go to [railway.app](https://railway.app) and sign in with your GitHub account
2. Click **New Project** → **Deploy from GitHub repo**
3. Select your `family-travel-wizard` repo
4. Railway will detect it's a Node.js app and start deploying automatically

---

### Step 3 — Add your API key

1. In Railway, click on your project → click the **service** box
2. Go to the **Variables** tab
3. Click **New Variable**
4. Set the name to: `ANTHROPIC_API_KEY`
5. Set the value to your Anthropic API key (starts with `sk-ant-...`)
6. Click **Add** — Railway will redeploy automatically

---

### Step 4 — Get your URL

1. Go to the **Settings** tab in your Railway service
2. Under **Networking**, click **Generate Domain**
3. Railway gives you a public URL like `family-travel-wizard.up.railway.app`
4. Open it — your wizard is live! 🎉

---

## How it works

- The frontend (HTML/CSS/JS) lives in the `public/` folder
- When a user completes the wizard, it calls `/api/report` on your server
- The server adds your API key and forwards the request to Anthropic
- The API key is never exposed to visitors — it stays safely on the server

---

## Costs

- Railway free tier: enough for personal/demo use (500 hours/month)
- Anthropic API: roughly $0.003–0.01 per report generated
