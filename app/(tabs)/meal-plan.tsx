import React, { useState, useCallback, useMemo } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  useColorScheme,
  SafeAreaView,
} from 'react-native';
import { CirclePlus as PlusCircle, ChevronLeft, ChevronRight, Clock, CreditCard as Edit2 } from 'lucide-react-native';
import { useQuery, useMutation } from '@apollo/client';
import { GET_MEAL_PLANS } from '@/graphql/operations/meal-plans';
import { CREATE_MEAL_PLAN } from '@/graphql/operations/meal-plans';
import Colors from '@/constants/Colors';
import CreatePlanModal from '@/components/CreatePlanModal';

export default function MealPlanScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [isCreatePlanModalVisible, setIsCreatePlanModalVisible] = useState(false);

  // Fetch meal plans
  const { data, loading, error } = useQuery(GET_MEAL_PLANS);

  // Create meal plan mutation
  const [createMealPlan] = useMutation(CREATE_MEAL_PLAN, {
    refetchQueries: [{ query: GET_MEAL_PLANS }],
  });

  const selectedDay = useMemo(() => 
    data?.mealPlans[selectedDayIndex] || null
  , [data?.mealPlans, selectedDayIndex]);
  
  const handlePreviousDay = useCallback(() => {
    if (selectedDayIndex > 0) {
      setSelectedDayIndex(prev => prev - 1);
    }
  }, [selectedDayIndex]);
  
  const handleNextDay = useCallback(() => {
    if (data?.mealPlans && selectedDayIndex < data.mealPlans.length - 1) {
      setSelectedDayIndex(prev => prev + 1);
    }
  }, [selectedDayIndex, data?.mealPlans?.length]);
  
  const handleCreatePlan = async (planData: { date: string; meals: any[] }) => {
    try {
      await createMealPlan({
        variables: {
          input: planData,
        },
      });
      setIsCreatePlanModalVisible(false);
    } catch (error) {
      console.error('Error creating meal plan:', error);
    }
  };
  
  const handleOpenModal = useCallback(() => {
    setIsCreatePlanModalVisible(true);
  }, []);
  
  const handleCloseModal = useCallback(() => {
    setIsCreatePlanModalVisible(false);
  }, []);

  // Generate week days
  const weekDays = useMemo(() => {
    const days = [];
    const today = new Date('2025-05-05');
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      days.push({
        dayName: date.toLocaleDateString('en-US', { weekday: 'short' }),
        dayNumber: date.getDate(),
        date: date.toISOString().split('T')[0],
      });
    }
    
    return days;
  }, []);

  if (loading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
        <Text style={[styles.loadingText, { color: colors.text }]}>Loading meal plans...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.errorContainer, { backgroundColor: colors.background }]}>
        <Text style={[styles.errorText, { color: colors.error }]}>
          Error loading meal plans. Please try again.
        </Text>
        <Pressable
          style={[styles.retryButton, { backgroundColor: colors.primary }]}
          onPress={() => window.location.reload()}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.calendarContainer, { backgroundColor: colors.cardBackground }]}>
        <View style={styles.monthSelector}>
          <Text style={[styles.monthTitle, { color: colors.text }]}>
            May 2025
          </Text>
          <View style={styles.monthControls}>
            <Pressable 
              style={[styles.monthButton, { backgroundColor: colors.background }]}
              onPress={handlePreviousDay}>
              <ChevronLeft size={20} color={colors.text} />
            </Pressable>
            <Pressable
              style={[styles.monthButton, { backgroundColor: colors.background }]}
              onPress={handleNextDay}>
              <ChevronRight size={20} color={colors.text} />
            </Pressable>
          </View>
        </View>
        
        <View style={styles.weekDaysContainer}>
          {weekDays.map((day, index) => (
            <Pressable
              key={day.date}
              style={[
                styles.weekDay,
                selectedDayIndex === index && [
                  styles.selectedWeekDay,
                  { backgroundColor: colors.primary }
                ]
              ]}
              onPress={() => setSelectedDayIndex(index)}>
              <Text
                style={[
                  styles.weekDayName,
                  { color: selectedDayIndex === index ? '#FFF' : colors.muted }
                ]}>
                {day.dayName}
              </Text>
              <Text
                style={[
                  styles.weekDayNumber,
                  { 
                    color: selectedDayIndex === index ? '#FFF' : colors.text,
                    fontWeight: selectedDayIndex === index ? '700' : '500',
                  }
                ]}>
                {day.dayNumber}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>
      
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>
          {selectedDay ? `${selectedDay.day}'s Meal Plan` : 'No Plan Created'}
        </Text>
        {selectedDay && (
          <Pressable
            style={[styles.editButton, { backgroundColor: colors.primary + '20' }]}>
            <Edit2 size={16} color={colors.primary} />
            <Text style={[styles.editButtonText, { color: colors.primary }]}>
              Edit Plan
            </Text>
          </Pressable>
        )}
      </View>
      
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        
        {selectedDay?.meals.map((meal) => (
          <View key={meal.id} style={styles.mealItem}>
            <View style={[styles.timelineConnector, { backgroundColor: colors.border }]} />
            <View 
              style={[
                styles.timelineDot, 
                { 
                  backgroundColor: colors.cardBackground, 
                  borderColor: colors.secondary 
                }
              ]} />
            
            <View style={styles.timeContainer}>
              <Text style={[styles.mealTime, { color: colors.muted }]}>
                {meal.time}
              </Text>
            </View>
            
            <View 
              style={[
                styles.mealContent, 
                { 
                  backgroundColor: colors.cardBackground, 
                  borderColor: colors.border 
                }
              ]}>
              <Text style={[styles.mealTitle, { color: colors.text }]}>
                {meal.title}
              </Text>
              <Text style={[styles.mealDescription, { color: colors.muted }]}>
                {meal.description}
              </Text>
              <View style={styles.mealControls}>
                <Pressable 
                  style={[styles.mealControl, { backgroundColor: colors.success + '20' }]}>
                  <Text style={[styles.mealControlText, { color: colors.success }]}>
                    Completed
                  </Text>
                </Pressable>
                <Pressable 
                  style={[styles.mealControl, { backgroundColor: colors.primary + '20' }]}>
                  <Text style={[styles.mealControlText, { color: colors.primary }]}>
                    View Recipe
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        ))}
        
        <Pressable 
          style={[styles.addMealButton, { borderColor: colors.border }]}
          onPress={handleOpenModal}>
          <PlusCircle size={20} color={colors.primary} />
          <Text style={[styles.addMealText, { color: colors.primary }]}>
            Add Meal
          </Text>
        </Pressable>
        
        <View style={styles.templateSection}>
          <Text style={[styles.templateTitle, { color: colors.text }]}>
            Meal Plan Templates
          </Text>
          
          <View 
            style={[
              styles.templateCard, 
              { backgroundColor: colors.cardBackground, borderColor: colors.border }
            ]}>
            <View style={[styles.templateColorStrip, { backgroundColor: colors.primary }]} />
            <View style={styles.templateContent}>
              <Text style={[styles.templateName, { color: colors.text }]}>
                Balanced Weekly Plan
              </Text>
              <Text style={[styles.templateDescription, { color: colors.muted }]}>
                A nutritionally balanced 7-day meal plan with regular meals and snacks.
              </Text>
              <Pressable 
                style={[styles.templateButton, { backgroundColor: colors.primary + '20' }]}>
                <Text style={[styles.templateButtonText, { color: colors.primary }]}>
                  Apply Template
                </Text>
              </Pressable>
            </View>
          </View>
          
          <View 
            style={[
              styles.templateCard, 
              { backgroundColor: colors.cardBackground, borderColor: colors.border }
            ]}>
            <View style={[styles.templateColorStrip, { backgroundColor: colors.secondary }]} />
            <View style={styles.templateContent}>
              <Text style={[styles.templateName, { color: colors.text }]}>
                Recovery Support Plan
              </Text>
              <Text style={[styles.templateDescription, { color: colors.muted }]}>
                Structured meal plan designed to support eating disorder recovery.
              </Text>
              <Pressable 
                style={[styles.templateButton, { backgroundColor: colors.secondary + '20' }]}>
                <Text style={[styles.templateButtonText, { color: colors.secondary }]}>
                  Apply Template
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
      
      <View style={[styles.addButtonContainer, { backgroundColor: colors.background }]}>
        <Pressable 
          style={[styles.addButton, { backgroundColor: colors.primary }]}
          onPress={handleOpenModal}>
          <PlusCircle size={20} color="#FFF" />
          <Text style={styles.addButtonText}>Create New Plan</Text>
        </Pressable>
      </View>

      <CreatePlanModal
        visible={isCreatePlanModalVisible}
        onClose={handleCloseModal}
        onSave={handleCreatePlan}
      />
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
    marginBottom: 16,
  },
  retryButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
  },
  retryButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  calendarContainer: {
    paddingVertical: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  monthSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  monthTitle: {
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
  },
  monthControls: {
    flexDirection: 'row',
  },
  monthButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  weekDaysContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  weekDay: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: 8,
  },
  selectedWeekDay: {
    borderRadius: 8,
  },
  weekDayName: {
    fontSize: 12,
    marginBottom: 4,
    fontFamily: 'Inter-Regular',
  },
  weekDayNumber: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 4,
    fontFamily: 'Inter-SemiBold',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  mealItem: {
    flexDirection: 'row',
    marginBottom: 16,
    position: 'relative',
    zIndex: 1,
  },
  timelineConnector: {
    position: 'absolute',
    left: 29,
    top: 0,
    bottom: 0,
    width: 2,
    zIndex: -1,
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    marginTop: 16,
    marginRight: 12,
  },
  timeContainer: {
    width: 60,
    marginRight: 12,
  },
  mealTime: {
    fontSize: 14,
    marginTop: 12,
    fontFamily: 'Inter-Regular',
  },
  mealContent: {
    flex: 1,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
  },
  mealTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    fontFamily: 'Inter-SemiBold',
  },
  mealDescription: {
    fontSize: 14,
    marginBottom: 12,
    fontFamily: 'Inter-Regular',
  },
  mealControls: {
    flexDirection: 'row',
  },
  mealControl: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
  },
  mealControlText: {
    fontSize: 12,
    fontWeight: '500',
    fontFamily: 'Inter-SemiBold',
  },
  addMealButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 12,
    marginBottom: 24,
  },
  addMealText: {
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
    fontFamily: 'Inter-SemiBold',
  },
  templateSection: {
    marginBottom: 24,
  },
  templateTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    fontFamily: 'Inter-SemiBold',
  },
  templateCard: {
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 16,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  templateColorStrip: {
    width: 8,
  },
  templateContent: {
    padding: 16,
    flex: 1,
  },
  templateName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    fontFamily: 'Inter-SemiBold',
  },
  templateDescription: {
    fontSize: 14,
    marginBottom: 12,
    fontFamily: 'Inter-Regular',
  },
  templateButton: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  templateButtonText: {
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Inter-SemiBold',
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
    fontFamily: 'Inter-SemiBold',
  },
});