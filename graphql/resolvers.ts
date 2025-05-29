import { recentActivities, upcomingItems, progressStats, mealPlans, thoughtLogs, goals } from '@/utils/sampleData';

export const resolvers = {
  Query: {
    me: () => ({
      id: '1',
      name: 'Sarah',
      email: 'sarah@example.com',
      stats: progressStats,
    }),
    foodEntries: (_, { date }) => {
      return recentActivities
        .filter(activity => activity.type === 'food' && activity.date === date)
        .map(entry => ({
          id: entry.id,
          title: entry.title,
          time: entry.time,
          description: entry.description,
          date: entry.date,
          tags: [],
        }));
    },
    thoughtLogs: () => thoughtLogs,
    goals: () => goals,
    mealPlans: () => mealPlans,
    recentActivities: (_, { date }) => {
      return recentActivities.filter(activity => activity.date === date);
    },
    upcomingItems: () => upcomingItems,
  },
  Mutation: {
    login: (_, { email }) => {
      // Mock login response
      return { token: null };
    },
    verifyCode: (_, { code }) => {
      // Mock verification response
      return { token: 'mock_token' };
    },
    addFoodEntry: (_, { input }) => {
      const newEntry = {
        id: String(Date.now()),
        ...input,
        date: new Date().toISOString().split('T')[0],
      };
      return newEntry;
    },
    addThoughtLog: (_, { input }) => {
      const newLog = {
        id: String(Date.now()),
        date: new Date().toISOString().split('T')[0],
        time: new Date().toLocaleTimeString(),
        afterEmotionIntensity: Math.floor(input.emotionIntensity / 2),
        ...input,
      };
      return newLog;
    },
    addGoal: (_, { input }) => {
      const newGoal = {
        id: String(Date.now()),
        status: 'NOT_STARTED',
        steps: input.steps.map((step, index) => ({
          id: `${Date.now()}-${index}`,
          description: step.description,
          completed: false,
        })),
        ...input,
      };
      return newGoal;
    },
    updateGoalStep: (_, { goalId, stepId, completed }) => {
      const goal = goals.find(g => g.id === goalId);
      if (!goal) throw new Error('Goal not found');
      
      const updatedSteps = goal.steps.map(step =>
        step.id === stepId ? { ...step, completed } : step
      );
      
      return {
        ...goal,
        steps: updatedSteps,
      };
    },
    createMealPlan: (_, { input }) => {
      const newPlan = {
        id: String(Date.now()),
        day: new Date(input.date).toLocaleDateString('en-US', { weekday: 'long' }),
        date: input.date,
        meals: input.meals.map((meal, index) => ({
          id: `${Date.now()}-${index}`,
          ...meal,
        })),
      };
      return newPlan;
    },
  },
};