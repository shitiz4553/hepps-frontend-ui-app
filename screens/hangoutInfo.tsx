import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { ArrowLeft, Setting2, Add } from 'iconsax-react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { colors } from '@/constants/colors';
import { hangoutsData } from '@/data/hangouts';
import { expensesData, balancesData, activitiesData } from '@/data/expenses';
import { ExpenseItem, ActivityItem } from '@/components';

type TabType = 'balances' | 'expenses' | 'activity';

export default function HangoutInfoScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ hangoutId: string }>();
  const [activeTab, setActiveTab] = useState<TabType>('balances');

  const hangout = hangoutsData.find(h => h.id === params.hangoutId);
  const expenses = expensesData.filter(e => e.hangoutId === params.hangoutId);
  const balance = balancesData;
  const activities = activitiesData.filter(a => a.hangoutId === params.hangoutId);

  if (!hangout) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Hangout not found</Text>
      </SafeAreaView>
    );
  }

  const renderBalancesTab = () => (
    <View style={styles.tabContent}>
      {/* Summary Card */}
      <View style={styles.summaryCard}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>You Paid</Text>
          <Text style={styles.summaryValue}>₹{balance.userPaid.toFixed(2)}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Your Share</Text>
          <Text style={styles.summaryValue}>₹{balance.userShare.toFixed(2)}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.summaryRow}>
          <Text style={[styles.summaryLabel, styles.netLabel]}>
            {balance.netBalance >= 0 ? 'You Get Back' : 'You Owe'}
          </Text>
          <Text style={[
            styles.summaryValue,
            styles.netValue,
            balance.netBalance >= 0 ? styles.positiveBalance : styles.negativeBalance
          ]}>
            ₹{Math.abs(balance.netBalance).toFixed(2)}
          </Text>
        </View>
      </View>

      {/* Settlements */}
      {balance.settlements.length > 0 && (
        <View style={styles.settlementsSection}>
          <Text style={styles.sectionTitle}>Settlements</Text>
          {balance.settlements.map((settlement, index) => (
            <View key={index} style={styles.settlementCard}>
              <Text style={styles.settlementText}>
                {settlement.from} will pay {settlement.to}
              </Text>
              <Text style={styles.settlementAmount}>₹{settlement.amount.toFixed(2)}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Settle Up Button */}
      <TouchableOpacity style={styles.settleButton}>
        <Text style={styles.settleButtonText}>Settle Up</Text>
      </TouchableOpacity>
    </View>
  );

  const renderExpensesTab = () => (
    <View style={styles.tabContent}>
      {expenses.length > 0 ? (
        expenses.map((expense) => (
          <ExpenseItem key={expense.id} expense={expense} />
        ))
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No expenses yet</Text>
          <Text style={styles.emptySubtext}>Add your first expense to start tracking</Text>
        </View>
      )}
    </View>
  );

  const renderActivityTab = () => (
    <View style={styles.tabContent}>
      {activities.length > 0 ? (
        activities.map((activity, index) => (
          <ActivityItem 
            key={activity.id} 
            activity={activity} 
            isLast={index === activities.length - 1}
          />
        ))
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No activity yet</Text>
          <Text style={styles.emptySubtext}>Activities will appear here as things happen</Text>
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={colors.text.primary} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>{hangout.name}</Text>
          <Text style={styles.headerSubtitle}>
            {hangout.companions.length + 1} members
          </Text>
        </View>
        <TouchableOpacity 
          style={styles.settingsButton}
          onPress={() => router.push(`/hangoutSettings?hangoutId=${params.hangoutId}`)}
        >
          <Setting2 size={24} color={colors.text.primary} />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'balances' && styles.activeTab]}
          onPress={() => setActiveTab('balances')}
        >
          <Text style={[styles.tabText, activeTab === 'balances' && styles.activeTabText]}>
            Balances
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'expenses' && styles.activeTab]}
          onPress={() => setActiveTab('expenses')}
        >
          <Text style={[styles.tabText, activeTab === 'expenses' && styles.activeTabText]}>
            Expenses
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'activity' && styles.activeTab]}
          onPress={() => setActiveTab('activity')}
        >
          <Text style={[styles.tabText, activeTab === 'activity' && styles.activeTabText]}>
            Activity
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {activeTab === 'balances' && renderBalancesTab()}
        {activeTab === 'expenses' && renderExpensesTab()}
        {activeTab === 'activity' && renderActivityTab()}
      </ScrollView>

      {/* Add Expense FAB */}
      {activeTab === 'expenses' && (
        <TouchableOpacity 
          style={styles.fab}
          onPress={() => router.push(`/addExpense?hangoutId=${params.hangoutId}`)}
        >
          <Add size={24} color={colors.white} variant="Bold" />
        </TouchableOpacity>
      )}
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
  headerCenter: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  headerTitle: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 18,
    color: colors.text.primary,
    marginBottom: 2,
  },
  headerSubtitle: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 13,
    color: colors.text.secondary,
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 8,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  activeTab: {
    backgroundColor: colors.text.primary,
    borderColor: colors.text.primary,
  },
  tabText: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 14,
    color: colors.text.primary,
  },
  activeTabText: {
    color: colors.white,
  },
  tabContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  summaryCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  summaryLabel: {
    fontFamily: 'Manrope_500Medium',
    fontSize: 15,
    color: colors.text.secondary,
  },
  summaryValue: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 16,
    color: colors.text.primary,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border.light,
    marginVertical: 12,
  },
  netLabel: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 16,
    color: colors.text.primary,
  },
  netValue: {
    fontSize: 20,
  },
  positiveBalance: {
    color: colors.success,
  },
  negativeBalance: {
    color: colors.error,
  },
  settlementsSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 16,
    color: colors.text.primary,
    marginBottom: 12,
  },
  settlementCard: {
    backgroundColor: colors.background.secondary,
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settlementText: {
    fontFamily: 'Manrope_500Medium',
    fontSize: 14,
    color: colors.text.primary,
    flex: 1,
  },
  settlementAmount: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 16,
    color: colors.error,
  },
  settleButton: {
    backgroundColor: colors.text.primary,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  settleButtonText: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 16,
    color: colors.white,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
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
    textAlign: 'center',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.text.primary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
});

