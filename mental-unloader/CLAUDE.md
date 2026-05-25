# MentalUnloader - Claude Code Instructions

## Goal and Context
MentalUnloader is a voice-first mobile app designed to reduce mental load for women.
The MVP flow is: user records voice -> Whisper transcribes -> Claude classifies -> the note lands in the right list.

## Folder Structure
- `app/`: screen-level UI (`index.tsx`) and root layout (`_layout.tsx`)
- `components/`: reusable UI components (`VoiceButton.tsx`)
- `services/`: API integration logic (`transcribe.ts`, `classify.ts`)
- `types/`: shared TypeScript domain types

## Coding Conventions
- TypeScript strict mode only
- Functional React components with hooks
- Keep logic small and composable
- Avoid introducing backend/auth/database complexity in MVP

## Current MVP Scope
1. Hold mic button to record
2. Send audio to Whisper for transcription
3. Send transcript to Claude for intent classification
4. Render result in one of: SHOPPING, TASK, CALENDAR, PACKING

## Next Planned Features
- Watch integration for quick capture
- Nightly agent to summarize and organize captured items
- Morning briefing screen with prioritized day plan
