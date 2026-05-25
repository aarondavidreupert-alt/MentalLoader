# MentalUnloader

MentalUnloader nimmt dir das Sortieren ab. Du sprichst einfach – "Ich brauche noch Olivenöl", "Termin beim Zahnarzt nächsten Dienstag", "Ladekabel für den Urlaub nicht vergessen" – und die App versteht, was gemeint ist, und legt es automatisch an den richtigen Ort. Keine Kategorien auswählen, keine Liste öffnen, kein Nachdenken. Einfach sprechen, fertig.

---

## Core Concept

> **Sprache rein → KI versteht Kontext → alles landet am richtigen Ort**

---

## MVP Features

- Hold-to-record voice input
- Automatic transcription via Whisper API
- AI classification into four categories: **Shopping**, **Task**, **Calendar**, **Packing**
- Items appear instantly in the correct list

---

## Setup

```bash
# 1. Clone the repo
git clone https://github.com/aarondavidreupert-alt/mentalloader.git
cd mentalloader

# 2. Install dependencies
npm install

# 3. Add API keys
cp .env.example .env
# Fill in EXPO_PUBLIC_CLAUDE_API_KEY and EXPO_PUBLIC_OPENAI_API_KEY

# 4. Start the dev server
npx expo start
```

Open in Expo Go on your phone or press `i` / `a` for iOS / Android simulator.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React Native (Expo) |
| Language | TypeScript (strict) |
| Speech-to-text | OpenAI Whisper API |
| Classification | Anthropic Claude API |
| Navigation | Expo Router |

---

## Planned Features

### Phase 2 — Smart Features
- **Morning briefing** — daily spoken summary of your lists
- **Nightly agent** — pattern recognition, surfaces what you keep forgetting
- **Proactive reminders** — context-aware nudges
- **Family / partner sharing** — shared shopping and task lists

### Phase 3 — Platform Expansion
- Apple Watch integration — speak from your wrist
- WearOS integration
- Obsidian vault sync
- Google Calendar sync

### Phase 4 — Polish
- Onboarding flow
- Offline support with local transcription
- GDPR / privacy mode (on-device processing)
- App Store release
