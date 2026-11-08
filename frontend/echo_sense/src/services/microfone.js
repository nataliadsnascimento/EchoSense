
let audioStream = null;

export async function iniciarMicrofone() {
  if (microfoneAtivo()) {
    return audioStream;
  }

  if (!navigator.mediaDevices?.getUserMedia) {
    throw new Error(
      "O navegador precisa de HTTPS ou localhost."
    );
  }

  audioStream = await navigator.mediaDevices.getUserMedia({
    audio: {
      echoCancellation: false,
      noiseSuppression: false,
      autoGainControl: false
    }
  });

  return audioStream;
}

export function pararMicrofone() {
  if (audioStream) {
    audioStream.getTracks().forEach((track) => {
      track.stop();
    });

    audioStream = null;
  }
}

export function microfoneAtivo() {
  return audioStream?.getAudioTracks().some(
    (track) => track.readyState === "live"
  ) ?? false;
}
