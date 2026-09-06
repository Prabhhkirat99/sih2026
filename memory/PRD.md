# JSIB — Jharkhand Societal Innovation Bridge

## Problem Statement
A unified, no-login civic-innovation platform for Jharkhand (SIH26043) that turns societal challenges into real-world solutions. Citizens report problems; a deterministic mock-AI triages them; government verifies; universities and industry/NGO partners collaborate through a transparent lifecycle to measurable impact. Frontend-only, localStorage shared state, no external/paid APIs.

## Architecture
- **Frontend**: React 19 + CRACO, react-router-dom 7, Tailwind, shadcn/ui, framer-motion. All state in localStorage.
- **Backend**: default FastAPI template (unused for app logic).
- **Roles** (no login, switcher in Header): Citizen, Government, University/Researcher, Industry/Startup, NGO. AI analysis runs automatically on submission.
- **Key files**: `lib/store.jsx` (state/context), `lib/engine.js` (mock-AI, categories, matching, lifecycle), `lib/seed.js` (8 demo challenges), `pages/*`, `components/*`.
- **localStorage keys**: `jmib_challenges_v4`, `jmib_solvers_v1`, `jmib_role` (internal, unchanged).

## Lifecycle
Submitted → AI Analyzed → Verified → Categorized → University Matched → Solution Partner Matched → Proposal → Prototype → Pilot → Deployment → Impact Measured.

## Implemented (2026-06)
- Restored full codebase from repo (github.com/Prabhhkirat99/sih2026).
- **Rebrand JMIB → JSIB** across all visible surfaces: Header logo + tagline ("Jharkhand Societal Innovation Bridge"), Home hero copy, ImpactStory share text, page `<title>`, engine comment. Internal identifiers (localStorage keys, challenge id prefixes, CSS class) left unchanged intentionally.

## Backlog (P2 / optional)
- Rename internal `jmib_*` identifiers if a fully clean namespace is desired (resets demo data).
- Dedicated "AI Challenge Analysis" role view (user declined for now).
