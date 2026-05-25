import { useCallback, useMemo, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';

import VoiceButton from '../components/VoiceButton';
import { classifyTranscript } from '../services/classify';
import { transcribeAudio } from '../services/transcribe';
import type { CalendarEvent, PackingItem, ShoppingItem, Task } from '../types';

export default function HomeScreen() {
  const [shopping, setShopping] = useState<ShoppingItem[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>([]);
  const [packing, setPacking] = useState<PackingItem[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onRecordingComplete = useCallback(async (audioUri: string) => {
    setError(null);
    setIsProcessing(true);

    try {
      const transcript = await transcribeAudio(audioUri);
      const intent = await classifyTranscript(transcript);
      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

      switch (intent) {
        case 'SHOPPING':
          setShopping((current) => [...current, { id, text: transcript }]);
          break;
        case 'TASK':
          setTasks((current) => [...current, { id, text: transcript }]);
          break;
        case 'CALENDAR':
          setCalendarEvents((current) => [...current, { id, title: transcript }]);
          break;
        case 'PACKING':
          setPacking((current) => [...current, { id, text: transcript }]);
          break;
      }
    } catch (recordingError) {
      const message = recordingError instanceof Error ? recordingError.message : 'Unable to process recording.';
      setError(message);
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const sections = useMemo(
    () => [
      { title: 'Shopping', entries: shopping.map((item) => item.text) },
      { title: 'Tasks', entries: tasks.map((item) => item.text) },
      { title: 'Calendar', entries: calendarEvents.map((item) => item.title) },
      { title: 'Packing', entries: packing.map((item) => item.text) },
    ],
    [calendarEvents, packing, shopping, tasks],
  );

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Text style={styles.title}>MentalUnloader</Text>
      <Text style={styles.subtitle}>Hold the mic and speak. We will sort your thought for you.</Text>

      <VoiceButton onRecordingComplete={onRecordingComplete} disabled={isProcessing} />

      {isProcessing ? <ActivityIndicator size="large" color="#6d44f2" style={styles.loading} /> : null}
      {error ? <Text style={styles.error}>{error}</Text> : null}

      {sections.map((section) => (
        <View key={section.title} style={styles.section}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          {section.entries.length === 0 ? (
            <Text style={styles.empty}>No items yet.</Text>
          ) : (
            section.entries.map((entry, index) => (
              <Text key={`${section.title}-${index.toString()}`} style={styles.item}>
                • {entry}
              </Text>
            ))
          )}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    gap: 16,
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    color: '#1c1c1f',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#5e5e66',
    textAlign: 'center',
  },
  loading: {
    marginTop: 8,
  },
  error: {
    color: '#b3261e',
    textAlign: 'center',
  },
  section: {
    borderRadius: 12,
    backgroundColor: '#ffffff',
    padding: 12,
    gap: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1c1c1f',
  },
  empty: {
    color: '#77777f',
  },
  item: {
    color: '#202028',
  },
});
