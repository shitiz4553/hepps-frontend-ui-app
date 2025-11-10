import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Edit2, Trash, Lock, Unlock } from 'iconsax-react-native';
import { colors } from '@/constants/colors';

interface FriendCardProps {
  name: string;
  phone: string;
  type: 'connected' | 'invited' | 'blocked';
  onEdit?: () => void;
  onBlock?: () => void;
  onDelete?: () => void;
  onCancel?: () => void;
  onUnblock?: () => void;
}

export default function FriendCard({ 
  name, 
  phone, 
  type,
  onEdit,
  onBlock,
  onDelete,
  onCancel,
  onUnblock
}: FriendCardProps) {
  const renderActions = () => {
    switch (type) {
      case 'connected':
        return (
          <>
            <TouchableOpacity style={styles.actionButton} onPress={onEdit}>
              <Edit2 size={18} color={colors.text.primary} variant="Outline" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={onBlock}>
              <Lock size={18} color={colors.error} variant="Outline" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={onDelete}>
              <Trash size={18} color={colors.error} variant="Outline" />
            </TouchableOpacity>
          </>
        );
      case 'invited':
        return (
          <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        );
      case 'blocked':
        return (
          <TouchableOpacity style={styles.unblockButton} onPress={onUnblock}>
            <Unlock size={18} color={colors.text.primary} variant="Outline" />
            <Text style={styles.unblockText}>Unblock</Text>
          </TouchableOpacity>
        );
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{name.charAt(0)}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>{name}</Text>
        <Text style={styles.phone}>{phone}</Text>
      </View>
      <View style={styles.actions}>
        {renderActions()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.text.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 20,
    color: colors.white,
  },
  info: {
    flex: 1,
  },
  name: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 15,
    color: colors.text.primary,
    marginBottom: 4,
  },
  phone: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 13,
    color: colors.text.secondary,
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: colors.background.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: colors.error,
  },
  cancelText: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 13,
    color: colors.white,
  },
  unblockButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: colors.background.secondary,
    gap: 6,
  },
  unblockText: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 13,
    color: colors.text.primary,
  },
});

