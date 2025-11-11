import BottomSheet from '@/components/BottomSheet';
import PlaceCard from '@/components/PlaceCard';
import { colors } from '@/constants/colors';
import type { PlacesData } from '@/data/places';
import { getPlacesByService } from '@/data/places';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, Location as LocationIcon } from 'iconsax-react-native';
import React, { useRef, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function NearbyPlacesScreen() {
  const router = useRouter();
  const mapRef = useRef<MapView>(null);
  const params = useLocalSearchParams<{ category: string; service: string; title: string }>();
  
  const { category, service } = params;
  
  // Get places data
  const places = getPlacesByService(category as keyof PlacesData, service);
  
  const [selectedPlace, setSelectedPlace] = useState<string | null>(null);

  // Calculate initial region based on places
  const getInitialRegion = () => {
    if (places.length === 0) {
      return {
        latitude: 40.7128,
        longitude: -74.0060,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };
    }

    // Calculate center of all places
    const latitudes = places.map(p => p.coordinates?.latitude || 0);
    const longitudes = places.map(p => p.coordinates?.longitude || 0);
    
    const minLat = Math.min(...latitudes);
    const maxLat = Math.max(...latitudes);
    const minLng = Math.min(...longitudes);
    const maxLng = Math.max(...longitudes);
    
    const centerLat = (minLat + maxLat) / 2;
    const centerLng = (minLng + maxLng) / 2;
    const latDelta = (maxLat - minLat) * 1.5 || 0.0922;
    const lngDelta = (maxLng - minLng) * 1.5 || 0.0421;

    return {
      latitude: centerLat,
      longitude: centerLng,
      latitudeDelta: Math.max(latDelta, 0.05),
      longitudeDelta: Math.max(lngDelta, 0.05),
    };
  };

  const handleMarkerPress = (placeId: string) => {
    setSelectedPlace(placeId);
    const place = places.find(p => p.id === placeId);
    if (place && place.coordinates && mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: place.coordinates.latitude,
        longitude: place.coordinates.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }, 500);
    }
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      {/* Map View */}
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={getInitialRegion()}
        showsUserLocation
        showsMyLocationButton={false}
      >
        {places.map((place) => (
          place.coordinates && (
            <Marker
              key={place.id}
              coordinate={{
                latitude: place.coordinates.latitude,
                longitude: place.coordinates.longitude,
              }}
              onPress={() => handleMarkerPress(place.id)}
            >
              <View style={[
                styles.markerContainer,
                selectedPlace === place.id && styles.markerContainerSelected
              ]}>
                <LocationIcon 
                  size={20} 
                  color={selectedPlace === place.id ? colors.white : colors.text.primary} 
                  variant="Bold" 
                />
              </View>
            </Marker>
          )
        ))}
      </MapView>

      {/* Header Overlay */}
      <SafeAreaView style={styles.headerContainer}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ArrowLeft size={24} color={colors.text.primary} />
          </TouchableOpacity>
          <View style={styles.searchButton} />
        </View>
      </SafeAreaView>

      {/* Bottom Sheet with Places */}
      <BottomSheet>
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
      </BottomSheet>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
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
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 22,
    marginHorizontal: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  headerTitle: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 16,
    color: colors.text.primary,
  },
  headerSubtitle: {
    fontFamily: 'Manrope_500Medium',
    fontSize: 12,
    color: colors.text.secondary,
    marginTop: 2,
  },
  searchButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  markerContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  markerContainerSelected: {
    backgroundColor: colors.text.primary,
    transform: [{ scale: 1.2 }],
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
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

