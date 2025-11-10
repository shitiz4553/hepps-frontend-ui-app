import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '@/constants/colors';
import type { Activity } from '@/data/expenses';

interface ActivityItemProps {
  activity: Activity;
  isLast?: boolean;
}

export default function ActivityItem({ activity, isLast = false }: ActivityItemProps) {
  return (
    <View style={styles.container}>
      <View style={styles.dotContainer}>
        <View style={styles.dot} />
        {!isLast && <View style={styles.line} />}
      </View>
      <View style={styles.content}>
        <Text style={styles.description}>{activity.description}</Text>
        <Text style={styles.meta}>
          by {activity.actor} • {activity.timestamp}
        </Text>
        {activity.amount && (
          <Text style={styles.amount}>₹{activity.amount.toFixed(2)}</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  dotContainer: {
    alignItems: 'center',
    marginRight: 12,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.text.primary,
    marginTop: 5,
    zIndex: 1,
  },
  line: {
    width: 2,
    flex: 1,
    backgroundColor: colors.border.light,
    marginTop: 4,
    minHeight: 40,
  },
  content: {
    flex: 1,
    paddingBottom: 20,
  },
  description: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 14,
    color: colors.text.primary,
    marginBottom: 4,
  },
  meta: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 12,
    color: colors.text.secondary,
  },
  amount: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 14,
    color: colors.text.primary,
    marginTop: 4,
  },
});

