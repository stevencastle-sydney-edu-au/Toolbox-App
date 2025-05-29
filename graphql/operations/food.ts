import { gql } from '@apollo/client';

export const GET_FOOD_ENTRIES = gql`
  query GetFoodEntries($date: String!) {
    foodEntries(date: $date) {
      id
      title
      time
      description
      date
      tags
    }
  }
`;

export const ADD_FOOD_ENTRY = gql`
  mutation AddFoodEntry($input: FoodEntryInput!) {
    addFoodEntry(input: $input) {
      id
      title
      time
      description
      date
      tags
    }
  }
`;