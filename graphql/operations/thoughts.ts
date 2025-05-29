import { gql } from '@apollo/client';

export const GET_THOUGHT_LOGS = gql`
  query GetThoughtLogs {
    thoughtLogs {
      id
      date
      time
      situation
      automaticThought
      emotionIntensity
      emotions
      distortionTypes
      rationalResponse
      afterEmotionIntensity
    }
  }
`;

export const ADD_THOUGHT_LOG = gql`
  mutation AddThoughtLog($input: ThoughtLogInput!) {
    addThoughtLog(input: $input) {
      id
      date
      time
      situation
      automaticThought
      emotionIntensity
      emotions
      distortionTypes
      rationalResponse
      afterEmotionIntensity
    }
  }
`;