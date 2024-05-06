import subprocess
import os
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
