import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '@/components/Button';
import { AnimatedLogo } from '@/components/AnimatedLogo';
import { tokenStorage } from '@/services/tokenStorage';
import { useTheme } from '@/theme';
import { spacing, typography } from '@/theme';
import type { RootStackParamList } from '@/navigation/types';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export function OnboardingScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const [index, setIndex] = useState(0);
  const navigation = useNavigation<Nav>();
  const { t } = useTranslation();

  const slides = useMemo(() => [
    {
      title: t('onboarding_title1'),
      subtitle: t('onboarding_desc1'),
      icon: 'heart' as const,
      color: '#e0136a',
    },
    {
      title: t('onboarding_title2'),
      subtitle: t('onboarding_desc2'),
      icon: 'shield-checkmark' as const,
      color: '#16a34a',
    },
    {
      title: t('onboarding_title3'),
      subtitle: t('onboarding_desc3'),
      icon: 'chatbubbles' as const,
      color: '#2563eb',
    },
  ], [t]);

  const isLast = index === slides.length - 1;
  const slide = slides[index];

  const finish = async () => {
    await tokenStorage.setOnboardingDone();
    navigation.replace('Auth', { screen: 'Login' });
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.topRow, { paddingTop: insets.top + spacing.md }]}>
        <AnimatedLogo shape="diamond" size={44} />
        {!isLast && (
          <Button title={t('onboarding_skip')} variant="ghost" size="sm" onPress={finish} />
        )}
      </View>

      <View style={styles.center}>
        <View style={[styles.iconWrap, { backgroundColor: `${slide.color}18` }]}>
          <Ionicons name={slide.icon} size={64} color={slide.color} />
        </View>
        <Text style={[styles.title, { color: colors.ink }]}>{slide.title}</Text>
        <Text style={[styles.subtitle, { color: colors.inkSoft }]}>{slide.subtitle}</Text>
      </View>

      <View style={styles.bottom}>
        <View style={styles.dots}>
          {slides.map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                { backgroundColor: colors.borderStrong },
                i === index && { width: 28, backgroundColor: slide.color },
              ]}
            />
          ))}
        </View>
        <Button
          title={isLast ? t('onboarding_get_started') : t('onboarding_next')}
          size="lg"
          onPress={() => (isLast ? finish() : setIndex((i) => i + 1))}
        />
      </View>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
  iconWrap: {
    width: 140,
    height: 140,
    borderRadius: 70,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xxl,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    textAlign: 'center',
    lineHeight: 40,
    marginBottom: spacing.md,
  },
  subtitle: {
    ...typography.body,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: spacing.lg,
  },
  bottom: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xxl,
    gap: spacing.lg,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});
