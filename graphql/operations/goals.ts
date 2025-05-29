import { gql } from '@apollo/client';

export const GET_GOALS = gql`
  query GetGoals {
    goals {
      id
      title
      description
      category
      targetDate
      status
      steps {
        id
        description
        completed
      }
    }
  }
`;

export const ADD_GOAL = gql`
  mutation AddGoal($input: GoalInput!) {
    addGoal(input: $input) {
      id
      title
      description
      category
      targetDate
      status
      steps {
        id
        description
        completed
      }
    }
  }
`;

export const UPDATE_GOAL_STEP = gql`
  mutation UpdateGoalStep($goalId: ID!, $stepId: ID!, $completed: Boolean!) {
    updateGoalStep(goalId: $goalId, stepId: $stepId, completed: $completed) {
      id
      steps {
        id
        description
        completed
      }
    }
  }
`;