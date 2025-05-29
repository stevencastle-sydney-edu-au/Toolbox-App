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

type GoalData = {
  title: string;
  description: string;
  category: string;
  targetDate: string;
  steps: { description: string }[];
};

type AddGoalModalProps = {
  visible: boolean;
  onClose: () => void;
  onSave: (goalData: GoalData) => void;
  initialData?: any;
  mode?: 'add' | 'edit';
};

export default function AddGoalModal({ 
  visible, 
  onClose, 
  onSave,
  initialData,
  mode = 'add'
}: AddGoalModalProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [targetDate, setTargetDate] = useState('');
  const [steps, setSteps] = useState([{ description: '' }]);
  
  const categories = [
    'Food Exposure',
    'Social Eating',
    'Body Image',
    'Mindfulness',
    'Self-Care',
  ];

  // Update form when initialData changes
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description);
      setCategory(initialData.category);
      setTargetDate(initialData.targetDate);
      setSteps(initialData.steps.map((step: any) => ({ description: step.description })));
    } else {
      // Reset form when no initial data
      setTitle('');
      setDescription('');
      setCategory('');
      setTargetDate('');
      setSteps([{ description: '' }]);
    }
  }, [initialData]);
  
  const addStep = () => {
    setSteps([...steps, { description: '' }]);
  };
  
  const removeStep = (index: number) => {
    if (steps.length > 1) {
      setSteps(steps.filter((_, i) => i !== index));
    }
  };
  
  const updateStep = (index: number, description: string) => {
    const newSteps = [...steps];
    newSteps[index] = { description };
    setSteps(newSteps);
  };
  
  const handleSave = () => {
    onSave({
      title,
      description,
      category,
      targetDate,
      steps,
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
              {mode === 'add' ? 'New Goal' : 'Edit Goal'}
            </Text>
            <Pressable onPress={onClose} style={styles.closeButton}>
              <X size={24} color={colors.text} />
            </Pressable>
          </View>
          
          <ScrollView style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: colors.text }]}>Goal Title</Text>
              <TextInput
                style={[
                  styles.input,
                  { 
                    backgroundColor: colors.cardBackground,
                    color: colors.text,
                    borderColor: colors.border,
                  },
                ]}
                placeholder="Enter goal title"
                placeholderTextColor={colors.muted}
                value={title}
                onChangeText={setTitle}
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
                placeholder="Describe your goal"
                placeholderTextColor={colors.muted}
                multiline
                numberOfLines={3}
                value={description}
                onChangeText={setDescription}
              />
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: colors.text }]}>Category</Text>
              <View style={styles.categoriesContainer}>
                {categories.map((cat) => (
                  <Pressable
                    key={cat}
                    style={[
                      styles.categoryTag,
                      { 
                        backgroundColor: category === cat
                          ? colors.success + '20'
                          : colors.cardBackground,
                        borderColor: category === cat
                          ? colors.success
                          : colors.border,
                      },
                    ]}
                    onPress={() => setCategory(cat)}>
                    <Text
                      style={[
                        styles.categoryText,
                        { 
                          color: category === cat
                            ? colors.success
                            : colors.muted,
                        },
                      ]}>
                      {cat}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: colors.text }]}>Target Date</Text>
              <TextInput
                style={[
                  styles.input,
                  { 
                    backgroundColor: colors.cardBackground,
                    color: colors.text,
                    borderColor: colors.border,
                  },
                ]}
                placeholder="Enter target date (e.g., May 10, 2025)"
                placeholderTextColor={colors.muted}
                value={targetDate}
                onChangeText={setTargetDate}
              />
            </View>
            
            <View style={styles.stepsSection}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Steps</Text>
              
              {steps.map((step, index) => (
                <View key={index} style={styles.stepItem}>
                  <View style={styles.stepHeader}>
                    <Text style={[styles.stepNumber, { color: colors.text }]}>
                      Step {index + 1}
                    </Text>
                    {steps.length > 1 && (
                      <Pressable
                        onPress={() => removeStep(index)}
                        style={styles.removeStepButton}>
                        <Trash2 size={20} color={colors.error} />
                      </Pressable>
                    )}
                  </View>
                  
                  <TextInput
                    style={[
                      styles.input,
                      { 
                        backgroundColor: colors.cardBackground,
                        color: colors.text,
                        borderColor: colors.border,
                      },
                    ]}
                    placeholder="Describe this step"
                    placeholderTextColor={colors.muted}
                    value={step.description}
                    onChangeText={(text) => updateStep(index, text)}
                  />
                </View>
              ))}
              
              <Pressable
                style={[
                  styles.addStepButton,
                  { 
                    backgroundColor: colors.primary + '20',
                    borderColor: colors.primary,
                  },
                ]}
                onPress={addStep}>
                <Plus size={20} color={colors.primary} />
                <Text style={[styles.addStepText, { color: colors.primary }]}>
                  Add Step
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
                {mode === 'add' ? 'Create Goal' : 'Update Goal'}
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
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
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
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  categoryTag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    margin: 4,
    borderWidth: 1,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
  },
  stepsSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  stepItem: {
    marginBottom: 16,
  },
  stepHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  stepNumber: {
    fontSize: 16,
    fontWeight: '600',
  },
  removeStepButton: {
    padding: 8,
  },
  addStepButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderStyle: 'dashed',
  },
  addStepText: {
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