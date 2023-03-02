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
import { Endpoints } from "../src/enums";
import LanguageRestrictor from "./_LanguageRestrictor";

const Layout = () => {
  //todo: handled if no network

  //check if there's an update
  const appVersion = Application.nativeApplicationVersion;
  // we're using Device.brand insted of Device.osName becuse Device.osName not correct sometimes
  const phoneOS = Device.brand.toLowerCase() === "apple" ? "ios" : "android";
  const {
    response: newVersionAvailableResponse,
    status: newVersionAvailableStatus,
  } = useAPIFetching<NewVersionAvailableRequest, NewVersionAvailableResponse>({
    endpoint: Endpoints.NewVersionAvailable,
    body: {
      app_version: appVersion,
      phone_os: phoneOS,
    },
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

  const { language, changeLanguage, storedLanguage, direction } = useSettings();
  const { t } = useTranslations({
    language: language,
  });

  if (
    !fontsLoaded ||
    (!newVersionAvailableResponse && newVersionAvailableStatus === "loading") ||
    newVersionAvailableResponse?.value ||
    storedLanguage === undefined
  ) {
    //todo: new design for this insted of an Alert
    if (newVersionAvailableResponse?.value) {
      Alert.alert(
        t("ROOT_LAYOUT_NEW_UPDATE_AVAILABLE_TITLE"),
        t("ROOT_LAYOUT_NEW_UPDATE_AVAILABLE_MESSAGE"),
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
    <LanguageRestrictor storedLanguage={storedLanguage}>
      <SettingsContext.Provider value={{ language, changeLanguage, direction }}>
        <TranslationsContext.Provider value={t}>
          <SafeAreaView
            style={{
              flexDirection: direction === "ltr" ? "row" : "row-reverse",
            }}
            className="px-[28px]"
          >
            <Slot />
          </SafeAreaView>
        </TranslationsContext.Provider>
      </SettingsContext.Provider>
    </LanguageRestrictor>
  );
};

export default Layout;
