---
name: speech
description: Implement speech recognition and synthesis for educational content
applyTo: ["services/speech/**", "ai/models/"]
relatedAgent: "speech-agent"
---

# Speech Processing Skill

## Overview

This skill covers both Speech-to-Text (ASR) and Text-to-Speech (TTS) systems for regional Indian languages.

## Speech Recognition (STT)

### Model Selection
```python
from transformers import pipeline

# Use Wav2Vec or Whisper
pipe = pipeline("automatic-speech-recognition",
                model="openai/whisper-base")
```

### Processing Audio
```python
import librosa

# Load and preprocess audio
audio_path = "lesson-audio.wav"
speech, sr = librosa.load(audio_path, sr=16000)

# Transcribe
result = pipe(audio_path)
print(f"Transcription: {result['text']}")
```

### Fine-tuning for Languages
```python
from transformers import Wav2Vec2Processor, Wav2Vec2ForCTC

# Load processor and model
processor = Wav2Vec2Processor.from_pretrained(
    "facebook/wav2vec2-base-multilingual"
)
model = Wav2Vec2ForCTC.from_pretrained(
    "facebook/wav2vec2-base-multilingual"
)

# Fine-tune on language-specific data
# Train on native speaker recordings
```

### Quality Metrics
```python
# Word Error Rate (WER)
def calculate_wer(reference, hypothesis):
    # Levensthein distance based
    return wer(reference, hypothesis)

# Test accuracy
test_wer = calculate_wer(reference_text, predicted_text)
print(f"WER: {test_wer:.2%}")
```

## Text-to-Speech (TTS)

### Model Selection
```python
from transformers import pipeline

# Use FastPitch or Glow-TTS
tts = pipeline("text-to-speech", model="t5-base")
```

### Generating Speech
```python
# Generate speech from text
text = "Santhali lesson content"
speech = tts(text)

# Save audio
import scipy.io.wavfile as wavfile
wavfile.write("output.wav", speech["sampling_rate"], 
              speech["waveform"][0])
```

### Voice Customization
```python
# Multiple voice options
voices = {
    "male_young": "model_1",
    "male_old": "model_2",
    "female_young": "model_3",
}

# Select voice
voice_model = load_model(voices["female_young"])
speech = voice_model.synthesize(text)
```

### Audio Optimization
```python
# Compress for mobile
import pydub

audio = pydub.AudioSegment.from_wav("output.wav")
audio.export("output.mp3", format="mp3", 
             bitrate="64k")
```

## Audio Processing Pipeline

### Noise Reduction
```python
import noisereduce as nr

# Reduce background noise
reduced = nr.reduce_noise(y=audio, sr=sr)
```

### Quality Enhancement
```python
# Improve audio quality
# - Remove clicks
# - Normalize volume
# - Add compression
```

### Real-time Processing
```python
# Stream audio for real-time transcription
for chunk in audio_stream:
    partial_result = pipe(chunk)
    update_ui(partial_result)
```

## Model Serving

### API Implementation
```python
from fastapi import FastAPI, File

app = FastAPI()

@app.post("/transcribe")
async def transcribe(audio: UploadFile):
    content = await audio.read()
    result = asr_model.transcribe(content)
    return {"text": result}

@app.post("/synthesize")
async def synthesize(text: str, voice: str = "female"):
    audio = tts_model.synthesize(text, voice)
    return {"audio": audio}
```

### Caching
```python
# Cache synthesized audio to avoid recomputation
cache = {}

def get_or_synthesize(text, voice):
    key = f"{text}_{voice}"
    if key in cache:
        return cache[key]
    
    audio = tts_model.synthesize(text, voice)
    cache[key] = audio
    return audio
```

## Offline Deployment

### Model Quantization
```python
# Optimize for mobile inference
from onnx import quantization

quantization.quantize_dynamic(
    "tts_model.onnx",
    "tts_model_quantized.onnx"
)
```

### On-device Inference
```kotlin
// Android implementation
class SpeechService(context: Context) {
    private val interpreter = Interpreter(
        loadModelFile(context, "tts_model.tflite")
    )
    
    fun synthesize(text: String): ByteArray {
        val output = interpreter.run(text)
        return output as ByteArray
    }
}
```

## Testing & Validation

### Unit Tests
```python
def test_transcription():
    audio = load_test_audio("sample.wav")
    result = asr_model.transcribe(audio)
    assert "expected_word" in result
```

### Quality Metrics
- Word error rate (WER)
- Mean Opinion Score (MOS)
- Inference latency
- Model size

---

See rules/03-ai.md for detailed AI guidelines.
