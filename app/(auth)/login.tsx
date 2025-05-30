import { useState } from 'react';
import { View, Text, TextInput, Pressable, Image, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Mail } from 'lucide-react-native';
import { useMutation } from '@apollo/client';
import { LOGIN } from '@/graphql/operations/auth';
import Colors from '@/constants/Colors';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [loginError, setLoginError] = useState('');
  
  const [login, { loading }] = useMutation(LOGIN, {
    onCompleted: () => {
      router.push('/verify');
    },
    onError: (error) => {
      setLoginError(error.message);
    },
  });

  const handleLogin = async () => {
    if (!email) return;
    
    try {
      await login({ variables: { email } });
    } catch (error) {
      // Error is handled by onError callback
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Image
            source={require('@/assets/images/ioilogo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.title}>eClinic Toolbox</Text>
          <Text style={styles.subtitle}>
            Enter your email address to receive a login code
          </Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Mail size={20} color={Colors.light.muted} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Email address"
              placeholderTextColor={Colors.light.muted}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                setLoginError(''); // Clear error when user types
              }}
            />
          </View>

          {loginError ? (
            <Text style={styles.errorText}>{loginError}</Text>
          ) : null}

          <Pressable
            style={[
              styles.button,
              (!email || loading) && styles.buttonDisabled
            ]}
            disabled={!email || loading}
            onPress={handleLogin}>
            <Text style={styles.buttonText}>
              {loading ? 'Sending Code...' : 'Send Login Code'}
            </Text>
          </Pressable>

          <Pressable style={styles.createAccountButton}>
            <Text style={styles.createAccountText}>Create New Account</Text>
          </Pressable>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            By continuing, you agree to our{' '}
            <Text style={styles.link}>Terms of Service</Text> and{' '}
            <Text style={styles.link}>Privacy Policy</Text>
          </Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  logo: {
    width: 200,
    height: 100,
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: Colors.light.text,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: Colors.light.muted,
    textAlign: 'center',
  },
  form: {
    gap: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.light.cardBackground,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.light.border,
    paddingHorizontal: 16,
    height: 56,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: Colors.light.text,
  },
  errorText: {
    color: Colors.light.error,
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    marginTop: -8,
  },
  button: {
    backgroundColor: Colors.light.primary,
    height: 56,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  createAccountButton: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  createAccountText: {
    color: Colors.light.primary,
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    textDecorationLine: 'underline',
  },
  footer: {
    marginTop: 32,
  },
  footerText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: Colors.light.muted,
    textAlign: 'center',
    lineHeight: 20,
  },
  link: {
    color: Colors.light.primary,
    textDecorationLine: 'underline',
  },
});