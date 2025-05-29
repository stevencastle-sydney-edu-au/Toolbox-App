import { gql } from '@apollo/client';

export const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    stats: UserStats!
  }

  type UserStats {
    daysActive: Int!
    entriesLogged: Int!
    goalsCompleted: Int!
    streak: Int!
  }

  type FoodEntry {
    id: ID!
    title: String!
    time: String!
    description: String
    date: String!
    tags: [String!]
  }

  type ThoughtEntry {
    id: ID!
    date: String!
    time: String!
    situation: String!
    automaticThought: String!
    emotionIntensity: Int!
    emotions: [String!]!
    distortionTypes: [String!]!
    rationalResponse: String!
    afterEmotionIntensity: Int!
  }

  type Goal {
    id: ID!
    title: String!
    description: String!
    category: String!
    targetDate: String!
    status: GoalStatus!
    steps: [GoalStep!]!
  }

  type GoalStep {
    id: ID!
    description: String!
    completed: Boolean!
  }

  type Meal {
    id: ID!
    time: String!
    title: String!
    description: String!
  }

  type MealPlan {
    id: ID!
    day: String!
    date: String!
    meals: [Meal!]!
  }

  enum GoalStatus {
    NOT_STARTED
    IN_PROGRESS
    COMPLETED
  }

  type Query {
    me: User
    foodEntries(date: String!): [FoodEntry!]!
    thoughtLogs: [ThoughtEntry!]!
    goals: [Goal!]!
    mealPlans: [MealPlan!]!
    recentActivities(date: String!): [Activity!]!
    upcomingItems: [UpcomingItem!]!
  }

  type Activity {
    id: ID!
    title: String!
    time: String!
    type: ActivityType!
    description: String
    date: String!
  }

  type UpcomingItem {
    id: ID!
    title: String!
    date: String!
    time: String!
    type: String!
  }

  enum ActivityType {
    FOOD
    THOUGHT
    GOAL
    MEAL_PLAN
    CHECK
  }

  type Mutation {
    login(email: String!): AuthPayload!
    verifyCode(code: String!): AuthPayload!
    addFoodEntry(input: FoodEntryInput!): FoodEntry!
    addThoughtLog(input: ThoughtLogInput!): ThoughtEntry!
    addGoal(input: GoalInput!): Goal!
    updateGoalStep(goalId: ID!, stepId: ID!, completed: Boolean!): Goal!
    createMealPlan(input: MealPlanInput!): MealPlan!
  }

  input FoodEntryInput {
    title: String!
    time: String!
    description: String
    tags: [String!]
  }

  input ThoughtLogInput {
    situation: String!
    automaticThought: String!
    emotions: [String!]!
    emotionIntensity: Int!
    distortionTypes: [String!]!
    rationalResponse: String!
  }

  input GoalInput {
    title: String!
    description: String!
    category: String!
    targetDate: String!
    steps: [GoalStepInput!]!
  }

  input GoalStepInput {
    description: String!
  }

  input MealPlanInput {
    date: String!
    meals: [MealInput!]!
  }

  input MealInput {
    time: String!
    title: String!
    description: String!
  }

  type AuthPayload {
    token: String
  }
`;