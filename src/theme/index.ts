import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const SCREEN = { width, height };

export const colors = {
  primary: '#1A1A2E',
  secondary: '#16213E',
  accent: '#E94560',
  accentLight: '#FF6B6B',
  gold: '#F5A623',
  surface: '#0F3460',
  surfaceLight: '#1E3A5F',
  white: '#FFFFFF',
  offWhite: '#F8F9FF',
  text: '#FFFFFF',
  textMuted: '#A8B2CC',
  textDark: '#1A1A2E',
  border: 'rgba(255,255,255,0.1)',
  cardBg: 'rgba(255,255,255,0.05)',
  cardBorder: 'rgba(255,255,255,0.12)',
  tagBg: 'rgba(233,69,96,0.15)',
  tagText: '#FF8FA3',
  success: '#4CAF50',
  gradient: {
    start: '#1A1A2E',
    mid: '#16213E',
    end: '#0F3460',
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const fontSizes = {
  xs: 11,
  sm: 13,
  md: 15,
  lg: 18,
  xl: 22,
  xxl: 28,
  display: 34,
};

export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 999,
};

export const shadows = {
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  button: {
    shadowColor: '#E94560',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
};

export const scale = (size: number) => (SCREEN.width / 375) * size;
export const verticalScale = (size: number) => (SCREEN.height / 812) * size;
export const moderateScale = (size: number, factor = 0.5) =>
  size + (scale(size) - size) * factor;