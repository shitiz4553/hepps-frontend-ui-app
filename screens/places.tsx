import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft } from 'iconsax-react-native';
import { useRouter } from 'expo-router';
import { colors } from '@/constants/colors';
import { PlaceCard } from '@/components';
import { savedPlacesData } from '@/data/savedPlaces';

export default function PlacesScreen() {
  const router = useRouter();

  const handlePlacePress = (placeId: string) => {
    router.push(`/placeDetails?placeId=${placeId}&category=saved&service=saved`);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.title}>Saved Places</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Places Count */}
        <View style={styles.countContainer}>
          <Text style={styles.countText}>
            {savedPlacesData.length} {savedPlacesData.length === 1 ? 'place' : 'places'} saved
          </Text>
        </View>

        {/* Places List */}
        <View style={styles.listContainer}>
          {savedPlacesData.map((place) => (
            <PlaceCard
              key={place.id}
              place={place}
              category="saved"
              service="saved"
              onPress={() => handlePlacePress(place.id)}
            />
          ))}
          {savedPlacesData.length === 0 && (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No saved places yet</Text>
              <Text style={styles.emptySubtext}>
                Save places from Nearby to find them quickly
              </Text>
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
  countContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  countText: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 14,
    color: colors.text.secondary,
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 100,
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
    textAlign: 'center',
  },
});

