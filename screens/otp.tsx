import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

export default function OTPScreen() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef<(TextInput | null)[]>([]);
  const router = useRouter();

  const handleOtpChange = (value: string, index: number) => {
    if (value.length > 1) {
      value = value.charAt(0);
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header with Icon */}
        <View style={styles.headerContainer}>
          <View style={styles.iconCircle}>
            <Ionicons name="car-outline" size={36} color="#222222" />
          </View>
          <Text style={styles.appName}>hepps</Text>
        </View>

        {/* Main Card */}
        <View style={styles.card}>
          <Text style={styles.title}>Verify Your Number</Text>
          <Text style={styles.subtitle}>
            We&apos;ve sent a 6-digit code to{'\n'}
            <Text style={styles.phoneNumber}>+1 (555) 123-4567</Text>
          </Text>

          {/* OTP Input */}
          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <View key={index} style={styles.otpInputWrapper}>
                <TextInput
                  ref={(ref: TextInput | null) => {
                    if (ref) {
                      inputRefs.current[index] = ref;
                    }
                  }}
                  style={[
                    styles.otpInput,
                    digit ? styles.otpInputFilled : null
                  ]}
                  value={digit}
                  onChangeText={(value) => handleOtpChange(value, index)}
                  onKeyPress={(e) => handleKeyPress(e, index)}
                  keyboardType="number-pad"
                  maxLength={1}
                  selectTextOnFocus
                />
              </View>
            ))}
          </View>

          {/* Timer */}
          <View style={styles.timerContainer}>
            <Ionicons name="time-outline" size={16} color="#777777" />
            <Text style={styles.timerText}>Code expires in 2:45</Text>
          </View>

          <TouchableOpacity style={styles.primaryButton} onPress={() => router.replace('/(tabs)/nearby')}>
            <Text style={styles.primaryButtonText}>Verify & Continue</Text>
          </TouchableOpacity>

          {/* Resend */}
          <View style={styles.resendContainer}>
            <Text style={styles.resendText}>Didn&apos;t receive the code? </Text>
            <TouchableOpacity>
              <Text style={styles.resendLink}>Resend</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Change Number Link */}
        <TouchableOpacity style={styles.changeNumberButton} onPress={() => router.back()}>
          <Ionicons name="create-outline" size={18} color="#555555" />
          <Text style={styles.changeNumberText}>Change Phone Number</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F0F7F1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  appName: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 32,
    color: '#222222',
    marginBottom: 12,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#d3efd1',
    borderRadius: 24,
    padding: 28,
  },
  title: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 24,
    color: '#222222',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 14,
    color: '#555555',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 20,
  },
  phoneNumber: {
    fontFamily: 'Manrope_600SemiBold',
    color: '#222222',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 24,
  },
  otpInputWrapper: {
    width: 40,
    height: 50,
  },
  otpInput: {
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
    borderBottomWidth: 2,
    borderBottomColor: '#000',
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 24,
    color: '#222222',
    textAlign: 'center',
    paddingBottom: 8,
  },
  otpInputFilled: {
    borderBottomColor: '#222222',
  },
  timerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    marginBottom: 24,
  },
  timerText: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 13,
    color: '#777777',
  },
  primaryButton: {
    backgroundColor: '#222222',
    borderRadius: 16,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  primaryButtonText: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  resendText: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 14,
    color: '#555555',
  },
  resendLink: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 14,
    color: '#222222',
    textDecorationLine: 'underline',
  },
  changeNumberButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
    gap: 6,
  },
  changeNumberText: {
    fontFamily: 'Manrope_500Medium',
    fontSize: 14,
    color: '#555555',
  },
});

