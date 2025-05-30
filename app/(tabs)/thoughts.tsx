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
} from 'react-native';
import { CirclePlus as PlusCircle, Search, Filter, ChevronRight, ChartBar as BarChart2 } from 'lucide-react-native';
import { useQuery, useMutation } from '@apollo/client';
import { GET_THOUGHT_LOGS } from '@/graphql/operations/thoughts';
import { ADD_THOUGHT_LOG } from '@/graphql/operations/thoughts';
import Colors from '@/constants/Colors';
import AddThoughtModal from '@/components/AddThoughtModal';

export default function ThoughtsScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddThoughtModalVisible, setIsAddThoughtModalVisible] = useState(false);
  const [selectedThought, setSelectedThought] = useState(null);

  // Fetch thought logs
  const { data, loading, error } = useQuery(GET_THOUGHT_LOGS);

  // Add thought log mutation
  const [addThoughtLog] = useMutation(ADD_THOUGHT_LOG, {
    refetchQueries: [{ query: GET_THOUGHT_LOGS }],
  });

  // Filter thought logs based on search query
  const filteredLogs = data?.thoughtLogs.filter(log => 
    log.situation.toLowerCase().includes(searchQuery.toLowerCase()) ||
    log.automaticThought.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const handleAddThought = async (thoughtData: {
    situation: string;
    automaticThought: string;
    emotions: string[];
    emotionIntensity: number;
    distortionTypes: string[];
    rationalResponse: string;
  }) => {
    try {
      await addThoughtLog({
        variables: {
          input: thoughtData,
        },
      });
      setIsAddThoughtModalVisible(false);
      setSelectedThought(null);
    } catch (error) {
      console.error('Error adding thought log:', error);
    }
  };

  const handleThoughtPress = (thought: any) => {
    setSelectedThought(thought);
    setIsAddThoughtModalVisible(true);
  };

  if (loading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
        <Text style={[styles.loadingText, { color: colors.text }]}>Loading thoughts...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.errorContainer, { backgroundColor: colors.background }]}>
        <Text style={[styles.errorText, { color: colors.error }]}>
          Error loading thoughts. Please try again.
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
      <View style={styles.header}>
        <View style={[styles.searchContainer, { backgroundColor: colors.cardBackground }]}>
          <Search size={20} color={colors.muted} />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder="Search thought logs..."
            placeholderTextColor={colors.muted}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <Pressable style={[styles.filterButton, { backgroundColor: colors.cardBackground }]}>
          <Filter size={20} color={colors.muted} />
        </Pressable>
      </View>
      
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        
        <View style={[styles.insightCard, { backgroundColor: colors.primary }]}>
          <View style={styles.insightContent}>
            <Text style={styles.insightTitle}>Thought Pattern Insight</Text>
            <Text style={styles.insightDescription}>
              Your most common thought distortion this week is "Catastrophizing" (80% of entries).
            </Text>
            <Pressable style={[styles.insightButton, { backgroundColor: 'rgba(255,255,255,0.2)' }]}>
              <Text style={styles.insightButtonText}>View All Insights</Text>
              <ChevronRight size={16} color="#FFF" />
            </Pressable>
          </View>
          <View style={styles.insightIcon}>
            <BarChart2 size={64} color="rgba(255,255,255,0.2)" />
          </View>
        </View>
        
        <View style={styles.thoughtSection}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Recent Thought Logs
          </Text>
          
          {filteredLogs.map((log) => (
            <Pressable 
              key={log.id}
              style={[
                styles.thoughtCard, 
                { backgroundColor: colors.cardBackground, borderColor: colors.border }
              ]}
              onPress={() => handleThoughtPress(log)}>
              <View style={styles.thoughtHeader}>
                <View>
                  <Text style={[styles.thoughtDate, { color: colors.muted }]}>
                    {new Date(log.date).toLocaleDateString('en-US', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric',
                    })} • {log.time}
                  </Text>
                  <Text style={[styles.thoughtSituation, { color: colors.text }]}>
                    {log.situation}
                  </Text>
                </View>
                <View 
                  style={[
                    styles.emotionBadge, 
                    { 
                      backgroundColor: 
                        log.emotionIntensity > 7 
                          ? colors.error + '20' 
                          : log.emotionIntensity > 4 
                            ? colors.warning + '20' 
                            : colors.success + '20',
                      borderColor:
                        log.emotionIntensity > 7 
                          ? colors.error 
                          : log.emotionIntensity > 4 
                            ? colors.warning 
                            : colors.success,
                    }
                  ]}>
                  <Text 
                    style={[
                      styles.emotionText, 
                      { 
                        color: 
                          log.emotionIntensity > 7 
                            ? colors.error 
                            : log.emotionIntensity > 4 
                              ? colors.warning 
                              : colors.success 
                      }
                    ]}>
                    {log.emotionIntensity}/10
                  </Text>
                </View>
              </View>
              
              <View style={styles.thoughtContent}>
                <View style={styles.thoughtSection}>
                  <Text style={[styles.thoughtLabel, { color: colors.muted }]}>
                    Automatic Thought:
                  </Text>
                  <Text style={[styles.thoughtText, { color: colors.text }]}>
                    {log.automaticThought}
                  </Text>
                </View>
                
                <View style={styles.thoughtSection}>
                  <Text style={[styles.thoughtLabel, { color: colors.muted }]}>
                    Emotions:
                  </Text>
                  <View style={styles.emotionTags}>
                    {log.emotions.map((emotion, index) => (
                      <View 
                        key={index}
                        style={[
                          styles.emotionTag, 
                          { backgroundColor: colors.primary + '20' }
                        ]}>
                        <Text style={[styles.emotionTagText, { color: colors.primary }]}>
                          {emotion}
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>
                
                <View style={styles.thoughtSection}>
                  <Text style={[styles.thoughtLabel, { color: colors.muted }]}>
                    Thinking Distortions:
                  </Text>
                  <View style={styles.distortionTags}>
                    {log.distortionTypes.map((distortion, index) => (
                      <View 
                        key={index}
                        style={[
                          styles.distortionTag, 
                          { backgroundColor: colors.warning + '20' }
                        ]}>
                        <Text style={[styles.distortionTagText, { color: colors.warning }]}>
                          {distortion}
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>
                
                <View style={styles.thoughtSection}>
                  <Text style={[styles.thoughtLabel, { color: colors.muted }]}>
                    Balanced Response:
                  </Text>
                  <Text style={[styles.thoughtText, { color: colors.text }]}>
                    {log.rationalResponse}
                  </Text>
                </View>
                
                <View style={styles.thoughtSection}>
                  <Text style={[styles.thoughtLabel, { color: colors.muted }]}>
                    After Reframing:
                  </Text>
                  <View 
                    style={[
                      styles.afterEmotionBadge, 
                      { 
                        backgroundColor: 
                          log.afterEmotionIntensity > 7 
                            ? colors.error + '20' 
                            : log.afterEmotionIntensity > 4 
                              ? colors.warning + '20' 
                              : colors.success + '20',
                        borderColor:
                          log.afterEmotionIntensity > 7 
                            ? colors.error 
                            : log.afterEmotionIntensity > 4 
                              ? colors.warning 
                              : colors.success,
                      }
                    ]}>
                    <Text 
                      style={[
                        styles.afterEmotionText, 
                        { 
                          color: 
                            log.afterEmotionIntensity > 7 
                              ? colors.error 
                              : log.afterEmotionIntensity > 4 
                                ? colors.warning 
                                : colors.success 
                        }
                      ]}>
                      Emotion Intensity: {log.afterEmotionIntensity}/10
                    </Text>
                  </View>
                </View>
              </View>
            </Pressable>
          ))}
        </View>
        
        <View style={styles.exerciseSection}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Thought Restructuring Exercises
          </Text>
          
          <Pressable 
            style={[
              styles.exerciseCard, 
              { backgroundColor: colors.cardBackground, borderColor: colors.border }
            ]}>
            <View style={[styles.exerciseIcon, { backgroundColor: colors.primary + '20' }]}>
              <Text style={[styles.exerciseIconText, { color: colors.primary }]}>1</Text>
            </View>
            <View style={styles.exerciseContent}>
              <Text style={[styles.exerciseTitle, { color: colors.text }]}>
                Identify Thought Distortions
              </Text>
              <Text style={[styles.exerciseDescription, { color: colors.muted }]}>
                Learn to recognize common thinking patterns that contribute to negative emotions.
              </Text>
            </View>
            <ChevronRight size={20} color={colors.muted} />
          </Pressable>
          
          <Pressable 
            style={[
              styles.exerciseCard, 
              { backgroundColor: colors.cardBackground, borderColor: colors.border }
            ]}>
            <View style={[styles.exerciseIcon, { backgroundColor: colors.secondary + '20' }]}>
              <Text style={[styles.exerciseIconText, { color: colors.secondary }]}>2</Text>
            </View>
            <View style={styles.exerciseContent}>
              <Text style={[styles.exerciseTitle, { color: colors.text }]}>
                Challenge Negative Thoughts
              </Text>
              <Text style={[styles.exerciseDescription, { color: colors.muted }]}>
                Practice questioning and challenging unhelpful thought patterns.
              </Text>
            </View>
            <ChevronRight size={20} color={colors.muted} />
          </Pressable>
          
          <Pressable 
            style={[
              styles.exerciseCard, 
              { backgroundColor: colors.cardBackground, borderColor: colors.border }
            ]}>
            <View style={[styles.exerciseIcon, { backgroundColor: colors.accent + '20' }]}>
              <Text style={[styles.exerciseIconText, { color: colors.accent }]}>3</Text>
            </View>
            <View style={styles.exerciseContent}>
              <Text style={[styles.exerciseTitle, { color: colors.text }]}>
                Develop Alternative Responses
              </Text>
              <Text style={[styles.exerciseDescription, { color: colors.muted }]}>
                Create balanced, compassionate responses to replace negative thoughts.
              </Text>
            </View>
            <ChevronRight size={20} color={colors.muted} />
          </Pressable>
        </View>
      </ScrollView>
      
      <View style={[styles.addButtonContainer, { backgroundColor: colors.background }]}>
        <Pressable 
          style={[styles.addButton, { backgroundColor: colors.primary }]}
          onPress={() => {
            setSelectedThought(null);
            setIsAddThoughtModalVisible(true);
          }}>
          <PlusCircle size={20} color="#FFF" />
          <Text style={styles.addButtonText}>New Thought Entry</Text>
        </Pressable>
      </View>

      <AddThoughtModal
        visible={isAddThoughtModalVisible}
        onClose={() => {
          setIsAddThoughtModalVisible(false);
          setSelectedThought(null);
        }}
        onSave={handleAddThought}
        initialData={selectedThought}
        mode={selectedThought ? 'edit' : 'add'}
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
  header: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    borderRadius: 8,
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    height: 40,
    marginLeft: 8,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  insightCard: {
    flexDirection: 'row',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  insightContent: {
    flex: 1,
  },
  insightTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFF',
    marginBottom: 8,
    fontFamily: 'Inter-SemiBold',
  },
  insightDescription: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 16,
    fontFamily: 'Inter-Regular',
  },
  insightButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  insightButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FFF',
    marginRight: 4,
    fontFamily: 'Inter-SemiBold',
  },
  insightIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 8,
  },
  thoughtSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    fontFamily: 'Inter-SemiBold',
  },
  thoughtCard: {
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 16,
    overflow: 'hidden',
  },
  thoughtHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  thoughtDate: {
    fontSize: 12,
    marginBottom: 4,
    fontFamily: 'Inter-Regular',
  },
  thoughtSituation: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
  },
  emotionBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
    borderWidth: 1,
  },
  emotionText: {
    fontSize: 12,
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
  },
  thoughtContent: {
    padding: 16,
  },
  thoughtLabel: {
    fontSize: 14,
    marginBottom: 4,
    fontFamily: 'Inter-Regular',
  },
  thoughtText: {
    fontSize: 16,
    marginBottom: 8,
    fontFamily: 'Inter-Regular',
  },
  emotionTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  emotionTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  emotionTagText: {
    fontSize: 12,
    fontWeight: '500',
    fontFamily: 'Inter-SemiBold',
  },
  distortionTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  distortionTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  distortionTagText: {
    fontSize: 12,
    fontWeight: '500',
    fontFamily: 'Inter-SemiBold',
  },
  afterEmotionBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
    borderWidth: 1,
  },
  afterEmotionText: {
    fontSize: 12,
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
  },
  exerciseSection: {
    marginBottom: 24,
  },
  exerciseCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
  },
  exerciseIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  exerciseIconText: {
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Inter-Bold',
  },
  exerciseContent: {
    flex: 1,
  },
  exerciseTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    fontFamily: 'Inter-SemiBold',
  },
  exerciseDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
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