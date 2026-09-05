export type RootStackParamList = {
  Dashboard: undefined;
  LessonPlayer: { lessonId: string };
  Assessment: { quizId?: string; lessonId?: string };
  LanguageSelection: undefined;
  Settings: undefined;
  Profile: undefined;
};
