import { Audio } from 'expo-av';
import { useCallback, useRef, useState } from 'react';

type UseVoiceRecorderOptions = {
  onComplete: (audioUri: string) => void;
  onError: (error: Error) => void;
};

export function useVoiceRecorder({ onComplete, onError }: UseVoiceRecorderOptions) {
  const recordingRef = useRef<Audio.Recording | null>(null);
  const [isRecording, setIsRecording] = useState(false);

  const start = useCallback(async () => {
    try {
      const permission = await Audio.requestPermissionsAsync();
      if (!permission.granted) {
        onError(new Error('Microphone permission is required to record audio.'));
        return;
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY,
      );

      recordingRef.current = recording;
      setIsRecording(true);
    } catch (err) {
      onError(err instanceof Error ? err : new Error('Could not start recording.'));
    }
  }, [onError]);

  const stop = useCallback(async () => {
    const recording = recordingRef.current;
    if (!recording) return;

    try {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      recordingRef.current = null;
      setIsRecording(false);

      if (uri) {
        onComplete(uri);
      }
    } catch (err) {
      recordingRef.current = null;
      setIsRecording(false);
      onError(err instanceof Error ? err : new Error('Could not stop recording.'));
    }
  }, [onComplete, onError]);

  return { isRecording, start, stop };
}
