import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation Login($email: String!) {
    login(email: $email) {
      token
    }
  }
`;

export const VERIFY_CODE = gql`
  mutation VerifyCode($code: String!) {
    verifyCode(code: $code) {
      token
    }
  }
`;