import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  useColorScheme,
  ScrollView,
} from 'react-native';
import { X, Plus, Trash2 } from 'lucide-react-native';
import Colors from '@/constants/Colors';

type MealItem = {
  id: string;
  time: string;
  title: string;
  description: string;
};

type PlanData = {
  date: string;
  meals: MealItem[];
};

type CreatePlanModalProps = {
  visible: boolean;
  onClose: () => void;
  onSave: (planData: PlanData) => void;
  initialData?: PlanData | null;
  mode?: 'add' | 'edit';
};

export default function CreatePlanModal({ 
  visible, 
  onClose, 
  onSave,
  initialData,
  mode = 'add'
}: CreatePlanModalProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  const [selectedDate, setSelectedDate] = useState('');
  const [meals, setMeals] = useState<MealItem[]>([
    { id: '1', time: '', title: '', description: '' },
  ]);

  // Update form when initialData changes
  useEffect(() => {
    if (initialData) {
      setSelectedDate(initialData.date);
      setMeals(initialData.meals);
    } else {
      // Reset form when no initial data
      setSelectedDate('');
      setMeals([{ id: '1', time: '', title: '', description: '' }]);
    }
  }, [initialData]);
  
  const addMeal = () => {
    setMeals([
      ...meals,
      {
        id: Date.now().toString(),
        time: '',
        title: '',
        description: '',
      },
    ]);
  };
  
  const removeMeal = (id: string) => {
    if (meals.length > 1) {
      setMeals(meals.filter(meal => meal.id !== id));
    }
  };
  
  const updateMeal = (id: string, field: keyof MealItem, value: string) => {
    setMeals(meals.map(meal => 
      meal.id === id ? { ...meal, [field]: value } : meal
    ));
  };
  
  const handleSave = () => {
    onSave({
      date: selectedDate,
      meals: meals,
    });
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}>
      <View style={[styles.modalContainer, { backgroundColor: 'rgba(0,0,0,0.5)' }]}>
        <View style={[styles.modalContent, { backgroundColor: colors.background }]}>
          <View style={styles.modalHeader}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>
              {mode === 'add' ? 'Create New Plan' : 'Edit Plan'}
            </Text>
            <Pressable onPress={onClose} style={styles.closeButton}>
              <X size={24} color={colors.text} />
            </Pressable>
          </View>
          
          <ScrollView style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: colors.text }]}>Date</Text>
              <TextInput
                style={[
                  styles.input,
                  { 
                    backgroundColor: colors.cardBackground,
                    color: colors.text,
                    borderColor: colors.border,
                  },
                ]}
                placeholder="Enter date (e.g., May 10, 2025)"
                placeholderTextColor={colors.muted}
                value={selectedDate}
                onChangeText={setSelectedDate}
              />
            </View>
            
            <View style={styles.mealsSection}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Meals</Text>
              
              {meals.map((meal, index) => (
                <View key={meal.id} style={styles.mealItem}>
                  <View style={styles.mealHeader}>
                    <Text style={[styles.mealNumber, { color: colors.text }]}>
                      Meal {index + 1}
                    </Text>
                    {meals.length > 1 && (
                      <Pressable
                        onPress={() => removeMeal(meal.id)}
                        style={styles.removeMealButton}>
                        <Trash2 size={20} color={colors.error} />
                      </Pressable>
                    )}
                  </View>
                  
                  <View style={styles.inputGroup}>
                    <Text style={[styles.label, { color: colors.text }]}>Time</Text>
                    <TextInput
                      style={[
                        styles.input,
                        { 
                          backgroundColor: colors.cardBackground,
                          color: colors.text,
                          borderColor: colors.border,
                        },
                      ]}
                      placeholder="Enter time (e.g., 8:30 AM)"
                      placeholderTextColor={colors.muted}
                      value={meal.time}
                      onChangeText={(value) => updateMeal(meal.id, 'time', value)}
                    />
                  </View>
                  
                  <View style={styles.inputGroup}>
                    <Text style={[styles.label, { color: colors.text }]}>Title</Text>
                    <TextInput
                      style={[
                        styles.input,
                        { 
                          backgroundColor: colors.cardBackground,
                          color: colors.text,
                          borderColor: colors.border,
                        },
                      ]}
                      placeholder="Enter meal title"
                      placeholderTextColor={colors.muted}
                      value={meal.title}
                      onChangeText={(value) => updateMeal(meal.id, 'title', value)}
                    />
                  </View>
                  
                  <View style={styles.inputGroup}>
                    <Text style={[styles.label, { color: colors.text }]}>Description</Text>
                    <TextInput
                      style={[
                        styles.textArea,
                        { 
                          backgroundColor: colors.cardBackground,
                          color: colors.text,
                          borderColor: colors.border,
                        },
                      ]}
                      placeholder="Enter meal description"
                      placeholderTextColor={colors.muted}
                      multiline
                      numberOfLines={3}
                      value={meal.description}
                      onChangeText={(value) => updateMeal(meal.id, 'description', value)}
                    />
                  </View>
                </View>
              ))}
              
              <Pressable
                style={[
                  styles.addMealButton,
                  { 
                    backgroundColor: colors.primary + '20',
                    borderColor: colors.primary,
                  },
                ]}
                onPress={addMeal}>
                <Plus size={20} color={colors.primary} />
                <Text style={[styles.addMealText, { color: colors.primary }]}>
                  Add Another Meal
                </Text>
              </Pressable>
            </View>
          </ScrollView>
          
          <View style={[styles.modalFooter, { borderTopColor: colors.border }]}>
            <Pressable
              style={[styles.cancelButton, { borderColor: colors.border }]}
              onPress={onClose}>
              <Text style={[styles.cancelButtonText, { color: colors.text }]}>
                Cancel
              </Text>
            </Pressable>
            <Pressable
              style={[styles.saveButton, { backgroundColor: colors.primary }]}
              onPress={handleSave}>
              <Text style={styles.saveButtonText}>
                {mode === 'add' ? 'Create Plan' : 'Update Plan'}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  closeButton: {
    padding: 8,
  },
  form: {
    paddingHorizontal: 20,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  input: {
    height: 48,
    borderRadius: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    fontSize: 16,
  },
  textArea: {
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingTop: 12,
    borderWidth: 1,
    fontSize: 16,
    textAlignVertical: 'top',
    minHeight: 80,
  },
  mealsSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  mealItem: {
    marginBottom: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  mealHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  mealNumber: {
    fontSize: 16,
    fontWeight: '600',
  },
  removeMealButton: {
    padding: 8,
  },
  addMealButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderStyle: 'dashed',
  },
  addMealText: {
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
  },
  modalFooter: {
    flexDirection: 'row',
    padding: 20,
    borderTopWidth: 1,
  },
  cancelButton: {
    flex: 1,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    borderWidth: 1,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  saveButton: {
    flex: 1,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  saveButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});