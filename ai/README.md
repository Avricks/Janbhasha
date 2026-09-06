# AI & Machine Learning Subsystem (`ai/`)

This directory houses the natural language processing, speech modeling, linguistic corpus resources, and prompt engineering pipelines specifically calibrated for Austroasiatic tribal languages (Santhali, Mundari, and Ho).

---

## Directory & Capability Breakdown

```
ai/
├── language-packs/   # Canonical grammar rules, vocabulary glossaries, and phonetics (.json)
├── models/           # Pre-trained model configurations and checkpoint metadata (.yaml, .md)
├── pipelines/        # PyTorch & Hugging Face training scripts for STT, TTS, and NMT (.py)
├── evaluation/       # Benchmark evaluation scripts measuring BLEU, WER, and accuracy (.py)
└── prompts/          # Context-engineered LLM prompts for curriculum and assessment (.md)
```

---

### Detailed Capabilities

| Subdirectory | Key File Types | Capability & Responsibilities | How It Works |
| :--- | :--- | :--- | :--- |
| **`ai/language-packs/`** | `.json` | **Indigenous Linguistic Ground Truth:** Structured JSON files for Santhali, Mundari, and Ho containing grammar morphology rules, verified vocabulary lemmas, and phonetic IPA charts. | Provides the core vocabulary and phonetic mappings queried by the translation memory and speech alignment microservices. |
| **`ai/models/`** | `.yaml`, `.md` | **Model Architecture Configurations:** Defines hyperparameter configurations for Conformer acoustic speech models and Transformer translation encoders. | Ingested by training and inference engines to configure layer depths, attention heads, and quantization thresholds. |
| **`ai/pipelines/`** | `.py` | **Model Training & Fine-Tuning:** Python training pipelines using PyTorch and Hugging Face Transformers (`train_stt.py`, `train_tts.py`, `train.py`). | Trains specialized low-resource models on indigenous audio corpus and parallel sentence pairs, applying data augmentation for noisy rural audio. |
| **`ai/evaluation/`** | `.py` | **Linguistic Metric Verification:** Calculates Word Error Rate (WER) on speech recognition and BLEU/chrF++ scores on machine translation. | Validates model checkpoints against held-out tribal dialect test sets before deploying weights to edge hardware. |
| **`ai/prompts/`** | `.md` | **Pedagogical LLM Prompt Architecture:** System and few-shot prompts for generating NCERT-aligned lessons, IRT quiz items, and bilingual worksheets. | Enforces strict cultural accuracy, tone appropriateness, and dual-script formatting when interfacing with frontier LLMs. |
