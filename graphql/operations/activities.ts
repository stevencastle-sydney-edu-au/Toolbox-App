import { gql } from '@apollo/client';

export const GET_RECENT_ACTIVITIES = gql`
  query GetRecentActivities($date: String!) {
    recentActivities(date: $date) {
      id
      title
      time
      type
      description
      date
    }
  }
`;

export const GET_UPCOMING_ITEMS = gql`
  query GetUpcomingItems {
    upcomingItems {
      id
      title
      date
      time
      type
    }
  }
`;