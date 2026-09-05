/**
 * Learner Profile Screen
 * Displays achievements, streak records, mastered vocabulary count
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  useColorScheme,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

interface ProfileProps extends NativeStackScreenProps<RootStackParamList, 'Profile'> {}

const achievements = [
  { id: '1', title: '7-Day Streak', icon: '🔥', description: 'Learned continuously for 7 days' },
  { id: '2', title: 'Ol Chiki Novice', icon: '🔤', description: 'Completed first 5 alphabet lessons' },
  { id: '3', title: 'Perfect Quiz', icon: '🎯', description: 'Scored 100% on any assessment' },
];

const ProfileScreen: React.FC<ProfileProps> = () => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const styles = getStyles(isDarkMode);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>👤</Text>
        </View>
        <Text style={styles.userName}>Tribal Learner</Text>
        <Text style={styles.userSub}>Santhali (Ol Chiki) • Level A1</Text>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>14</Text>
          <Text style={styles.statLabel}>Lessons Done</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>7</Text>
          <Text style={styles.statLabel}>Day Streak</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>480</Text>
          <Text style={styles.statLabel}>XP Points</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Badges & Achievements</Text>
        <View style={styles.achievementsList}>
          {achievements.map((item) => (
            <View key={item.id} style={styles.achievementCard}>
              <Text style={styles.badgeIcon}>{item.icon}</Text>
              <View style={styles.achievementInfo}>
                <Text style={styles.achievementTitle}>{item.title}</Text>
                <Text style={styles.achievementDesc}>{item.description}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const getStyles = (isDarkMode: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF',
      padding: 16,
    },
    header: {
      alignItems: 'center',
      marginVertical: 20,
    },
    avatarContainer: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: '#0EA5E9',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 12,
    },
    avatarText: {
      fontSize: 40,
    },
    userName: {
      fontSize: 22,
      fontWeight: 'bold',
      color: isDarkMode ? '#FFFFFF' : '#111827',
    },
    userSub: {
      fontSize: 14,
      color: '#0EA5E9',
      marginTop: 4,
      fontWeight: '500',
    },
    statsRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: 20,
      gap: 12,
    },
    statBox: {
      flex: 1,
      padding: 16,
      borderRadius: 12,
      backgroundColor: isDarkMode ? '#374151' : '#F3F4F6',
      alignItems: 'center',
    },
    statNumber: {
      fontSize: 22,
      fontWeight: 'bold',
      color: '#0EA5E9',
    },
    statLabel: {
      fontSize: 12,
      color: isDarkMode ? '#9CA3AF' : '#6B7280',
      marginTop: 4,
    },
    section: {
      marginTop: 12,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '700',
      color: isDarkMode ? '#FFFFFF' : '#111827',
      marginBottom: 12,
    },
    achievementsList: {
      gap: 12,
    },
    achievementCard: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
      backgroundColor: isDarkMode ? '#374151' : '#F9FAFB',
      borderRadius: 8,
      borderLeftWidth: 4,
      borderLeftColor: '#F59E0B',
      gap: 12,
    },
    badgeIcon: {
      fontSize: 28,
    },
    achievementInfo: {
      flex: 1,
    },
    achievementTitle: {
      fontSize: 15,
      fontWeight: '600',
      color: isDarkMode ? '#FFFFFF' : '#111827',
    },
    achievementDesc: {
      fontSize: 13,
      color: isDarkMode ? '#9CA3AF' : '#6B7280',
      marginTop: 2,
    },
  });

export default ProfileScreen;
