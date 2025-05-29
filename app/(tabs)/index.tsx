import React, { useState, useMemo, useCallback } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  useColorScheme,
  Pressable,
  SafeAreaView,
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
import ProgressSummary from '@/components/ProgressSummary';
import ToolboxCard from '@/components/ToolboxCard';
import ActivityItem from '@/components/ActivityItem';
import UpcomingCard from '@/components/UpcomingCard';
import { recentActivities, upcomingItems, progressStats } from '@/utils/sampleData';

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState<'recent' | 'upcoming'>('recent');
  
  // Memoize filtered activities
  const todayActivities = useMemo(() => {
    return recentActivities.filter(
      activity => activity.date === '2025-05-02'
    );
  }, []);

  // Memoize tab selection handler
  const handleTabSelect = useCallback((tab: 'recent' | 'upcoming') => {
    setSelectedTab(tab);
  }, []);

  // Memoize navigation handlers
  const handleToolPress = useCallback((route: string) => {
    router.push(route);
  }, [router]);

  // Memoize card press handler
  const handleUpcomingCardPress = useCallback(() => {
    // Handle card press
  }, []);

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
            Friday, May 2, 2025
          </Text>
        </View>
        
        <ProgressSummary stats={progressStats} />
        
        <View style={styles.toolboxSection}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Quick Tools
          </Text>
          
          <View style={styles.toolsGrid}>
            <Pressable 
              style={[styles.toolItem, { backgroundColor: colors.accent }]} 
              onPress={() => handleToolPress('/food-log')}>
              <Utensils color="#FFF" size={24} />
              <Text style={styles.toolText}>Log Food</Text>
            </Pressable>
            
            <Pressable 
              style={[styles.toolItem, { backgroundColor: colors.primary }]} 
              onPress={() => handleToolPress('/thoughts')}>
              <Brain color="#FFF" size={24} />
              <Text style={styles.toolText}>Thought Log</Text>
            </Pressable>
            
            <Pressable 
              style={[styles.toolItem, { backgroundColor: colors.secondary }]} 
              onPress={() => handleToolPress('/meal-plan')}>
              <Calendar color="#FFF" size={24} />
              <Text style={styles.toolText}>Meal Plan</Text>
            </Pressable>
            
            <Pressable 
              style={[styles.toolItem, { backgroundColor: colors.success }]} 
              onPress={() => handleToolPress('/goals')}>
              <Target color="#FFF" size={24} />
              <Text style={styles.toolText}>Goals</Text>
            </Pressable>
          </View>
        </View>
        
        <View style={styles.activitySection}>
          <View style={styles.tabContainer}>
            <Pressable
              style={[
                styles.tab,
                selectedTab === 'recent' && [styles.activeTab, { borderColor: colors.primary }]
              ]}
              onPress={() => handleTabSelect('recent')}>
              <Text 
                style={[
                  styles.tabText, 
                  { color: selectedTab === 'recent' ? colors.primary : colors.muted }
                ]}>
                Recent Activity
              </Text>
            </Pressable>
            
            <Pressable
              style={[
                styles.tab,
                selectedTab === 'upcoming' && [styles.activeTab, { borderColor: colors.primary }]
              ]}
              onPress={() => handleTabSelect('upcoming')}>
              <Text 
                style={[
                  styles.tabText, 
                  { color: selectedTab === 'upcoming' ? colors.primary : colors.muted }
                ]}>
                Upcoming
              </Text>
            </Pressable>
          </View>
          
          {selectedTab === 'recent' ? (
            <View style={styles.activityList}>
              {todayActivities.map((activity) => (
                <ActivityItem 
                  key={activity.id}
                  title={activity.title}
                  time={activity.time}
                  type={activity.type as any}
                  description={activity.description}
                />
              ))}
            </View>
          ) : (
            <View style={styles.upcomingList}>
              {upcomingItems.map((item) => (
                <UpcomingCard
                  key={item.id}
                  title={item.title}
                  date={item.date}
                  time={item.time}
                  type={item.type}
                  onPress={handleUpcomingCardPress}
                />
              ))}
            </View>
          )}
        </View>
        
        <View style={styles.toolboxSection}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            All Tools
          </Text>
          
          <ToolboxCard
            title="Food Journal"
            description="Track your meals and eating patterns"
            icon={<Utensils color="#FFF" size={24} />}
            route="/food-log"
            color={colors.accent}
          />
          
          <ToolboxCard
            title="Thought Log"
            description="Record and restructure negative thoughts"
            icon={<Brain color="#FFF" size={24} />}
            route="/thoughts"
            color={colors.primary}
          />
          
          <ToolboxCard
            title="Meal Planning"
            description="Plan balanced meals for the week"
            icon={<Calendar color="#FFF" size={24} />}
            route="/meal-plan"
            color={colors.secondary}
          />
          
          <ToolboxCard
            title="Goals & Exposures"
            description="Set and track recovery goals"
            icon={<Target color="#FFF" size={24} />}
            route="/goals"
            color={colors.success}
          />
          
          <ToolboxCard
            title="Check-in Activities"
            description="Track behaviors and coping strategies"
            icon={<Clipboard color="#FFF" size={24} />}
            route="/goals"
            color={colors.warning}
          />
          
          <ToolboxCard
            title="Self-Care Activities"
            description="Practice compassion and mindfulness"
            icon={<Smile color="#FFF" size={24} />}
            route="/goals"
            color="#9C27B0"
          />
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  toolboxSection: {
    marginBottom: 24,
  },
  activitySection: {
    marginBottom: 24,
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomWidth: 2,
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
  },
  activityList: {
    marginBottom: 8,
  },
  upcomingList: {
    marginBottom: 8,
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
});