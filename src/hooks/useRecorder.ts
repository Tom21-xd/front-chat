import { useState, useRef, useEffect } from 'react';

export function useRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recorderRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [RecordRTC, setRecordRTC] = useState<any>(null);

  useEffect(() => {
    import('recordrtc').then((mod) => setRecordRTC(() => mod.default));
  }, []);

  const start = async () => {
    if (!RecordRTC) return;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new RecordRTC(stream, {
        type: 'audio',
        mimeType: 'audio/wav',
        recorderType: RecordRTC.StereoAudioRecorder,
        desiredSampRate: 16000,
      });

      recorder.startRecording();
      recorderRef.current = recorder;
      setIsRecording(true);
    } catch (err) {
      console.error("No se pudo acceder al micrófono:", err);
      alert("Debes permitir acceso al micrófono.");
    }
  };

  const stop = () => {
    if (recorderRef.current) {
      recorderRef.current.stopRecording(() => {
        const blob = recorderRef.current.getBlob();
        setAudioBlob(blob);
        setIsRecording(false);
      });
    }
  };

  return { start, stop, isRecording, audioBlob };
}
