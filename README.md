# Portfolio — Setup & Deployment

## Running locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deployment (Vercel)

1. Push the repo to GitHub / GitLab / Bitbucket.
2. Import the project at [vercel.com/new](https://vercel.com/new).
3. Vercel auto-detects Next.js — accept the defaults.
4. Deploy.

## Access gating

Gated case studies (AI Summarization, 9.2 Usability Testing) are protected via
**Vercel Password Protection**, a first-party hosting feature that adds
server-side HTTP authentication before any page is served — not bypassable
client-side.

### How to enable

1. Open the project in the [Vercel dashboard](https://vercel.com/dashboard).
2. Go to **Settings → Deployment Protection**.
3. Enable **Password Protection** and set a passphrase.
4. Save. All subsequent deployments (including previews) will require the
   password before any content is served.

> Password Protection is available on Vercel Pro and above. If you are on
> the free Hobby tier, upgrade first or use the Middleware approach instead.

### What is protected

The entire deployment is protected — including the UXDRT page, which is
intentionally public. If you want UXDRT to be fully public while keeping
the other two case studies gated, the alternative is a
`src/middleware.ts`-based cookie check. Ask to switch approaches if needed.

### Sharing with reviewers

Send reviewers the site URL and the passphrase directly. Vercel stores no
reviewer emails.

---

## Content updates

All case study content lives in [`src/lib/caseStudies.ts`](src/lib/caseStudies.ts).
To fill in real copy:

- Replace each phase's `summary` (1–2 sentences, shown collapsed).
- Replace each phase's `detail` (full markdown, shown expanded).
- Add `exhibits` arrays when you have images/diagrams ready.
- Update the `career` array in [`src/app/info/page.tsx`](src/app/info/page.tsx).
- Update contact links in the same file.
- Update the Nav wordmark if desired ([`src/components/Nav.tsx`](src/components/Nav.tsx)).
