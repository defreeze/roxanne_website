# Roxanne website

A 4-page website (Home, Services, About, Contact) for a one-person business. The customer edits content in **TinaCMS** at `/admin`, and the site is hosted for free on **Firebase Hosting**.

## How it works

```
Customer edits at /admin ──► Tina Cloud commits to GitHub (main)
                                   │
                                   ▼
                     GitHub Action: build static site
                                   │
                                   ▼
                     Firebase Hosting (free Spark plan)
```

Changes go live about 1–2 minutes after saving.

- **Stack:** Next.js 14 (static export), Tailwind CSS v4, TinaCMS
- **Content:** `content/` (Markdown and JSON, editable through Tina)
- **Images:** `public/uploads/` (uploaded through Tina's media manager, committed to the repo)
- **Schema:** `tina/config.ts` defines which fields the customer can edit

## Local development

```bash
npm install
npm run dev            # site on http://localhost:3000, editor on http://localhost:3000/admin
npm run build:local    # full static build in ./out, without Tina Cloud credentials
npm run preview        # serve ./out locally
```

Local mode needs no Tina Cloud account. Edits made locally in `/admin` write straight to the files in `content/`.

## One-time setup

### 1. Firebase

1. Create a project at [console.firebase.google.com](https://console.firebase.google.com) (the free Spark plan is enough) and enable **Hosting**.
2. Put the project ID in `.firebaserc`.
3. Create a service account for deploys:
   ```bash
   npm i -g firebase-tools
   firebase login
   firebase init hosting:github   # pick this repo; it creates the FIREBASE_SERVICE_ACCOUNT_... secret
   ```
   When asked, **don't** overwrite `firebase.json` or the workflow. Afterwards, rename the secret it created to `FIREBASE_SERVICE_ACCOUNT` (or paste the service-account JSON into a new secret with that name).
4. In GitHub → Settings → Secrets and variables → Actions → **Variables**, add `FIREBASE_PROJECT_ID`.
5. Optional: add the customer's own domain under Hosting → Custom domains (free SSL).

### 2. Tina Cloud

1. Sign in at [app.tina.io](https://app.tina.io), create a project, and connect it to this GitHub repo (branch `main`).
2. Copy the **Client ID** and a **read-only token**, and add them as GitHub Actions secrets:
   - `NEXT_PUBLIC_TINA_CLIENT_ID`
   - `TINA_TOKEN`
3. Under **Collaborators**, invite the customer by email. The free plan allows 2 users (you and the customer).
4. For local builds against Tina Cloud, copy `.env.example` to `.env` and fill in the same values.

Until all secrets and the variable are set, the deploy workflow skips itself with a notice instead of failing.

## For the customer

1. Go to `https://<your-domain>/admin` and log in with your Tina account.
2. Pick a page on the left, change the text or photos, and press **Save**.
3. The live site updates within a couple of minutes.

You can also click on any text in the preview to jump to its field.
