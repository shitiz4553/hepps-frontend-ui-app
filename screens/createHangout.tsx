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
import { ArrowLeft, SearchNormal1, User, Add, CloseCircle } from 'iconsax-react-native';
import { useRouter } from 'expo-router';
import { colors } from '@/constants/colors';
import { companionsData, vehiclesData } from '@/data/companions';
import Dropdown from '@/components/Dropdown';
import type { Companion } from '@/data/companions';

export default function CreateHangoutScreen() {
  const router = useRouter();
  const [hangoutName, setHangoutName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCompanions, setSelectedCompanions] = useState<Companion[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState('Select one');
  const [showSearch, setShowSearch] = useState(false);

  // Convert vehicles to simple string array for dropdown
  const vehicleOptions = ['Select one', ...vehiclesData.map(v => v.label)];

  const filteredCompanions = companionsData.filter(
    (companion) =>
      companion.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !selectedCompanions.find((c) => c.id === companion.id)
  );

  const addCompanion = (companion: Companion) => {
    setSelectedCompanions([...selectedCompanions, companion]);
    setSearchQuery('');
    setShowSearch(false);
  };

  const removeCompanion = (companionId: string) => {
    setSelectedCompanions(selectedCompanions.filter((c) => c.id !== companionId));
  };

  const handleCreate = () => {
    // Handle hangout creation
    console.log({
      hangoutName,
      companions: selectedCompanions,
      vehicle: selectedVehicle,
    });
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ArrowLeft size={24} color={colors.text.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Create Hangout</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Hangout Name */}
        <View style={styles.section}>
          <Text style={styles.label}>Hangout Name</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., Weekend Road Trip"
            placeholderTextColor={colors.text.placeholder}
            value={hangoutName}
            onChangeText={setHangoutName}
          />
        </View>

        {/* Companions Section */}
        <View style={styles.section}>
          <View style={styles.labelRow}>
            <Text style={styles.label}>Companions</Text>
            <Text style={styles.labelCount}>
              {selectedCompanions.length} {selectedCompanions.length === 1 ? 'person' : 'people'}
            </Text>
          </View>

          {/* Add Companion Button */}
          <TouchableOpacity
            style={styles.addCompanionButton}
            onPress={() => setShowSearch(!showSearch)}
          >
            <Add size={20} color={colors.text.primary} variant="Bold" />
            <Text style={styles.addCompanionText}>Add Companion</Text>
          </TouchableOpacity>

          {/* Search Companions */}
          {showSearch && (
            <View style={styles.searchSection}>
              <View style={styles.searchContainer}>
                <SearchNormal1 size={20} color={colors.text.secondary} />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search companions..."
                  placeholderTextColor={colors.text.placeholder}
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                />
              </View>

              {searchQuery.length > 0 && (
                <View style={styles.searchResults}>
                  {filteredCompanions.length > 0 ? (
                    filteredCompanions.map((companion) => (
                      <TouchableOpacity
                        key={companion.id}
                        style={styles.searchResultItem}
                        onPress={() => addCompanion(companion)}
                      >
                        <View style={styles.companionAvatar}>
                          <User size={20} color={colors.text.primary} variant="Bold" />
                        </View>
                        <View style={styles.companionInfo}>
                          <Text style={styles.companionName}>{companion.name}</Text>
                          {companion.phone && (
                            <Text style={styles.companionPhone}>{companion.phone}</Text>
                          )}
                        </View>
                        <Add size={20} color={colors.text.secondary} />
                      </TouchableOpacity>
                    ))
                  ) : (
                    <Text style={styles.noResults}>No companions found</Text>
                  )}
                </View>
              )}
            </View>
          )}

          {/* Selected Companions */}
          {selectedCompanions.length > 0 && (
            <View style={styles.selectedCompanions}>
              {selectedCompanions.map((companion) => (
                <View key={companion.id} style={styles.companionChip}>
                  <View style={styles.companionAvatar}>
                    <User size={16} color={colors.text.primary} variant="Bold" />
                  </View>
                  <Text style={styles.companionChipText}>{companion.name}</Text>
                  <TouchableOpacity onPress={() => removeCompanion(companion.id)}>
                    <CloseCircle size={18} color={colors.text.secondary} variant="Bold" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Vehicle Selection */}
        <View style={styles.section}>
          <Text style={styles.label}>Select Vehicle</Text>
          <Dropdown
            label=""
            options={vehicleOptions}
            selectedValue={selectedVehicle}
            onSelect={setSelectedVehicle}
          />
        </View>

        {/* Create Button */}
        <TouchableOpacity
          style={[
            styles.createButton,
            (!hangoutName || selectedCompanions.length === 0 || !selectedVehicle || selectedVehicle === 'Select one') &&
              styles.createButtonDisabled,
          ]}
          onPress={handleCreate}
          disabled={!hangoutName || selectedCompanions.length === 0 || !selectedVehicle || selectedVehicle === 'Select one'}
        >
          <Text style={styles.createButtonText}>Create Hangout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 20,
    color: colors.text.primary,
  },
  placeholder: {
    width: 40,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  label: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 16,
    color: colors.text.primary,
    marginBottom: 12,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  labelCount: {
    fontFamily: 'Manrope_500Medium',
    fontSize: 14,
    color: colors.text.secondary,
  },
  input: {
    backgroundColor: colors.white,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontFamily: 'Manrope_500Medium',
    fontSize: 15,
    color: colors.text.primary,
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  addCompanionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background.secondary,
    borderRadius: 12,
    paddingVertical: 12,
    gap: 8,
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  addCompanionText: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 14,
    color: colors.text.primary,
  },
  searchSection: {
    marginTop: 12,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'Manrope_500Medium',
    fontSize: 15,
    color: colors.text.primary,
  },
  searchResults: {
    backgroundColor: colors.white,
    borderRadius: 12,
    marginTop: 8,
    borderWidth: 1,
    borderColor: colors.border.light,
    maxHeight: 250,
  },
  searchResultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  companionAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.background.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  companionInfo: {
    flex: 1,
  },
  companionName: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 14,
    color: colors.text.primary,
    marginBottom: 2,
  },
  companionPhone: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 12,
    color: colors.text.secondary,
  },
  noResults: {
    fontFamily: 'Manrope_500Medium',
    fontSize: 14,
    color: colors.text.secondary,
    textAlign: 'center',
    padding: 20,
  },
  selectedCompanions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 12,
  },
  companionChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 24,
    paddingVertical: 8,
    paddingHorizontal: 12,
    gap: 8,
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  companionChipText: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 13,
    color: colors.text.primary,
  },
  createButton: {
    backgroundColor: colors.text.primary,
    borderRadius: 16,
    paddingVertical: 16,
    marginHorizontal: 20,
    marginBottom: 40,
    alignItems: 'center',
  },
  createButtonDisabled: {
    backgroundColor: colors.text.tertiary,
    opacity: 0.5,
  },
  createButtonText: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 16,
    color: colors.white,
  },
});

