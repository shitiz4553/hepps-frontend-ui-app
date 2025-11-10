import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
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

export default function LoginScreen() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const router = useRouter();

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Logo Area */}
        <View style={styles.logoContainer}>
          <View style={styles.logoCircle}>
            <Ionicons name="car-outline" size={36} color="#222222" />
          </View>
          <Text style={styles.appName}>hepps</Text>
          <Text style={styles.tagline}>Simplify your driving experience</Text>
        </View>

        {/* Login Card */}
        <View style={styles.card}>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Continue with your phone number</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Phone Number</Text>
            <View style={styles.phoneInputWrapper}>
              <Text style={styles.countryCode}>+1</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your phone number"
                placeholderTextColor="#AAAAAA"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
              />
            </View>
          </View>

          <TouchableOpacity style={styles.primaryButton} onPress={() => router.push('/otp')}>
            <Text style={styles.primaryButtonText}>Continue</Text>
          </TouchableOpacity>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.dividerLine} />
          </View>

          <TouchableOpacity style={styles.secondaryButton}>
            <Ionicons name="location-outline" size={20} color="#555555" style={styles.buttonIcon} />
            <Text style={styles.secondaryButtonText}>Find Services</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryButton}>
            <Ionicons name="navigate-outline" size={20} color="#555555" style={styles.buttonIcon} />
            <Text style={styles.secondaryButtonText}>Track Trips</Text>
          </TouchableOpacity>
        </View>

        {/* Sign Up Link */}
        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Don&apos;t have an account? </Text>
          <TouchableOpacity onPress={() => router.push('/registration')}>
            <Text style={styles.signupLink}>Sign Up</Text>
          </TouchableOpacity>
        </View>
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
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoCircle: {
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
    marginBottom: 4,
    textAlign: 'center',
  },
  tagline: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 14,
    color: '#555555',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#d3efd1',
    borderRadius: 24,
    padding: 28,
  },
  title: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 28,
    color: '#222222',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 14,
    color: '#555555',
    textAlign: 'center',
    marginBottom: 32,
  },
  inputContainer: {
    marginBottom: 24,
  },
  label: {
    fontFamily: 'Manrope_500Medium',
    fontSize: 14,
    color: '#222222',
    marginBottom: 8,
  },
  phoneInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    paddingHorizontal: 16,
    height: 56,
  },
  countryCode: {
    fontFamily: 'Manrope_500Medium',
    fontSize: 16,
    color: '#222222',
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontFamily: 'Manrope_400Regular',
    fontSize: 16,
    color: '#222222',
  },
  primaryButton: {
    backgroundColor: '#222222',
    borderRadius: 16,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  primaryButtonText: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom:20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E5E5',
  },
  dividerText: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 13,
    color: '#AAAAAA',
    marginHorizontal: 12,
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FAFAFA',
    borderRadius: 16,
    height: 52,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  buttonIcon: {
    marginRight: 8,
  },
  secondaryButtonText: {
    fontFamily: 'Manrope_500Medium',
    fontSize: 15,
    color: '#555555',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  signupText: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 14,
    color: '#555555',
  },
  signupLink: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 14,
    color: '#222222',
    textDecorationLine: 'underline',
  },
});
