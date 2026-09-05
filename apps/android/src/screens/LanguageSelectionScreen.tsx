/**
 * Language Selection Onboarding Screen
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

interface LanguageSelectionProps extends NativeStackScreenProps<RootStackParamList, 'LanguageSelection'> {}

const languages = [
  {
    id: 'sat',
    name: 'Santhali',
    nativeName: 'ᱥᱟᱱᱛᱟᱲᱤ',
    script: 'Ol Chiki',
    speakers: '7.6+ Million',
  },
  {
    id: 'unr',
    name: 'Mundari',
    nativeName: 'ᱢᱩᱱᱰᱟᱹᱨᱤ',
    script: 'Warang Citi',
    speakers: '1.1+ Million',
  },
  {
    id: 'hoc',
    name: 'Ho',
    nativeName: '𑢹𑣉',
    script: 'Warang Citi / Devanagari',
    speakers: '1.4+ Million',
  },
];

const LanguageSelectionScreen: React.FC<LanguageSelectionProps> = ({ navigation }) => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const selectLanguage = async (id: string) => {
    await AsyncStorage.setItem('userLanguage', id);
    navigation.navigate('Dashboard');
  };

  const styles = getStyles(isDarkMode);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Your Language</Text>
      <Text style={styles.subtitle}>
        Select the regional language you want to learn or practice
      </Text>

      <View style={styles.list}>
        {languages.map((lang) => (
          <TouchableOpacity
            key={lang.id}
            style={styles.card}
            onPress={() => selectLanguage(lang.id)}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel={`${lang.name} (${lang.nativeName}), script: ${lang.script}`}
          >
            <View>
              <Text style={styles.langNative}>{lang.nativeName}</Text>
              <Text style={styles.langName}>{lang.name}</Text>
              <Text style={styles.langDetails}>Script: {lang.script}</Text>
            </View>
            <Text style={styles.arrow}>→</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const getStyles = (isDarkMode: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF',
      padding: 24,
      justifyContent: 'center',
    },
    title: {
      fontSize: 26,
      fontWeight: 'bold',
      color: isDarkMode ? '#FFFFFF' : '#111827',
      marginBottom: 8,
      textAlign: 'center',
    },
    subtitle: {
      fontSize: 16,
      color: isDarkMode ? '#9CA3AF' : '#6B7280',
      textAlign: 'center',
      marginBottom: 32,
    },
    list: {
      gap: 16,
    },
    card: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 20,
      backgroundColor: isDarkMode ? '#374151' : '#F3F4F6',
      borderRadius: 12,
      borderWidth: 2,
      borderColor: '#0EA5E9',
    },
    langNative: {
      fontSize: 22,
      fontWeight: 'bold',
      color: isDarkMode ? '#FFFFFF' : '#111827',
      marginBottom: 4,
    },
    langName: {
      fontSize: 16,
      color: '#0EA5E9',
      fontWeight: '600',
    },
    langDetails: {
      fontSize: 13,
      color: isDarkMode ? '#D1D5DB' : '#6B7280',
      marginTop: 2,
    },
    arrow: {
      fontSize: 24,
      color: '#0EA5E9',
      fontWeight: 'bold',
    },
  });

export default LanguageSelectionScreen;
