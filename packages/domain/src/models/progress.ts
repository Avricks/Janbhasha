/**
 * Learning Progress, Tracking, and Achievements Domain Models
 */

export interface LearningRecord {
  id: string;
  userId: string;
  lessonId: string;
  courseId: string;
  progressPercent: number;
  timeSpentSeconds: number;
  isCompleted: boolean;
  completedAt?: Date;
  lastAccessedAt: Date;
  synced: boolean;
}

export enum AchievementCategory {
  STREAK = 'streak',
  LESSONS_COMPLETED = 'lessons_completed',
  QUIZ_MASTERY = 'quiz_mastery',
  SPEAKING_PRACTICE = 'speaking_practice',
  COMMUNITY_CONTRIBUTOR = 'community_contributor',
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  category: AchievementCategory;
  badgeImageUrl: string;
  requiredMetric: number;
  pointsAwarded: number;
}

export interface UserAchievement {
  id: string;
  userId: string;
  achievementId: string;
  unlockedAt: Date;
  achievement?: Achievement;
}

export interface SkillLevel {
  userId: string;
  languageId: string;
  currentLevel: string; // e.g., 'A1', 'A2'
  estimatedAbilityTheta: number; // IRT ability
  vocabularyCountMastered: number;
  grammarRulesUnderstood: number;
  lastAssessmentDate: Date;
}
