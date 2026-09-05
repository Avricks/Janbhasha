/**
 * Item Response Theory (IRT) 3-Parameter Logistic (3PL) Model Service
 *
 * P(theta) = c + (1 - c) / (1 + exp(-a * (theta - b)))
 * where:
 *   theta = learner ability level (-3.0 to +3.0)
 *   b = item difficulty
 *   a = item discrimination
 *   c = pseudo-guessing parameter
 */

export interface IrtItemParams {
  difficulty: number; // b
  discrimination: number; // a
  guessing: number; // c
}

export class AdaptiveTestingService {
  /**
   * Probability of correct response under 3PL model
   */
  public static calculateProbability(theta: number, item: IrtItemParams): number {
    const { difficulty, discrimination, guessing } = item;
    const exponent = -discrimination * (theta - difficulty);
    const logistic = 1 / (1 + Math.exp(exponent));
    return guessing + (1 - guessing) * logistic;
  }

  /**
   * Updates learner ability (theta) using Newton-Raphson approximation
   */
  public static updateAbilityEstimate(
    currentTheta: number,
    responses: { isCorrect: boolean; item: IrtItemParams }[],
  ): number {
    let theta = currentTheta;
    const iterations = 5;

    for (let iter = 0; iter < iterations; iter++) {
      let firstDerivative = 0;
      let secondDerivative = 0;

      for (const { isCorrect, item } of responses) {
        const p = this.calculateProbability(theta, item);
        const q = 1 - p;
        const u = isCorrect ? 1 : 0;
        const pStar = (p - item.guessing) / (1 - item.guessing);

        const w = (pStar * (1 - pStar)) / (p * q);
        firstDerivative += item.discrimination * (u - p) * (pStar / p);
        secondDerivative -= Math.pow(item.discrimination, 2) * w;
      }

      if (Math.abs(secondDerivative) < 1e-6) break;

      const delta = firstDerivative / Math.abs(secondDerivative);
      theta = Math.max(-3.0, Math.min(3.0, theta + delta * 0.5));
    }

    return parseFloat(theta.toFixed(2));
  }
}
