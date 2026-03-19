import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen, DetailsScreen } from '../screens';
import { RootStackParamList } from '../types';
import { colors } from '../theme';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.primary,
    card: colors.secondary,
    text: colors.white,
    border: colors.border,
    primary: colors.accent,
    notification: colors.accent,
  },
};

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer theme={AppTheme}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
          contentStyle: { backgroundColor: colors.primary },
        }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={{ animation: 'slide_from_right' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;