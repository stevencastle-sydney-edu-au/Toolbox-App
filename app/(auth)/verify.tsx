import { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import Colors from '@/constants/Colors';

export default function VerifyScreen() {
  const router = useRouter();
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const inputRefs = useRef<TextInput[]>([]);

  const handleCodeChange = (text: string, index: number) => {
    if (text.length > 1) {
      // Handle paste
      const pastedCode = text.slice(0, 6).split('');
      const newCode = [...code];
      pastedCode.forEach((char, i) => {
        if (i + index < 6) {
          newCode[i + index] = char;
        }
      });
      setCode(newCode);
      inputRefs.current[5]?.focus();
    } else {
      const newCode = [...code];
      newCode[index] = text;
      setCode(newCode);
      
      if (text !== '' && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !code[index] && index > 0) {
      const newCode = [...code];
      newCode[index - 1] = '';
      setCode(newCode);
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    if (code.join('').length !== 6) return;
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      router.replace('/(tabs)');
    }, 1000);
  };

  useEffect(() => {
    // Auto-focus first input
    inputRefs.current[0]?.focus();
  }, []);

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Enter Login Code</Text>
          <Text style={styles.subtitle}>
            We've sent a 6-digit code to your email address
          </Text>
        </View>

        <View style={styles.form}>
          <View style={styles.codeContainer}>
            {code.map((digit, index) => (
              <TextInput
                key={index}
                ref={el => inputRefs.current[index] = el as TextInput}
                style={[
                  styles.codeInput,
                  digit && styles.codeInputFilled
                ]}
                maxLength={6}
                value={digit}
                onChangeText={(text) => handleCodeChange(text, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                keyboardType="number-pad"
              />
            ))}
          </View>

          <Pressable
            style={[
              styles.button,
              (code.join('').length !== 6 || isLoading) && styles.buttonDisabled
            ]}
            disabled={code.join('').length !== 6 || isLoading}
            onPress={handleVerify}>
            <Text style={styles.buttonText}>
              {isLoading ? 'Verifying...' : 'Verify Code'}
            </Text>
          </Pressable>

          <Pressable style={styles.resendButton}>
            <Text style={styles.resendText}>Resend Code</Text>
          </Pressable>
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
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 24,
  },
  codeInput: {
    width: 48,
    height: 56,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.light.border,
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    textAlign: 'center',
    color: Colors.light.text,
    backgroundColor: Colors.light.cardBackground,
  },
  codeInputFilled: {
    borderColor: Colors.light.primary,
    backgroundColor: Colors.light.primary + '10',
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
  resendButton: {
    alignItems: 'center',
    padding: 16,
  },
  resendText: {
    color: Colors.light.primary,
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
});