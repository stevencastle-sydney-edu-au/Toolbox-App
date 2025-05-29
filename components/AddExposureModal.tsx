import React, { useState } from 'react';
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
import { X } from 'lucide-react-native';
import Colors from '@/constants/Colors';

type AddExposureModalProps = {
  visible: boolean;
  onClose: () => void;
  onSave: (exposureData: {
    title: string;
    description: string;
    category: string;
    difficulty: number;
    steps: string[];
    coping_strategies: string[];
  }) => void;
};

export default function AddExposureModal({ visible, onClose, onSave }: AddExposureModalProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('5');
  const [steps, setSteps] = useState(['']);
  const [copingStrategies, setCopingStrategies] = useState(['']);
  
  const categories = [
    'Food Challenge',
    'Social Eating',
    'Body Image',
    'Restaurant',
    'Grocery Shopping',
  ];

  const addStep = () => {
    setSteps([...steps, '']);
  };

  const updateStep = (index: number, value: string) => {
    const newSteps = [...steps];
    newSteps[index] = value;
    setSteps(newSteps);
  };

  const removeStep = (index: number) => {
    if (steps.length > 1) {
      setSteps(steps.filter((_, i) => i !== index));
    }
  };

  const addStrategy = () => {
    setCopingStrategies([...copingStrategies, '']);
  };

  const updateStrategy = (index: number, value: string) => {
    const newStrategies = [...copingStrategies];
    newStrategies[index] = value;
    setCopingStrategies(newStrategies);
  };

  const removeStrategy = (index: number) => {
    if (copingStrategies.length > 1) {
      setCopingStrategies(copingStrategies.filter((_, i) => i !== index));
    }
  };

  const handleSave = () => {
    onSave({
      title,
      description,
      category,
      difficulty: parseInt(difficulty),
      steps: steps.filter(step => step.trim() !== ''),
      coping_strategies: copingStrategies.filter(strategy => strategy.trim() !== ''),
    });
    resetForm();
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setCategory('');
    setDifficulty('5');
    setSteps(['']);
    setCopingStrategies(['']);
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
            <Text style={[styles.modalTitle, { color: colors.text }]}>New Exposure Exercise</Text>
            <Pressable onPress={onClose} style={styles.closeButton}>
              <X size={24} color={colors.text} />
            </Pressable>
          </View>

          <ScrollView style={styles.form}>
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
                placeholder="Enter exposure exercise title"
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
                placeholder="Describe the exposure exercise"
                placeholderTextColor={colors.muted}
                multiline
                numberOfLines={4}
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
                          ? colors.accent + '20'
                          : colors.cardBackground,
                        borderColor: category === cat
                          ? colors.accent
                          : colors.border,
                      },
                    ]}
                    onPress={() => setCategory(cat)}>
                    <Text
                      style={[
                        styles.categoryText,
                        { 
                          color: category === cat
                            ? colors.accent
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
              <Text style={[styles.label, { color: colors.text }]}>
                Difficulty Level (1-10)
              </Text>
              <TextInput
                style={[
                  styles.input,
                  { 
                    backgroundColor: colors.cardBackground,
                    color: colors.text,
                    borderColor: colors.border,
                  },
                ]}
                placeholder="Rate difficulty from 1 to 10"
                placeholderTextColor={colors.muted}
                keyboardType="number-pad"
                value={difficulty}
                onChangeText={(value) => {
                  const num = parseInt(value);
                  if (!isNaN(num) && num >= 1 && num <= 10) {
                    setDifficulty(value);
                  }
                }}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: colors.text }]}>Steps</Text>
              {steps.map((step, index) => (
                <View key={index} style={styles.stepContainer}>
                  <TextInput
                    style={[
                      styles.input,
                      { 
                        backgroundColor: colors.cardBackground,
                        color: colors.text,
                        borderColor: colors.border,
                        flex: 1,
                      },
                    ]}
                    placeholder={`Step ${index + 1}`}
                    placeholderTextColor={colors.muted}
                    value={step}
                    onChangeText={(value) => updateStep(index, value)}
                  />
                  {steps.length > 1 && (
                    <Pressable
                      style={styles.removeButton}
                      onPress={() => removeStep(index)}>
                      <Text style={[styles.removeButtonText, { color: colors.error }]}>
                        Remove
                      </Text>
                    </Pressable>
                  )}
                </View>
              ))}
              <Pressable
                style={[
                  styles.addButton,
                  { 
                    backgroundColor: colors.accent + '20',
                    borderColor: colors.accent,
                  },
                ]}
                onPress={addStep}>
                <Text style={[styles.addButtonText, { color: colors.accent }]}>
                  Add Step
                </Text>
              </Pressable>
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: colors.text }]}>Coping Strategies</Text>
              {copingStrategies.map((strategy, index) => (
                <View key={index} style={styles.stepContainer}>
                  <TextInput
                    style={[
                      styles.input,
                      { 
                        backgroundColor: colors.cardBackground,
                        color: colors.text,
                        borderColor: colors.border,
                        flex: 1,
                      },
                    ]}
                    placeholder={`Strategy ${index + 1}`}
                    placeholderTextColor={colors.muted}
                    value={strategy}
                    onChangeText={(value) => updateStrategy(index, value)}
                  />
                  {copingStrategies.length > 1 && (
                    <Pressable
                      style={styles.removeButton}
                      onPress={() => removeStrategy(index)}>
                      <Text style={[styles.removeButtonText, { color: colors.error }]}>
                        Remove
                      </Text>
                    </Pressable>
                  )}
                </View>
              ))}
              <Pressable
                style={[
                  styles.addButton,
                  { 
                    backgroundColor: colors.accent + '20',
                    borderColor: colors.accent,
                  },
                ]}
                onPress={addStrategy}>
                <Text style={[styles.addButtonText, { color: colors.accent }]}>
                  Add Coping Strategy
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
              style={[styles.saveButton, { backgroundColor: colors.accent }]}
              onPress={handleSave}>
              <Text style={styles.saveButtonText}>Create Exercise</Text>
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
    minHeight: 100,
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
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  removeButton: {
    marginLeft: 8,
    padding: 8,
  },
  removeButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderStyle: 'dashed',
  },
  addButtonText: {
    fontSize: 14,
    fontWeight: '500',
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