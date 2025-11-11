import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft } from 'iconsax-react-native';
import { useRouter } from 'expo-router';
import { colors } from '@/constants/colors';
import { Dropdown } from '@/components';
import { vehicleTypes, fuelTypes, fuelBrands, batteryBrands } from '@/data/vehicles';

export default function AddVehicleScreen() {
  const router = useRouter();

  const [nickname, setNickname] = useState('');
  const [vehicleType, setVehicleType] = useState('Select one');
  const [make, setMake] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [fuelType, setFuelType] = useState('Select one');
  const [fuelBrandPreference, setFuelBrandPreference] = useState('Select one');
  const [batteryBrandPreference, setBatteryBrandPreference] = useState('Select one');

  const vehicleTypeOptions = ['Select one', ...vehicleTypes];
  const fuelTypeOptions = ['Select one', ...fuelTypes];
  const fuelBrandOptions = ['Select one', ...fuelBrands];
  const batteryBrandOptions = ['Select one', ...batteryBrands];

  const isFormValid = () => {
    return (
      nickname &&
      vehicleType !== 'Select one' &&
      make &&
      registrationNumber &&
      fuelType !== 'Select one'
    );
  };

  const handleSave = () => {
    if (isFormValid()) {
      console.log({
        nickname,
        vehicleType,
        make,
        registrationNumber,
        fuelType,
        fuelBrandPreference,
        batteryBrandPreference,
      });
      router.back();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.title}>Add New Vehicle</Text>
        <TouchableOpacity
          onPress={handleSave}
          disabled={!isFormValid()}
        >
          <Text style={[
            styles.saveButton,
            !isFormValid() && styles.saveButtonDisabled
          ]}>
            Save
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Vehicle Information Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Vehicle Information</Text>
          
          {/* Nickname */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Give your vehicle a nickname</Text>
            <TextInput
              style={styles.input}
              placeholder="My Car, Work Vehicle, Weekend Ride..."
              placeholderTextColor={colors.text.secondary}
              value={nickname}
              onChangeText={setNickname}
            />
            <Text style={styles.hint}>This helps you identify your vehicle easily</Text>
          </View>

          {/* Vehicle Type */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Vehicle Type</Text>
            <Dropdown
              label=""
              options={vehicleTypeOptions}
              selectedValue={vehicleType}
              onSelect={setVehicleType}
            />
          </View>

          {/* Make */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Make *</Text>
            <TextInput
              style={styles.input}
              placeholder="Toyota, Honda, Maruti..."
              placeholderTextColor={colors.text.secondary}
              value={make}
              onChangeText={setMake}
            />
          </View>

          {/* Registration Number */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Registration Number</Text>
            <TextInput
              style={styles.input}
              placeholder="AB12CD3456"
              placeholderTextColor={colors.text.secondary}
              value={registrationNumber}
              onChangeText={setRegistrationNumber}
              autoCapitalize="characters"
            />
          </View>

          {/* Fuel Type */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Fuel Type</Text>
            <Dropdown
              label=""
              options={fuelTypeOptions}
              selectedValue={fuelType}
              onSelect={setFuelType}
            />
          </View>
        </View>

        {/* Service Preferences Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Service Preferences</Text>
          
          {/* Fuel Brand Preference */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Fuel Brand Preference</Text>
            <Dropdown
              label=""
              options={fuelBrandOptions}
              selectedValue={fuelBrandPreference}
              onSelect={setFuelBrandPreference}
            />
          </View>

          {/* Battery Brand Preference */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Battery Brand Preference</Text>
            <Dropdown
              label=""
              options={batteryBrandOptions}
              selectedValue={batteryBrandPreference}
              onSelect={setBatteryBrandPreference}
            />
          </View>
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
    flex: 1,
    textAlign: 'center',
  },
  saveButton: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 16,
    color: '#007AFF',
  },
  saveButtonDisabled: {
    color: colors.text.secondary,
  },
  content: {
    flex: 1,
  },
  section: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 20,
    marginTop: 20,
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  sectionTitle: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 18,
    color: colors.text.primary,
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 14,
    color: colors.text.primary,
    marginBottom: 8,
  },
  input: {
    backgroundColor: colors.background.secondary,
    borderRadius: 16,
    padding: 16,
    fontFamily: 'Manrope_500Medium',
    fontSize: 15,
    color: colors.text.primary,
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  hint: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 12,
    color: colors.text.secondary,
    marginTop: 6,
  },
});

