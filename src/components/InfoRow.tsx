import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, fontSizes } from '../theme';

interface InfoRowProps {
  icon: string;
  label: string;
  value: string;
}

const InfoRow: React.FC<InfoRowProps> = ({ icon, label, value }) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>{icon}</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.07)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  icon: {
    fontSize: 16,
  },
  textContainer: {
    flex: 1,
  },
  label: {
    color: colors.textMuted,
    fontSize: fontSizes.xs,
    marginBottom: 2,
  },
  value: {
    color: colors.white,
    fontSize: fontSizes.md,
    fontWeight: '600',
  },
});

export default InfoRow;