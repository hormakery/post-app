import { useCallback } from "react";
import * as SplashScreen from "expo-splash-screen";
import {
  useFonts,
  NunitoSans_700Bold,
  NunitoSans_300Light,
  NunitoSans_400Regular,
  NunitoSans_600SemiBold,
  NunitoSans_200ExtraLight,
} from "@expo-google-fonts/nunito-sans";

import fonts from "../constants/fonts";

export const usePrepareApp = () => {
  const [appIsReady] = useFonts({
    [fonts.variants.bold]: NunitoSans_700Bold,
    [fonts.variants.light]: NunitoSans_300Light,
    [fonts.variants.regular]: NunitoSans_400Regular,
    [fonts.variants.thin]: NunitoSans_200ExtraLight,
    [fonts.variants.semibold]: NunitoSans_600SemiBold,
  });

  const onAppIsReady = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  return { appIsReady, onAppIsReady };
};
