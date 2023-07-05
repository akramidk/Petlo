import { Text, View } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { useEffect, useState } from "react";
import {
  Icon,
  Button,
  Link,
  Filed,
  BottomContainer,
} from "../../../src/components/atoms";
import * as Location from "expo-location";
import Loading from "../../../src/components/pages/Loading";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Constants from "expo-constants";
import {
  useAPIMutation,
  useInternationalizationContext,
  useTranslationsContext,
} from "../../../src/hooks";
import { PageStructure } from "../../../src/components/organisms";
import { useRouter } from "expo-router";
import { Endpoints } from "../../../src/enums";
import {
  AddNewAddressRequest,
  AddNewAddressResponse,
} from "../../../src/interfaces";
import * as Device from "expo-device";

const GOOGLE_MAP_KEY =
  Device.brand.toLowerCase() === "apple"
    ? Constants.expoConfig.extra.GOOGLE_IOS_MAP_KEY
    : Constants.expoConfig.extra.GOOGLE_ANDROID_MAP_KEY;

const AddNewAddress = () => {
  const router = useRouter();
  const { t } = useTranslationsContext();
  const { languageWithoutGender } = useInternationalizationContext();

  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(1);
  const [coordinate, setCoordinate] = useState<{
    latitude: number;
    longitude: number;
    latitudeDelta?: number;
    longitudeDelta?: number;
  }>();
  const [name, setName] = useState("");

  const { status, trigger } = useAPIMutation<
    AddNewAddressRequest,
    AddNewAddressResponse
  >({
    endpoint: Endpoints.ADD_NEW_ADDRESS,
    method: "POST",
    options: {
      onSucceeded: router.back,
      fireOnSucceededAfter: 1000,
    },
  });

  useEffect(() => {
    if (coordinate) return;

    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }

      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
        mayShowUserSettingsDialog: true,
      });
      setCoordinate({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (step === 1) {
    return (
      <View className="flex-1">
        <GooglePlacesAutocomplete
          placeholder="Search"
          fetchDetails
          onPress={(data, details) => {
            setCoordinate({
              latitude: details.geometry.location.lat,
              longitude: details.geometry.location.lng,
              latitudeDelta: 0.0005359853172208773,
              longitudeDelta: 0.00038288533687591553,
            });
          }}
          GooglePlacesSearchQuery={{
            rankby: "distance",
          }}
          query={{
            key: GOOGLE_MAP_KEY,
            language: languageWithoutGender,
            components: "country:jo", // TODO should be from the API (customer current country)
            location: `${coordinate.latitude}, ${coordinate.longitude}`,
          }}
          styles={{
            container: {
              flex: 0,
              position: "absolute",
              zIndex: 1,
              width: "100%",
            },
            listView: {
              zIndex: 1,
              position: "absolute",
              top: 44,
            },
            textInput: {
              color: "#444",
              height: 60,
              paddingHorizontal: 20,
            },
            row: {
              paddingHorizontal: 20,
            },
          }}
          textInputProps={{
            clearButtonMode: "never",
            placeholderTextColor: "#aaa",
            placeholder: t("ADD_NEW_ADDRESS__STEP_1_SEARCH_FILED_PLACEHOLDER"),
          }}
        />

        <View className="flex-1 justify-center items-center">
          <MapView
            className="w-[100%] grow"
            provider={PROVIDER_GOOGLE}
            region={{
              latitudeDelta: 0.0005359853172208773,
              longitudeDelta: 0.00038288533687591553,
              ...coordinate,
            }}
            onRegionChangeComplete={(e) => setCoordinate(e)}
            showsUserLocation
          />
          <View className="absolute">
            <Icon name="mapPin" size={36} />
          </View>
        </View>

        <BottomContainer>
          <Button
            value={t("ADD_NEW_ADDRESS__STEP_1_CONTINUE_BUTTON")}
            onClick={() => setStep(2)}
          />
          <Link
            cn="py-[14px] items-center justify-center"
            value={t("ADD_NEW_ADDRESS__STEP_1_CANCEL_BUTTON")}
            onClick={router.back}
          />
        </BottomContainer>
      </View>
    );
  }

  if (step === 2) {
    return (
      <PageStructure
        title={t("ADD_NEW_ADDRESS__STEP_2_TITLE")}
        backButton={status ? () => setStep(1) : undefined}
        button={{
          value: t("ADD_NEW_ADDRESS__STEP_2_ADD_BUTTON"),
          onClick: () => {
            trigger({
              name: name,
              latitude: coordinate.latitude.toString(),
              longitude: coordinate.longitude.toString(),
            });
          },
          status: status ?? (name.trim().length > 0 ? "active" : "inactive"),
        }}
        link={{
          value: t("ADD_NEW_ADDRESS__STEP_1_CANCEL_BUTTON"),
          onClick: router.back,
          status: status ? "inactive" : "active",
        }}
      >
        <Filed
          placeholder={t("ADD_NEW_ADDRESS__STEP_2_NAME_FILED_PLACEHOLDER")}
          onChange={setName}
          value={name}
        />
      </PageStructure>
    );
  }
};

export default AddNewAddress;
