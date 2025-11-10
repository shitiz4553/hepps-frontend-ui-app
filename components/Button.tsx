import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  icon?: keyof typeof Ionicons.glyphMap;
  style?: ViewStyle;
}

export default function Button({ 
  title, 
  onPress, 
  variant = 'primary', 
  icon,
  style 
}: ButtonProps) {
  const isPrimary = variant === 'primary';

  return (
    <TouchableOpacity 
      style={[
        styles.button, 
        isPrimary ? styles.primaryButton : styles.secondaryButton,
        style
      ]} 
      onPress={onPress}
    >
      {icon && (
        <Ionicons 
          name={icon} 
          size={20} 
          color={isPrimary ? '#FFFFFF' : '#555555'} 
          style={styles.icon} 
        />
      )}
      <Text style={[
        styles.text,
        isPrimary ? styles.primaryText : styles.secondaryText
      ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 16,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  primaryButton: {
    backgroundColor: '#222222',
  },
  secondaryButton: {
    backgroundColor: '#FAFAFA',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    height: 52,
  },
  icon: {
    marginRight: 8,
  },
  text: {
    fontSize: 16,
  },
  primaryText: {
    fontFamily: 'Manrope_600SemiBold',
    color: '#FFFFFF',
  },
  secondaryText: {
    fontFamily: 'Manrope_500Medium',
    fontSize: 15,
    color: '#555555',
  },
});

