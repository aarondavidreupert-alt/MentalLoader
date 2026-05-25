import { Audio } from 'expo-av';
import { useCallback, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

type VoiceButtonProps = {
  onRecordingComplete: (audioUri: string) => Promise<void>;
  disabled?: boolean;
};

export default function VoiceButton({ onRecordingComplete, disabled = false }: VoiceButtonProps) {
  const recordingRef = useRef<Audio.Recording | null>(null);
  const [isRecording, setIsRecording] = useState(false);

  const startRecording = useCallback(async () => {
    if (disabled || isRecording) {
      return;
    }

    const permission = await Audio.requestPermissionsAsync();
    if (!permission.granted) {
      throw new Error('Microphone permission is required to record audio.');
    }

    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      playsInSilentModeIOS: true,
    });

    const recording = new Audio.Recording();
    await recording.prepareToRecordAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
    await recording.startAsync();

    recordingRef.current = recording;
    setIsRecording(true);
  }, [disabled, isRecording]);

  const stopRecording = useCallback(async () => {
    const recording = recordingRef.current;

    if (!recording) {
      return;
    }

    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();

    recordingRef.current = null;
    setIsRecording(false);

    if (uri) {
      await onRecordingComplete(uri);
    }
  }, [onRecordingComplete]);

  return (
    <Pressable
      onPressIn={() => {
        startRecording().catch(() => {
          setIsRecording(false);
        });
      }}
      onPressOut={() => {
        stopRecording().catch(() => {
          setIsRecording(false);
        });
      }}
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
