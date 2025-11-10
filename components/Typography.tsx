import React from 'react';
import { Text, StyleSheet, TextStyle } from 'react-native';

interface TypographyProps {
  children: React.ReactNode;
  variant?: 'title' | 'subtitle' | 'body' | 'link';
  style?: TextStyle;
  onPress?: () => void;
}

export default function Typography({ 
  children, 
  variant = 'body', 
  style,
  onPress 
}: TypographyProps) {
  const textStyle = [
    styles.base,
    variant === 'title' && styles.title,
    variant === 'subtitle' && styles.subtitle,
    variant === 'body' && styles.body,
    variant === 'link' && styles.link,
    style,
  ];

  return (
    <Text style={textStyle} onPress={onPress}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  base: {
    color: '#222222',
  },
  title: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 28,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 14,
    color: '#555555',
    textAlign: 'center',
    marginBottom: 32,
  },
  body: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 14,
    color: '#555555',
  },
  link: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 14,
    color: '#222222',
    textDecorationLine: 'underline',
  },
});

