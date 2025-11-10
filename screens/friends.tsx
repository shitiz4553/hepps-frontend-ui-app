import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { ArrowLeft, UserAdd, Scan } from 'iconsax-react-native';
import { useRouter } from 'expo-router';
import { colors } from '@/constants/colors';
import { FriendCard, ActionCard } from '@/components';
import { friendsData } from '@/data/friends';

type TabType = 'connected' | 'invited' | 'blocked';

export default function FriendsScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>('connected');

  const connectedFriends = friendsData.filter(f => f.status === 'connected');
  const invitedFriends = friendsData.filter(f => f.status === 'invited');
  const blockedFriends = friendsData.filter(f => f.status === 'blocked');

  const getCurrentFriends = () => {
    switch (activeTab) {
      case 'connected':
        return connectedFriends;
      case 'invited':
        return invitedFriends;
      case 'blocked':
        return blockedFriends;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.title}>Friends</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Action Cards */}
        <View style={styles.actionCards}>
          <ActionCard
            icon={<UserAdd size={24} color={colors.text.primary} variant="Bold" />}
            title="Invite Friend"
            subtitle="Send invitation"
            onPress={() => {/* Handle invite */}}
          />
          <ActionCard
            icon={<Scan size={24} color={colors.text.primary} variant="Bold" />}
            title="Scan QR Code"
            subtitle="Add instantly"
            onPress={() => {/* Handle scan */}}
          />
        </View>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'connected' && styles.activeTab]}
            onPress={() => setActiveTab('connected')}
          >
            <Text style={[styles.tabText, activeTab === 'connected' && styles.activeTabText]}>
              Connected ({connectedFriends.length})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'invited' && styles.activeTab]}
            onPress={() => setActiveTab('invited')}
          >
            <Text style={[styles.tabText, activeTab === 'invited' && styles.activeTabText]}>
              Invited ({invitedFriends.length})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'blocked' && styles.activeTab]}
            onPress={() => setActiveTab('blocked')}
          >
            <Text style={[styles.tabText, activeTab === 'blocked' && styles.activeTabText]}>
              Blocked ({blockedFriends.length})
            </Text>
          </TouchableOpacity>
        </View>

        {/* Friends List */}
        <View style={styles.listContainer}>
          {getCurrentFriends().map((friend) => (
            <FriendCard
              key={friend.id}
              name={friend.name}
              phone={friend.phone}
              type={friend.status}
              onEdit={() => console.log('Edit', friend.name)}
              onBlock={() => console.log('Block', friend.name)}
              onDelete={() => console.log('Delete', friend.name)}
              onCancel={() => console.log('Cancel', friend.name)}
              onUnblock={() => console.log('Unblock', friend.name)}
            />
          ))}
          {getCurrentFriends().length === 0 && (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No friends in this list</Text>
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
  actionCards: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 16,
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
    fontSize: 13,
    color: colors.text.secondary,
  },
  activeTabText: {
    color: colors.white,
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
    fontFamily: 'Manrope_500Medium',
    fontSize: 15,
    color: colors.text.secondary,
  },
});

