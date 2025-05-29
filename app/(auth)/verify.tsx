import { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useMutation } from '@apollo/client';
import { VERIFY_CODE } from '@/graphql/operations/auth';
import Colors from '@/constants/Colors';

export default function VerifyScreen() {
  const router = useRouter();
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [verifyError, setVerifyError] = useState('');
  const inputRefs = useRef<TextInput[]>([]);

  const [verifyCode, { loading }] = useMutation(VERIFY_CODE, {
    onCompleted: (data) => {
      if (data.verifyCode.token) {
        router.replace('/(tabs)');
      }
    },
    onError: (error) => {
      setVerifyError(error.message);
    },
  });

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

    // Clear error when user types
    setVerifyError('');
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !code[index] && index > 0) {
      const newCode = [...code];
      newCode[index - 1] = '';
      setCode(newCode);
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const verificationCode = code.join('');
    if (verificationCode.length !== 6) return;
    
    try {
      await verifyCode({ variables: { code: verificationCode } });
    } catch (error) {
      // Error is handled by onError callback
    }
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
                  digit && styles.codeInputFilled,
                  verifyError && styles.codeInputError
                ]}
                maxLength={6}
                value={digit}
                onChangeText={(text) => handleCodeChange(text, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                keyboardType="number-pad"
              />
            ))}
          </View>

          {verifyError ? (
            <Text style={styles.errorText}>{verifyError}</Text>
          ) : null}

          <Pressable
            style={[
              styles.button,
              (code.join('').length !== 6 || loading) && styles.buttonDisabled
            ]}
            disabled={code.join('').length !== 6 || loading}
            onPress={handleVerify}>
            <Text style={styles.buttonText}>
              {loading ? 'Verifying...' : 'Verify Code'}
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
  codeInputError: {
    borderColor: Colors.light.error,
    backgroundColor: Colors.light.error + '10',
  },
  errorText: {
    color: Colors.light.error,
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
    marginTop: -16,
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