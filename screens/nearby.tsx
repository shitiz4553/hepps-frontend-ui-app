import { Dropdown } from '@/components';
import { colors } from '@/constants/colors';
import { useRouter } from 'expo-router';
import {
    Bubble,
    Camera,
    Car,
    Driving,
    GasStation,
    MessageText1,
    Notification,
    Wind
} from 'iconsax-react-native';
import React, { useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

interface ServiceCardProps {
  title: string;
  icon: React.ReactNode;
  color: string;
  category: string;
  serviceKey: string;
  onPress?: () => void;
}

interface BannerCardProps {
  title: string;
  icon: React.ReactNode;
  color: string;
  onPress?: () => void;
}

function ServiceCard({ title, icon, color, onPress }: ServiceCardProps) {
  return (
    <TouchableOpacity 
      style={[styles.serviceCard, { backgroundColor: color }]} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.iconContainer}>
        {icon}
      </View>
      <Text style={styles.serviceTitle}>{title}</Text>
    </TouchableOpacity>
  );
}

function BannerCard({ title, icon, color, onPress }: BannerCardProps) {
  return (
    <TouchableOpacity 
      style={[styles.bannerCard, { backgroundColor: color }]} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.bannerIconContainer}>
        {icon}
      </View>
      <Text style={styles.bannerTitle}>{title}</Text>
    </TouchableOpacity>
  );
}

export default function NearbyScreen() {
  const router = useRouter();
  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? 'Good Morning' : currentHour < 18 ? 'Good Afternoon' : 'Good Evening';

  const [selectedCar, setSelectedCar] = useState('Honda Civic - ABC 123');
  const carOptions = [
    'Honda Civic - ABC 123',
    'Toyota Camry - XYZ 789',
    'Tesla Model 3 - DEF 456',
    'All Vehicles'
  ];

  // Categorized services with consistent colors per category
  const services = [
    // Fuel Category
    { title: 'Petrol', icon: <GasStation size={28} color={colors.text.primary} variant="Bold" />, color: colors.category.fuel, category: 'fuel', serviceKey: 'petrol' },
    { title: 'CNG', icon: <Bubble size={28} color={colors.text.primary} variant="Bold" />, color: colors.category.fuel, category: 'fuel', serviceKey: 'cng' },
    
    // Vehicle Repair Category
    { title: 'Engine Repair', icon: <Car size={28} color={colors.text.primary} variant="Bold" />, color: colors.category.repair, category: 'repair', serviceKey: 'engineRepair' },
    { title: 'AC Repair', icon: <Wind size={28} color={colors.text.primary} variant="Bold" />, color: colors.category.repair, category: 'repair', serviceKey: 'acRepair' },
    { title: 'Transmission', icon: <Driving size={28} color={colors.text.primary} variant="Bold" />, color: colors.category.repair, category: 'repair', serviceKey: 'transmission' },
    
    // Tire Services Category
    { title: 'Puncture', icon: <MessageText1 size={28} color={colors.text.primary} variant="Bold" />, color: colors.category.tire, category: 'tire', serviceKey: 'puncture' },
    { title: 'Used Tire', icon: <Car size={28} color={colors.text.primary} variant="Bold" />, color: colors.category.tire, category: 'tire', serviceKey: 'usedTire' },
    { title: 'New Tire', icon: <Car size={28} color={colors.text.primary} variant="Bold" />, color: colors.category.tire, category: 'tire', serviceKey: 'newTire' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>{greeting}</Text>
            <Text style={styles.username}>John</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Notification size={24} color={colors.text.primary} variant="Bold" />
          </TouchableOpacity>
        </View>

        {/* Banner Cards */}
        <View style={styles.bannerContainer}>
          <BannerCard
            title="Help us improve"
            icon={<MessageText1 size={24} color={colors.text.primary} variant="Bold" />}
            color={colors.banner.pink}
            onPress={() => console.log('Help us improve')}
          />
          <BannerCard
            title="Create memories"
            icon={<Camera size={24} color={colors.text.primary} variant="Bold" />}
            color={colors.banner.lavender}
            onPress={() => console.log('Create memories')}
          />
        </View>

        {/* Car Selector */}
        <View style={styles.dropdownContainer}>
          <Dropdown
            label="Show services for:"
            options={carOptions}
            selectedValue={selectedCar}
            onSelect={setSelectedCar}
          />
        </View>

        {/* Fuel Services */}
        <View style={styles.categoryContainer}>
          <Text style={styles.categoryTitle}>Fuel</Text>
          <View style={styles.grid}>
            {services.filter(s => s.category === 'fuel').map((service, index) => (
              <ServiceCard
                key={index}
                title={service.title}
                icon={service.icon}
                color={service.color}
                category={service.category}
                serviceKey={service.serviceKey}
                onPress={() => router.push({
                  pathname: '/nearbyPlaces',
                  params: {
                    category: service.category,
                    service: service.serviceKey,
                    title: service.title,
                  },
                })}
              />
            ))}
          </View>
        </View>

        {/* Vehicle Repair Services */}
        <View style={styles.categoryContainer}>
          <Text style={styles.categoryTitle}>Vehicle Repair</Text>
          <View style={styles.grid}>
            {services.filter(s => s.category === 'repair').map((service, index) => (
              <ServiceCard
                key={index}
                title={service.title}
                icon={service.icon}
                color={service.color}
                category={service.category}
                serviceKey={service.serviceKey}
                onPress={() => router.push({
                  pathname: '/nearbyPlaces',
                  params: {
                    category: service.category,
                    service: service.serviceKey,
                    title: service.title,
                  },
                })}
              />
            ))}
          </View>
        </View>

        {/* Tire Services */}
        <View style={styles.categoryContainer}>
          <Text style={styles.categoryTitle}>Tire Services</Text>
          <View style={styles.grid}>
            {services.filter(s => s.category === 'tire').map((service, index) => (
              <ServiceCard
                key={index}
                title={service.title}
                icon={service.icon}
                color={service.color}
                category={service.category}
                serviceKey={service.serviceKey}
                onPress={() => router.push({
                  pathname: '/nearbyPlaces',
                  params: {
                    category: service.category,
                    service: service.serviceKey,
                    title: service.title,
                  },
                })}
              />
            ))}
          </View>
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
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 24,
  },
  greeting: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: 4,
  },
  username: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 28,
    color: colors.text.primary,
  },
  notificationButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.background.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    gap: 12,
    marginBottom: 24,
  },
  bannerCard: {
    flex: 1,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  bannerIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerTitle: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 13,
    color: colors.text.primary,
    flex: 1,
  },
  dropdownContainer: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  categoryContainer: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  categoryTitle: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 18,
    color: colors.text.primary,
    marginBottom: 12,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  serviceCard: {
    width: '48%',
    aspectRatio: 1.2,
    borderRadius: 20,
    padding: 20,
    justifyContent: 'space-between',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  serviceTitle: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 15,
    color: colors.text.primary,
  },
});

