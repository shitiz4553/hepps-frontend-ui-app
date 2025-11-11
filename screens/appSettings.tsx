import { SettingsMenuItem } from '@/components';
import { colors } from '@/constants/colors';
import { useRouter } from 'expo-router';
import {
    ArrowLeft,
    DocumentText,
    InfoCircle,
    LogoutCurve,
    ShieldTick,
    Trash
} from 'iconsax-react-native';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AppSettingsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.title}>Settings & Support</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Support & Legal Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support & Legal</Text>
          
          <SettingsMenuItem
            icon={<InfoCircle size={24} color={colors.text.primary} variant="Outline" />}
            title="Help & Support"
            subtitle="Get help and contact support"
            onPress={() => {/* Navigate to help & support */}}
          />
          
          <SettingsMenuItem
            icon={<ShieldTick size={24} color={colors.text.primary} variant="Outline" />}
            title="Privacy Policy"
            subtitle="How we protect your data"
            onPress={() => {/* Navigate to privacy policy */}}
          />
          
          <SettingsMenuItem
            icon={<DocumentText size={24} color={colors.text.primary} variant="Outline" />}
            title="Terms & Conditions"
            subtitle="Terms of service"
            onPress={() => {/* Navigate to terms */}}
          />
        </View>

        {/* Account Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          
          <SettingsMenuItem
            icon={<LogoutCurve size={24} color={colors.text.primary} variant="Outline" />}
            title="Sign Out"
            subtitle="Sign out of your account"
            onPress={() => {/* Handle sign out */}}
          />
          
          <View style={styles.deleteItem}>
            <SettingsMenuItem
              icon={<Trash size={24} color={colors.error} variant="Outline" />}
              title="Delete My Account"
              subtitle="Permanently delete your account and all data"
              onPress={() => {/* Handle delete account */}}
            />
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.versionText}>hepps v1.0.0</Text>
          <Text style={styles.copyrightText}>© 2025 hepps. All rights reserved.</Text>
          <Text style={styles.taglineText}>Your trusted travel companion</Text>
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
  section: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  sectionTitle: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 18,
    color: colors.text.primary,
    marginBottom: 12,
  },
  deleteItem: {
    // Container for delete account to handle special styling
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 40,
    marginTop: 40,
  },
  versionText: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 14,
    color: colors.text.primary,
    marginBottom: 8,
  },
  copyrightText: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 12,
    color: colors.text.secondary,
    marginBottom: 4,
  },
  taglineText: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 13,
    color: colors.text.secondary,
    fontStyle: 'italic',
  },
});

