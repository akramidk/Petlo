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
import { SVGLogo, Text, Link } from "../src/components/atoms";
import {
  View,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  BackHandler,
} from "react-native";
import {
  useAPIFetching,
  useAPIMutation,
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
import { AlertContextProvider, DataContextProvider } from "../src/providers";
import Viewer from "./_Viewer";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SideThings from "./_SideThings";
import { BottomSheetOptions } from "../src/components/molecules";
import Constants from "expo-constants";
import * as Linking from "expo-linking";
import { TrackDownloadResponse } from "../src/interfaces";

const FUNCTIONS_URL = Constants.expoConfig.extra.FUNCTIONS_URL;

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
    endpoint: `https://check-update.${FUNCTIONS_URL}/?app_version=${appVersion}&phone_os=${phoneOS}`,
    options: {
      isFunction: true,
    },
  });

  const { response: trackDownloadResponse, trigger: trackDownloadTrigger } =
    useAPIMutation<unknown, TrackDownloadResponse>({
      endpoint: Endpoints.TRACK_APP_DOWNLOAD,
      method: "POST",
      options: {
        onSucceeded: async () => {
          await AsyncStorage.setItem(StorageKeys.DOWNLOADED, "true");
        },
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
    skipCustomer,
    setSkipCustomer,
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

  //track download
  useEffect(() => {
    (async () => {
      const value = await AsyncStorage.getItem(StorageKeys.DOWNLOADED);

      if (!value && __DEV__) {
        trackDownloadTrigger(undefined);
      }
    })();
  }, []);

  if (
    !fontsLoaded ||
    (!newVersionAvailableResponse && newVersionAvailableResponse.isFetching) ||
    newVersionAvailableResponse?.body?.value ||
    storedLanguage === undefined ||
    sessionToken === undefined ||
    customer === undefined ||
    cartStore.cartId === undefined
  ) {
    if (newVersionAvailableResponse?.body?.value === true) {
      return (
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
          <View className={"h-full items-center justify-center p-[52px]"}>
            <Text
              font="medium"
              cn="text-[#666] text-[16px] text-center leading-[28px]"
            >
              {t("ROOT_LAYOUT__NEW_UPDATE_AVAILABLE_MESSAGE")}
            </Text>

            <Link
              cn="text-[#222] mt-[16px]"
              onClick={() => {
                const link =
                  phoneOS === "ios"
                    ? "itms-apps://apps.apple.com/id/app/id6462346697"
                    : "market://details?id=com.petlo";

                Linking.openURL(link);
              }}
              value={t("ROOT_LAYOUT__NEW_UPDATE_AVAILABLE_LINK")}
            />
          </View>
        </InternationalizationContext.Provider>
      );
    }

    return (
      <View className="flex-1 items-center justify-center">
        <SVGLogo width="123" height="48" color="#0E333C" />
      </View>
    );
  }

  return (
    <DataContextProvider>
      <CustomerContext.Provider
        value={{
          customer,
          setCustomer,
          setCustomerWithSessionToken,
          sessionToken,
          clearCustomer,
          skipCustomer,
          setSkipCustomer,
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
    </DataContextProvider>
  );
};

export default Layout;
