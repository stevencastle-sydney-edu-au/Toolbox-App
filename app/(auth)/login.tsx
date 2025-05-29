import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Mail } from 'lucide-react-native';

export default function LoginScreen() {
  const router = useRouter();
  
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Enter your email to receive a login code</Text>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Mail size={20} color="#6C7781" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Email address"
              placeholderTextColor="#6C7781"
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
            />
          </View>

          <Pressable 
            style={styles.button}
            onPress={() => router.replace('/(tabs)')}>
            <Text style={styles.buttonText}>Send Login Code</Text>
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
    </View>
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
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#2C3338',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#6C7781',
    textAlign: 'center',
    marginBottom: 32,
  },
  form: {
    gap: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E4E7',
    paddingHorizontal: 16,
    height: 56,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#2C3338',
  },
  button: {
    backgroundColor: '#69bdd2',
    height: 56,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  createAccountButton: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  createAccountText: {
    color: '#69bdd2',
    fontSize: 16,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  footer: {
    marginTop: 32,
  },
  footerText: {
    fontSize: 14,
    color: '#6C7781',
    textAlign: 'center',
    lineHeight: 20,
  },
  link: {
    color: '#69bdd2',
    textDecorationLine: 'underline',
  },
});