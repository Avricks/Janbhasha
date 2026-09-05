/**
 * Settings Screen
 * User preferences, language switching, high contrast, offline data management
 * WCAG 2.1 AA Compliant
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  useColorScheme,
  AccessibilityInfo,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

interface SettingsProps extends NativeStackScreenProps<RootStackParamList, 'Settings'> {}

const SettingsScreen: React.FC<SettingsProps> = ({ navigation }) => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const [selectedLanguage, setSelectedLanguage] = useState('sat');
  const [highContrast, setHighContrast] = useState(false);
  const [offlineDownloads, setOfflineDownloads] = useState(true);
  const [soundEffects, setSoundEffects] = useState(true);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const lang = await AsyncStorage.getItem('userLanguage');
      if (lang) setSelectedLanguage(lang);
      const hc = await AsyncStorage.getItem('highContrast');
      if (hc) setHighContrast(hc === 'true');
    } catch (e) {
      console.error(e);
    }
  };

  const handleLanguageChange = async (lang: string) => {
    setSelectedLanguage(lang);
    await AsyncStorage.setItem('userLanguage', lang);
    AccessibilityInfo.announceForAccessibility(`Language changed to ${lang}`);
  };

  const handleClearCache = async () => {
    Alert.alert(
      'Clear Offline Cache',
      'Are you sure you want to remove offline cached lessons? They will be re-downloaded next time you connect.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: async () => {
            await AsyncStorage.removeItem('cached_lessons');
            AccessibilityInfo.announceForAccessibility('Offline cache cleared');
          },
        },
      ],
    );
  };

  const styles = getStyles(isDarkMode, highContrast);

  return (
    <ScrollView
      style={styles.container}
      accessible={true}
      accessibilityRole="main"
      accessibilityLabel="Settings Screen"
    >
      {/* Language Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle} accessibilityRole="header">
          Target Language
        </Text>
        <View style={styles.radioGroup}>
          {[
            { id: 'sat', name: 'Santhali (ᱥᱟᱱᱛᱟᱲᱤ - Ol Chiki)' },
            { id: 'unr', name: 'Mundari (ᱢᱩᱱᱰᱟᱹᱨᱤ - Warang Citi)' },
            { id: 'hoc', name: 'Ho (𑢹𑣉 - Warang Citi / Devanagari)' },
          ].map((lang) => (
            <TouchableOpacity
              key={lang.id}
              style={[
                styles.radioItem,
                selectedLanguage === lang.id && styles.radioItemSelected,
              ]}
              onPress={() => handleLanguageChange(lang.id)}
              accessible={true}
              accessibilityRole="radio"
              accessibilityState={{ selected: selectedLanguage === lang.id }}
              accessibilityLabel={lang.name}
            >
              <Text
                style={[
                  styles.radioText,
                  selectedLanguage === lang.id && styles.radioTextSelected,
                ]}
              >
                {lang.name}
              </Text>
              {selectedLanguage === lang.id && <Text style={styles.checkmark}>✓</Text>}
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Accessibility Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle} accessibilityRole="header">
          Accessibility
        </Text>
        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>High Contrast Mode</Text>
          <Switch
            value={highContrast}
            onValueChange={async (v) => {
              setHighContrast(v);
              await AsyncStorage.setItem('highContrast', v ? 'true' : 'false');
            }}
            accessibilityLabel="Toggle High Contrast Mode"
          />
        </View>
        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Sound Effects</Text>
          <Switch
            value={soundEffects}
            onValueChange={setSoundEffects}
            accessibilityLabel="Toggle Sound Effects"
          />
        </View>
      </View>

      {/* Offline Storage Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle} accessibilityRole="header">
          Offline Storage
        </Text>
        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Auto-download Lessons</Text>
          <Switch
            value={offlineDownloads}
            onValueChange={setOfflineDownloads}
            accessibilityLabel="Toggle automatic offline downloading"
          />
        </View>

        <TouchableOpacity
          style={styles.dangerButton}
          onPress={handleClearCache}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel="Clear offline cached data"
        >
          <Text style={styles.dangerButtonText}>Clear Offline Cache</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const getStyles = (isDarkMode: boolean, highContrast: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: highContrast
        ? '#000000'
        : isDarkMode
        ? '#1F2937'
        : '#FFFFFF',
      padding: 16,
    },
    section: {
      marginBottom: 28,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '700',
      color: highContrast || isDarkMode ? '#FFFFFF' : '#111827',
      marginBottom: 12,
    },
    radioGroup: {
      gap: 8,
    },
    radioItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      minHeight: 52,
      padding: 16,
      borderRadius: 8,
      backgroundColor: highContrast
        ? '#1A1A1A'
        : isDarkMode
        ? '#374151'
        : '#F3F4F6',
      borderWidth: 2,
      borderColor: 'transparent',
    },
    radioItemSelected: {
      borderColor: '#0EA5E9',
      backgroundColor: isDarkMode ? '#1E3A8A' : '#E0F2FE',
    },
    radioText: {
      fontSize: 16,
      color: highContrast || isDarkMode ? '#FFFFFF' : '#111827',
      fontWeight: '500',
    },
    radioTextSelected: {
      color: isDarkMode ? '#93C5FD' : '#0284C7',
      fontWeight: '700',
    },
    checkmark: {
      fontSize: 18,
      color: '#0EA5E9',
      fontWeight: 'bold',
    },
    settingRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      minHeight: 48,
      paddingVertical: 8,
      borderBottomWidth: 1,
      borderBottomColor: isDarkMode ? '#374151' : '#E5E7EB',
    },
    settingLabel: {
      fontSize: 16,
      color: highContrast || isDarkMode ? '#FFFFFF' : '#111827',
    },
    dangerButton: {
      marginTop: 16,
      minHeight: 48,
      borderRadius: 8,
      backgroundColor: '#EF4444',
      justifyContent: 'center',
      alignItems: 'center',
    },
    dangerButtonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: '600',
    },
  });

export default SettingsScreen;
