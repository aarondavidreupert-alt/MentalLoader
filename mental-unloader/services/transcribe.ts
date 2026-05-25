import Constants from 'expo-constants';

const OPENAI_API_KEY =
  (Constants.expoConfig?.extra?.OPENAI_API_KEY as string | undefined) ?? process.env.EXPO_PUBLIC_OPENAI_API_KEY;

export async function transcribeAudio(audioUri: string): Promise<string> {
  if (!OPENAI_API_KEY) {
    throw new Error('Missing OPENAI_API_KEY. Add it to your environment before recording.');
  }

  const formData = new FormData();
  formData.append('model', 'whisper-1');
  formData.append(
    'file',
    {
      uri: audioUri,
      name: 'recording.m4a',
      type: 'audio/m4a',
    } as unknown as Blob,
  );

  const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + OPENAI_API_KEY,
    },
    body: formData,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error('Whisper transcription failed: ' + errorText);
  }

  const data = (await response.json()) as { text?: string };
  if (!data.text) {
    throw new Error('Whisper transcription returned no text.');
  }

  return data.text;
}
