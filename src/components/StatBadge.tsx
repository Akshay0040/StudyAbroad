import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, borderRadius, fontSizes, moderateScale } from '../theme';

interface StatBadgeProps {
  icon: string;
  label: string;
  value: string;
}

const StatBadge: React.FC<StatBadgeProps> = ({ icon, label, value }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>{icon}</Text>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: borderRadius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginHorizontal: spacing.xs,
  },
  icon: {
    fontSize: moderateScale(22),
    marginBottom: spacing.xs,
  },
  value: {
    color: colors.white,
    fontSize: fontSizes.md,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 2,
  },
  label: {
    color: colors.textMuted,
    fontSize: fontSizes.xs,
    textAlign: 'center',
  },
});

export default StatBadge;