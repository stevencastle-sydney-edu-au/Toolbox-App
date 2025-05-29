import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  useColorScheme,
  SafeAreaView,
} from 'react-native';
import { CirclePlus as PlusCircle, CircleCheck as CheckCircle2, Circle, ChevronRight, ArrowUpRight, Target } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { goals } from '@/utils/sampleData';
import AddGoalModal from '@/components/AddGoalModal';

export default function GoalsScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [activeTab, setActiveTab] = useState<'goals' | 'exposures' | 'check-ins'>('goals');
  const [isAddGoalModalVisible, setIsAddGoalModalVisible] = useState(false);
  
  const getTabColor = (tab: 'goals' | 'exposures' | 'check-ins') => {
    switch (tab) {
      case 'goals':
        return colors.success;
      case 'exposures':
        return colors.accent;
      case 'check-ins':
        return colors.warning;
    }
  };

  const handleAddGoal = (goalData: {
    title: string;
    description: string;
    category: string;
    targetDate: string;
    steps: { description: string }[];
  }) => {
    // Here you would typically save the goal data to your backend
    console.log('New goal data:', goalData);
    setIsAddGoalModalVisible(false);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.tabContainer}>
        <Pressable
          style={[
            styles.tab,
            activeTab === 'goals' && { backgroundColor: colors.success + '20' }
          ]}
          onPress={() => setActiveTab('goals')}>
          <Text 
            style={[
              styles.tabText,
              { color: activeTab === 'goals' ? colors.success : colors.muted }
            ]}>
            Goals
          </Text>
        </Pressable>
        
        <Pressable
          style={[
            styles.tab,
            activeTab === 'exposures' && { backgroundColor: colors.accent + '20' }
          ]}
          onPress={() => setActiveTab('exposures')}>
          <Text 
            style={[
              styles.tabText,
              { color: activeTab === 'exposures' ? colors.accent : colors.muted }
            ]}>
            Exposures
          </Text>
        </Pressable>
        
        <Pressable
          style={[
            styles.tab,
            activeTab === 'check-ins' && { backgroundColor: colors.warning + '20' }
          ]}
          onPress={() => setActiveTab('check-ins')}>
          <Text 
            style={[
              styles.tabText,
              { color: activeTab === 'check-ins' ? colors.warning : colors.muted }
            ]}>
            Check-ins
          </Text>
        </Pressable>
      </View>
      
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        
        <View style={styles.headerSection}>
          <Text style={[styles.headerTitle, { color: colors.text }]}>
            {activeTab === 'goals' ? 'Your Goals' : 
             activeTab === 'exposures' ? 'Exposure Exercises' : 'Daily Check-ins'}
          </Text>
          <Text style={[styles.headerSubtitle, { color: colors.muted }]}>
            {activeTab === 'goals' ? 'Track your progress towards recovery goals' : 
             activeTab === 'exposures' ? 'Practice facing challenging situations' : 
             'Monitor behaviors and symptoms'}
          </Text>
        </View>
        
        {activeTab === 'goals' && (
          <>
            <View style={styles.goalsSection}>
              <View style={styles.sectionHeader}>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>
                  In Progress
                </Text>
                <Text style={[styles.sectionCount, { color: colors.muted }]}>
                  {goals.filter(g => g.status === 'In Progress').length}
                </Text>
              </View>
              
              {goals.filter(goal => goal.status === 'In Progress').map((goal) => (
                <Pressable
                  key={goal.id}
                  style={[
                    styles.goalCard, 
                    { backgroundColor: colors.cardBackground, borderColor: colors.border }
                  ]}>
                  <View style={styles.goalHeader}>
                    <View 
                      style={[
                        styles.categoryTag, 
                        { backgroundColor: colors.success + '20' }
                      ]}>
                      <Text style={[styles.categoryText, { color: colors.success }]}>
                        {goal.category}
                      </Text>
                    </View>
                    <View style={styles.dateContainer}>
                      <Text style={[styles.dateText, { color: colors.muted }]}>
                        {goal.targetDate}
                      </Text>
                    </View>
                  </View>
                  
                  <Text style={[styles.goalTitle, { color: colors.text }]}>
                    {goal.title}
                  </Text>
                  <Text style={[styles.goalDescription, { color: colors.muted }]}>
                    {goal.description}
                  </Text>
                  
                  <View style={styles.progressContainer}>
                    <View style={[styles.progressBar, { backgroundColor: colors.border }]}>
                      <View 
                        style={[
                          styles.progressFill, 
                          { 
                            backgroundColor: colors.success,
                            width: `${(goal.steps.filter(step => step.completed).length / goal.steps.length) * 100}%` 
                          }
                        ]} 
                      />
                    </View>
                    <Text style={[styles.progressText, { color: colors.muted }]}>
                      {goal.steps.filter(step => step.completed).length}/{goal.steps.length} steps completed
                    </Text>
                  </View>
                  
                  <View style={styles.stepsContainer}>
                    {goal.steps.map((step) => (
                      <View key={step.id} style={styles.stepItem}>
                        {step.completed ? (
                          <CheckCircle2 size={18} color={colors.success} />
                        ) : (
                          <Circle size={18} color={colors.muted} />
                        )}
                        <Text 
                          style={[
                            styles.stepText, 
                            { 
                              color: step.completed ? colors.success : colors.text,
                              textDecorationLine: step.completed ? 'line-through' : 'none',
                            }
                          ]}>
                          {step.description}
                        </Text>
                      </View>
                    ))}
                  </View>
                </Pressable>
              ))}
            </View>
            
            <View style={styles.goalsSection}>
              <View style={styles.sectionHeader}>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>
                  Not Started
                </Text>
                <Text style={[styles.sectionCount, { color: colors.muted }]}>
                  {goals.filter(g => g.status === 'Not Started').length}
                </Text>
              </View>
              
              {goals.filter(goal => goal.status === 'Not Started').map((goal) => (
                <Pressable
                  key={goal.id}
                  style={[
                    styles.goalCard, 
                    { backgroundColor: colors.cardBackground, borderColor: colors.border }
                  ]}>
                  <View style={styles.goalHeader}>
                    <View 
                      style={[
                        styles.categoryTag, 
                        { backgroundColor: colors.primary + '20' }
                      ]}>
                      <Text style={[styles.categoryText, { color: colors.primary }]}>
                        {goal.category}
                      </Text>
                    </View>
                    <View style={styles.dateContainer}>
                      <Text style={[styles.dateText, { color: colors.muted }]}>
                        {goal.targetDate}
                      </Text>
                    </View>
                  </View>
                  
                  <Text style={[styles.goalTitle, { color: colors.text }]}>
                    {goal.title}
                  </Text>
                  <Text style={[styles.goalDescription, { color: colors.muted }]}>
                    {goal.description}
                  </Text>
                  
                  <View style={styles.progressContainer}>
                    <View style={[styles.progressBar, { backgroundColor: colors.border }]}>
                      <View 
                        style={[
                          styles.progressFill, 
                          { 
                            backgroundColor: colors.success,
                            width: `${(goal.steps.filter(step => step.completed).length / goal.steps.length) * 100}%` 
                          }
                        ]} 
                      />
                    </View>
                    <Text style={[styles.progressText, { color: colors.muted }]}>
                      {goal.steps.filter(step => step.completed).length}/{goal.steps.length} steps completed
                    </Text>
                  </View>
                  
                  <Pressable style={[styles.startButton, { backgroundColor: colors.primary + '20' }]}>
                    <Text style={[styles.startButtonText, { color: colors.primary }]}>
                      Start Goal
                    </Text>
                    <ArrowUpRight size={16} color={colors.primary} />
                  </Pressable>
                </Pressable>
              ))}
            </View>
          </>
        )}
        
        {activeTab === 'exposures' && (
          <View style={styles.exposuresSection}>
            <View 
              style={[
                styles.exposureCard, 
                { backgroundColor: colors.cardBackground, borderColor: colors.border }
              ]}>
              <View style={styles.exposureHeader}>
                <Target size={24} color={colors.accent} />
                <Text style={[styles.exposureTitle, { color: colors.text }]}>
                  Food Exposure Exercise
                </Text>
              </View>
              <Text style={[styles.exposureDescription, { color: colors.muted }]}>
                Practice eating foods that trigger anxiety in a controlled, supportive environment.
              </Text>
              <Pressable 
                style={[styles.exposureButton, { backgroundColor: colors.accent + '20' }]}>
                <Text style={[styles.exposureButtonText, { color: colors.accent }]}>
                  Start Exercise
                </Text>
                <ChevronRight size={16} color={colors.accent} />
              </Pressable>
            </View>
            
            <View 
              style={[
                styles.exposureCard, 
                { backgroundColor: colors.cardBackground, borderColor: colors.border }
              ]}>
              <View style={styles.exposureHeader}>
                <Target size={24} color={colors.accent} />
                <Text style={[styles.exposureTitle, { color: colors.text }]}>
                  Social Eating Practice
                </Text>
              </View>
              <Text style={[styles.exposureDescription, { color: colors.muted }]}>
                Gradually build comfort with eating in social settings or restaurants.
              </Text>
              <Pressable 
                style={[styles.exposureButton, { backgroundColor: colors.accent + '20' }]}>
                <Text style={[styles.exposureButtonText, { color: colors.accent }]}>
                  Start Exercise
                </Text>
                <ChevronRight size={16} color={colors.accent} />
              </Pressable>
            </View>
            
            <View 
              style={[
                styles.exposureCard, 
                { backgroundColor: colors.cardBackground, borderColor: colors.border }
              ]}>
              <View style={styles.exposureHeader}>
                <Target size={24} color={colors.accent} />
                <Text style={[styles.exposureTitle, { color: colors.text }]}>
                  Body Image Exposure
                </Text>
              </View>
              <Text style={[styles.exposureDescription, { color: colors.muted }]}>
                Reduce body checking behaviors and practice body acceptance exercises.
              </Text>
              <Pressable 
                style={[styles.exposureButton, { backgroundColor: colors.accent + '20' }]}>
                <Text style={[styles.exposureButtonText, { color: colors.accent }]}>
                  Start Exercise
                </Text>
                <ChevronRight size={16} color={colors.accent} />
              </Pressable>
            </View>
          </View>
        )}
        
        {activeTab === 'check-ins' && (
          <View style={styles.checkInsSection}>
            <Text style={[styles.checkInsDescription, { color: colors.muted }]}>
              Track behaviors and symptoms to monitor your progress. Daily check-ins help identify patterns and triggers.
            </Text>
            
            <View 
              style={[
                styles.checkInCard, 
                { backgroundColor: colors.cardBackground, borderColor: colors.border }
              ]}>
              <Text style={[styles.checkInTitle, { color: colors.text }]}>
                Daily Symptom Check
              </Text>
              <Text style={[styles.checkInDescription, { color: colors.muted }]}>
                Track physical and emotional symptoms related to eating behaviors.
              </Text>
              <Pressable 
                style={[styles.checkInButton, { backgroundColor: colors.warning + '20' }]}>
                <Text style={[styles.checkInButtonText, { color: colors.warning }]}>
                  Complete Check-in
                </Text>
              </Pressable>
            </View>
            
            <View 
              style={[
                styles.checkInCard, 
                { backgroundColor: colors.cardBackground, borderColor: colors.border }
              ]}>
              <Text style={[styles.checkInTitle, { color: colors.text }]}>
                Behavior Monitoring
              </Text>
              <Text style={[styles.checkInDescription, { color: colors.muted }]}>
                Track eating behaviors, including restriction, bingeing, and compensatory behaviors.
              </Text>
              <Pressable 
                style={[styles.checkInButton, { backgroundColor: colors.warning + '20' }]}>
                <Text style={[styles.checkInButtonText, { color: colors.warning }]}>
                  Complete Check-in
                </Text>
              </Pressable>
            </View>
            
            <View 
              style={[
                styles.checkInCard, 
                { backgroundColor: colors.cardBackground, borderColor: colors.border }
              ]}>
              <Text style={[styles.checkInTitle, { color: colors.text }]}>
                Mindfulness Practice
              </Text>
              <Text style={[styles.checkInDescription, { color: colors.muted }]}>
                Record mindfulness and self-compassion exercises completed.
              </Text>
              <Pressable 
                style={[styles.checkInButton, { backgroundColor: colors.warning + '20' }]}>
                <Text style={[styles.checkInButtonText, { color: colors.warning }]}>
                  Complete Check-in
                </Text>
              </Pressable>
            </View>
          </View>
        )}
      </ScrollView>
      
      <View style={[styles.addButtonContainer, { backgroundColor: colors.background }]}>
        <Pressable 
          style={[
            styles.addButton, 
            { backgroundColor: getTabColor(activeTab) }
          ]}
          onPress={() => setIsAddGoalModalVisible(true)}>
          <PlusCircle size={20} color="#FFF" />
          <Text style={styles.addButtonText}>
            {activeTab === 'goals' ? 'Add New Goal' : 
             activeTab === 'exposures' ? 'Create Exposure' : 'New Check-in'}
          </Text>
        </Pressable>
      </View>

      <AddGoalModal
        visible={isAddGoalModalVisible}
        onClose={() => setIsAddGoalModalVisible(false)}
        onSave={handleAddGoal}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 20,
    marginHorizontal: 4,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  headerSection: {
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
  },
  goalsSection: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  sectionCount: {
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
  },
  goalCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
  },
  goalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '500',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 12,
  },
  goalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  goalDescription: {
    fontSize: 14,
    marginBottom: 16,
  },
  progressContainer: {
    marginBottom: 16,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    marginBottom: 8,
  },
  progressFill: {
    height: 8,
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
  },
  stepsContainer: {
    marginBottom: 8,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  stepText: {
    fontSize: 14,
    marginLeft: 8,
  },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 20,
  },
  startButtonText: {
    fontSize: 14,
    fontWeight: '600',
    marginRight: 4,
  },
  exposuresSection: {
    marginBottom: 24,
  },
  exposureCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
  },
  exposureHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  exposureTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 12,
  },
  exposureDescription: {
    fontSize: 14,
    marginBottom: 16,
  },
  exposureButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 20,
  },
  exposureButtonText: {
    fontSize: 14,
    fontWeight: '600',
    marginRight: 4,
  },
  checkInsSection: {
    marginBottom: 24,
  },
  checkInsDescription: {
    fontSize: 14,
    marginBottom: 16,
  },
  checkInCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
  },
  checkInTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  checkInDescription: {
    fontSize: 14,
    marginBottom: 16,
  },
  checkInButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 20,
  },
  checkInButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  addButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    borderRadius: 24,
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});