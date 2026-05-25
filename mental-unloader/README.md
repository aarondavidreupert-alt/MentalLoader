# MentalUnloader

Voice-first mobile app to reduce mental load for women.

## MVP
1. Hold the mic button to record
2. Transcribe with Whisper API
3. Classify with Claude API into `SHOPPING | TASK | CALENDAR | PACKING`
4. Display the transcript in the matching list

## Tech Stack
- Expo (React Native) + TypeScript
- OpenAI Whisper API
- Anthropic Claude API

## Setup
```bash
npm install
cp .env.example .env
# Add OPENAI_API_KEY and ANTHROPIC_API_KEY to .env
npm start
```

## Project Structure
```
mental-unloader/
├── app/
│   ├── index.tsx
│   └── _layout.tsx
├── components/
│   └── VoiceButton.tsx
├── services/
│   ├── transcribe.ts
│   └── classify.ts
├── types/
│   └── index.ts
├── CLAUDE.md
├── .env.example
└── README.md
```
