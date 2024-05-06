from vosk import Model, KaldiRecognizer
import sys
import os
import wave
import json
import subprocess
import wave

def convert_audio(input_path):
    output_path = input_path.rsplit('.', 1)[0] + "_converted.wav"
    command = ['ffmpeg', '-i', input_path, '-ar', '16000', '-ac', '1', '-sample_fmt', 's16', output_path]
    subprocess.run(command, check=True)
    return output_path

def check_and_convert_audio(audio_path):
    # Check if the audio file is in the correct format
    try:
        wf = wave.open(audio_path, "rb")
        if wf.getnchannels() != 1 or wf.getsampwidth() != 2 or wf.getcomptype() != "NONE":
            print("Unsupported audio format, converting...")
            wf.close()
            return convert_audio(audio_path)
    except wave.Error:
        print("Not a WAV file or header corrupt, converting...")
        return convert_audio(audio_path)
    return audio_path

def transcribe_audio(audio_path, model_path):
    model = Model(model_path)
    recognizer = KaldiRecognizer(model, 16000)  # Assuming the conversion sets rate to 16000
    recognizer.SetWords(True)

    with wave.open(audio_path, "rb") as wf:
        duration_seconds = 20  # or any duration you want
        frames_to_read = int(wf.getframerate() * duration_seconds)

        total_frames_read = 0
        while True:
            frames_remaining = frames_to_read - total_frames_read
            if frames_remaining <= 0:
                break
            data = wf.readframes(min(4000, frames_remaining))
            total_frames_read += len(data) // 2
            if len(data) == 0:
                break
            recognizer.AcceptWaveform(data)

        final_result = recognizer.FinalResult()
        result_json = json.loads(final_result)
        print(result_json['text'])

# Main execution
if __name__ == "__main__":
    model_path = "vosk-model-fr-0.22"
    if not os.path.exists(model_path):
        print(f"Model does not exist. Download it from https://alphacephei.com/vosk/models")
        sys.exit(1)

    audio_path = "Coste_René.mp3"
    if not os.path.exists(audio_path):
        print(f"Audio file does not exist at {audio_path}")
        sys.exit(1)

    audio_path = check_and_convert_audio(audio_path)
    transcribe_audio(audio_path, model_path)

    # Cleanup: Delete the temporary WAV file
    os.remove(audio_path)