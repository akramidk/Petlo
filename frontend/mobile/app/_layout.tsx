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
import { View, Alert, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useAPIFetching, useInternationalization } from "../src/hooks";
import * as Device from "expo-device";
import * as Application from "expo-application";
import {
  NewVersionAvailableRequest,
  NewVersionAvailableResponse,
} from "../src/interfaces";
import {
  CustomerContext,
  SettingsContext,
  TranslationsContext,
} from "../src/contexts";
import { useTranslations } from "../src/hooks";
import { Endpoints } from "../src/enums";
import RoutesRestrictor from "./_RoutesRestrictor";
import { useCustomer } from "../src/hooks";
import { AlertContextProvider } from "../src/providers";

const Layout = () => {
  // TODO handled if no network

  //check if there's an update
  const appVersion = Application.nativeApplicationVersion;
  // we're using Device.brand insted of Device.osName becuse Device.osName not correct sometimes
  const phoneOS = Device.brand.toLowerCase() === "apple" ? "ios" : "android";
  const { response: newVersionAvailableResponse } = useAPIFetching<
    NewVersionAvailableRequest,
    NewVersionAvailableResponse
  >({
    endpoint: Endpoints.NEW_VERSION_AVAILABLE,
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

  const { customer, setCustomer, setCustomerWithSessionToken } = useCustomer();
  const {
    language,
    changeLanguage,
    storedLanguage,
    direction,
    languageWithoutGender,
  } = useInternationalization();
  const { t } = useTranslations({
    language: language,
  });

  if (
    !fontsLoaded ||
    (!newVersionAvailableResponse && newVersionAvailableResponse.isFetching) ||
    newVersionAvailableResponse?.body?.value ||
    storedLanguage === undefined ||
    customer === undefined
  ) {
    // TODO new design for this insted of an Alert
    if (newVersionAvailableResponse?.body?.value) {
      Alert.alert(
        t("ROOT_LAYOUT__NEW_UPDATE_AVAILABLE_TITLE"),
        t("ROOT_LAYOUT__NEW_UPDATE_AVAILABLE_MESSAGE"),
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
    <CustomerContext.Provider
      value={{ customer, setCustomer, setCustomerWithSessionToken }}
    >
      <SettingsContext.Provider
        value={{
          language,
          changeLanguage,
          direction,
          storedLanguage,
          languageWithoutGender,
        }}
      >
        <TranslationsContext.Provider value={{ t }}>
          <RoutesRestrictor>
            <TouchableWithoutFeedback
              onPress={() => Keyboard.isVisible() && Keyboard.dismiss()}
            >
              <SafeAreaView className="px-[28px] py-[12px]">
                {
                  // AlertContextProvider should always be above the Slot
                }
                <AlertContextProvider>
                  <Slot />
                </AlertContextProvider>
              </SafeAreaView>
            </TouchableWithoutFeedback>
          </RoutesRestrictor>
        </TranslationsContext.Provider>
      </SettingsContext.Provider>
    </CustomerContext.Provider>
  );
};

export default Layout;
