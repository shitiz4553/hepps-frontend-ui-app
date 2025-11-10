import PlaceCard from '@/components/PlaceCard';
import { colors } from '@/constants/colors';
import type { PlacesData } from '@/data/places';
import { getPlacesByService } from '@/data/places';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft } from 'iconsax-react-native';
import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function NearbyPlacesScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ category: string; service: string; title: string }>();
  
  const { category, service, title } = params;
  
  // Get places data
  const places = getPlacesByService(category as keyof PlacesData, service);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color={colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{title || service}</Text>
        <View style={styles.searchButton}>
        </View>
      </View>

      {/* Subtitle */}
      <View style={styles.subtitleContainer}>
        <Text style={styles.subtitle}>
          Found {places.length} places near you
        </Text>
      </View>

      {/* Places List */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {places.length > 0 ? (
          places.map((place) => (
            <PlaceCard
              key={place.id}
              place={place}
              category={category}
              service={service}
              onPress={() => {
                router.push({
                  pathname: '/placeDetails',
                  params: {
                    placeId: place.id,
                    category,
                    service,
                  },
                });
              }}
            />
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No places found</Text>
            <Text style={styles.emptySubtext}>Try searching in a different area</Text>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.background.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 20,
    color: colors.text.primary,
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 12,
  },
  searchButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subtitleContainer: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  subtitle: {
    fontFamily: 'Manrope_500Medium',
    fontSize: 14,
    color: colors.text.secondary,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 120,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
  },
  emptyText: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 18,
    color: colors.text.primary,
    marginBottom: 8,
  },
  emptySubtext: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 14,
    color: colors.text.secondary,
  },
});

