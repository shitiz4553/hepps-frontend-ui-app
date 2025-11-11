import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Add, Scan } from 'iconsax-react-native';
import { useRouter } from 'expo-router';
import { colors } from '@/constants/colors';
import { VehicleCard, ActionCard } from '@/components';
import { vehiclesData } from '@/data/vehicles';

export default function VehiclesScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.title}>Vehicles</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Action Cards */}
        <View style={styles.actionCards}>
          <ActionCard
            icon={<Add size={24} color={colors.text.primary} variant="Bold" />}
            title="Add Manually"
            subtitle="Enter details"
            onPress={() => router.push('/addVehicle')}
          />
          <ActionCard
            icon={<Scan size={24} color={colors.text.primary} variant="Bold" />}
            title="Scan QR Code"
            subtitle="Quick add"
            onPress={() => {/* Handle scan */}}
          />
        </View>

        {/* My Vehicles Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>My Vehicles</Text>
          {vehiclesData.map((vehicle) => (
            <VehicleCard
              key={vehicle.id}
              name={vehicle.name}
              brand={`${vehicle.brand} ${vehicle.make}`}
              fuel={vehicle.fuelType}
              registrationNumber={vehicle.registrationNumber}
              onQRPress={() => console.log('Show QR for', vehicle.name)}
            />
          ))}
          {vehiclesData.length === 0 && (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No vehicles added yet</Text>
              <Text style={styles.emptySubtext}>Add your first vehicle to get started</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  backButton: {
    padding: 4,
  },
  title: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 20,
    color: colors.text.primary,
  },
  content: {
    flex: 1,
  },
  actionCards: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  section: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  sectionTitle: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 18,
    color: colors.text.primary,
    marginBottom: 16,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 16,
    color: colors.text.primary,
    marginBottom: 8,
  },
  emptySubtext: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 14,
    color: colors.text.secondary,
  },
});

