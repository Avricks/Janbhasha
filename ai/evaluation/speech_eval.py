"""
Speech Evaluation Metrics (WER / CER / MOS)
"""

def levenshtein_distance(s1: str, s2: str) -> int:
    if len(s1) < len(s2):
        return levenshtein_distance(s2, s1)
    if len(s2) == 0:
        return len(s1)

    prev = range(len(s2) + 1)
    for i, c1 in enumerate(s1):
        curr = [i + 1]
        for j, c2 in enumerate(s2):
            insertions = prev[j + 1] + 1
            deletions = curr[j] + 1
            substitutions = prev[j] + (c1 != c2)
            curr.append(min(insertions, deletions, substitutions))
        prev = curr
    return prev[-1]

def calculate_wer(reference: str, hypothesis: str) -> float:
    ref_words = reference.split()
    hyp_words = hypothesis.split()
    dist = levenshtein_distance(ref_words, hyp_words)
    return dist / max(1, len(ref_words))

if __name__ == "__main__":
    ref = "mit bar pe pun more"
    hyp = "mit bar pe pun more"
    wer = calculate_wer(ref, hyp)
    print(f"ASR Word Error Rate: {wer:.2%} (Pass threshold < 15%)")
