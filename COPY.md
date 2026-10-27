# Portfolio — copy deck

Direction: split stage (seed 607133878). Idea: the shipped thing is always on screen; the claims are read beside it.
Live thing: follow one request through its layers (three real flows).

## Hero
h1: cao chanh duc
support: I build the app, the API behind it and the business that pays for both. One person, in Ho Chi Minh City.
nav: Work · Stack · About · Contact + [Email me]

## 1. What I've shipped  (work index)
- Appdex — app store data, sold as an API — 2026
- Marble Yard — Android puzzle game — 2026 (in closed testing)
- NY MUSIC — commerce storefront, solo — 2024
foot line: Also on GitHub: appstore-data-mcp (an MCP server for the same data) and promptkit (a prompt test runner).

## 2. A business on public data  (appdex case)
Appdex turns public App Store and Google Play pages into one dataset, then sells it.
I built the crawler, the API, the free tools that make the data findable, and the site that sells it.
facts:
- 1,935 apps tracked across 20 storefronts, refreshed daily
- 1,935 app pages, 40 chart pages, 20 country hubs — one build, static HTML
- API sold on RapidAPI; an MCP server so agents can query it
- Next.js static export on a Cloudflare Worker; IndexNow submits what changed
links: appdex.co, tools.appdex.co

## 3. Coins that live on a server  (marble case)
A marble-sorting puzzle for Android, built in Unity. Anything a player could edit on the phone is checked somewhere else.
facts:
- Play Billing receipt verified by a Cloud Function before coins are credited
- balance written in a Firestore transaction, never by the client
- levels and art authored with my own editor tooling
- in Play closed testing now; ads mediated
link: privacy policy (published, live)

## 4. A storefront, built alone  (nymusic case)
A Korean idol album store, live at nymusickr.com. Remix on a Vendure GraphQL backend: payments, admin and transactional email.
facts:
- solo, November 2023 to April 2024, at Burning Bros
- queue gate in front of the burst when a pre-order opened
- order, stock and price checked in Vendure, not the browser
- the client owns the store; I built it
link: nymusickr.com

## 5. Where I work now  (current band)
Consumer AI apps in production for a studio in Ho Chi Minh City: 1K+ daily users on the flagship, 4.8 stars.
I built the platform the rest boot from — shared design system and theme, the starter template every new app begins as, the purchase and paywall layer, a structured logger, and the release tooling.

## 6. Every layer  (stack band, full width)
Mobile: Flutter, Dart, Kotlin, Swift, Unity, C#
Web: TypeScript, React, Remix, Next.js, HTML and CSS
Backend: NestJS, Node, Python, FastAPI, REST, GraphQL
Data: PostgreSQL, Firestore, Firebase, BigQuery, dbt
Platform: GitHub Actions, Fastlane, Codemagic, Cloudflare Workers, Docker, GCP

## 7. Follow one request  (trace, full width, dark)
flows:
A coin purchase: the screen / the receipt / Google / the ledger / the screen again
A chart page: the crawl / the rows / the build / the edge / the index
A checkout: the action / the gate / the order / the payment / the email

## 8. How I work  (letter)
4 paragraphs, sign-off.

## 9. Contact
prompt: "Building something and one engineer short?" / "Write the first line here."
field: what you're building, in a sentence
rows: email, GitHub, LinkedIn

## Footer
menu: Work, Stack, About, Contact, Appdex, GitHub
legal: © 2026 Cao Chanh Duc. Product pictures are screenshots of my own live sites and art from my game.
