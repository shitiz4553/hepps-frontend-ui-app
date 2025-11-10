import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '@/constants/colors';
import type { Expense } from '@/data/expenses';

interface ExpenseItemProps {
  expense: Expense;
  onPress?: () => void;
}

export default function ExpenseItem({ expense, onPress }: ExpenseItemProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.header}>
        <View style={styles.info}>
          <Text style={styles.name}>{expense.name}</Text>
          <Text style={styles.details}>
            Paid by {expense.paidBy} • {expense.date}
          </Text>
        </View>
        <Text style={styles.amount}>₹{expense.amount.toFixed(2)}</Text>
      </View>
      <View style={styles.typeTag}>
        <Text style={styles.typeText}>{expense.type}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  info: {
    flex: 1,
  },
  name: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 15,
    color: colors.text.primary,
    marginBottom: 4,
  },
  details: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 12,
    color: colors.text.secondary,
  },
  amount: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 16,
    color: colors.text.primary,
  },
  typeTag: {
    alignSelf: 'flex-start',
    backgroundColor: colors.background.secondary,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  typeText: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 12,
    color: colors.text.primary,
  },
});

