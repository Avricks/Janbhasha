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
import { RootStackParamList } from './types/navigation';

// Screens
import LearnerDashboardScreen from './screens/LearnerDashboardScreen';
import LessonPlayerScreen from './screens/LessonPlayerScreen';
import SettingsScreen from './screens/SettingsScreen';
import AssessmentScreen from './screens/AssessmentScreen';
import LanguageSelectionScreen from './screens/LanguageSelectionScreen';
import ProfileScreen from './screens/ProfileScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    try {
      AccessibilityInfo.announceForAccessibility(
        'Janbhasha app loaded successfully. Welcome to your learning journey.',
      );
      setAppReady(true);
    } catch (error) {
      console.error('Error initializing app:', error);
      setAppReady(true);
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
      />
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Dashboard"
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
          headerTitleContainerStyle: {
            height: 48,
            justifyContent: 'center',
          },
        }}
      >
        <Stack.Screen
          name="Dashboard"
          component={LearnerDashboardScreen}
          options={{
            title: 'Janbhasha',
            headerTitleAlign: 'center',
          }}
        />

        <Stack.Screen
          name="LessonPlayer"
          component={LessonPlayerScreen}
          options={{
            title: 'Lesson',
          }}
        />

        <Stack.Screen
          name="Assessment"
          component={AssessmentScreen}
          options={{
            title: 'Assessment',
          }}
        />

        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            title: 'Settings',
          }}
        />

        <Stack.Screen
          name="LanguageSelection"
          component={LanguageSelectionScreen}
          options={{
            title: 'Select Language',
          }}
        />

        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            title: 'My Profile',
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
