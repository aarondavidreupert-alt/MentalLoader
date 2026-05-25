import { Pressable, StyleSheet, Text } from 'react-native';

import { useVoiceRecorder } from '../hooks/useVoiceRecorder';

type VoiceButtonProps = {
  onRecordingComplete: (audioUri: string) => void;
  onError: (error: Error) => void;
  disabled?: boolean;
};

export function VoiceButton({ onRecordingComplete, onError, disabled = false }: VoiceButtonProps) {
  const { isRecording, start, stop } = useVoiceRecorder({
    onComplete: onRecordingComplete,
    onError,
  });

  return (
    <Pressable
      onPressIn={() => { void start(); }}
      onPressOut={() => { void stop(); }}
      style={[styles.button, isRecording ? styles.recording : null, disabled ? styles.disabled : null]}
      disabled={disabled}
    >
      <Text style={styles.icon}>🎙️</Text>
      <Text style={styles.text}>{isRecording ? 'Recording… release to send' : 'Hold to record'}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 999,
    backgroundColor: '#6d44f2',
    width: 220,
    height: 220,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  recording: {
    backgroundColor: '#2c0f81',
  },
  disabled: {
    opacity: 0.7,
  },
  icon: {
    fontSize: 42,
  },
  text: {
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});
