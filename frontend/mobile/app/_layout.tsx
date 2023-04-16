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
import { Slot } from "expo-router";
import { SVGLogo } from "../src/components/atoms";
import {
  View,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  BackHandler,
} from "react-native";
import {
  useAPIFetching,
  useCartStore,
  useInternationalization,
} from "../src/hooks";
import * as Device from "expo-device";
import * as Application from "expo-application";
import {
  CartNumberOfItemsResponse,
  NewVersionAvailableRequest,
  NewVersionAvailableResponse,
} from "../src/interfaces";
import {
  CustomerContext,
  InternationalizationContext,
  TranslationsContext,
} from "../src/contexts";
import { useTranslations } from "../src/hooks";
import { Endpoints, StorageKeys } from "../src/enums";
import RoutesRestrictor from "./_RoutesRestrictor";
import { useCustomer } from "../src/hooks";
import { AlertContextProvider } from "../src/providers";
import Viewer from "./_Viewer";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SideThings from "./_SideThings";

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
    ChillaxBold: require("../src/assets/fonts/Chillax-Bold.otf"),
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

  const {
    customer,
    setCustomer,
    setCustomerWithSessionToken,
    sessionToken,
    clearCustomer,
  } = useCustomer();
  const {
    language,
    changeLanguage,
    storedLanguage,
    direction,
    languageWithoutGender,
    languageGender,
  } = useInternationalization();
  const { t } = useTranslations({
    language: language,
  });

  // cart things
  const cartStore = useCartStore();

  useEffect(() => {
    (async () => {
      cartStore.setCartId(await AsyncStorage.getItem(StorageKeys.CART));
    })();
  }, []);

  // disable going back
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => true
    );
    return () => backHandler.remove();
  }, []);

  if (
    !fontsLoaded ||
    (!newVersionAvailableResponse && newVersionAvailableResponse.isFetching) ||
    newVersionAvailableResponse?.body?.value ||
    storedLanguage === undefined ||
    languageGender === undefined ||
    sessionToken === undefined ||
    customer === undefined ||
    cartStore.cartId === undefined
  ) {
    // TODO new design for this insted of an Alert
    // TODO store url
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
        <SVGLogo width="123" height="48" color="#0E333C" />
      </View>
    );
  }

  return (
    <CustomerContext.Provider
      value={{
        customer,
        setCustomer,
        setCustomerWithSessionToken,
        sessionToken,
        clearCustomer,
      }}
    >
      <InternationalizationContext.Provider
        value={{
          language,
          changeLanguage,
          direction,
          storedLanguage,
          languageWithoutGender,
          languageGender,
        }}
      >
        <TranslationsContext.Provider value={{ t }}>
          <RoutesRestrictor>
            <SideThings>
              <TouchableWithoutFeedback
                onPress={() => Keyboard.isVisible() && Keyboard.dismiss()}
              >
                {
                  // AlertContextProvider should be here
                }
                <AlertContextProvider>
                  {
                    // Viewer should be here
                  }
                  <Viewer>
                    <StatusBar style="dark" />
                    <Slot />
                  </Viewer>
                </AlertContextProvider>
              </TouchableWithoutFeedback>
            </SideThings>
          </RoutesRestrictor>
        </TranslationsContext.Provider>
      </InternationalizationContext.Provider>
    </CustomerContext.Provider>
  );
};

export default Layout;
