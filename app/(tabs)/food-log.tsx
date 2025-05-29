import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  Pressable, 
  TextInput,
  useColorScheme,
  SafeAreaView,
  Image,
} from 'react-native';
import { CirclePlus as PlusCircle, ChevronDown, Camera, Clock, MoveVertical as MoreVertical } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { recentActivities } from '@/utils/sampleData';

// Filter only food entries from the sample data
const foodEntries = recentActivities.filter(
  activity => activity.type === 'food'
);

export default function FoodLogScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [activeDate, setActiveDate] = useState('2025-05-02');
  
  // Group entries by date
  const entriesByDate = foodEntries.reduce((acc, entry) => {
    if (!acc[entry.date]) {
      acc[entry.date] = [];
    }
    acc[entry.date].push(entry);
    return acc;
  }, {} as Record<string, typeof foodEntries>);
  
  // Format date for display
  const formatDisplayDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Pressable 
          style={[styles.dateSelector, { backgroundColor: colors.cardBackground }]}>
          <Text style={[styles.dateText, { color: colors.text }]}>
            {formatDisplayDate(activeDate)}
          </Text>
          <ChevronDown size={20} color={colors.muted} />
        </Pressable>
      </View>
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        
        <View style={styles.mealTypes}>
          <View style={[styles.mealTypeHeader, { borderBottomColor: colors.border }]}>
            <Text style={[styles.mealTypeTitle, { color: colors.text }]}>Breakfast</Text>
            <Text style={[styles.mealTypeTime, { color: colors.muted }]}>8:30 AM</Text>
          </View>
          
          <View style={[styles.foodEntry, { backgroundColor: colors.cardBackground }]}>
            <View style={styles.foodEntryContent}>
              <Text style={[styles.foodName, { color: colors.text }]}>
                Oatmeal with berries
              </Text>
              <Text style={[styles.foodDescription, { color: colors.muted }]}>
                1 cup oatmeal, 1/4 cup mixed berries, 1 tbsp honey
              </Text>
              <View style={styles.foodTags}>
                <View style={[styles.foodTag, { backgroundColor: colors.primary + '20' }]}>
                  <Text style={[styles.foodTagText, { color: colors.primary }]}>Balanced</Text>
                </View>
                <View style={[styles.foodTag, { backgroundColor: colors.success + '20' }]}>
                  <Text style={[styles.foodTagText, { color: colors.success }]}>Planned</Text>
                </View>
              </View>
            </View>
            <Pressable style={styles.moreButton}>
              <MoreVertical size={20} color={colors.muted} />
            </Pressable>
          </View>
          
          <View style={[styles.foodEntry, { backgroundColor: colors.cardBackground }]}>
            <View style={styles.foodEntryContent}>
              <Text style={[styles.foodName, { color: colors.text }]}>
                Green tea
              </Text>
              <Text style={[styles.foodDescription, { color: colors.muted }]}>
                1 cup, unsweetened
              </Text>
            </View>
            <Pressable style={styles.moreButton}>
              <MoreVertical size={20} color={colors.muted} />
            </Pressable>
          </View>
          
          <Pressable 
            style={[styles.addFoodButton, { borderColor: colors.border }]}>
            <PlusCircle size={16} color={colors.primary} />
            <Text style={[styles.addFoodText, { color: colors.primary }]}>
              Add Food
            </Text>
          </Pressable>
        </View>
        
        <View style={styles.mealTypes}>
          <View style={[styles.mealTypeHeader, { borderBottomColor: colors.border }]}>
            <Text style={[styles.mealTypeTitle, { color: colors.text }]}>Lunch</Text>
            <Text style={[styles.mealTypeTime, { color: colors.muted }]}>12:30 PM</Text>
          </View>
          
          <View style={[styles.foodEntry, { backgroundColor: colors.cardBackground }]}>
            <View style={styles.foodEntryContent}>
              <Text style={[styles.foodName, { color: colors.text }]}>
                Chicken salad
              </Text>
              <Text style={[styles.foodDescription, { color: colors.muted }]}>
                Grilled chicken breast, mixed greens, cherry tomatoes, olive oil dressing
              </Text>
              <View style={styles.foodTags}>
                <View style={[styles.foodTag, { backgroundColor: colors.primary + '20' }]}>
                  <Text style={[styles.foodTagText, { color: colors.primary }]}>Balanced</Text>
                </View>
                <View style={[styles.foodTag, { backgroundColor: colors.secondary + '20' }]}>
                  <Text style={[styles.foodTagText, { color: colors.secondary }]}>Protein</Text>
                </View>
              </View>
            </View>
            <View style={styles.foodImageContainer}>
              <Image 
                source={{ uri: 'https://images.pexels.com/photos/1143754/pexels-photo-1143754.jpeg?auto=compress&cs=tinysrgb&w=400' }}
                style={styles.foodImage}
              />
            </View>
          </View>
          
          <Pressable 
            style={[styles.addFoodButton, { borderColor: colors.border }]}>
            <PlusCircle size={16} color={colors.primary} />
            <Text style={[styles.addFoodText, { color: colors.primary }]}>
              Add Food
            </Text>
          </Pressable>
        </View>
        
        <View style={styles.mealTypes}>
          <View style={[styles.mealTypeHeader, { borderBottomColor: colors.border }]}>
            <Text style={[styles.mealTypeTitle, { color: colors.text }]}>Snack</Text>
            <Text style={[styles.mealTypeTime, { color: colors.muted }]}>3:00 PM</Text>
          </View>
          
          <View style={[styles.foodEntry, { backgroundColor: colors.cardBackground }]}>
            <View style={styles.foodEntryContent}>
              <Text style={[styles.foodName, { color: colors.text }]}>
                Apple with almond butter
              </Text>
              <Text style={[styles.foodDescription, { color: colors.muted }]}>
                1 medium apple, 1 tbsp almond butter
              </Text>
              <View style={styles.foodTags}>
                <View style={[styles.foodTag, { backgroundColor: colors.success + '20' }]}>
                  <Text style={[styles.foodTagText, { color: colors.success }]}>Planned</Text>
                </View>
              </View>
            </View>
            <Pressable style={styles.moreButton}>
              <MoreVertical size={20} color={colors.muted} />
            </Pressable>
          </View>
          
          <Pressable 
            style={[styles.addFoodButton, { borderColor: colors.border }]}>
            <PlusCircle size={16} color={colors.primary} />
            <Text style={[styles.addFoodText, { color: colors.primary }]}>
              Add Food
            </Text>
          </Pressable>
        </View>
        
        <View style={styles.mealTypes}>
          <View style={[styles.mealTypeHeader, { borderBottomColor: colors.border }]}>
            <Text style={[styles.mealTypeTitle, { color: colors.text }]}>Dinner</Text>
            <View style={styles.rowCenter}>
              <Clock size={16} color={colors.muted} />
              <Text style={[styles.addMealTimeText, { color: colors.muted }]}>
                Add time
              </Text>
            </View>
          </View>
          
          <Pressable 
            style={[styles.addFoodButton, { borderColor: colors.border }]}>
            <PlusCircle size={16} color={colors.primary} />
            <Text style={[styles.addFoodText, { color: colors.primary }]}>
              Add Food
            </Text>
          </Pressable>
        </View>
        
        <View style={styles.mealTypes}>
          <View style={[styles.mealTypeHeader, { borderBottomColor: colors.border }]}>
            <Text style={[styles.mealTypeTitle, { color: colors.text }]}>Notes</Text>
          </View>
          
          <View style={[styles.notesContainer, { backgroundColor: colors.cardBackground }]}>
            <TextInput
              style={[styles.notesInput, { color: colors.text }]}
              placeholder="Add notes about your day..."
              placeholderTextColor={colors.muted}
              multiline={true}
              numberOfLines={4}
            />
          </View>
        </View>
        
        <View style={styles.emotionContainer}>
          <Text style={[styles.emotionTitle, { color: colors.text }]}>
            How did you feel today?
          </Text>
          
          <View style={styles.emotionButtons}>
            <Pressable 
              style={[
                styles.emotionButton, 
                { backgroundColor: colors.accent + '20', borderColor: colors.accent }
              ]}>
              <Text style={[styles.emotionText, { color: colors.accent }]}>
                Satisfied
              </Text>
            </Pressable>
            
            <Pressable 
              style={[
                styles.emotionButton, 
                { backgroundColor: colors.cardBackground, borderColor: colors.border }
              ]}>
              <Text style={[styles.emotionText, { color: colors.muted }]}>
                Anxious
              </Text>
            </Pressable>
            
            <Pressable 
              style={[
                styles.emotionButton, 
                { backgroundColor: colors.cardBackground, borderColor: colors.border }
              ]}>
              <Text style={[styles.emotionText, { color: colors.muted }]}>
                Neutral
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
      
      <View style={[styles.addButtonContainer, { backgroundColor: colors.background }]}>
        <Pressable 
          style={[styles.addButton, { backgroundColor: colors.primary }]}>
          <PlusCircle size={20} color="#FFF" />
          <Text style={styles.addButtonText}>Add Meal</Text>
        </Pressable>
        
        <Pressable 
          style={[styles.cameraButton, { backgroundColor: colors.accent }]}>
          <Camera size={20} color="#FFF" />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dateSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  dateText: {
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  mealTypes: {
    marginBottom: 24,
  },
  mealTypeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    marginBottom: 12,
  },
  mealTypeTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  mealTypeTime: {
    fontSize: 14,
  },
  addMealTimeText: {
    fontSize: 14,
    marginLeft: 4,
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  foodEntry: {
    flexDirection: 'row',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
  },
  foodEntryContent: {
    flex: 1,
  },
  foodName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  foodDescription: {
    fontSize: 14,
    marginBottom: 8,
  },
  foodTags: {
    flexDirection: 'row',
  },
  foodTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 8,
  },
  foodTagText: {
    fontSize: 12,
    fontWeight: '500',
  },
  moreButton: {
    padding: 4,
  },
  foodImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 8,
    overflow: 'hidden',
    marginLeft: 12,
  },
  foodImage: {
    width: '100%',
    height: '100%',
  },
  addFoodButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 12,
    justifyContent: 'center',
  },
  addFoodText: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 8,
  },
  notesContainer: {
    borderRadius: 12,
    padding: 12,
  },
  notesInput: {
    fontSize: 16,
    textAlignVertical: 'top',
    height: 100,
  },
  emotionContainer: {
    marginBottom: 24,
  },
  emotionTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 12,
  },
  emotionButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  emotionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 8,
    marginBottom: 8,
  },
  emotionText: {
    fontSize: 14,
    fontWeight: '500',
  },
  addButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
  addButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  cameraButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
});