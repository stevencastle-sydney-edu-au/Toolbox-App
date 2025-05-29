import { Stack, Redirect } from 'expo-router';
import { useQuery } from '@apollo/client';
import { GET_USER } from '@/graphql/operations/user';

export default function AuthLayout() {
  const { data, loading } = useQuery(GET_USER);

  // If we have user data, redirect to the main app
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