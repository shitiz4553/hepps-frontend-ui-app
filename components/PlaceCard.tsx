import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Location, Clock, Like1, Dislike } from 'iconsax-react-native';
import { colors } from '@/constants/colors';
import type { Place } from '@/data/places';

interface PlaceCardProps {
  place: Place;
  category: string;
  service: string;
  onPress?: () => void;
}

export default function PlaceCard({ place, category, service, onPress }: PlaceCardProps) {
  return (
    <TouchableOpacity 
      style={styles.card} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.iconCircle}>
            <Text style={styles.iconText}>{place.name.charAt(0)}</Text>
          </View>
          <View style={styles.nameContainer}>
            <Text style={styles.name} numberOfLines={1}>
              {place.name}
            </Text>
            {/* Address */}
            <View style={styles.locationRow}>
              <Location size={14} color={colors.text.secondary} variant="Bold" />
              <Text style={styles.address} numberOfLines={1}>
                {place.address}
              </Text>
            </View>
          </View>
        </View>
        {/* Likes & Dislikes */}
        <View style={styles.likesContainer}>
          <View style={styles.likeItem}>
            <Like1 size={16} color={colors.text.primary} variant="Outline" />
            <Text style={styles.likeText}>{place.likes || 0}</Text>
          </View>
          <View style={styles.likeItem}>
            <Dislike size={16} color={colors.text.primary} variant="Outline" />
            <Text style={styles.likeText}>{place.dislikes || 0}</Text>
          </View>
        </View>
      </View>

      {/* Distance & Time */}
      <View style={styles.footer}>
        <View style={styles.infoContainer}>
          <View style={styles.infoItem}>
            <Location size={14} color={colors.text.secondary} variant="Bold" />
            <Text style={styles.infoText}>{place.distance}</Text>
          </View>
          <View style={styles.infoDivider} />
          <View style={styles.infoItem}>
            <Clock size={14} color={colors.text.secondary} variant="Bold" />
            <Text style={styles.infoText}>{place.timeToReach}</Text>
          </View>
        </View>
      </View>

      {/* View Button */}
      <TouchableOpacity style={styles.viewButton} onPress={onPress}>
        <Text style={styles.viewText}>View Details</Text>
      </TouchableOpacity>
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
    marginBottom: 12,
  },
  headerLeft: {
    flexDirection: 'row',
    flex: 1,
    marginRight: 12,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.background.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  iconText: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 20,
    color: colors.text.primary,
  },
  nameContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 16,
    color: colors.text.primary,
    marginBottom: 6,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  address: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 12,
    color: colors.text.secondary,
    flex: 1,
  },
  likesContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8,
  },
  likeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  likeText: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 13,
    color: colors.text.primary,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  infoDivider: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.text.secondary,
    marginHorizontal: 12,
  },
  infoText: {
    fontFamily: 'Manrope_500Medium',
    fontSize: 13,
    color: colors.text.secondary,
  },
  viewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.text.primary,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 24,
  },
  viewText: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 14,
    color: colors.white,
  },
});

