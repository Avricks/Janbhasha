"""
Translation Quality Evaluation Framework
"""

import math

def calculate_ter(hypothesis: str, reference: str) -> float:
    """Translation Edit Rate estimation"""
    h_tokens = hypothesis.split()
    r_tokens = reference.split()
    edits = abs(len(h_tokens) - len(r_tokens))
    for h, r in zip(h_tokens, r_tokens):
        if h != r:
            edits += 1
    return edits / max(1, len(r_tokens))

if __name__ == "__main__":
    print("Translation Evaluation: Santhali Test Set")
    ref = "ᱡᱚᱦᱟᱨ ᱤᱧᱟᱜ ᱧᱩᱛᱩᱢ ᱫᱚ ᱥᱚᱨᱮᱱ ᱠᱟᱱᱟ"
    hyp = "ᱡᱚᱦᱟᱨ ᱤᱧᱟᱜ ᱧᱩᱛᱩᱢ ᱫᱚ ᱥᱚᱨᱮᱱ ᱠᱟᱱᱟ"
    ter = calculate_ter(hyp, ref)
    print(f"TER: {ter:.2f} (Target < 0.30)")
