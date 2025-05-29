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

type AddCheckInModalProps = {
  visible: boolean;
  onClose: () => void;
  onSave: (checkInData: {
    type: string;
    mood: string;
    anxiety_level: number;
    behaviors: string[];
    coping_skills_used: string[];
    notes: string;
  }) => void;
};

export default function AddCheckInModal({ visible, onClose, onSave }: AddCheckInModalProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  const [type, setType] = useState('');
  const [mood, setMood] = useState('');
  const [anxietyLevel, setAnxietyLevel] = useState('5');
  const [behaviors, setBehaviors] = useState(['']);
  const [copingSkills, setCopingSkills] = useState(['']);
  const [notes, setNotes] = useState('');
  
  const checkInTypes = [
    'Daily Check-In',
    'Meal Check-In',
    'Anxiety Check-In',
    'Body Image Check-In',
  ];

  const moodOptions = [
    'Very Good',
    'Good',
    'Neutral',
    'Difficult',
    'Very Difficult',
  ];

  const addBehavior = () => {
    setBehaviors([...behaviors, '']);
  };

  const updateBehavior = (index: number, value: string) => {
    const newBehaviors = [...behaviors];
    newBehaviors[index] = value;
    setBehaviors(newBehaviors);
  };

  const removeBehavior = (index: number) => {
    if (behaviors.length > 1) {
      setBehaviors(behaviors.filter((_, i) => i !== index));
    }
  };

  const addCopingSkill = () => {
    setCopingSkills([...copingSkills, '']);
  };

  const updateCopingSkill = (index: number, value: string) => {
    const newSkills = [...copingSkills];
    newSkills[index] = value;
    setCopingSkills(newSkills);
  };

  const removeCopingSkill = (index: number) => {
    if (copingSkills.length > 1) {
      setCopingSkills(copingSkills.filter((_, i) => i !== index));
    }
  };

  const handleSave = () => {
    onSave({
      type,
      mood,
      anxiety_level: parseInt(anxietyLevel),
      behaviors: behaviors.filter(b => b.trim() !== ''),
      coping_skills_used: copingSkills.filter(s => s.trim() !== ''),
      notes,
    });
    resetForm();
  };

  const resetForm = () => {
    setType('');
    setMood('');
    setAnxietyLevel('5');
    setBehaviors(['']);
    setCopingSkills(['']);
    setNotes('');
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
            <Text style={[styles.modalTitle, { color: colors.text }]}>New Check-In</Text>
            <Pressable onPress={onClose} style={styles.closeButton}>
              <X size={24} color={colors.text} />
            </Pressable>
          </View>

          <ScrollView style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: colors.text }]}>Check-In Type</Text>
              <View style={styles.optionsContainer}>
                {checkInTypes.map((checkInType) => (
                  <Pressable
                    key={checkInType}
                    style={[
                      styles.optionTag,
                      { 
                        backgroundColor: type === checkInType
                          ? colors.warning + '20'
                          : colors.cardBackground,
                        borderColor: type === checkInType
                          ? colors.warning
                          : colors.border,
                      },
                    ]}
                    onPress={() => setType(checkInType)}>
                    <Text
                      style={[
                        styles.optionText,
                        { 
                          color: type === checkInType
                            ? colors.warning
                            : colors.muted,
                        },
                      ]}>
                      {checkInType}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: colors.text }]}>Overall Mood</Text>
              <View style={styles.optionsContainer}>
                {moodOptions.map((moodOption) => (
                  <Pressable
                    key={moodOption}
                    style={[
                      styles.optionTag,
                      { 
                        backgroundColor: mood === moodOption
                          ? colors.primary + '20'
                          : colors.cardBackground,
                        borderColor: mood === moodOption
                          ? colors.primary
                          : colors.border,
                      },
                    ]}
                    onPress={() => setMood(moodOption)}>
                    <Text
                      style={[
                        styles.optionText,
                        { 
                          color: mood === moodOption
                            ? colors.primary
                            : colors.muted,
                        },
                      ]}>
                      {moodOption}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: colors.text }]}>
                Anxiety Level (1-10)
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
                placeholder="Rate anxiety from 1 to 10"
                placeholderTextColor={colors.muted}
                keyboardType="number-pad"
                value={anxietyLevel}
                onChangeText={(value) => {
                  const num = parseInt(value);
                  if (!isNaN(num) && num >= 1 && num <= 10) {
                    setAnxietyLevel(value);
                  }
                }}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: colors.text }]}>Behaviors</Text>
              {behaviors.map((behavior, index) => (
                <View key={index} style={styles.itemContainer}>
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
                    placeholder="Enter behavior"
                    placeholderTextColor={colors.muted}
                    value={behavior}
                    onChangeText={(value) => updateBehavior(index, value)}
                  />
                  {behaviors.length > 1 && (
                    <Pressable
                      style={styles.removeButton}
                      onPress={() => removeBehavior(index)}>
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
                    backgroundColor: colors.warning + '20',
                    borderColor: colors.warning,
                  },
                ]}
                onPress={addBehavior}>
                <Text style={[styles.addButtonText, { color: colors.warning }]}>
                  Add Behavior
                </Text>
              </Pressable>
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: colors.text }]}>Coping Skills Used</Text>
              {copingSkills.map((skill, index) => (
                <View key={index} style={styles.itemContainer}>
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
                    placeholder="Enter coping skill"
                    placeholderTextColor={colors.muted}
                    value={skill}
                    onChangeText={(value) => updateCopingSkill(index, value)}
                  />
                  {copingSkills.length > 1 && (
                    <Pressable
                      style={styles.removeButton}
                      onPress={() => removeCopingSkill(index)}>
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
                    backgroundColor: colors.warning + '20',
                    borderColor: colors.warning,
                  },
                ]}
                onPress={addCopingSkill}>
                <Text style={[styles.addButtonText, { color: colors.warning }]}>
                  Add Coping Skill
                </Text>
              </Pressable>
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: colors.text }]}>Additional Notes</Text>
              <TextInput
                style={[
                  styles.textArea,
                  { 
                    backgroundColor: colors.cardBackground,
                    color: colors.text,
                    borderColor: colors.border,
                  },
                ]}
                placeholder="Add any additional notes or reflections"
                placeholderTextColor={colors.muted}
                multiline
                numberOfLines={4}
                value={notes}
                onChangeText={setNotes}
              />
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
              style={[styles.saveButton, { backgroundColor: colors.warning }]}
              onPress={handleSave}>
              <Text style={styles.saveButtonText}>Save Check-In</Text>
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
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  optionTag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    margin: 4,
    borderWidth: 1,
  },
  optionText: {
    fontSize: 14,
    fontWeight: '500',
  },
  itemContainer: {
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