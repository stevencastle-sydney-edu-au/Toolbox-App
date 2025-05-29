import { Stack, Redirect } from 'expo-router';
import { useQuery } from '@apollo/client';
import { GET_USER } from '@/graphql/operations/user';

export default function AuthLayout() {
  const { data, loading } = useQuery(GET_USER, {
    fetchPolicy: 'network-only', // Don't use cache for auth checks
  });

  // Only redirect if we have confirmed user data
  if (!loading && data?.me) {
    return <Redirect href="/(tabs)" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="verify" />
    </Stack>
  );
}