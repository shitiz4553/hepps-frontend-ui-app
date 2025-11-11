import { Dropdown } from '@/components';
import { colors } from '@/constants/colors';
import { companionsData } from '@/data/companions';
import { hangoutsData } from '@/data/hangouts';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, CloseCircle, Edit2, LogoutCurve, People, SearchNormal1, Star1, TickCircle, UserAdd } from 'iconsax-react-native';
import React, { useState } from 'react';
import {
  Modal,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HangoutSettingsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ hangoutId: string }>();
  const hangout = hangoutsData.find(h => h.id === params.hangoutId);

  const [simplifyDebts, setSimplifyDebts] = useState(true);
  const [currency, setCurrency] = useState('INR (₹)');
  
  // Edit Hangout Modal
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedName, setEditedName] = useState(hangout?.name || '');
  const [editedVehicle, setEditedVehicle] = useState(hangout?.vehicle || 'Select one');
  
  // Manage Companions Modal
  const [showCompanionsModal, setShowCompanionsModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCompanions, setSelectedCompanions] = useState<string[]>([]);

  // Initialize selected companions when modal opens
  React.useEffect(() => {
    if (showCompanionsModal && hangout) {
      setSelectedCompanions(hangout.companions.map(companion => companion.id) || []);
    }
  }, [showCompanionsModal, hangout]);

  const currencies = ['INR (₹)', 'USD ($)', 'EUR (€)', 'GBP (£)'];
  const vehicles = ['Select one', 'Honda City', 'Maruti Swift', 'Hyundai Creta', 'Toyota Innova'];

  const toggleCompanion = (companionId: string) => {
    if (selectedCompanions.includes(companionId)) {
      setSelectedCompanions(selectedCompanions.filter(id => id !== companionId));
    } else {
      setSelectedCompanions([...selectedCompanions, companionId]);
    }
  };

  const removeCompanion = (companionId: string) => {
    setSelectedCompanions(selectedCompanions.filter(id => id !== companionId));
  };

  const filteredCompanions = companionsData.filter(
    companion =>
      companion.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !selectedCompanions.includes(companion.id)
  );

  const handleSaveEdit = () => {
    // Handle save logic here
    console.log('Saving edits:', { editedName, editedVehicle });
    setShowEditModal(false);
  };

  const handleSaveCompanions = () => {
    // Handle save logic here
    console.log('Saving companions:', selectedCompanions);
    setShowCompanionsModal(false);
  };

  if (!hangout) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Hangout not found</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.title}>Hangout Settings</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Hangout Preferences Section */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Hangout Preferences</Text>
          
          {/* Simplify Group Debts Toggle */}
          <View style={[styles.settingItem,{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }]}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Simplify group debts</Text>
              <Text style={styles.settingDescription}>
                Minimize the number of transactions
              </Text>
            </View>
            <Switch
              value={simplifyDebts}
              onValueChange={setSimplifyDebts}
              trackColor={{ false: colors.border.light, true: colors.text.primary }}
              thumbColor={colors.white}
            />
          </View>

          {/* Currency Dropdown */}
          <View style={styles.settingItem}>
            <Dropdown
              label="Currency"
              options={currencies}
              selectedValue={currency}
              onSelect={setCurrency}
            />
          </View>
        </View>

        {/* Hangout Management Section */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Hangout Management</Text>

          {/* Edit Hangout Info */}
          <TouchableOpacity 
            style={styles.actionItem}
            onPress={() => setShowEditModal(true)}
          >
            <Edit2 size={20} color={colors.text.primary} variant="Outline" />
            <Text style={styles.actionText}>Edit hangout info</Text>
          </TouchableOpacity>

          {/* Manage Companions */}
          <TouchableOpacity 
            style={styles.actionItem}
            onPress={() => setShowCompanionsModal(true)}
          >
            <People size={20} color={colors.text.primary} variant="Outline" />
            <Text style={styles.actionText}>Manage companions</Text>
          </TouchableOpacity>

          {/* Invite Companions */}
          <TouchableOpacity style={styles.actionItem}>
            <UserAdd size={20} color={colors.text.primary} variant="Outline" />
            <Text style={styles.actionText}>Invite companions</Text>
          </TouchableOpacity>

          {/* Pin Hangout */}
          <TouchableOpacity style={styles.actionItem}>
            <Star1 size={20} color={colors.text.primary} variant={hangout.isPinned ? "Bold" : "Outline"} />
            <Text style={styles.actionText}>
              {hangout.isPinned ? 'Unpin hangout' : 'Pin hangout'}
            </Text>
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Leave Hangout */}
          <TouchableOpacity style={styles.actionItem}>
            <LogoutCurve size={20} color={colors.error} variant="Outline" />
            <Text style={[styles.actionText, { color: colors.error }]}>Leave hangout</Text>
          </TouchableOpacity>

          {/* Mark as Inactive */}
          <TouchableOpacity style={styles.actionItem}>
            <CloseCircle size={20} color={colors.error} variant="Outline" />
            <Text style={[styles.actionText, { color: colors.error }]}>
              Mark hangout as inactive
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Edit Hangout Modal */}
      <Modal
        visible={showEditModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowEditModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Edit Hangout</Text>
              <TouchableOpacity onPress={() => setShowEditModal(false)}>
                <CloseCircle size={24} color={colors.text.primary} variant="Bold" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody}>
              {/* Hangout Name */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Hangout Name</Text>
                <TextInput
                  style={styles.input}
                  value={editedName}
                  onChangeText={setEditedName}
                  placeholder="Enter hangout name"
                  placeholderTextColor={colors.text.secondary}
                />
              </View>

              {/* Vehicle Dropdown */}
              <View style={styles.inputGroup}>
                <Dropdown
                  label="Vehicle"
                  options={vehicles}
                  selectedValue={editedVehicle}
                  onSelect={setEditedVehicle}
                />
              </View>
            </ScrollView>

            <View style={styles.modalFooter}>
              <TouchableOpacity 
                style={styles.saveButton}
                onPress={handleSaveEdit}
              >
                <Text style={styles.saveButtonText}>Save Changes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Manage Companions Modal */}
      <Modal
        visible={showCompanionsModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowCompanionsModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Manage Companions</Text>
              <TouchableOpacity onPress={() => setShowCompanionsModal(false)}>
                <CloseCircle size={24} color={colors.text.primary} variant="Bold" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody}>
              {/* Selected Companions */}
              {selectedCompanions.length > 0 && (
                <View style={styles.selectedSection}>
                  <Text style={styles.selectedLabel}>
                    Selected ({selectedCompanions.length})
                  </Text>
                  <View style={styles.chipsContainer}>
                    {selectedCompanions.map((companionId) => {
                      const companion = companionsData.find(c => c.id === companionId);
                      if (!companion) return null;
                      return (
                        <View key={companionId} style={styles.chip}>
                          <Text style={styles.chipText}>{companion.name}</Text>
                          <TouchableOpacity onPress={() => removeCompanion(companionId)}>
                            <CloseCircle size={18} color={colors.white} variant="Bold" />
                          </TouchableOpacity>
                        </View>
                      );
                    })}
                  </View>
                </View>
              )}

              {/* Search Bar */}
              <View style={styles.searchContainer}>
                <SearchNormal1 size={20} color={colors.text.secondary} />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search companions..."
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  placeholderTextColor={colors.text.secondary}
                />
              </View>

              {/* Available Companions */}
              <View style={styles.companionsList}>
                {filteredCompanions.map((companion) => (
                  <TouchableOpacity
                    key={companion.id}
                    style={styles.companionItem}
                    onPress={() => toggleCompanion(companion.id)}
                  >
                    <View style={styles.companionInfo}>
                      <Text style={styles.companionName}>{companion.name}</Text>
                      <Text style={styles.companionPhone}>{companion.phone}</Text>
                    </View>
                    <TickCircle 
                      size={24} 
                      color={colors.text.primary} 
                      variant="Outline" 
                    />
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>

            <View style={styles.modalFooter}>
              <TouchableOpacity 
                style={styles.saveButton}
                onPress={handleSaveCompanions}
              >
                <Text style={styles.saveButtonText}>Save Changes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    padding: 20,
  },
  sectionCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  sectionTitle: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 18,
    color: colors.text.primary,
    marginBottom: 16,
  },
  settingItem: {
    marginBottom: 16,
  },
  settingInfo: {
    marginBottom: 12,
  },
  settingLabel: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 15,
    color: colors.text.primary,
    marginBottom: 4,
  },
  settingDescription: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 13,
    color: colors.text.secondary,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 12,
  },
  actionText: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 15,
    color: colors.text.primary,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border.light,
    marginVertical: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.background.primary,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  modalTitle: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 20,
    color: colors.text.primary,
  },
  modalBody: {
    padding: 20,
  },
  modalFooter: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 14,
    color: colors.text.primary,
    marginBottom: 8,
  },
  input: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    fontFamily: 'Manrope_500Medium',
    fontSize: 15,
    color: colors.text.primary,
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  saveButton: {
    backgroundColor: colors.text.primary,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
  },
  saveButtonText: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 16,
    color: colors.white,
  },
  selectedSection: {
    marginBottom: 20,
  },
  selectedLabel: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 14,
    color: colors.text.primary,
    marginBottom: 12,
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.text.primary,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8,
  },
  chipText: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 13,
    color: colors.white,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.border.light,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'Manrope_500Medium',
    fontSize: 15,
    color: colors.text.primary,
  },
  companionsList: {
    gap: 8,
  },
  companionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  companionInfo: {
    flex: 1,
  },
  companionName: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 15,
    color: colors.text.primary,
    marginBottom: 4,
  },
  companionPhone: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 13,
    color: colors.text.secondary,
  },
});

