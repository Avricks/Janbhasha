---
name: Translation Service Skill
description: Implement translation pipelines and maintain translation quality
applyTo: ["services/translation/**", "ai/models/"]
relatedAgent: "ai-nlp-agent"
---

# Translation Service Skill

## Overview

This skill covers the end-to-end translation system, from model training to deployment and quality monitoring.

## Translation Pipeline

### 1. Text Preprocessing
```python
def preprocess_text(text):
    # Normalize unicode
    text = unicodedata.normalize('NFC', text)
    # Remove extra whitespace
    text = ' '.join(text.split())
    # Lowercase (optional, language-dependent)
    return text
```

### 2. Tokenization
```python
# Language-specific tokenization
tokenizer = AutoTokenizer.from_pretrained(
    "Helsinki-NLP/Tatoeba-MT-models/..."
)
tokens = tokenizer.encode(text, return_tensors="pt")
```

### 3. Model Inference
```python
# Translation with Seq2Seq model
model = AutoModelForSeq2SeqLM.from_pretrained(...)
outputs = model.generate(tokens, max_length=200)
translated = tokenizer.decode(outputs[0])
```

### 4. Post-processing
```python
def postprocess_translation(text):
    # Apply translation memory
    text = apply_translation_memory(text)
    # Fix capitalization
    text = fix_capitalization(text)
    return text
```

## Translation Quality Assurance

### Evaluation Metrics

**BLEU Score**:
```python
from sacrebleu import corpus_bleu

bleu = corpus_bleu(hypotheses, references)
print(f"BLEU Score: {bleu.score}")
```

**Linguistic Evaluation**:
- Vocabulary accuracy
- Grammar correctness
- Idiom handling
- Cultural appropriateness

### Quality Review Workflow
1. Automatic translation
2. Human review (native speaker)
3. Back-translation verification
4. Terminology check
5. Final approval

## Translation Memory

### Building Memory
```python
# Sentence pair collection
translation_pairs = [
    ("Santhali text", "English translation"),
    ("More Santhali", "More English")
]

# Store in database
for source, target in translation_pairs:
    store_translation_pair(source, target)
```

### Using Memory
```python
def get_cached_translation(text):
    # Look up in translation memory
    cached = lookup_memory(text)
    if cached:
        return cached
    # Fall back to model
    return translate_with_model(text)
```

## Model Fine-tuning

### Training Process
```python
# Load pre-trained model
model = AutoModelForSeq2SeqLM.from_pretrained(
    "Helsinki-NLP/Tatoeba-MT-..."
)

# Fine-tune on custom data
trainer = Seq2SeqTrainer(
    model=model,
    args=Seq2SeqTrainingArguments(...),
    train_dataset=train_dataset,
    eval_dataset=eval_dataset,
)
trainer.train()
```

### Evaluation
```python
# Evaluate on test set
predictions = trainer.predict(test_dataset)
bleu_score = compute_bleu(predictions)
print(f"Validation BLEU: {bleu_score}")
```

## Deployment

### Model Optimization
```python
# Quantization for mobile
import onnx
from onnxruntime.quantization import quantize_dynamic

quantize_dynamic("model.onnx", "model-quantized.onnx")
```

### API Endpoint
```python
@app.post("/translate")
async def translate(text: str, target_lang: str):
    translated = translator.translate(text, target_lang)
    return {"original": text, "translated": translated}
```

## Handling Edge Cases

### Rare Words
- Fall back to transliteration
- Use character-level models
- Manual dictionary lookup
- Community contributions

### Idioms & Phrases
- Translation memory lookup
- Rule-based patterns
- Human review process
- Documentation

### Multiple Scripts
- Handle Ol Chiki, Warang Citi, Devanagari
- Script normalization
- Script conversion if needed

## Performance Optimization

- Model quantization
- Batch processing
- Caching mechanisms
- Async processing
- Resource pooling

---

See rules/04-translation.md for detailed guidelines.
