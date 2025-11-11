import { colors } from '@/constants/colors';
import type { Hangout } from '@/data/hangouts';
import { hangoutsData } from '@/data/hangouts';
import { useRouter } from 'expo-router';
import { Add, Car, Star1, User } from 'iconsax-react-native';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HangoutScreen() {
  const router = useRouter();
  
  const pinnedHangouts = hangoutsData.filter(h => h.isPinned);
  const regularHangouts = hangoutsData.filter(h => !h.isPinned);

  // Colors for pinned hangouts
  const pinnedColors = [colors.category.fuel, colors.category.repair, colors.category.tire];

  const renderHangoutCard = (hangout: Hangout, index?: number) => {
    const isPinned = hangout.isPinned;
    const cardColor = isPinned && index !== undefined ? pinnedColors[index % pinnedColors.length] : colors.white;
    
    return (
      <TouchableOpacity 
        key={hangout.id} 
        style={[styles.hangoutCard, { backgroundColor: cardColor }]}
        onPress={() => router.push(`/hangoutInfo?hangoutId=${hangout.id}`)}
      >
        <View style={styles.hangoutHeader}>
          <View style={styles.hangoutTitleContainer}>
            {hangout.isPinned && (
              <Star1 size={16} color={colors.text.primary} variant="Bold" />
            )}
            <Text style={styles.hangoutName}>{hangout.name}</Text>
          </View>
          <Text style={styles.hangoutTime}>{hangout.createdAt}</Text>
        </View>

        <View style={styles.hangoutDetails}>
          <View style={styles.detailRow}>
            <User size={16} color={colors.text.secondary} variant="Bold" />
            <Text style={styles.detailText}>
              {hangout.companions.length} {hangout.companions.length === 1 ? 'companion' : 'companions'}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Car size={16} color={colors.text.secondary} variant="Bold" />
            <Text style={styles.detailText}>{hangout.vehicle}</Text>
          </View>
        </View>

        {hangout.lastActivity && (
          <Text style={styles.lastActivity}>{hangout.lastActivity}</Text>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Hangouts</Text>
            <Text style={styles.subtitle}>Plan your trips together</Text>
          </View>
          {hangoutsData.length > 0 && (
            <TouchableOpacity 
              style={styles.smallAddButton}
              onPress={() => router.push('/createHangout')}
            >
              <Add size={24} color={colors.text.primary} variant="Bold" />
            </TouchableOpacity>
          )}
        </View>

        {/* Empty State with Big CTA */}
        {hangoutsData.length === 0 ? (
          <View style={styles.emptyStateContainer}>
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No hangouts available</Text>
              <Text style={styles.emptySubtext}>Create your first hangout to start planning trips with friends!</Text>
            </View>
            <TouchableOpacity 
              style={styles.createButton}
              onPress={() => router.push('/createHangout')}
            >
              <Add size={24} color={colors.white} variant="Bold" />
              <Text style={styles.createButtonText}>Create New Hangout</Text>
            </TouchableOpacity>
          </View>
        ) : null}

        {/* Pinned Hangouts */}
        {pinnedHangouts.length > 0 && hangoutsData.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Star1 size={20} color={colors.text.primary} variant="Bold" />
              <Text style={styles.sectionTitle}>Pinned Hangouts</Text>
            </View>
            {pinnedHangouts.map((hangout, index) => renderHangoutCard(hangout, index))}
          </View>
        )}

        {/* All Hangouts */}
        {regularHangouts.length > 0 && hangoutsData.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recent Hangouts</Text>
            {regularHangouts.map((hangout) => renderHangoutCard(hangout))}
          </View>
        )}
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
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 20,
    paddingTop: 10,
  },
  smallAddButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  emptyStateContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 28,
    color: colors.text.primary,
    marginBottom: 4,
  },
  subtitle: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 14,
    color: colors.text.secondary,
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.text.primary,
    borderRadius: 16,
    paddingVertical: 16,
    marginHorizontal: 0,
    marginBottom: 24,
    gap: 8,
  },
  createButtonText: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 16,
    color: colors.white,
  },
  section: {
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  sectionTitle: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 18,
    color: colors.text.primary,
    marginBottom: 12,
  },
  hangoutCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  hangoutHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  hangoutTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  hangoutName: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 16,
    color: colors.text.primary,
    flex: 1,
  },
  hangoutTime: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 12,
    color: colors.text.secondary,
  },
  hangoutDetails: {
    gap: 8,
    marginBottom: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    fontFamily: 'Manrope_500Medium',
    fontSize: 14,
    color: colors.text.secondary,
  },
  lastActivity: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 12,
    color: colors.text.tertiary,
    marginTop: 4,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
    paddingHorizontal: 40,
  },
  emptyText: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 18,
    color: colors.text.primary,
    marginBottom: 8,
  },
  emptySubtext: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 14,
    color: colors.text.secondary,
    textAlign: 'center',
  },
});
