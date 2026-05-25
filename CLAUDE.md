# CLAUDE.md — Working Instructions for Claude Code

## Project Goal

MentalUnloader is a voice-first mobile app designed to reduce mental load, primarily for women. The core flow is simple: the user speaks → AI classifies the input → it lands in the right list (shopping, task, calendar, or packing). No typing, no sorting, no thinking about where things go.

## Tech Stack

- **React Native (Expo)** — cross-platform mobile (iOS + Android)
- **TypeScript** — strict mode, no `any`
- **Claude API** — classification and understanding of spoken input
- **Whisper API** — speech-to-text transcription

## Folder Structure

```
/app                  # Expo Router screens (one file per screen)
/components           # Reusable UI components (small, single-purpose)
/hooks                # Custom React hooks (useVoiceRecorder, useClassify, etc.)
/services             # API calls (whisper.ts, claude.ts)
/store                # State management (Zustand or Context)
/types                # Shared TypeScript types and interfaces
/constants            # Colors, fonts, category definitions
/assets               # Images, icons, fonts
```

## Coding Rules

- TypeScript strict mode — no `any`, no implicit types
- Functional components only — no classes
- One component per file
- Components must be small and single-purpose — if it does two things, split it
- No business logic inside components — extract to hooks or services
- Prefer named exports over default exports
- All API keys via environment variables, never hardcoded

## How Claude Code Should Work in This Project

- **Always read CLAUDE.md** before starting any task
- **Always update ROADMAP.md** when a milestone or phase item is completed (mark `[x]`)
- **Never build beyond the current MVP scope** without asking the user first
- **Ask before adding dependencies** — every new package needs a reason
- **Keep diffs small** — one feature or fix per commit
- **No speculative abstractions** — build only what is needed right now
- **No comments explaining what code does** — only comment the non-obvious why

## Current MVP Scope (Phase 1)

Voice recording → Whisper transcription → Claude classification → display in correct list. That's it. Nothing else until Phase 1 is marked complete in ROADMAP.md.
