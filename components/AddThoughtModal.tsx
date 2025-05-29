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
import { X } from 'lucide-react-native';
import Colors from '@/constants/Colors';

type ThoughtData = {
  situation: string;
  automaticThought: string;
  emotions: string[];
  emotionIntensity: number;
  distortionTypes: string[];
  rationalResponse: string;
};

type AddThoughtModalProps = {
  visible: boolean;
  onClose: () => void;
  onSave: (thoughtData: ThoughtData) => void;
  initialData?: ThoughtData | null;
  mode?: 'add' | 'edit';
};

export default function AddThoughtModal({ 
  visible, 
  onClose, 
  onSave,
  initialData,
  mode = 'add'
}: AddThoughtModalProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  const [situation, setSituation] = useState('');
  const [automaticThought, setAutomaticThought] = useState('');
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([]);
  const [emotionIntensity, setEmotionIntensity] = useState('5');
  const [selectedDistortions, setSelectedDistortions] = useState<string[]>([]);
  const [rationalResponse, setRationalResponse] = useState('');
  
  const emotions = ['Anxiety', 'Fear', 'Sadness', 'Shame', 'Anger', 'Guilt', 'Worry'];
  const distortions = [
    'Catastrophizing',
    'Black and White Thinking',
    'Mind Reading',
    'Fortune Telling',
    'Labeling',
    'Should Statements',
    'Emotional Reasoning',
  ];

  // Update form when initialData changes
  useEffect(() => {
    if (initialData) {
      setSituation(initialData.situation);
      setAutomaticThought(initialData.automaticThought);
      setSelectedEmotions(initialData.emotions);
      setEmotionIntensity(initialData.emotionIntensity.toString());
      setSelectedDistortions(initialData.distortionTypes);
      setRationalResponse(initialData.rationalResponse);
    } else {
      // Reset form when no initial data
      setSituation('');
      setAutomaticThought('');
      setSelectedEmotions([]);
      setEmotionIntensity('5');
      setSelectedDistortions([]);
      setRationalResponse('');
    }
  }, [initialData]);
  
  const toggleEmotion = (emotion: string) => {
    setSelectedEmotions(current =>
      current.includes(emotion)
        ? current.filter(e => e !== emotion)
        : [...current, emotion]
    );
  };
  
  const toggleDistortion = (distortion: string) => {
    setSelectedDistortions(current =>
      current.includes(distortion)
        ? current.filter(d => d !== distortion)
        : [...current, distortion]
    );
  };
  
  const handleSave = () => {
    onSave({
      situation,
      automaticThought,
      emotions: selectedEmotions,
      emotionIntensity: parseInt(emotionIntensity),
      distortionTypes: selectedDistortions,
      rationalResponse,
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
              {mode === 'add' ? 'New Thought Entry' : 'Edit Thought Entry'}
            </Text>
            <Pressable onPress={onClose} style={styles.closeButton}>
              <X size={24} color={colors.text} />
            </Pressable>
          </View>
          
          <ScrollView style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: colors.text }]}>Situation</Text>
              <TextInput
                style={[
                  styles.textArea,
                  { 
                    backgroundColor: colors.cardBackground,
                    color: colors.text,
                    borderColor: colors.border,
                  },
                ]}
                placeholder="What happened? What triggered your emotions?"
                placeholderTextColor={colors.muted}
                multiline
                numberOfLines={3}
                value={situation}
                onChangeText={setSituation}
              />
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: colors.text }]}>Automatic Thought</Text>
              <TextInput
                style={[
                  styles.textArea,
                  { 
                    backgroundColor: colors.cardBackground,
                    color: colors.text,
                    borderColor: colors.border,
                  },
                ]}
                placeholder="What went through your mind?"
                placeholderTextColor={colors.muted}
                multiline
                numberOfLines={3}
                value={automaticThought}
                onChangeText={setAutomaticThought}
              />
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: colors.text }]}>Emotions</Text>
              <View style={styles.tagsContainer}>
                {emotions.map((emotion) => (
                  <Pressable
                    key={emotion}
                    style={[
                      styles.tag,
                      { 
                        backgroundColor: selectedEmotions.includes(emotion)
                          ? colors.primary + '20'
                          : colors.cardBackground,
                        borderColor: selectedEmotions.includes(emotion)
                          ? colors.primary
                          : colors.border,
                      },
                    ]}
                    onPress={() => toggleEmotion(emotion)}>
                    <Text
                      style={[
                        styles.tagText,
                        { 
                          color: selectedEmotions.includes(emotion)
                            ? colors.primary
                            : colors.muted,
                        },
                      ]}>
                      {emotion}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: colors.text }]}>
                Emotion Intensity (0-10)
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
                placeholder="Rate the intensity from 0 to 10"
                placeholderTextColor={colors.muted}
                keyboardType="number-pad"
                value={emotionIntensity}
                onChangeText={value => {
                  const num = parseInt(value);
                  if (!isNaN(num) && num >= 0 && num <= 10) {
                    setEmotionIntensity(value);
                  }
                }}
              />
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: colors.text }]}>Thinking Distortions</Text>
              <View style={styles.tagsContainer}>
                {distortions.map((distortion) => (
                  <Pressable
                    key={distortion}
                    style={[
                      styles.tag,
                      { 
                        backgroundColor: selectedDistortions.includes(distortion)
                          ? colors.warning + '20'
                          : colors.cardBackground,
                        borderColor: selectedDistortions.includes(distortion)
                          ? colors.warning
                          : colors.border,
                      },
                    ]}
                    onPress={() => toggleDistortion(distortion)}>
                    <Text
                      style={[
                        styles.tagText,
                        { 
                          color: selectedDistortions.includes(distortion)
                            ? colors.warning
                            : colors.muted,
                        },
                      ]}>
                      {distortion}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: colors.text }]}>Balanced Response</Text>
              <TextInput
                style={[
                  styles.textArea,
                  { 
                    backgroundColor: colors.cardBackground,
                    color: colors.text,
                    borderColor: colors.border,
                  },
                ]}
                placeholder="What's a more balanced way to think about this?"
                placeholderTextColor={colors.muted}
                multiline
                numberOfLines={4}
                value={rationalResponse}
                onChangeText={setRationalResponse}
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
              style={[styles.saveButton, { backgroundColor: colors.primary }]}
              onPress={handleSave}>
              <Text style={styles.saveButtonText}>
                {mode === 'add' ? 'Save Entry' : 'Update Entry'}
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