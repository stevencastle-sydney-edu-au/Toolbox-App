import React, { useState, useMemo, useCallback } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  useColorScheme,
  Pressable,
  SafeAreaView,
  ActivityIndicator,
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
import { useQuery } from '@apollo/client';
import { GET_USER } from '@/graphql/operations/user';
import { GET_RECENT_ACTIVITIES } from '@/graphql/operations/activities';
import { GET_UPCOMING_ITEMS } from '@/graphql/operations/activities';
import Colors from '@/constants/Colors';
import ProgressSummary from '@/components/ProgressSummary';
import ToolboxCard from '@/components/ToolboxCard';
import ActivityItem from '@/components/ActivityItem';
import UpcomingCard from '@/components/UpcomingCard';

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState<'recent' | 'upcoming'>('recent');
  
  // Get current date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];
  
  // Get user data and stats
  const { data: userData, loading: userLoading } = useQuery(GET_USER);
  
  // Get recent activities for today
  const { data: activitiesData, loading: activitiesLoading, error: activitiesError } = useQuery(GET_RECENT_ACTIVITIES, {
    variables: { date: today },
  });
  
  // Get upcoming items
  const { data: upcomingData, loading: upcomingLoading } = useQuery(GET_UPCOMING_ITEMS);
  
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

  if (userLoading || activitiesLoading || upcomingLoading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={[styles.loadingText, { color: colors.text }]}>Loading...</Text>
      </View>
    );
  }

  if (activitiesError) {
    return (
      <View style={[styles.errorContainer, { backgroundColor: colors.background }]}>
        <Text style={[styles.errorText, { color: colors.error }]}>
          Error loading activities. Please try again.
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.header}>
          <Text style={[styles.greeting, { color: colors.text }]}>
            Hello, {userData?.me?.name || 'User'}
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
        
        <ProgressSummary stats={userData?.me?.stats || { daysActive: 0, entriesLogged: 0, goalsCompleted: 0, streak: 0 }} />
        
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
              {activitiesData?.recentActivities?.length > 0 ? (
                activitiesData.recentActivities.map((activity) => (
                  <ActivityItem 
                    key={activity.id}
                    title={activity.title}
                    time={activity.time}
                    type={activity.type.toLowerCase() as any}
                    description={activity.description}
                  />
                ))
              ) : (
                <Text style={[styles.emptyText, { color: colors.muted }]}>
                  No recent activities for today
                </Text>
              )}
            </View>
          ) : (
            <View style={styles.upcomingList}>
              {upcomingData?.upcomingItems?.length > 0 ? (
                upcomingData.upcomingItems.map((item) => (
                  <UpcomingCard
                    key={item.id}
                    title={item.title}
                    date={item.date}
                    time={item.time}
                    type={item.type.toLowerCase() as any}
                    onPress={handleUpcomingCardPress}
                  />
                ))
              ) : (
                <Text style={[styles.emptyText, { color: colors.muted }]}>
                  No upcoming items scheduled
                </Text>
              )}
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    marginTop: 12,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
    padding: 20,
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
    fontFamily: 'Inter-Bold',
  },
  date: {
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Inter-Regular',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    fontFamily: 'Inter-SemiBold',
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
    fontFamily: 'Inter-SemiBold',
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
    fontFamily: 'Inter-SemiBold',
  },
});