# LeadCraft AI

Small tool that takes an Instagram profile (or pasted bio + caption), runs it through Groq, and gives you a short WhatsApp-style outreach message plus a bit of context on the business. Leads get stored in MongoDB so you can track them on a simple dashboard.

---

## What this project does

You enter a business name and either an Instagram URL or manual bio and sample caption. The backend can pull public info from Instagram’s HTML (the meta description tag — nothing official). That text goes to an LLM twice: first pass returns JSON with summary, opportunity, a rough score (HIGH/MEDIUM/LOW), and whether a website seems to exist. Second pass writes the actual message. The lead is saved with status, scores, and the message. The dashboard lists leads, lets you search/filter, update status (messaged/replied), and edit the message in a modal.

---

## How it works (real flow)

1. Frontend sends `POST /api/analyze` with `businessName` and either `instagramUrl` or both `bio` and `caption`.
2. If there’s a URL, I parse the username from the path. If that username already exists in the DB, I return the old document — no second LLM run.
3. If it’s a new handle, I `GET` the public profile page with Axios, parse `meta[name="description"]` with Cheerio, and fill bio / display name / follower and post strings when the HTML matches what I expect.
4. `aiService` calls Groq (`llama-3.3-70b-versatile`) with the analysis prompt, parses JSON (if the model adds extra text I regex out the `{...}` block), then calls Groq again for the message.
5. Lead is saved in MongoDB. Dashboard uses `GET /api/leads` and `PATCH` routes for status and message updates.

---

## Tech stack

Only what’s in the repo:

- **Frontend:** Next.js 16 (app router), React 19, Tailwind 4, Geist fonts via `next/font`
- **Backend:** Node, Express 5, Mongoose 9, dotenv, cors
- **AI:** `groq-sdk`, model `llama-3.3-70b-versatile`
- **Scraping:** axios + cheerio
- **DB:** MongoDB (connection string in `MONGO_URI`)

---

## Key features

- Instagram URL → scrape public meta description (fragile, depends on Instagram not changing the page)
- Dedupe by Instagram username before running AI again
- Two-step LLM: analysis JSON, then message (prompts assume you’re pitching conversion-focused websites for small businesses — that’s hardcoded in the prompt file)
- Leads stored with opportunity score, website flag, summary, message, timestamps
- Dashboard: stats counts, search by name or username, filter by status, sort cards by score / website flag, copy message, mark messaged/replied
- Modal to edit and save the message back to the API

---

## API overview

| What | Notes |
|------|--------|
| `POST /api/analyze` | Body needs `businessName`. Plus `instagramUrl` **or** `bio` + `caption`. Optional: `category`, `location`. New lead: response is `{ newLead }`. If handle exists: returns the lead object directly (no wrapper) — so the response shape is inconsistent. |
| `GET /api/leads` | Query params: `search`, `status` |
| `GET /api/leads/stats` | `{ totalLeads, newLeads, messagedLeads, repliedLeads }` |
| `PATCH /api/leads/:id/status` | `{ status }` |
| `PATCH /api/leads/:id/message` | `{ message }` |

---

## Setup

**Backend**

```bash
cd leadcraft-backend
npm install
```

`.env`:

```
GROQ_API_KEY=...
MONGO_URI=...
PORT=5000
```

```bash
npm run dev
```

**Frontend**

```bash
cd leadcraft-frontend
npm install
npm run dev
```

Backend default port 5000, frontend 3000. All fetch URLs in the frontend are hardcoded to `http://localhost:5000` — change them or use env if you deploy.

---

## Limitations / honest bits

- **Instagram:** Scraping public HTML only. If they change markup, extraction breaks. No rate limiting. I use a normal browser User-Agent; nothing fancy.
- **Follower/post numbers:** Parsed as text from the meta string; `parseInt` on values like `"106 Followers"` gives `NaN` in practice — so stored numbers are often wrong or empty. I didn’t clean that up yet.
- **Caption:** For scraped profiles I basically reuse bio as caption when the meta line doesn’t give a separate caption — same as before, not real post scraping.
- **Manual bio path:** The Mongoose schema requires `instagramUsername`, but the controller only sets it when you pass an Instagram URL. So analysis-only without a URL might hit the API, but **saving** a lead without a URL will fail validation. The flow I actually use day-to-day is URL-based.
- **Analyze page vs API:** The home page result UI expects fields like `result.summary` and `result.message` at the top level, but a successful create returns `{ newLead: { ... } }`. So the UI and backend responses are out of sync — you’ll see the issue if you rely on that panel; the dashboard reads from DB and is fine.
- **No auth, no multi-user.** One database, whoever runs the app sees everything.
- **No automated tests** in the repo right now.

---

## About me

I’m Dharan Shetty. I build full-stack stuff when I’m trying to solve my own workflow problems.

- GitHub: https://github.com/dharanshetty05  
- LinkedIn: https://linkedin.com/in/dharan-shetty  
- Portfolio: https://dharan-shetty.vercel.app  
