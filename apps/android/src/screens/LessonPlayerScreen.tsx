/**
 * Lesson Player Screen
 * Displays lesson content with audio, transcript, and navigation
 * 
 * WCAG 2.1 AA Compliant
 * - Keyboard navigation for audio player controls
 * - Screen reader support for lesson content
 * - High contrast text
 * - Accessible audio controls
 */

import React, { useState } from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  AccessibilityInfo,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useOnlineStatus } from '@janbhasha/ui';
import OfflineIndicator from '@janbhasha/ui/OfflineIndicator';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

interface LessonContent {
  title: string;
  content: string;
  transcript: string;
  audioUrl?: string;
}

interface LessonPlayerProps extends NativeStackScreenProps<any, 'LessonPlayer'> {}

const LessonPlayerScreen: React.FC<LessonPlayerProps> = ({ route, navigation }) => {
  const { lessonId } = route.params || {};
  const colorScheme = useColorScheme();
  const { isOnline } = useOnlineStatus();
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const [fontSize, setFontSize] = useState(16);

  const isDarkMode = colorScheme === 'dark';
  const styles = getStyles(isDarkMode, fontSize);

  useFocusEffect(
    React.useCallback(() => {
      AccessibilityInfo.announceForAccessibility(
        'Lesson Player loaded. Use controls to play audio or adjust text size.',
      );
      return () => {};
    }, []),
  );

  // Mock lesson content
  const lesson: LessonContent = {
    title: 'Lesson 2: Numbers and Counting',
    content: 'Learn how to count from 1 to 10 in the language.',
    transcript:
      'नमस्ते! आज हम संख्याएं सीखेंगे। एक, दो, तीन, चार, पाँच, छह, सात, आठ, नौ, दस। अब आप दोहराएं।',
    audioUrl: 'https://example.com/lesson-2-audio.mp3',
  };

  const increaseFontSize = () => {
    setFontSize((prev) => Math.min(prev + 2, 24));
  };

  const decreaseFontSize = () => {
    setFontSize((prev) => Math.max(prev - 2, 14));
  };

  const toggleAudio = () => {
    setIsPlaying(!isPlaying);
    AccessibilityInfo.announceForAccessibility(
      isPlaying ? 'Audio paused' : 'Audio playing',
    );
  };

  return (
    <View
      style={styles.container}
      accessible={true}
      accessibilityRole="main"
      accessibilityLabel="Lesson Player"
    >
      <OfflineIndicator isOnline={isOnline} />

      <ScrollView style={styles.scrollView}>
        {/* Lesson Header */}
        <View style={styles.header}>
          <Text style={styles.title}>{lesson.title}</Text>
        </View>

        {/* Audio Player Controls */}
        {lesson.audioUrl && (
          <View
            style={styles.audioContainer}
            accessible={true}
            accessibilityRole="group"
            accessibilityLabel="Audio player"
          >
            <TouchableOpacity
              style={styles.playButton}
              onPress={toggleAudio}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel={isPlaying ? 'Pause audio' : 'Play audio'}
              accessibilityHint="Double tap to toggle audio playback"
            >
              <Text style={styles.playButtonText}>
                {isPlaying ? '⏸ Pause' : '▶️ Play Audio'}
              </Text>
            </TouchableOpacity>
            {isPlaying && (
              <View
                style={styles.playerInfo}
                accessible={true}
                accessibilityLabel="Currently playing audio"
              >
                <Text style={styles.playerText}>🔊 Audio is playing...</Text>
              </View>
            )}
          </View>
        )}

        {/* Lesson Content */}
        <View style={styles.contentContainer}>
          <Text
            style={styles.content}
            accessible={true}
            accessibilityRole="text"
            accessibilityLabel="Lesson content"
          >
            {lesson.content}
          </Text>
        </View>

        {/* Transcript Section */}
        <View style={styles.section}>
          <TouchableOpacity
            style={styles.transcriptToggle}
            onPress={() => setShowTranscript(!showTranscript)}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel={showTranscript ? 'Hide transcript' : 'Show transcript'}
            accessibilityHint="Double tap to toggle transcript visibility"
            accessibilityExpanded={showTranscript}
          >
            <Text style={styles.transcriptToggleText}>
              {showTranscript ? '▼ Transcript' : '▶ Transcript'}
            </Text>
          </TouchableOpacity>

          {showTranscript && (
            <View
              style={styles.transcriptContainer}
              accessible={true}
              accessibilityRole="text"
              accessibilityLabel="Lesson transcript"
            >
              <Text style={styles.transcript}>{lesson.transcript}</Text>
            </View>
          )}
        </View>

        {/* Font Size Controls */}
        <View
          style={styles.fontControls}
          accessible={true}
          accessibilityRole="group"
          accessibilityLabel="Font size controls"
        >
          <TouchableOpacity
            style={styles.fontButton}
            onPress={decreaseFontSize}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel="Decrease font size"
            accessibilityHint={`Current font size: ${fontSize}px`}
          >
            <Text style={styles.fontButtonText}>A−</Text>
          </TouchableOpacity>

          <Text
            style={styles.fontSizeIndicator}
            accessible={true}
            accessibilityLabel={`Font size: ${fontSize} pixels`}
          >
            {fontSize}px
          </Text>

          <TouchableOpacity
            style={styles.fontButton}
            onPress={increaseFontSize}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel="Increase font size"
            accessibilityHint={`Current font size: ${fontSize}px`}
          >
            <Text style={styles.fontButtonText}>A+</Text>
          </TouchableOpacity>
        </View>

        {/* Navigation Buttons */}
        <View
          style={styles.navigation}
          accessible={true}
          accessibilityRole="group"
          accessibilityLabel="Lesson navigation"
        >
          <TouchableOpacity
            style={[styles.navButton, styles.previousButton]}
            onPress={() => navigation.goBack()}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel="Previous lesson"
          >
            <Text style={styles.navButtonText}>← Previous</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.navButton, styles.nextButton]}
            onPress={() => {
              AccessibilityInfo.announceForAccessibility(
                'Moving to next lesson',
              );
              navigation.navigate('Dashboard');
            }}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel="Next lesson"
          >
            <Text style={styles.navButtonText}>Next →</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const getStyles = (isDarkMode: boolean, fontSize: number) =>
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
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: isDarkMode ? '#FFFFFF' : '#111827',
    },
    audioContainer: {
      backgroundColor: isDarkMode ? '#374151' : '#DBEAFE',
      borderRadius: 12,
      padding: 16,
      marginBottom: 24,
      borderLeftWidth: 4,
      borderLeftColor: '#0EA5E9',
    },
    playButton: {
      backgroundColor: '#0EA5E9',
      borderRadius: 8,
      padding: 12,
      alignItems: 'center',
      minHeight: 48,
      justifyContent: 'center',
    },
    playButtonText: {
      fontSize: 16,
      fontWeight: '600',
      color: '#FFFFFF',
    },
    playerInfo: {
      marginTop: 12,
    },
    playerText: {
      fontSize: 14,
      color: isDarkMode ? '#D1D5DB' : '#0B63D4',
      fontWeight: '500',
    },
    contentContainer: {
      backgroundColor: isDarkMode ? '#374151' : '#F9FAFB',
      borderRadius: 12,
      padding: 16,
      marginBottom: 24,
    },
    content: {
      fontSize: fontSize,
      color: isDarkMode ? '#FFFFFF' : '#111827',
      lineHeight: fontSize * 1.5,
    },
    section: {
      marginBottom: 24,
    },
    transcriptToggle: {
      backgroundColor: isDarkMode ? '#374151' : '#F3F4F6',
      borderRadius: 8,
      padding: 12,
      borderLeftWidth: 4,
      borderLeftColor: '#0EA5E9',
      minHeight: 48,
      justifyContent: 'center',
    },
    transcriptToggleText: {
      fontSize: 16,
      fontWeight: '600',
      color: isDarkMode ? '#FFFFFF' : '#111827',
    },
    transcriptContainer: {
      backgroundColor: isDarkMode ? '#374151' : '#F9FAFB',
      borderRadius: 8,
      padding: 16,
      marginTop: 8,
    },
    transcript: {
      fontSize: fontSize,
      color: isDarkMode ? '#D1D5DB' : '#6B7280',
      lineHeight: fontSize * 1.6,
    },
    fontControls: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 12,
      marginBottom: 24,
    },
    fontButton: {
      backgroundColor: isDarkMode ? '#374151' : '#F3F4F6',
      borderRadius: 8,
      width: 40,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 2,
      borderColor: '#0EA5E9',
    },
    fontButtonText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: isDarkMode ? '#FFFFFF' : '#111827',
    },
    fontSizeIndicator: {
      fontSize: 14,
      fontWeight: '600',
      color: isDarkMode ? '#D1D5DB' : '#6B7280',
      minWidth: 50,
      textAlign: 'center',
    },
    navigation: {
      flexDirection: 'row',
      gap: 12,
      marginBottom: 24,
    },
    navButton: {
      flex: 1,
      borderRadius: 8,
      padding: 12,
      minHeight: 48,
      justifyContent: 'center',
      alignItems: 'center',
    },
    previousButton: {
      backgroundColor: isDarkMode ? '#374151' : '#E5E7EB',
    },
    nextButton: {
      backgroundColor: '#10B981',
    },
    navButtonText: {
      fontSize: 14,
      fontWeight: '600',
      color: isDarkMode ? '#FFFFFF' : '#111827',
    },
  });

export default LessonPlayerScreen;
