import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Calendar, User, TickCircle } from 'iconsax-react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Calendar as RNCalendar } from 'react-native-calendars';
import { colors } from '@/constants/colors';
import { hangoutsData } from '@/data/hangouts';
import { expenseTypes } from '@/data/expenses';
import { Dropdown } from '@/components';

export default function AddExpenseScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ hangoutId: string }>();
  const hangout = hangoutsData.find(h => h.id === params.hangoutId);

  const [expenseName, setExpenseName] = useState('');
  const [amount, setAmount] = useState('');
  const [expenseType, setExpenseType] = useState('Select one');
  
  // Convert expense types to simple string array for dropdown
  const expenseTypeOptions = ['Select one', ...expenseTypes.map(t => t.label)];
  const [selectedDate, setSelectedDate] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  const [paidBy, setPaidBy] = useState('');
  const [splitType, setSplitType] = useState<'equal' | 'unequal'>('equal');
  const [splitBetween, setSplitBetween] = useState<string[]>([]);

  if (!hangout) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Hangout not found</Text>
      </SafeAreaView>
    );
  }

  // Create members list with "You" at the top
  const members = ['You', ...hangout.companions.map(c => c.name)];

  const handleDateSelect = (day: any) => {
    setSelectedDate(day.dateString);
    setShowCalendar(false);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Select date';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const toggleSplitMember = (member: string) => {
    if (splitBetween.includes(member)) {
      setSplitBetween(splitBetween.filter(m => m !== member));
    } else {
      setSplitBetween([...splitBetween, member]);
    }
  };

  const calculateSplitAmount = () => {
    const total = parseFloat(amount) || 0;
    const count = splitBetween.length || 1;
    return (total / count).toFixed(2);
  };

  const isFormValid = () => {
    return expenseName && amount && expenseType && expenseType !== 'Select one' && selectedDate && paidBy && splitBetween.length > 0;
  };

  const handleAddExpense = () => {
    // Handle expense creation logic here
    console.log({
      expenseName,
      amount,
      expenseType,
      selectedDate,
      paidBy,
      splitType,
      splitBetween,
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
          <Text style={styles.headerTitle}>Add Expense</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Expense Name */}
        <View style={styles.section}>
          <Text style={styles.label}>Expense Name</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., Gas Station Fill-up"
            placeholderTextColor={colors.text.placeholder}
            value={expenseName}
            onChangeText={setExpenseName}
          />
        </View>

        {/* Total Amount */}
        <View style={styles.section}>
          <Text style={styles.label}>Total Amount</Text>
          <TextInput
            style={styles.input}
            placeholder="0.00"
            placeholderTextColor={colors.text.placeholder}
            value={amount}
            onChangeText={setAmount}
            keyboardType="decimal-pad"
          />
        </View>

        {/* Expense Type */}
        <View style={styles.section}>
          <Dropdown
            label="Expense Type"
            options={expenseTypeOptions}
            selectedValue={expenseType}
            onSelect={setExpenseType}
          />
        </View>

        {/* Expense Date */}
        <View style={styles.section}>
          <Text style={styles.label}>Expense Date</Text>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setShowCalendar(true)}
          >
            <Calendar size={20} color={colors.text.secondary} variant="Bold" />
            <Text style={styles.dateText}>{formatDate(selectedDate)}</Text>
          </TouchableOpacity>
        </View>

        {/* Who Paid */}
        <View style={styles.section}>
          <Text style={styles.label}>Who Paid?</Text>
          <View style={styles.chipsContainer}>
            {members.map((member) => (
              <TouchableOpacity
                key={member}
                style={[
                  styles.chip,
                  paidBy === member && styles.chipSelected,
                ]}
                onPress={() => setPaidBy(member)}
              >
                <Text style={[
                  styles.chipText,
                  paidBy === member && styles.chipTextSelected,
                ]}>
                  {member}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Split Type */}
        <View style={styles.section}>
          <Text style={styles.label}>Split Type</Text>
          <View style={styles.splitTypeContainer}>
            <TouchableOpacity
              style={[
                styles.splitTypeButton,
                splitType === 'equal' && styles.splitTypeButtonActive,
              ]}
              onPress={() => setSplitType('equal')}
            >
              <Text
                style={[
                  styles.splitTypeText,
                  splitType === 'equal' && styles.splitTypeTextActive,
                ]}
              >
                Equal
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.splitTypeButton,
                splitType === 'unequal' && styles.splitTypeButtonActive,
              ]}
              onPress={() => setSplitType('unequal')}
            >
              <Text
                style={[
                  styles.splitTypeText,
                  splitType === 'unequal' && styles.splitTypeTextActive,
                ]}
              >
                Unequal
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Split Between */}
        {splitType === 'equal' && (
          <View style={styles.section}>
            <Text style={styles.label}>Split Equally Between</Text>
            <View style={styles.chipsContainer}>
              {members.map((member) => (
                <TouchableOpacity
                  key={member}
                  style={[
                    styles.chip,
                    splitBetween.includes(member) && styles.chipSelected,
                  ]}
                  onPress={() => toggleSplitMember(member)}
                >
                  <Text style={[
                    styles.chipText,
                    splitBetween.includes(member) && styles.chipTextSelected,
                  ]}>
                    {member}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Overview */}
        {splitType === 'equal' && splitBetween.length > 0 && amount && (
          <View style={styles.overviewSection}>
            <Text style={styles.overviewLabel}>Overview</Text>
            <View style={styles.overviewCard}>
              <Text style={styles.overviewText}>Each person pays:</Text>
              <Text style={styles.overviewAmount}>₹{calculateSplitAmount()}</Text>
            </View>
          </View>
        )}

        {/* Add Expense Button */}
        <TouchableOpacity
          style={[
            styles.addButton,
            !isFormValid() && styles.addButtonDisabled,
          ]}
          onPress={handleAddExpense}
          disabled={!isFormValid()}
        >
          <Text style={styles.addButtonText}>Add Expense</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Calendar Modal */}
      <Modal
        visible={showCalendar}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowCalendar(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.calendarContainer}>
            <View style={styles.calendarHeader}>
              <Text style={styles.calendarTitle}>Select Date</Text>
              <TouchableOpacity onPress={() => setShowCalendar(false)}>
                <Text style={styles.calendarClose}>Close</Text>
              </TouchableOpacity>
            </View>
            <RNCalendar
              onDayPress={handleDateSelect}
              markedDates={
                selectedDate
                  ? {
                      [selectedDate]: {
                        selected: true,
                        selectedColor: colors.text.primary,
                      },
                    }
                  : {}
              }
              theme={{
                todayTextColor: colors.text.primary,
                selectedDayBackgroundColor: colors.text.primary,
                selectedDayTextColor: colors.white,
                textDayFontFamily: 'Manrope_600SemiBold',
                textMonthFontFamily: 'Manrope_700Bold',
                textDayHeaderFontFamily: 'Manrope_600SemiBold',
              }}
            />
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
  scrollView: {
    flex: 1,
  },
  errorText: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 16,
    color: colors.text.secondary,
    textAlign: 'center',
    marginTop: 40,
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
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  dateText: {
    fontFamily: 'Manrope_500Medium',
    fontSize: 15,
    color: colors.text.primary,
    flex: 1,
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 24,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  chipSelected: {
    backgroundColor: colors.text.primary,
    borderColor: colors.text.primary,
  },
  chipText: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 14,
    color: colors.text.primary,
  },
  chipTextSelected: {
    color: colors.white,
  },
  splitTypeContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  splitTypeButton: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  splitTypeButtonActive: {
    backgroundColor: colors.text.primary,
    borderColor: colors.text.primary,
  },
  splitTypeText: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 15,
    color: colors.text.primary,
  },
  splitTypeTextActive: {
    color: colors.white,
  },
  overviewSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  overviewLabel: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 16,
    color: colors.text.primary,
    marginBottom: 12,
  },
  overviewCard: {
    backgroundColor: colors.background.secondary,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  overviewText: {
    fontFamily: 'Manrope_500Medium',
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: 8,
  },
  overviewAmount: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 32,
    color: colors.text.primary,
  },
  addButton: {
    backgroundColor: colors.text.primary,
    borderRadius: 16,
    paddingVertical: 16,
    marginHorizontal: 20,
    marginBottom: 40,
    alignItems: 'center',
  },
  addButtonDisabled: {
    backgroundColor: colors.text.tertiary,
    opacity: 0.5,
  },
  addButtonText: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 16,
    color: colors.white,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendarContainer: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 20,
    width: '90%',
    maxWidth: 400,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  calendarTitle: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 18,
    color: colors.text.primary,
  },
  calendarClose: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 15,
    color: colors.text.primary,
  },
});

