import React, { useCallback, useRef, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  StatusBar,
  Animated,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, Program } from '../types';
import { programs as allPrograms } from '../data/programs';
import { ProgramCard } from '../components';
import { usePrograms } from '../hooks/usePrograms';
import { colors, spacing, fontSizes, borderRadius, moderateScale } from '../theme';

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { searchQuery, setSearchQuery, filteredPrograms } = usePrograms();
  const headerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(headerAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleProgramPress = useCallback(
    (program: Program) => {
      navigation.navigate('Details', { program });
    },
    [navigation],
  );

  const renderItem = useCallback(
    ({ item, index }: { item: Program; index: number }) => (
      <ProgramCard program={item} onPress={handleProgramPress} index={index} />
    ),
    [handleProgramPress],
  );

  const keyExtractor = useCallback(
    (item: Program) => item.id.toString(),
    [],
  );

  const ListHeaderComponent = () => (
    <Animated.View
      style={{
        opacity: headerAnim,
        transform: [
          {
            translateY: headerAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [-20, 0],
            }),
          },
        ],
      }}>
      <View style={styles.heroContainer}>
        <View style={styles.heroTopRow}>
          <View style={styles.heroTextBlock}>
            <Text style={styles.heroGreeting}>Discover Your Future 🌍</Text>
            <Text style={styles.heroTitle}>Study Abroad{'\n'}Programs</Text>
          </View>
          <View style={styles.countBadge}>
            <Text style={styles.countNumber}>{allPrograms.length}</Text>
            <Text style={styles.countLabel}>Programs</Text>
          </View>
        </View>
        <Text style={styles.heroSubtitle}>
          Explore world-class universities across the globe and take your
          academic journey further.
        </Text>
      </View>

      <View style={styles.resultsRow}>
        <Text style={styles.resultsText}>
          {filteredPrograms.length} program
          {filteredPrograms.length !== 1 ? 's' : ''} found
        </Text>
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Text style={styles.clearAllText}>Clear</Text>
          </TouchableOpacity>
        )}
      </View>
    </Animated.View>
  );

  const ListEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>🔭</Text>
      <Text style={styles.emptyTitle}>No programs found</Text>
      <Text style={styles.emptySubtitle}>
        Try adjusting your search query
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
      <View style={styles.container}>
        <FlatList
          data={filteredPrograms}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          ListHeaderComponent={ListHeaderComponent}
          ListEmptyComponent={ListEmptyComponent}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          removeClippedSubviews={true}
          initialNumToRender={4}
          maxToRenderPerBatch={4}
          windowSize={10}
        />
      </View>
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
  listContent: {
    paddingBottom: spacing.xxl,
  },
  heroContainer: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.lg,
    paddingBottom: spacing.lg,
  },
  heroTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  heroTextBlock: {
    flex: 1,
    marginRight: spacing.md,
  },
  heroGreeting: {
    color: colors.accent,
    fontSize: fontSizes.sm,
    fontWeight: '600',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: spacing.xs,
  },
  heroTitle: {
    color: colors.white,
    fontSize: moderateScale(fontSizes.xxl),
    fontWeight: '800',
    lineHeight: moderateScale(fontSizes.xxl) * 1.2,
    letterSpacing: -0.5,
  },
  countBadge: {
    backgroundColor: colors.accent,
    borderRadius: 16,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    alignItems: 'center',
    minWidth: 64,
  },
  countNumber: {
    color: colors.white,
    fontSize: moderateScale(fontSizes.xl),
    fontWeight: '800',
  },
  countLabel: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: fontSizes.xs,
    fontWeight: '500',
  },
  heroSubtitle: {
    color: colors.textMuted,
    fontSize: fontSizes.sm,
    lineHeight: fontSizes.sm * 1.7,
    marginTop: spacing.sm,
  },
  clearText: {
    color: colors.textMuted,
    fontSize: fontSizes.sm,
    paddingHorizontal: spacing.xs,
  },
  resultsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    marginBottom: spacing.sm,
  },
  resultsText: {
    color: colors.textMuted,
    fontSize: fontSizes.sm,
    fontWeight: '500',
  },
  clearAllText: {
    color: colors.accent,
    fontSize: fontSizes.sm,
    fontWeight: '600',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: spacing.xxl * 2,
  },
  emptyIcon: {
    fontSize: 56,
    marginBottom: spacing.md,
  },
  emptyTitle: {
    color: colors.white,
    fontSize: fontSizes.lg,
    fontWeight: '700',
    marginBottom: spacing.sm,
  },
  emptySubtitle: {
    color: colors.textMuted,
    fontSize: fontSizes.md,
  },
});

export default HomeScreen;