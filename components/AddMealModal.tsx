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
import { X, Camera, Clock } from 'lucide-react-native';
import Colors from '@/constants/Colors';

type AddMealModalProps = {
  visible: boolean;
  onClose: () => void;
  onSave: (mealData: {
    title: string;
    description: string;
    time: string;
    tags: string[];
  }) => void;
};

export default function AddMealModal({ visible, onClose, onSave }: AddMealModalProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [time, setTime] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  
  const availableTags = ['Balanced', 'Planned', 'Challenge', 'Protein', 'Vegetarian'];
  
  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };
  
  const handleSave = () => {
    onSave({
      title,
      description,
      time,
      tags: selectedTags,
    });
    resetForm();
  };
  
  const resetForm = () => {
    setTitle('');
    setDescription('');
    setTime('');
    setSelectedTags([]);
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
            <Text style={[styles.modalTitle, { color: colors.text }]}>Add Meal</Text>
            <Pressable onPress={onClose} style={styles.closeButton}>
              <X size={24} color={colors.text} />
            </Pressable>
          </View>
          
          <ScrollView style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: colors.text }]}>Meal Title</Text>
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
                value={title}
                onChangeText={setTitle}
              />
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: colors.text }]}>Time</Text>
              <View style={[
                styles.timeInput,
                { 
                  backgroundColor: colors.cardBackground,
                  borderColor: colors.border,
                },
              ]}>
                <Clock size={20} color={colors.muted} />
                <TextInput
                  style={[styles.timeInputText, { color: colors.text }]}
                  placeholder="Enter time (e.g., 8:30 AM)"
                  placeholderTextColor={colors.muted}
                  value={time}
                  onChangeText={setTime}
                />
              </View>
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
                numberOfLines={4}
                value={description}
                onChangeText={setDescription}
              />
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: colors.text }]}>Tags</Text>
              <View style={styles.tagsContainer}>
                {availableTags.map((tag) => (
                  <Pressable
                    key={tag}
                    style={[
                      styles.tag,
                      { 
                        backgroundColor: selectedTags.includes(tag) 
                          ? colors.primary + '20'
                          : colors.cardBackground,
                        borderColor: selectedTags.includes(tag)
                          ? colors.primary
                          : colors.border,
                      },
                    ]}
                    onPress={() => toggleTag(tag)}>
                    <Text
                      style={[
                        styles.tagText,
                        { 
                          color: selectedTags.includes(tag)
                            ? colors.primary
                            : colors.muted,
                        },
                      ]}>
                      {tag}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>
            
            <View style={styles.photoSection}>
              <Pressable
                style={[
                  styles.addPhotoButton,
                  { 
                    backgroundColor: colors.cardBackground,
                    borderColor: colors.border,
                  },
                ]}>
                <Camera size={24} color={colors.primary} />
                <Text style={[styles.addPhotoText, { color: colors.primary }]}>
                  Add Photo
                </Text>
              </Pressable>
            </View>
          </ScrollView>
          
          <View style={styles.modalFooter}>
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
              <Text style={styles.saveButtonText}>Save Meal</Text>
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
  timeInput: {
    height: 48,
    borderRadius: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeInputText: {
    flex: 1,
    marginLeft: 8,
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
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    margin: 4,
    borderWidth: 1,
  },
  tagText: {
    fontSize: 14,
    fontWeight: '500',
  },
  photoSection: {
    marginBottom: 20,
  },
  addPhotoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderStyle: 'dashed',
  },
  addPhotoText: {
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
  },
  modalFooter: {
    flexDirection: 'row',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
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