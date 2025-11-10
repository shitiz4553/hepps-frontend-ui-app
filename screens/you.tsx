import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { 
  Edit2, 
  People, 
  Car, 
  Location, 
  MessageQuestion,
  Scan,
  ScanBarcode,
  UserAdd,
  Setting2,
  InfoCircle,
  LogoutCurve
} from 'iconsax-react-native';
import { useRouter } from 'expo-router';
import { colors } from '@/constants/colors';
import { SettingsMenuItem } from '@/components';

export default function YouScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>You</Text>
        </View>

        {/* User Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>RK</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Ricky Kumar</Text>
            <Text style={styles.profilePhone}>+91 98765 43210</Text>
          </View>
          <TouchableOpacity style={styles.editButton}>
            <Edit2 size={20} color={colors.text.primary} variant="Outline" />
          </TouchableOpacity>
        </View>

        {/* Main Options Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>My Account</Text>
          
          <SettingsMenuItem
            icon={<People size={24} color={colors.text.primary} variant="Outline" />}
            title="Friends"
            subtitle="Manage your friends list"
            onPress={() => router.push('/friends')}
          />
          
          <SettingsMenuItem
            icon={<Car size={24} color={colors.text.primary} variant="Outline" />}
            title="Vehicles"
            subtitle="Add and manage your vehicles"
            onPress={() => router.push('/vehicles')}
          />
          
          <SettingsMenuItem
            icon={<Location size={24} color={colors.text.primary} variant="Outline" />}
            title="Places"
            subtitle="Your saved places"
            onPress={() => router.push('/places')}
          />
        </View>

        {/* Social & Invitations Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Social</Text>
          
          <SettingsMenuItem
            icon={<MessageQuestion size={24} color={colors.text.primary} variant="Outline" />}
            title="Pending Invitations"
            subtitle="View and manage invitations"
            onPress={() => {/* Navigate to pending invitations */}}
          />
          
          <SettingsMenuItem
            icon={<ScanBarcode size={24} color={colors.text.primary} variant="Outline" />}
            title="Show My QR Code"
            subtitle="Let others add you"
            onPress={() => {/* Show QR code modal */}}
          />
          
          <SettingsMenuItem
            icon={<Scan size={24} color={colors.text.primary} variant="Outline" />}
            title="Scan QR Code"
            subtitle="Add friends by scanning"
            onPress={() => {/* Open scanner */}}
          />
          
          <SettingsMenuItem
            icon={<UserAdd size={24} color={colors.text.primary} variant="Outline" />}
            title="Invite Friends"
            subtitle="Share app with friends"
            onPress={() => {/* Share invite */}}
          />
        </View>

        {/* Settings Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          
          <SettingsMenuItem
            icon={<Setting2 size={24} color={colors.text.primary} variant="Outline" />}
            title="App Settings"
            subtitle="Preferences and notifications"
            onPress={() => router.push('/appSettings')}
          />
          
          <SettingsMenuItem
            icon={<InfoCircle size={24} color={colors.text.primary} variant="Outline" />}
            title="Help & Support"
            subtitle="Get help and contact us"
            onPress={() => {/* Navigate to support */}}
          />
          
          <SettingsMenuItem
            icon={<LogoutCurve size={24} color={colors.error} variant="Outline" />}
            title="Logout"
            subtitle="Sign out of your account"
            onPress={() => {/* Handle logout */}}
            showArrow={false}
          />
        </View>

        {/* App Version */}
        <View style={styles.footer}>
          <Text style={styles.versionText}>Version 1.0.0</Text>
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
  content: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
  },
  headerTitle: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 28,
    color: colors.text.primary,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.text.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 24,
    color: colors.white,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 18,
    color: colors.text.primary,
    marginBottom: 4,
  },
  profilePhone: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 14,
    color: colors.text.secondary,
  },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.background.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 16,
    color: colors.text.primary,
    marginBottom: 12,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  versionText: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 13,
    color: colors.text.secondary,
  },
});
