import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Animated,
  SafeAreaView,
  StatusBar,
  Linking,
  Alert,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import { InfoRow, StatBadge } from '../components';
import {
  colors,
  spacing,
  fontSizes,
  borderRadius,
  shadows,
  moderateScale,
} from '../theme';

type DetailsScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Details'>;
  route: RouteProp<RootStackParamList, 'Details'>;
};

const DetailsScreen: React.FC<DetailsScreenProps> = ({ navigation, route }) => {
  const { program } = route.params;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        friction: 8,
        tension: 50,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleApplyPress = () => {
    Alert.alert(
      '🎓 Apply Now',
      `You're about to visit ${program.university}'s official website to apply.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Open Website',
          onPress: () => Linking.openURL(`https://${program.website}`),
        },
      ],
    );
  };

  const renderStars = (rating: number) =>
    '★'.repeat(Math.floor(rating)) + (rating % 1 >= 0.5 ? '½' : '');

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />

      <View style={styles.navHeader}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.navTitle} numberOfLines={1}>
          Program Details
        </Text>
        <View style={styles.navPlaceholder} />
      </View>

      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }}>
          <View style={styles.heroCard}>
            <View style={styles.heroBg} />
            <View style={styles.heroContent}>
              <View style={styles.flagBubble}>
                <Text style={styles.flagEmoji}>{program.flag}</Text>
              </View>
              <Text style={styles.universityName}>{program.university}</Text>
              <View style={styles.countryRow}>
                <View style={styles.locationDot} />
                <Text style={styles.countryText}>{program.country}</Text>
              </View>
              <View style={styles.ratingRow}>
                <Text style={styles.starsText}>{renderStars(program.rating)}</Text>
                <Text style={styles.ratingNum}>{program.rating}/5.0</Text>
              </View>
              <View style={styles.tagsRow}>
                {program.tags.map((tag, i) => (
                  <View key={i} style={styles.tag}>
                    <Text style={styles.tagText}>{tag}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>

          <View style={styles.statsRow}>
            <StatBadge
              icon="🎓"
              label="Students"
              value={`${(program.studentsEnrolled / 1000).toFixed(0)}K+`}
            />
            <StatBadge
              icon="📅"
              label="Founded"
              value={`${program.established}`}
            />
            <StatBadge icon="⭐" label="Rating" value={`${program.rating}/5`} />
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionAccent} />
              <Text style={styles.sectionTitle}>About the Program</Text>
            </View>
            <Text style={styles.description}>{program.fullDescription}</Text>
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionAccent} />
              <Text style={styles.sectionTitle}>Program Details</Text>
            </View>
            <View style={styles.infoCard}>
              <InfoRow icon="⏱️" label="Duration" value={program.duration} />
              <InfoRow
                icon="💰"
                label="Tuition Range"
                value={program.tuitionRange}
              />
              <InfoRow
                icon="🗣️"
                label="Language of Instruction"
                value={program.language}
              />
              <InfoRow
                icon="📋"
                label="Application Deadline"
                value={program.deadline}
              />
              <InfoRow
                icon="🌐"
                label="Official Website"
                value={program.website}
              />
            </View>
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionAccent} />
              <Text style={styles.sectionTitle}>Fields of Study</Text>
            </View>
            <View style={styles.fieldsGrid}>
              {program.tags.map((tag, i) => (
                <View key={i} style={styles.fieldItem}>
                  <View style={styles.fieldDot} />
                  <Text style={styles.fieldText}>{tag}</Text>
                </View>
              ))}
            </View>
          </View>

          <TouchableOpacity
            style={styles.applyButton}
            onPress={handleApplyPress}
            activeOpacity={0.85}>
            <Text style={styles.applyButtonText}>Apply Now 🎓</Text>
          </TouchableOpacity>

          <Text style={styles.disclaimer}>
            Clicking Apply will open {program.university}'s official website
          </Text>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  scrollContent: {
    paddingBottom: spacing.xxl,
  },
  navHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    color: colors.white,
    fontSize: moderateScale(20),
    fontWeight: '600',
  },
  navTitle: {
    color: colors.white,
    fontSize: fontSizes.md,
    fontWeight: '700',
    flex: 1,
    textAlign: 'center',
  },
  navPlaceholder: {
    width: 40,
  },
  heroCard: {
    margin: spacing.md,
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.cardBorder,
    ...shadows.card,
  },
  heroBg: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.surface,
    opacity: 0.8,
  },
  heroContent: {
    padding: spacing.lg,
    alignItems: 'center',
  },
  flagBubble: {
    width: moderateScale(80),
    height: moderateScale(80),
    borderRadius: moderateScale(40),
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
    borderWidth: 2,
    borderColor: colors.accent,
  },
  flagEmoji: {
    fontSize: moderateScale(40),
  },
  universityName: {
    color: colors.white,
    fontSize: moderateScale(fontSizes.xl),
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: spacing.sm,
    letterSpacing: -0.3,
  },
  countryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  locationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.accent,
    marginRight: spacing.sm,
  },
  countryText: {
    color: colors.textMuted,
    fontSize: fontSizes.md,
    fontWeight: '500',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
    backgroundColor: 'rgba(245,166,35,0.12)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: 'rgba(245,166,35,0.3)',
  },
  starsText: {
    color: colors.gold,
    fontSize: fontSizes.md,
    marginRight: spacing.sm,
  },
  ratingNum: {
    color: colors.gold,
    fontSize: fontSizes.md,
    fontWeight: '700',
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  tag: {
    backgroundColor: colors.tagBg,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: 'rgba(233,69,96,0.3)',
    marginRight: spacing.xs,
    marginBottom: spacing.xs,
  },
  tagText: {
    color: colors.tagText,
    fontSize: fontSizes.xs,
    fontWeight: '600',
  },
  statsRow: {
    flexDirection: 'row',
    marginHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  section: {
    marginHorizontal: spacing.md,
    marginBottom: spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionAccent: {
    width: 4,
    height: 20,
    backgroundColor: colors.accent,
    borderRadius: 2,
    marginRight: spacing.sm,
  },
  sectionTitle: {
    color: colors.white,
    fontSize: fontSizes.lg,
    fontWeight: '700',
  },
  description: {
    color: colors.textMuted,
    fontSize: fontSizes.md,
    lineHeight: fontSizes.md * 1.8,
  },
  infoCard: {
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  fieldsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  fieldItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginRight: spacing.sm,
    marginBottom: spacing.sm,
  },
  fieldDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.accent,
    marginRight: spacing.sm,
  },
  fieldText: {
    color: colors.white,
    fontSize: fontSizes.sm,
    fontWeight: '600',
  },
  applyButton: {
    marginHorizontal: spacing.md,
    backgroundColor: colors.accent,
    borderRadius: borderRadius.full,
    paddingVertical: spacing.md + 2,
    alignItems: 'center',
    marginBottom: spacing.sm,
    ...shadows.button,
  },
  applyButtonText: {
    color: colors.white,
    fontSize: fontSizes.lg,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  disclaimer: {
    color: colors.textMuted,
    fontSize: fontSizes.xs,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
});

export default DetailsScreen;