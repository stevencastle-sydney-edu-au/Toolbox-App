import React from 'react';
import { View, Text, StyleSheet, Pressable, useColorScheme } from 'react-native';
import { Calendar, Clock } from 'lucide-react-native';
import Colors from '@/constants/Colors';

type UpcomingCardProps = {
  title: string;
  date: string;
  time: string;
  type: 'meal' | 'goal' | 'check';
  onPress: () => void;
};

export default function UpcomingCard({ title, date, time, type, onPress }: UpcomingCardProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  const getTypeColor = () => {
    switch (type) {
      case 'meal':
        return colors.secondary;
      case 'goal':
        return colors.success;
      case 'check':
        return colors.warning;
      default:
        return colors.primary;
    }
  };

  return (
    <Pressable
      style={({ pressed }) => [
        styles.container, 
        { 
          backgroundColor: colors.cardBackground,
          borderColor: getTypeColor() + '40',
          borderLeftColor: getTypeColor(),
        },
        pressed && styles.pressed,
      ]}
      onPress={onPress}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
        
        <View style={styles.detailsContainer}>
          <View style={styles.detailItem}>
            <Calendar size={14} color={colors.muted} />
            <Text style={[styles.detailText, { color: colors.muted }]}>{date}</Text>
          </View>
          
          <View style={styles.detailItem}>
            <Clock size={14} color={colors.muted} />
            <Text style={[styles.detailText, { color: colors.muted }]}>{time}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  detailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  detailText: {
    fontSize: 12,
    marginLeft: 4,
  },
  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
});