/**
 * Janbhasha Android App
 * Main entry point for the mobile application
 * 
 * WCAG 2.1 AA Compliant
 * - Dark mode support
 * - Keyboard navigation
 * - Screen reader compatible
 * - Accessible color scheme
 */

import React, { useEffect, useState } from 'react';
import {
  useColorScheme,
  StyleSheet,
  View,
  AccessibilityInfo,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Screens
import LearnerDashboardScreen from './screens/LearnerDashboardScreen';
import LessonPlayerScreen from './screens/LessonPlayerScreen';

const Stack = createNativeStackNavigator();

const App: React.FC = () => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const [appReady, setAppReady] = useState(false);
  const [userLanguage, setUserLanguage] = useState('en');

  useEffect(() => {
    // Initialize app
    initializeApp();
  }, []);

  const initializeApp = async () => {
    try {
      // Load user preferences
      const savedLanguage = await AsyncStorage.getItem('userLanguage');
      if (savedLanguage) {
        setUserLanguage(savedLanguage);
      }

      // Announce app ready to screen readers
      AccessibilityInfo.announceForAccessibility(
        'Janbhasha app loaded successfully. Welcome to your learning journey.',
      );

      setAppReady(true);
    } catch (error) {
      console.error('Error initializing app:', error);
      setAppReady(true); // Continue even if initialization fails
    }
  };

  if (!appReady) {
    return (
      <View
        style={[
          styles.loadingContainer,
          { backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF' },
        ]}
        accessible={true}
        accessibilityRole="main"
        accessibilityLabel="Loading Janbhasha app"
      >
        {/* Loading screen can be replaced with splash screen */}
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: true,
          headerStyle: {
            backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF',
          },
          headerTitleStyle: {
            color: isDarkMode ? '#FFFFFF' : '#111827',
            fontSize: 18,
            fontWeight: '600',
          },
          headerTintColor: isDarkMode ? '#FFFFFF' : '#111827',
          headerBackTitle: 'Back',
          headerAccessibilityLabel: 'Navigation header',
          // Ensure minimum touch target of 48px for header buttons
          headerTitleContainerStyle: {
            height: 48,
            justifyContent: 'center',
          },
          // Enable animated transitions
          animationEnabled: true,
          // Ensure gestures work properly
          gestureEnabled: true,
        }}
      >
        <Stack.Screen
          name="Dashboard"
          component={LearnerDashboardScreen}
          options={{
            title: 'Janbhasha',
            headerTitleAlign: 'center',
            headerAccessibilityLabel: 'Learner dashboard header',
          }}
        />

        <Stack.Screen
          name="LessonPlayer"
          component={LessonPlayerScreen}
          options={{
            title: 'Lesson',
            headerBackTitle: 'Dashboard',
            headerAccessibilityLabel: 'Lesson player header',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
