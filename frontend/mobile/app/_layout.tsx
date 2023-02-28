import {
  useFonts,
  Manrope_200ExtraLight,
  Manrope_300Light,
  Manrope_400Regular,
  Manrope_500Medium,
  Manrope_600SemiBold,
  Manrope_700Bold,
  Manrope_800ExtraBold,
} from "@expo-google-fonts/manrope";
import {
  IBMPlexSansArabic_100Thin,
  IBMPlexSansArabic_200ExtraLight,
  IBMPlexSansArabic_300Light,
  IBMPlexSansArabic_400Regular,
  IBMPlexSansArabic_500Medium,
  IBMPlexSansArabic_600SemiBold,
  IBMPlexSansArabic_700Bold,
} from "@expo-google-fonts/ibm-plex-sans-arabic";
import { SafeAreaView } from "react-native-safe-area-context";
import { Slot } from "expo-router";
import { Logo } from "../src/components/atoms";
import { View, Alert } from "react-native";
import { useAPIFetching, useSettings } from "../src/hooks";
import * as Device from "expo-device";
import * as Application from "expo-application";
import {
  NewVersionAvailableRequest,
  NewVersionAvailableResponse,
} from "../src/interfaces";
import { SettingsContext, TranslationsContext } from "../src/contexts";
import { useTranslations } from "../src/hooks";

const Layout = () => {
  //todo: handled if no network

  //check if there's an update
  const appVersion = Application.nativeApplicationVersion;
  const phoneOS = Device.osName.toLowerCase();
  const {
    response: newVersionAvailableResponse,
    status: newVersionAvailableStatus,
  } = useAPIFetching<NewVersionAvailableRequest, NewVersionAvailableResponse>({
    endpoint: "NewVersionAvailable",
    body: {
      app_version: appVersion,
      phone_os: phoneOS,
    } as NewVersionAvailableRequest,
  });

  //load fonts
  const [fontsLoaded] = useFonts({
    IBMPlexSansArabic_100Thin,
    IBMPlexSansArabic_200ExtraLight,
    IBMPlexSansArabic_300Light,
    IBMPlexSansArabic_400Regular,
    IBMPlexSansArabic_500Medium,
    IBMPlexSansArabic_600SemiBold,
    IBMPlexSansArabic_700Bold,
    Manrope_200ExtraLight,
    Manrope_300Light,
    Manrope_400Regular,
    Manrope_500Medium,
    Manrope_600SemiBold,
    Manrope_700Bold,
    Manrope_800ExtraBold,
  });

  const { language, setLanguage, direction } = useSettings();
  const { t } = useTranslations({
    language: language,
  });

  if (
    !fontsLoaded ||
    (!newVersionAvailableResponse && newVersionAvailableStatus === "loading") ||
    newVersionAvailableResponse?.value
  ) {
    //todo: new design for this insted of an Alert
    if (newVersionAvailableResponse?.value) {
      Alert.alert(
        "New Update Available",
        "The app must be updated first to be use.",
        [],
        { cancelable: false }
      );
    }

    return (
      <View className="flex-1 items-center justify-center">
        <Logo width="123" height="48" color="#0E333C" />
      </View>
    );
  }

  return (
    <SettingsContext.Provider value={{ language, setLanguage, direction }}>
      <TranslationsContext.Provider value={t}>
        <SafeAreaView
          style={{ flexDirection: direction === "ltr" ? "row" : "row-reverse" }}
          className="px-[28px]"
        >
          <Slot />
        </SafeAreaView>
      </TranslationsContext.Provider>
    </SettingsContext.Provider>
  );
};

export default Layout;
