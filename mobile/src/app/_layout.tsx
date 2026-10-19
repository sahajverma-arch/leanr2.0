import {
  ChakraPetch_600SemiBold_Italic,
  ChakraPetch_700Bold,
  ChakraPetch_700Bold_Italic,
} from '@expo-google-fonts/chakra-petch';
import {
  Manrope_500Medium,
  Manrope_600SemiBold,
  Manrope_700Bold,
  Manrope_800ExtraBold,
} from '@expo-google-fonts/manrope';
import { useFonts } from 'expo-font';
import { DarkTheme, Stack, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';

import { AnswersProvider } from '@/state/answers';
import { C } from '@/theme/leanr';

SplashScreen.preventAutoHideAsync();

const theme = { ...DarkTheme, colors: { ...DarkTheme.colors, background: C.bg, card: C.bg, primary: C.yellow } };

export default function RootLayout() {
  const [loaded, error] = useFonts({
    ChakraPetch_600SemiBold_Italic,
    ChakraPetch_700Bold,
    ChakraPetch_700Bold_Italic,
    Manrope_500Medium,
    Manrope_600SemiBold,
    Manrope_700Bold,
    Manrope_800ExtraBold,
  });

  useEffect(() => {
    if (loaded || error) SplashScreen.hideAsync();
  }, [loaded, error]);

  if (!loaded && !error) return null;

  return (
    <ThemeProvider value={theme}>
      <AnswersProvider>
        <StatusBar style="light" />
        <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: C.bg }, animation: 'slide_from_right' }} />
      </AnswersProvider>
    </ThemeProvider>
  );
}
