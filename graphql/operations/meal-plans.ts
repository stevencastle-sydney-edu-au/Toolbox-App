import { gql } from '@apollo/client';

export const GET_MEAL_PLANS = gql`
  query GetMealPlans {
    mealPlans {
      id
      day
      date
      meals {
        id
        time
        title
        description
      }
    }
  }
`;

export const CREATE_MEAL_PLAN = gql`
  mutation CreateMealPlan($input: MealPlanInput!) {
    createMealPlan(input: $input) {
      id
      day
      date
      meals {
        id
        time
        title
        description
      }
    }
  }
`;