import { recentActivities, upcomingItems, progressStats, mealPlans, thoughtLogs, goals } from '@/utils/sampleData';

// In-memory storage
let foodEntries = [...recentActivities.filter(activity => activity.type === 'FOOD')];
let thoughtEntries = [...thoughtLogs];
let goalEntries = [...goals];
let mealPlanEntries = [...mealPlans];

export const resolvers = {
  Query: {
    me: () => ({
      id: '1',
      name: 'Sarah',
      email: 'sarah@example.com',
      stats: progressStats,
    }),
    foodEntries: (_, { date }) => {
      return foodEntries
        .filter(entry => entry.date === date)
        .map(entry => ({
          id: entry.id,
          title: entry.title,
          time: entry.time,
          description: entry.description,
          date: entry.date,
          tags: entry.tags || [],
        }));
    },
    thoughtLogs: () => thoughtEntries,
    goals: () => goalEntries,
    mealPlans: () => mealPlanEntries,
    recentActivities: (_, { date }) => {
      return [...foodEntries, ...recentActivities.filter(activity => activity.type !== 'FOOD')]
        .filter(activity => activity.date === date);
    },
    upcomingItems: () => upcomingItems,
  },
  Mutation: {
    login: (_, { email }) => {
      return { token: null };
    },
    verifyCode: (_, { code }) => {
      return { token: 'mock_token' };
    },
    addFoodEntry: (_, { input }) => {
      const newEntry = {
        id: input.id || String(Date.now()),
        type: 'FOOD',
        ...input,
        date: new Date().toISOString().split('T')[0],
      };
      
      if (input.id) {
        // Update existing entry
        const index = foodEntries.findIndex(entry => entry.id === input.id);
        if (index !== -1) {
          foodEntries[index] = newEntry;
        }
      } else {
        // Add new entry
        foodEntries.push(newEntry);
      }
      return newEntry;
    },
    addThoughtLog: (_, { input }) => {
      const newLog = {
        id: input.id || String(Date.now()),
        date: new Date().toISOString().split('T')[0],
        time: new Date().toLocaleTimeString(),
        afterEmotionIntensity: Math.floor(input.emotionIntensity / 2),
        ...input,
      };
      
      if (input.id) {
        // Update existing log
        const index = thoughtEntries.findIndex(log => log.id === input.id);
        if (index !== -1) {
          thoughtEntries[index] = newLog;
        }
      } else {
        // Add new log
        thoughtEntries.push(newLog);
      }
      return newLog;
    },
    addGoal: (_, { input }) => {
      const newGoal = {
        id: input.id || String(Date.now()),
        status: input.id ? goalEntries.find(g => g.id === input.id)?.status || 'NOT_STARTED' : 'NOT_STARTED',
        steps: input.steps.map((step, index) => ({
          id: `${input.id || Date.now()}-${index}`,
          description: step.description,
          completed: step.completed || false,
        })),
        ...input,
      };
      
      if (input.id) {
        // Update existing goal
        const index = goalEntries.findIndex(goal => goal.id === input.id);
        if (index !== -1) {
          goalEntries[index] = newGoal;
        }
      } else {
        // Add new goal
        goalEntries.push(newGoal);
      }
      return newGoal;
    },
    updateGoalStep: (_, { goalId, stepId, completed }) => {
      const goalIndex = goalEntries.findIndex(g => g.id === goalId);
      if (goalIndex === -1) throw new Error('Goal not found');
      
      const goal = goalEntries[goalIndex];
      const updatedSteps = goal.steps.map(step =>
        step.id === stepId ? { ...step, completed } : step
      );
      
      const updatedGoal = { ...goal, steps: updatedSteps };
      goalEntries[goalIndex] = updatedGoal;
      
      return updatedGoal;
    },
    createMealPlan: (_, { input }) => {
      const newPlan = {
        id: input.id || String(Date.now()),
        day: new Date(input.date).toLocaleDateString('en-US', { weekday: 'long' }),
        date: input.date,
        meals: input.meals.map((meal, index) => ({
          id: `${input.id || Date.now()}-${index}`,
          ...meal,
        })),
      };
      
      if (input.id) {
        // Update existing plan
        const index = mealPlanEntries.findIndex(plan => plan.id === input.id);
        if (index !== -1) {
          mealPlanEntries[index] = newPlan;
        }
      } else {
        // Add new plan
        mealPlanEntries.push(newPlan);
      }
      return newPlan;
    },
  },
};