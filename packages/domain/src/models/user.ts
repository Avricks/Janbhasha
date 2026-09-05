/**
 * User and Identity Domain Models
 */

export enum UserRole {
  LEARNER = 'learner',
  EDUCATOR = 'educator',
  ADMINISTRATOR = 'administrator',
  GUEST = 'guest',
}

export enum AgeGroup {
  UNDER_13 = 'under_13',
  TEEN = '13_17',
  ADULT = '18_plus',
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  preferredLanguage: string;
  secondaryLanguage?: string;
  audioPlaybackSpeed: number;
  fontSize: number;
  highContrast: boolean;
  reducedMotion: boolean;
  offlineDownloadsEnabled: boolean;
  soundEffectsEnabled: boolean;
}

export interface UserProfile {
  id: string;
  email: string;
  username: string;
  fullName: string;
  role: UserRole;
  ageGroup: AgeGroup;
  nativeLanguage: string;
  targetLanguages: string[];
  avatarUrl?: string;
  phoneNumber?: string;
  organizationId?: string;
  preferences: UserPreferences;
  isEmailVerified: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface LearnerProfile extends UserProfile {
  role: UserRole.LEARNER;
  currentStreak: number;
  longestStreak: number;
  totalPoints: number;
  completedLessonsCount: number;
  parentEmail?: string;
  hasParentalConsent?: boolean;
}

export interface EducatorProfile extends UserProfile {
  role: UserRole.EDUCATOR;
  assignedClasses: string[];
  createdCoursesCount: number;
  verificationStatus: 'pending' | 'verified' | 'rejected';
  schoolOrCenterName: string;
}

export interface AdministratorProfile extends UserProfile {
  role: UserRole.ADMINISTRATOR;
  permissions: string[];
}
