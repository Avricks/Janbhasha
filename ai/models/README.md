# Janbhasha AI Model Registry

This directory contains configuration, weights descriptors, and quantization settings for offline-first AI models deployed within the Janbhasha ecosystem.

## Models Overview

| Model ID | Domain | Architecture | Target Languages | Quantization | Size |
|---|---|---|---|---|---|
| `sat-nmt-base` | Machine Translation | mBART-50 fine-tuned | Santhali (Ol Chiki) ↔ English/Hindi | ONNX INT8 | 78MB |
| `unr-nmt-base` | Machine Translation | mBART-50 fine-tuned | Mundari ↔ English/Hindi | ONNX INT8 | 75MB |
| `hoc-nmt-base` | Machine Translation | mBART-50 fine-tuned | Ho ↔ English/Hindi | ONNX INT8 | 74MB |
| `sat-asr-wav2vec` | Speech-to-Text | Wav2Vec2-XLSR-53 | Santhali audio | TFLite FP16 | 42MB |
| `sat-tts-fastpitch` | Text-to-Speech | FastPitch + HiFi-GAN | Santhali synthesis | ONNX FP16 | 38MB |
