/**
 * Assessment Screen
 * Interactive quizzes, instant grading feedback, accessible choices
 * WCAG 2.1 AA Compliant
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  useColorScheme,
  AccessibilityInfo,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

interface AssessmentProps extends NativeStackScreenProps<RootStackParamList, 'Assessment'> {}

interface QuestionItem {
  id: string;
  prompt: string;
  nativePrompt?: string;
  choices: { id: string; text: string; isCorrect: boolean }[];
  explanation: string;
}

const questions: QuestionItem[] = [
  {
    id: 'q1',
    prompt: 'What is the Santhali word for "One"?',
    nativePrompt: 'ᱥᱟᱱᱛᱟᱲᱤ ᱛᱮ "ᱢᱤᱫ" ᱪᱮᱫ ᱠᱚ ᱢᱮᱛᱟᱜ-ᱟ?',
    choices: [
      { id: 'c1', text: 'Mit (ᱢᱤᱫ)', isCorrect: true },
      { id: 'c2', text: 'Bar (ᱵᱟᱨ)', isCorrect: false },
      { id: 'c3', text: 'Pe (ᱯᱮ)', isCorrect: false },
      { id: 'c4', text: 'Pun (ᱯᱩᱱ)', isCorrect: false },
    ],
    explanation: 'Mit (ᱢᱤᱫ) is the number 1 in Santhali.',
  },
  {
    id: 'q2',
    prompt: 'Which greeting is universally used in Santhali?',
    choices: [
      { id: 'c5', text: 'Johar (ᱡᱚᱦᱟᱨ)', isCorrect: true },
      { id: 'c6', text: 'Namaskar', isCorrect: false },
      { id: 'c7', text: 'Pranam', isCorrect: false },
      { id: 'c8', text: 'Salam', isCorrect: false },
    ],
    explanation: 'Johar is the traditional respectful greeting in Santhali and Mundari.',
  },
];

const AssessmentScreen: React.FC<AssessmentProps> = ({ navigation }) => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const currentQ = questions[currentIndex];

  const handleSelectChoice = (id: string) => {
    if (isSubmitted) return;
    setSelectedChoiceId(id);
  };

  const handleSubmitAnswer = () => {
    if (!selectedChoiceId || !currentQ) return;
    const choice = currentQ.choices.find((c) => c.id === selectedChoiceId);
    const correct = choice?.isCorrect ?? false;

    if (correct) {
      setScore((s) => s + 1);
      AccessibilityInfo.announceForAccessibility('Correct answer!');
    } else {
      AccessibilityInfo.announceForAccessibility('Incorrect answer.');
    }

    setIsSubmitted(true);
  };

  const handleNextQuestion = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((i) => i + 1);
      setSelectedChoiceId(null);
      setIsSubmitted(false);
    } else {
      setQuizFinished(true);
    }
  };

  const styles = getStyles(isDarkMode);

  if (quizFinished) {
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.finishTitle}>Assessment Completed!</Text>
          <Text style={styles.scoreText}>
            Your Score: {score} / {questions.length}
          </Text>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => navigation.navigate('Dashboard')}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel="Return to Dashboard"
          >
            <Text style={styles.buttonText}>Return to Dashboard</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.progressBarContainer}>
        <Text style={styles.progressText}>
          Question {currentIndex + 1} of {questions.length}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.prompt}>{currentQ?.prompt}</Text>
        {currentQ?.nativePrompt && (
          <Text style={styles.nativePrompt}>{currentQ.nativePrompt}</Text>
        )}

        <View style={styles.choicesContainer}>
          {currentQ?.choices.map((choice) => {
            let choiceStyle = styles.choiceItem;
            if (selectedChoiceId === choice.id) {
              choiceStyle = styles.choiceItemSelected;
            }
            if (isSubmitted) {
              if (choice.isCorrect) {
                choiceStyle = styles.choiceCorrect;
              } else if (selectedChoiceId === choice.id) {
                choiceStyle = styles.choiceIncorrect;
              }
            }

            return (
              <TouchableOpacity
                key={choice.id}
                style={choiceStyle}
                onPress={() => handleSelectChoice(choice.id)}
                disabled={isSubmitted}
                accessible={true}
                accessibilityRole="radio"
                accessibilityState={{ selected: selectedChoiceId === choice.id }}
                accessibilityLabel={choice.text}
              >
                <Text style={styles.choiceText}>{choice.text}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {isSubmitted && (
          <View style={styles.feedbackContainer}>
            <Text style={styles.feedbackText}>{currentQ?.explanation}</Text>
          </View>
        )}

        {!isSubmitted ? (
          <TouchableOpacity
            style={[
              styles.primaryButton,
              !selectedChoiceId && styles.buttonDisabled,
            ]}
            onPress={handleSubmitAnswer}
            disabled={!selectedChoiceId}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel="Submit Answer"
          >
            <Text style={styles.buttonText}>Submit Answer</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={handleNextQuestion}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel="Continue to Next Question"
          >
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

const getStyles = (isDarkMode: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? '#1F2937' : '#F9FAFB',
      padding: 16,
    },
    progressBarContainer: {
      marginBottom: 16,
    },
    progressText: {
      fontSize: 14,
      fontWeight: '600',
      color: isDarkMode ? '#9CA3AF' : '#6B7280',
    },
    card: {
      backgroundColor: isDarkMode ? '#374151' : '#FFFFFF',
      borderRadius: 12,
      padding: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    prompt: {
      fontSize: 18,
      fontWeight: '700',
      color: isDarkMode ? '#FFFFFF' : '#111827',
      marginBottom: 8,
    },
    nativePrompt: {
      fontSize: 16,
      color: '#0EA5E9',
      marginBottom: 20,
      fontWeight: '600',
    },
    choicesContainer: {
      gap: 12,
      marginBottom: 24,
    },
    choiceItem: {
      minHeight: 52,
      padding: 16,
      borderRadius: 8,
      borderWidth: 2,
      borderColor: isDarkMode ? '#4B5563' : '#E5E7EB',
      justifyContent: 'center',
    },
    choiceItemSelected: {
      borderColor: '#0EA5E9',
      backgroundColor: isDarkMode ? '#1E3A8A' : '#EFF6FF',
    },
    choiceCorrect: {
      borderColor: '#22C55E',
      backgroundColor: isDarkMode ? '#064E3B' : '#ECFDF5',
    },
    choiceIncorrect: {
      borderColor: '#EF4444',
      backgroundColor: isDarkMode ? '#7F1D1D' : '#FEF2F2',
    },
    choiceText: {
      fontSize: 16,
      color: isDarkMode ? '#FFFFFF' : '#111827',
    },
    feedbackContainer: {
      padding: 12,
      backgroundColor: isDarkMode ? '#1F2937' : '#F3F4F6',
      borderRadius: 8,
      marginBottom: 20,
    },
    feedbackText: {
      fontSize: 14,
      color: isDarkMode ? '#D1D5DB' : '#4B5563',
    },
    primaryButton: {
      minHeight: 48,
      backgroundColor: '#0EA5E9',
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonDisabled: {
      opacity: 0.5,
    },
    buttonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: '600',
    },
    finishTitle: {
      fontSize: 22,
      fontWeight: '700',
      color: isDarkMode ? '#FFFFFF' : '#111827',
      textAlign: 'center',
      marginBottom: 16,
    },
    scoreText: {
      fontSize: 18,
      color: '#10B981',
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 24,
    },
  });

export default AssessmentScreen;
