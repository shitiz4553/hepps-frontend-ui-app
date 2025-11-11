import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Star1, Location, Call, Map1, Like1, Dislike, Clock } from 'iconsax-react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { colors } from '@/constants/colors';
import { placesData } from '@/data/places';
import type { Place, PlacesData, Review } from '@/data/places';

export default function PlaceDetailsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ placeId: string; category: string; service: string }>();
  
  const { placeId, category, service } = params;
  
  // Get place data
  const categoryData = placesData[category as keyof PlacesData];
  const serviceData = categoryData?.[service];
  const place: Place | undefined = serviceData?.places.find(p => p.id === placeId);

  if (!place) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Place not found</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Banner Image */}
        <View style={styles.bannerContainer}>
          <View style={styles.bannerPlaceholder}>
            <Text style={styles.bannerText}>📍</Text>
          </View>
          
          {/* Back Button */}
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ArrowLeft size={24} color={colors.text.primary} />
          </TouchableOpacity>
        </View>

        {/* Content */}
        <View style={styles.content}>
          {/* Logo & Name Section */}
          <View style={styles.headerSection}>
            <View style={styles.logoCircle}>
              <Text style={styles.logoText}>{place.name.charAt(0)}</Text>
            </View>
            
            <View style={styles.headerInfo}>
              <Text style={styles.placeName}>{place.name}</Text>
              <View style={styles.statusRow}>
                <View style={[styles.statusDot, place.isOpen ? styles.openDot : styles.closedDot]} />
                <Text style={[styles.statusText, place.isOpen ? styles.openText : styles.closedText]}>
                  {place.isOpen ? 'Open Now' : 'Closed'}
                </Text>
                {place.openingHours && (
                  <>
                    <Text style={styles.separator}>•</Text>
                    <Text style={styles.hoursText}>{place.openingHours}</Text>
                  </>
                )}
              </View>
            </View>
          </View>

          {/* Description */}
          {place.description && (
            <Text style={styles.description}>{place.description}</Text>
          )}

          {/* Stats Row */}
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Like1 size={20} color={colors.text.primary} variant="Outline" />
              <Text style={styles.statValue}>{place.likes || 0}</Text>
            </View>
            
            <View style={styles.statDivider} />
            
            <View style={styles.statItem}>
              <Dislike size={20} color={colors.text.primary} variant="Outline" />
              <Text style={styles.statValue}>{place.dislikes || 0}</Text>
            </View>
            
            <View style={styles.statDivider} />
            
            <View style={styles.statItem}>
              <Location size={20} color={colors.text.secondary} variant="Bold" />
              <Text style={styles.statValue}>{place.distance}</Text>
            </View>
            
            <View style={styles.statDivider} />
            
            <View style={styles.statItem}>
              <Clock size={20} color={colors.text.secondary} variant="Bold" />
              <Text style={styles.statValue}>{place.timeToReach}</Text>
            </View>
          </View>

          {/* Location */}
          <View style={styles.locationSection}>
            <Location size={18} color={colors.text.secondary} variant="Bold" />
            <Text style={styles.addressText}>{place.address}</Text>
          </View>

          {/* CTA Buttons */}
          <View style={styles.ctaContainer}>
            <TouchableOpacity style={styles.ctaButton}>
              <Call size={20} color={colors.white} variant="Bold" />
              <Text style={styles.ctaText}>Call</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.ctaButton}>
              <Map1 size={20} color={colors.white} variant="Bold" />
              <Text style={styles.ctaText}>Map</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.ctaButton, styles.voteButton]}>
              <Like1 size={20} color={colors.text.primary} variant="Bold" />
              <Text style={[styles.ctaText, styles.voteText]}>Vote</Text>
            </TouchableOpacity>
          </View>

          {/* Services Section */}
          {place.services && place.services.length > 0 && (
            <View style={styles.servicesSection}>
              <Text style={styles.sectionTitle}>Services Offered</Text>
              
              <View style={styles.servicesTable}>
                {/* Table Header */}
                <View style={styles.tableHeader}>
                  <Text style={[styles.tableHeaderText, styles.serviceNameColumn]}>Service</Text>
                  <Text style={[styles.tableHeaderText, styles.priceColumn]}>Price</Text>
                  <Text style={[styles.tableHeaderText, styles.durationColumn]}>Duration</Text>
                </View>

                {/* Table Rows */}
                {place.services.map((service, index) => (
                  <View 
                    key={index} 
                    style={[
                      styles.tableRow,
                      index % 2 === 0 && styles.tableRowEven,
                      index === place.services!.length - 1 && styles.lastRow
                    ]}
                  >
                    <View style={styles.serviceNameColumn}>
                      <Text style={styles.serviceName}>{service.name}</Text>
                      {service.description && (
                        <Text style={styles.serviceDescription}>{service.description}</Text>
                      )}
                    </View>
                    <Text style={[styles.tableText, styles.priceColumn]}>{service.price}</Text>
                    <Text style={[styles.tableText, styles.durationColumn]}>{service.duration || '-'}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Opening Hours Section */}
          {place.openingHoursTable && place.openingHoursTable.length > 0 && (
            <View style={styles.hoursSection}>
              <Text style={styles.sectionTitle}>Opening Hours</Text>
              
              <View style={styles.servicesTable}>
                {/* Table Header */}
                <View style={styles.tableHeader}>
                  <Text style={[styles.tableHeaderText, styles.dayColumn]}>Day</Text>
                  <Text style={[styles.tableHeaderText, styles.hoursColumn]}>Hours</Text>
                </View>

                {/* Table Rows */}
                {place.openingHoursTable.map((dayHours, index) => (
                  <View 
                    key={index} 
                    style={[
                      styles.tableRow,
                      index % 2 === 0 && styles.tableRowEven,
                      index === place.openingHoursTable!.length - 1 && styles.lastRow
                    ]}
                  >
                    <Text style={[styles.tableText, styles.dayColumn, styles.dayText]}>{dayHours.day}</Text>
                    <Text style={[styles.tableText, styles.hoursColumn]}>{dayHours.hours}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Reviews Section */}
          {place.userReviews && place.userReviews.length > 0 && (
            <View style={styles.reviewsSection}>
              <Text style={styles.sectionTitle}>Customer Reviews</Text>
              
              {place.userReviews.map((review) => (
                <View key={review.id} style={styles.reviewCard}>
                  {/* Review Header */}
                  <View style={styles.reviewHeader}>
                    <View style={styles.reviewUserInfo}>
                      <Text style={styles.reviewUserName}>{review.userName}</Text>
                      <Text style={styles.reviewTime}>{review.timeAgo}</Text>
                    </View>
                    <View style={styles.reviewRating}>
                      {review.isPositive ? (
                        <Like1 size={20} color={colors.text.primary} variant="Outline" />
                      ) : (
                        <Dislike size={20} color={colors.text.primary} variant="Outline" />
                      )}
                    </View>
                  </View>
                  
                  {/* Review Title */}
                  <Text style={styles.reviewTitle}>{review.title}</Text>
                  
                  {/* Review Comment */}
                  <Text style={styles.reviewComment}>{review.comment}</Text>
                </View>
              ))}
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
  bannerContainer: {
    height: 220,
    position: 'relative',
  },
  bannerPlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.category.fuel,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerText: {
    fontSize: 64,
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  headerSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  logoCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: colors.background.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    borderWidth: 3,
    borderColor: colors.white,
    marginTop: -35,
  },
  logoText: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 32,
    color: colors.text.primary,
  },
  headerInfo: {
    flex: 1,
  },
  placeName: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 24,
    color: colors.text.primary,
    marginBottom: 8,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  openDot: {
    backgroundColor: colors.success,
  },
  closedDot: {
    backgroundColor: colors.error,
  },
  statusText: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 14,
  },
  openText: {
    color: colors.success,
  },
  closedText: {
    color: colors.error,
  },
  separator: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 14,
    color: colors.text.secondary,
    marginHorizontal: 8,
  },
  hoursText: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 13,
    color: colors.text.secondary,
  },
  description: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 14,
    color: colors.text.secondary,
    lineHeight: 22,
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.secondary,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  statItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: colors.border.light,
  },
  statValue: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 15,
    color: colors.text.primary,
  },
  statLabel: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 11,
    color: colors.text.secondary,
  },
  locationSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    gap: 12,
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  addressText: {
    fontFamily: 'Manrope_500Medium',
    fontSize: 14,
    color: colors.text.primary,
    flex: 1,
    lineHeight: 20,
  },
  ctaContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  ctaButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.text.primary,
    borderRadius: 16,
    paddingVertical: 14,
    gap: 8,
  },
  ctaText: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 15,
    color: colors.white,
  },
  voteButton: {
    backgroundColor: colors.background.secondary,
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  voteText: {
    color: colors.text.primary,
  },
  servicesSection: {
    marginTop: 8,
  },
  hoursSection: {
    marginTop: 32,
  },
  sectionTitle: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 18,
    color: colors.text.primary,
    marginBottom: 16,
  },
  servicesTable: {
    backgroundColor: colors.white,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: colors.background.secondary,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  tableHeaderText: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 13,
    color: colors.text.primary,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 14,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  tableRowEven: {
    backgroundColor: colors.background.primary,
  },
  lastRow: {
    borderBottomWidth: 0,
  },
  serviceNameColumn: {
    flex: 2,
    paddingRight: 8,
  },
  priceColumn: {
    flex: 1,
    textAlign: 'right',
    paddingHorizontal: 4,
  },
  durationColumn: {
    flex: 0.8,
    textAlign: 'right',
    paddingLeft: 4,
  },
  serviceName: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 14,
    color: colors.text.primary,
    marginBottom: 2,
  },
  serviceDescription: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 12,
    color: colors.text.secondary,
  },
  tableText: {
    fontFamily: 'Manrope_500Medium',
    fontSize: 14,
    color: colors.text.primary,
  },
  dayColumn: {
    flex: 1,
  },
  hoursColumn: {
    flex: 1.5,
    textAlign: 'right',
  },
  dayText: {
    fontFamily: 'Manrope_600SemiBold',
  },
  reviewsSection: {
    marginTop: 32,
    marginBottom: 20,
  },
  reviewCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  reviewUserInfo: {
    flex: 1,
  },
  reviewUserName: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 15,
    color: colors.text.primary,
    marginBottom: 4,
  },
  reviewTime: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 12,
    color: colors.text.secondary,
  },
  reviewRating: {
    marginLeft: 12,
  },
  reviewTitle: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 14,
    color: colors.text.primary,
    marginBottom: 8,
  },
  reviewComment: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 14,
    color: colors.text.secondary,
    lineHeight: 20,
  },
});

