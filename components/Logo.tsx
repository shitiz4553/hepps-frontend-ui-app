import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface LogoProps {
  showAppName?: boolean;
  tagline?: string;
}

export default function Logo({ showAppName = true, tagline }: LogoProps) {
  return (
    <View style={styles.container}>
      <View style={styles.iconCircle}>
        <Ionicons name="car-outline" size={36} color="#222222" />
      </View>
      {showAppName && (
        <Text style={styles.appName}>hepps</Text>
      )}
      {tagline && (
        <Text style={styles.tagline}>{tagline}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 40,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F0F7F1',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
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
});

