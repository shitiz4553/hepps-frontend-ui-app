import React from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface InputProps extends TextInputProps {
  label: string;
  icon?: keyof typeof Ionicons.glyphMap;
  countryCode?: string;
  containerStyle?: ViewStyle;
}

export default function Input({ 
  label, 
  icon, 
  countryCode, 
  containerStyle,
  ...textInputProps 
}: InputProps) {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputWrapper}>
        {icon && (
          <Ionicons name={icon} size={20} color="#AAAAAA" style={styles.icon} />
        )}
        {countryCode && (
          <Text style={styles.countryCode}>{countryCode}</Text>
        )}
        <TextInput
          style={styles.input}
          placeholderTextColor="#AAAAAA"
          {...textInputProps}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontFamily: 'Manrope_500Medium',
    fontSize: 14,
    color: '#222222',
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    paddingHorizontal: 16,
    height: 56,
  },
  icon: {
    marginRight: 12,
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
});

