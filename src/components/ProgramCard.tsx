import React, { useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';
import { Program } from '../types';
import {
  colors,
  spacing,
  borderRadius,
  fontSizes,
  shadows,
  moderateScale,
} from '../theme';

interface ProgramCardProps {
  program: Program;
  onPress: (program: Program) => void;
  index: number;
}

const { width } = Dimensions.get('window');

const ProgramCard: React.FC<ProgramCardProps> = ({ program, onPress }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.97,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 4,
      useNativeDriver: true,
    }).start();
  };

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.5;
    let stars = '';
    for (let i = 0; i < fullStars; i++) {
      stars += '★';
    }
    if (hasHalf) {
      stars += '½';
    }
    return stars;
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <TouchableOpacity
        activeOpacity={1}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={() => onPress(program)}
        style={styles.card}>
        {/* Top accent bar */}
        <View style={styles.accentBar} />

        {/* Header Row */}
        <View style={styles.header}>
          <View style={styles.flagContainer}>
            <Text style={styles.flag}>{program.flag}</Text>
          </View>
          <View style={styles.ratingBadge}>
            <Text style={styles.ratingText}>
              {renderStars(program.rating)} {program.rating}
            </Text>
          </View>
        </View>

        {/* University Info */}
        <View style={styles.body}>
          <Text style={styles.universityName} numberOfLines={2}>
            {program.university}
          </Text>
          <View style={styles.countryRow}>
            <View style={styles.locationDot} />
            <Text style={styles.countryText}>{program.country}</Text>
          </View>
          <Text style={styles.description} numberOfLines={2}>
            {program.description}
          </Text>
        </View>

        {/* Tags */}
        <View style={styles.tagsRow}>
          {program.tags.slice(0, 3).map((tag, i) => (
            <View key={i} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.footerInfo}>
            <Text style={styles.footerLabel}>Duration</Text>
            <Text style={styles.footerValue}>{program.duration}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.footerInfo}>
            <Text style={styles.footerLabel}>Language</Text>
            <Text style={styles.footerValue}>
              {program.language.split('/')[0].trim()}
            </Text>
          </View>
          <View style={styles.exploreButton}>
            <Text style={styles.exploreText}>Explore →</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.cardBg,
    borderRadius: borderRadius.lg,
    marginHorizontal: spacing.md,
    marginVertical: spacing.sm,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    overflow: 'hidden',
    ...shadows.card,
  },
  accentBar: {
    height: 3,
    backgroundColor: colors.accent,
    width: '40%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
  },
  flagContainer: {
    width: moderateScale(48),
    height: moderateScale(48),
    borderRadius: borderRadius.md,
    backgroundColor: 'rgba(255,255,255,0.08)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flag: {
    fontSize: moderateScale(26),
  },
  ratingBadge: {
    backgroundColor: 'rgba(245,166,35,0.15)',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: 'rgba(245,166,35,0.3)',
  },
  ratingText: {
    color: colors.gold,
    fontSize: fontSizes.xs,
    fontWeight: '600',
  },
  body: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.sm,
  },
  universityName: {
    color: colors.white,
    fontSize: moderateScale(fontSizes.lg),
    fontWeight: '700',
    letterSpacing: 0.3,
    marginBottom: spacing.xs,
  },
  countryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  locationDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.accent,
    marginRight: spacing.xs,
  },
  countryText: {
    color: colors.textMuted,
    fontSize: fontSizes.sm,
    fontWeight: '500',
  },
  description: {
    color: colors.textMuted,
    fontSize: fontSizes.sm,
    lineHeight: fontSizes.sm * 1.6,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.sm,
  },
  tag: {
    backgroundColor: colors.tagBg,
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: 'rgba(233,69,96,0.25)',
    marginRight: spacing.xs,
    marginBottom: spacing.xs,
  },
  tagText: {
    color: colors.tagText,
    fontSize: fontSizes.xs,
    fontWeight: '500',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: 'rgba(255,255,255,0.02)',
  },
  footerInfo: {
    flex: 1,
  },
  footerLabel: {
    color: colors.textMuted,
    fontSize: fontSizes.xs,
    marginBottom: 2,
  },
  footerValue: {
    color: colors.white,
    fontSize: fontSizes.sm,
    fontWeight: '600',
  },
  divider: {
    width: 1,
    height: 28,
    backgroundColor: colors.border,
    marginHorizontal: spacing.md,
  },
  exploreButton: {
    backgroundColor: colors.accent,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    ...shadows.button,
  },
  exploreText: {
    color: colors.white,
    fontSize: fontSizes.sm,
    fontWeight: '700',
  },
});

export default ProgramCard;