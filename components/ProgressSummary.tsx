import React from 'react';
import { View, Text, StyleSheet, useColorScheme } from 'react-native';
import Colors from '@/constants/Colors';

type ProgressSummaryProps = {
  stats: {
    daysActive: number;
    entriesLogged: number;
    goalsCompleted: number;
    streak: number;
  };
};

export default function ProgressSummary({ stats }: ProgressSummaryProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <View style={[styles.container, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}>
      <Text style={[styles.title, { color: colors.text }]}>Your Progress</Text>
      
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: colors.primary }]}>{stats.daysActive}</Text>
          <Text style={[styles.statLabel, { color: colors.muted }]}>Days Active</Text>
        </View>
        
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: colors.primary }]}>{stats.entriesLogged}</Text>
          <Text style={[styles.statLabel, { color: colors.muted }]}>Entries</Text>
        </View>
        
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: colors.success }]}>{stats.goalsCompleted}</Text>
          <Text style={[styles.statLabel, { color: colors.muted }]}>Goals Met</Text>
        </View>
        
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: colors.accent }]}>{stats.streak}</Text>
          <Text style={[styles.statLabel, { color: colors.muted }]}>Day Streak</Text>
        </View>
      </View>
      
      <View style={[styles.streakContainer, { backgroundColor: colors.accent + '20' }]}>
        <Text style={[styles.streakText, { color: colors.accent }]}>
          {stats.streak > 1 
            ? `${stats.streak} day streak! Keep it up!` 
            : 'Start your streak by logging entries daily!'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  streakContainer: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  streakText: {
    fontSize: 14,
    fontWeight: '600',
  },
});