import Constants from 'expo-constants';

export type Intent = 'SHOPPING' | 'TASK' | 'CALENDAR' | 'PACKING';

const ANTHROPIC_API_KEY =
  (Constants.expoConfig?.extra?.ANTHROPIC_API_KEY as string | undefined) ?? process.env.EXPO_PUBLIC_ANTHROPIC_API_KEY;

const VALID_INTENTS: Intent[] = ['SHOPPING', 'TASK', 'CALENDAR', 'PACKING'];

function parseIntent(rawText: string): Intent {
  const directMatch = rawText.match(/SHOPPING|TASK|CALENDAR|PACKING/);
  const intent = directMatch?.[0] as Intent | undefined;

  if (!intent || !VALID_INTENTS.includes(intent)) {
    throw new Error('Claude response did not contain a valid intent.');
  }

  return intent;
}

export async function classifyTranscript(transcript: string): Promise<Intent> {
  if (!ANTHROPIC_API_KEY) {
    throw new Error('Missing ANTHROPIC_API_KEY. Add it to your environment before recording.');
  }

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 12,
      temperature: 0,
      system:
        'Classify the user text into exactly one label: SHOPPING, TASK, CALENDAR, or PACKING. Reply with only the label.',
      messages: [{ role: 'user', content: transcript }],
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Claude classification failed: ${errorText}`);
  }

  const data = (await response.json()) as {
    content?: Array<{ type?: string; text?: string }>;
  };

  const text = data.content?.find((block) => block.type === 'text')?.text;
  if (!text) {
    throw new Error('Claude returned an unexpected response.');
  }

  return parseIntent(text);
}
