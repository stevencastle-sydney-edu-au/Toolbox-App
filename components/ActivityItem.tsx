import React from 'react';
import { View, Text, StyleSheet, useColorScheme } from 'react-native';
import Colors from '@/constants/Colors';

type ActivityItemProps = {
  title: string;
  time: string;
  type: 'food' | 'thought' | 'goal' | 'meal-plan' | 'check';
  description?: string;
};

export default function ActivityItem({ title, time, type, description }: ActivityItemProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  const getTypeColor = () => {
    switch (type) {
      case 'food':
        return colors.accent;
      case 'thought':
        return colors.primary;
      case 'goal':
        return colors.success;
      case 'meal-plan':
        return colors.secondary;
      case 'check':
        return colors.warning;
      default:
        return colors.muted;
    }
  };
  
  const getTypeLabel = () => {
    switch (type) {
      case 'food':
        return 'Food Log';
      case 'thought':
        return 'Thought';
      case 'goal':
        return 'Goal';
      case 'meal-plan':
        return 'Meal Plan';
      case 'check':
        return 'Check-in';
      default:
        return 'Activity';
    }
  };

  return (
    <View style={[styles.container, { borderColor: colors.border }]}>
      <View style={styles.timeContainer}>
        <Text style={[styles.time, { color: colors.muted }]}>{time}</Text>
      </View>
      <View style={[styles.dot, { backgroundColor: getTypeColor() }]} />
      <View style={styles.contentContainer}>
        <View style={[styles.typeTag, { backgroundColor: getTypeColor() + '20' }]}>
          <Text style={[styles.typeText, { color: getTypeColor() }]}>
            {getTypeLabel()}
          </Text>
        </View>
        <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
        {description && (
          <Text style={[styles.description, { color: colors.muted }]} numberOfLines={2}>
            {description}
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  timeContainer: {
    width: 60,
    paddingRight: 8,
  },
  time: {
    fontSize: 12,
    fontWeight: '500',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginTop: 5,
    marginRight: 12,
  },
  contentContainer: {
    flex: 1,
  },
  typeTag: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginBottom: 4,
  },
  typeText: {
    fontSize: 10,
    fontWeight: '600',
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
  },
});