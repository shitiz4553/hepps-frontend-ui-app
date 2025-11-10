import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Car, ScanBarcode } from 'iconsax-react-native';
import { colors } from '@/constants/colors';

interface VehicleCardProps {
  name: string;
  brand: string;
  fuel: string;
  registrationNumber?: string;
  onQRPress?: () => void;
}

export default function VehicleCard({ 
  name, 
  brand, 
  fuel, 
  registrationNumber,
  onQRPress 
}: VehicleCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.iconContainer}>
        <Car size={28} color={colors.text.primary} variant="Bold" />
      </View>
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>{name}</Text>
        <Text style={styles.details}>
          {brand} • {fuel}
        </Text>
        {registrationNumber && (
          <Text style={styles.registration}>{registrationNumber}</Text>
        )}
      </View>
      <TouchableOpacity style={styles.qrButton} onPress={onQRPress}>
        <ScanBarcode size={20} color={colors.white} variant="Bold" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: colors.background.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  name: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 16,
    color: colors.text.primary,
    marginBottom: 4,
  },
  details: {
    fontFamily: 'Manrope_500Medium',
    fontSize: 13,
    color: colors.text.secondary,
    marginBottom: 2,
  },
  registration: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 12,
    color: colors.text.secondary,
  },
  qrButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.text.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

