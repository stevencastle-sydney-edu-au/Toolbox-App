import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  useColorScheme,
  Pressable,
  SafeAreaView,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { 
  Utensils, 
  Brain, 
  Calendar, 
  Target, 
  Clipboard,
  Smile,
} from 'lucide-react-native';
import Colors from '@/constants/Colors';

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const router = useRouter();

  const stats = {
    daysActive: 14,
    entriesLogged: 78,
    goalsCompleted: 8,
    streak: 5,
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.header}>
          <Text style={[styles.greeting, { color: colors.text }]}>
            Hello, Sarah
          </Text>
          <Text style={[styles.date, { color: colors.muted }]}>
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long',
              month: 'long',
              day: 'numeric',
              year: 'numeric'
            })}
          </Text>
        </View>

        <View style={[styles.statsContainer, { backgroundColor: colors.cardBackground }]}>
          <Text style={[styles.statsTitle, { color: colors.text }]}>Your Progress</Text>
          <View style={styles.statsGrid}>
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
        </View>
        
        <View style={styles.toolboxSection}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Quick Tools</Text>
          <View style={styles.toolsGrid}>
            <Pressable 
              style={[styles.toolItem, { backgroundColor: colors.accent }]} 
              onPress={() => router.push('/food-log')}>
              <Utensils color="#FFF" size={24} />
              <Text style={styles.toolText}>Log Food</Text>
            </Pressable>
            <Pressable 
              style={[styles.toolItem, { backgroundColor: colors.primary }]} 
              onPress={() => router.push('/thoughts')}>
              <Brain color="#FFF" size={24} />
              <Text style={styles.toolText}>Thought Log</Text>
            </Pressable>
            <Pressable 
              style={[styles.toolItem, { backgroundColor: colors.secondary }]} 
              onPress={() => router.push('/meal-plan')}>
              <Calendar color="#FFF" size={24} />
              <Text style={styles.toolText}>Meal Plan</Text>
            </Pressable>
            <Pressable 
              style={[styles.toolItem, { backgroundColor: colors.success }]} 
              onPress={() => router.push('/goals')}>
              <Target color="#FFF" size={24} />
              <Text style={styles.toolText}>Goals</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.toolboxSection}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>All Tools</Text>
          {[
            {
              title: "Food Journal",
              description: "Track your meals and eating patterns",
              icon: <Utensils color="#FFF" size={24} />,
              route: "/food-log",
              color: colors.accent
            },
            {
              title: "Thought Log",
              description: "Record and restructure negative thoughts",
              icon: <Brain color="#FFF" size={24} />,
              route: "/thoughts",
              color: colors.primary
            },
            {
              title: "Meal Planning",
              description: "Plan balanced meals for the week",
              icon: <Calendar color="#FFF" size={24} />,
              route: "/meal-plan",
              color: colors.secondary
            },
            {
              title: "Goals & Exposures",
              description: "Set and track recovery goals",
              icon: <Target color="#FFF" size={24} />,
              route: "/goals",
              color: colors.success
            },
            {
              title: "Check-in Activities",
              description: "Track behaviors and coping strategies",
              icon: <Clipboard color="#FFF" size={24} />,
              route: "/goals",
              color: colors.warning
            },
            {
              title: "Self-Care Activities",
              description: "Practice compassion and mindfulness",
              icon: <Smile color="#FFF" size={24} />,
              route: "/goals",
              color: "#9C27B0"
            }
          ].map((tool, index) => (
            <Pressable
              key={index}
              style={[styles.toolCard, { backgroundColor: colors.cardBackground }]}
              onPress={() => router.push(tool.route)}
            >
              <View style={[styles.toolIcon, { backgroundColor: tool.color }]}>
                {tool.icon}
              </View>
              <View style={styles.toolContent}>
                <Text style={[styles.toolTitle, { color: colors.text }]}>{tool.title}</Text>
                <Text style={[styles.toolDescription, { color: colors.muted }]}>
                  {tool.description}
                </Text>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  header: {
    marginTop: 8,
    marginBottom: 16,
  },
  greeting: {
    fontSize: 24,
    fontWeight: '700',
  },
  date: {
    fontSize: 16,
    fontWeight: '500',
  },
  statsContainer: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  toolboxSection: {
    marginBottom: 24,
  },
  toolsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8,
    marginBottom: 16,
  },
  toolItem: {
    width: '46%',
    height: 100,
    margin: '2%',
    borderRadius: 12,
    padding: 16,
    justifyContent: 'space-between',
  },
  toolText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 14,
  },
  toolCard: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  toolIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  toolContent: {
    flex: 1,
    justifyContent: 'center',
  },
  toolTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  toolDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
});