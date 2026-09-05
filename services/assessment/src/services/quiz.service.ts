import { Quiz, QuizResult, QuestionType } from '@janbhasha/domain';
import { AdaptiveTestingService } from './adaptive.service';

const sampleQuizzes: Quiz[] = [
  {
    id: 'quiz_sat_01',
    lessonId: 'les_sat_01',
    title: 'Santhali Alphabet Quick Check',
    description: 'Verify your recognition of basic Ol Chiki characters.',
    passingScorePercent: 70,
    isAdaptive: true,
    questions: [
      {
        id: 'q_01',
        quizId: 'quiz_sat_01',
        prompt: 'What is the first letter of the Ol Chiki alphabet?',
        nativeScriptPrompt: 'ᱚᱞ ᱪᱤᱠᱤ ᱨᱮᱱᱟᱜ ᱯᱩᱭᱞᱩ ᱟᱠᱷᱚᱨ ᱫᱚ ᱪᱮᱫ?',
        type: QuestionType.MULTIPLE_CHOICE,
        points: 1,
        difficultyRating: -1.0,
        discriminationParam: 1.2,
        guessingParam: 0.25,
        explanation: 'LA (ᱚ) is the first character in the Ol Chiki script invented by Pandit Raghunath Murmu.',
        order: 1,
        choices: [
          { id: 'c_01', text: 'LA (ᱚ)', isCorrect: true },
          { id: 'c_02', text: 'AT (ᱛ)', isCorrect: false },
          { id: 'c_03', text: 'AG (ᱜ)', isCorrect: false },
          { id: 'c_04', text: 'ANG (ᱝ)', isCorrect: false },
        ],
      },
      {
        id: 'q_02',
        quizId: 'quiz_sat_01',
        prompt: 'Translate the greeting "Johar" into English:',
        type: QuestionType.MULTIPLE_CHOICE,
        points: 1,
        difficultyRating: -0.5,
        discriminationParam: 1.0,
        guessingParam: 0.25,
        explanation: 'Johar is the traditional greeting equivalent to Hello / Salutations.',
        order: 2,
        choices: [
          { id: 'c_05', text: 'Hello / Greetings', isCorrect: true },
          { id: 'c_06', text: 'Goodbye', isCorrect: false },
          { id: 'c_07', text: 'Thank you', isCorrect: false },
          { id: 'c_08', text: 'Please', isCorrect: false },
        ],
      },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export class QuizService {
  public static async getQuizById(id: string): Promise<Quiz | null> {
    return sampleQuizzes.find((q) => q.id === id) || null;
  }

  public static async getQuizForLesson(lessonId: string): Promise<Quiz | null> {
    return sampleQuizzes.find((q) => q.lessonId === lessonId) || null;
  }

  public static async gradeQuiz(
    quizId: string,
    userId: string,
    submittedResponses: { questionId: string; selectedChoiceId?: string; textResponse?: string; timeSpentSeconds: number }[],
  ): Promise<QuizResult> {
    const quiz = await this.getQuizById(quizId);
    if (!quiz) throw new Error('Quiz not found');

    let totalScore = 0;
    const maxScore = quiz.questions.reduce((acc, q) => acc + q.points, 0);
    const gradedResponses = [];
    const irtItems = [];

    for (const sub of submittedResponses) {
      const q = quiz.questions.find((quest) => quest.id === sub.questionId);
      if (!q) continue;

      let isCorrect = false;
      if (q.choices && sub.selectedChoiceId) {
        const choice = q.choices.find((c) => c.id === sub.selectedChoiceId);
        isCorrect = choice?.isCorrect ?? false;
      }

      const score = isCorrect ? q.points : 0;
      totalScore += score;

      gradedResponses.push({
        questionId: q.id,
        selectedChoiceId: sub.selectedChoiceId,
        textResponse: sub.textResponse,
        isCorrect,
        scoreAwarded: score,
        maxScore: q.points,
        timeSpentSeconds: sub.timeSpentSeconds || 0,
      });

      irtItems.push({
        isCorrect,
        item: {
          difficulty: q.difficultyRating,
          discrimination: q.discriminationParam,
          guessing: q.guessingParam,
        },
      });
    }

    const percentage = maxScore > 0 ? (totalScore / maxScore) * 100 : 0;
    const isPassed = percentage >= quiz.passingScorePercent;
    const abilityTheta = AdaptiveTestingService.updateAbilityEstimate(0.0, irtItems);

    return {
      id: `res_${Date.now()}`,
      quizId,
      userId,
      attemptNumber: 1,
      responses: gradedResponses,
      totalScore,
      maxPossibleScore: maxScore,
      scorePercentage: Math.round(percentage),
      isPassed,
      estimatedAbilityTheta: abilityTheta,
      completedAt: new Date(),
    };
  }
}
