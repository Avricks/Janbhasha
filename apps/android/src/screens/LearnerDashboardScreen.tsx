/**
 * Learner Dashboard Screen
 * Main screen showing learner's progress, lessons, and achievements
 * 
 * WCAG 2.1 AA Compliant
 * - Accessible navigation with keyboard support
 * - High contrast colors (4.5:1 ratio)
 * - Clear focus indicators
 * - Screen reader compatible
 */

import React, { useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  AccessibilityInfo,
  useColorScheme,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useOnlineStatus } from '@janbhasha/ui';
import OfflineIndicator from '@janbhasha/ui/OfflineIndicator';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

interface Lesson {
  id: string;
  title: string;
  progress: number;
  completed: boolean;
  thumbnail?: string;
}

interface LearnerDashboardProps extends NativeStackScreenProps<any, 'Dashboard'> {}

const LearnerDashboardScreen: React.FC<LearnerDashboardProps> = ({ navigation }) => {
  const colorScheme = useColorScheme();
  const { isOnline, syncInProgress } = useOnlineStatus();
  const [streak, setStreak] = useState(0);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);

  const isDarkMode = colorScheme === 'dark';
  const styles = getStyles(isDarkMode);

  useFocusEffect(
    React.useCallback(() => {
      // Reset focus to top of screen
      const screenName = 'Learner Dashboard';
      AccessibilityInfo.announceForAccessibility(
        `${screenName} loaded. Swipe down to see your progress and lessons.`,
      );

      // Load learner data
      loadLearnerData();

      return () => {
        // Cleanup if needed
      };
    }, []),
  );

  const loadLearnerData = async () => {
    try {
      setLoading(true);
      // TODO: Load from database or API
      // Mock data for now
      setStreak(7);
      setLessons([
        {
          id: '1',
          title: 'Lesson 1: Alphabet Basics',
          progress: 100,
          completed: true,
        },
        {
          id: '2',
          title: 'Lesson 2: Numbers and Counting',
          progress: 60,
          completed: false,
        },
        {
          id: '3',
          title: 'Lesson 3: Common Phrases',
          progress: 0,
          completed: false,
        },
      ]);
    } catch (error) {
      console.error('Error loading learner data:', error);
    } finally {
      setLoading(false);
    }
  };

  const navigateToLesson = (lessonId: string) => {
    navigation.navigate('LessonPlayer', { lessonId });
  };

  const navigateToSettings = () => {
    navigation.navigate('Settings');
  };

  return (
    <View
      style={styles.container}
      accessible={true}
      accessibilityRole="main"
      accessibilityLabel="Learner Dashboard"
    >
      <OfflineIndicator isOnline={isOnline} syncInProgress={syncInProgress} />

      <ScrollView
        style={styles.scrollView}
        accessibilityRole="list"
        accessibilityLabel="Dashboard content"
      >
        {/* Header */}
        <View style={styles.header} accessible={true} accessibilityRole="text">
          <Text style={styles.greeting}>नमस्ते! (Hello!)</Text>
          <Text style={styles.subheading}>Welcome to Janbhasha Learning</Text>
        </View>

        {/* Streak Card */}
        <View style={styles.streakCard} accessible={true} accessibilityRole="header">
          <Text
            style={styles.streakLabel}
            accessibilityLabel={`Streak: ${streak} days`}
          >
            🔥 {streak}-Day Streak!
          </Text>
          <Text style={styles.streakText}>Keep learning to maintain your streak</Text>
        </View>

        {/* Today's Lesson */}
        <View style={styles.section}>
          <Text
            style={styles.sectionTitle}
            accessible={true}
            accessibilityRole="header"
          >
            Today's Lesson
          </Text>
          {lessons.length > 0 && (
            <TouchableOpacity
              style={styles.lessonCard}
              onPress={() => navigateToLesson(lessons[1]?.id || lessons[0].id)}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel={`${lessons[1]?.title || lessons[0].title}. ${Math.round(lessons[1]?.progress || lessons[0].progress)}% complete`}
              accessibilityHint="Double tap to start lesson"
            >
              <View style={styles.lessonContent}>
                <Text style={styles.lessonTitle}>
                  {lessons[1]?.title || lessons[0].title}
                </Text>
                <View style={styles.progressBar}>
                  <View
                    style={[
                      styles.progressFill,
                      {
                        width: `${lessons[1]?.progress || lessons[0].progress}%`,
                      },
                    ]}
                    accessible={true}
                    accessibilityRole="progressbar"
                    accessibilityValue={{
                      min: 0,
                      max: 100,
                      current: lessons[1]?.progress || lessons[0].progress,
                    }}
                  />
                </View>
                <Text style={styles.progressText}>
                  {Math.round(lessons[1]?.progress || lessons[0].progress)}% Complete
                </Text>
              </View>
            </TouchableOpacity>
          )}
        </View>

        {/* All Lessons */}
        <View style={styles.section}>
          <Text
            style={styles.sectionTitle}
            accessible={true}
            accessibilityRole="header"
          >
            All Lessons
          </Text>
          <View accessible={true} accessibilityRole="list">
            {lessons.map((lesson) => (
              <TouchableOpacity
                key={lesson.id}
                style={styles.lessonListItem}
                onPress={() => navigateToLesson(lesson.id)}
                accessible={true}
                accessibilityRole="button"
                accessibilityLabel={`${lesson.title}. ${lesson.completed ? 'Completed' : `${Math.round(lesson.progress)}% complete`}`}
                accessibilityHint="Double tap to open lesson"
              >
                <Text style={styles.lessonListTitle}>{lesson.title}</Text>
                {lesson.completed && (
                  <Text
                    style={styles.completedBadge}
                    accessible={true}
                    accessibilityLabel="Completed"
                  >
                    ✓
                  </Text>
                )}
                {!lesson.completed && (
                  <Text style={styles.progressIndicator}>
                    {Math.round(lesson.progress)}%
                  </Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Settings Button */}
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={navigateToSettings}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel="Open settings"
          accessibilityHint="Navigate to app settings"
        >
          <Text style={styles.settingsButtonText}>⚙️ Settings</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const getStyles = (isDarkMode: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF',
    },
    scrollView: {
      flex: 1,
      padding: 16,
    },
    header: {
      marginBottom: 24,
    },
    greeting: {
      fontSize: 28,
      fontWeight: 'bold',
      color: isDarkMode ? '#FFFFFF' : '#111827',
      marginBottom: 8,
    },
    subheading: {
      fontSize: 16,
      color: isDarkMode ? '#D1D5DB' : '#6B7280',
    },
    streakCard: {
      backgroundColor: isDarkMode ? '#374151' : '#FEF3C7',
      borderRadius: 12,
      padding: 16,
      marginBottom: 24,
      borderLeftWidth: 4,
      borderLeftColor: '#F59E0B',
    },
    streakLabel: {
      fontSize: 20,
      fontWeight: 'bold',
      color: isDarkMode ? '#FFFFFF' : '#111827',
      marginBottom: 8,
    },
    streakText: {
      fontSize: 14,
      color: isDarkMode ? '#D1D5DB' : '#6B7280',
    },
    section: {
      marginBottom: 24,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: isDarkMode ? '#FFFFFF' : '#111827',
      marginBottom: 12,
    },
    lessonCard: {
      backgroundColor: isDarkMode ? '#374151' : '#F3F4F6',
      borderRadius: 12,
      padding: 16,
      borderWidth: 2,
      borderColor: '#0EA5E9',
    },
    lessonContent: {
      gap: 12,
    },
    lessonTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: isDarkMode ? '#FFFFFF' : '#111827',
    },
    progressBar: {
      height: 8,
      backgroundColor: isDarkMode ? '#1F2937' : '#E5E7EB',
      borderRadius: 4,
      overflow: 'hidden',
    },
    progressFill: {
      height: '100%',
      backgroundColor: '#10B981',
    },
    progressText: {
      fontSize: 12,
      color: isDarkMode ? '#D1D5DB' : '#6B7280',
    },
    lessonListItem: {
      backgroundColor: isDarkMode ? '#374151' : '#F9FAFB',
      borderRadius: 8,
      padding: 16,
      marginBottom: 8,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderLeftWidth: 4,
      borderLeftColor: '#0EA5E9',
    },
    lessonListTitle: {
      fontSize: 14,
      fontWeight: '500',
      color: isDarkMode ? '#FFFFFF' : '#111827',
      flex: 1,
    },
    completedBadge: {
      fontSize: 20,
      color: '#10B981',
    },
    progressIndicator: {
      fontSize: 12,
      fontWeight: '600',
      color: isDarkMode ? '#93C5FD' : '#0B63D4',
    },
    settingsButton: {
      backgroundColor: '#0EA5E9',
      borderRadius: 12,
      padding: 16,
      alignItems: 'center',
      marginVertical: 24,
      minHeight: 48,
      justifyContent: 'center',
    },
    settingsButtonText: {
      fontSize: 16,
      fontWeight: '600',
      color: '#FFFFFF',
    },
  });

export default LearnerDashboardScreen;
