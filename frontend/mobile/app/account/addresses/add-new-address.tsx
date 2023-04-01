import { Text, View } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { useEffect, useState } from "react";
import { Icon, Button, Link } from "../../../src/components/atoms";
import * as Location from "expo-location";
import Loading from "../../_Loading";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Constants from "expo-constants";
import {
  useInternationalizationContext,
  useTranslationsContext,
} from "../../../src/hooks";
import { PageStructure } from "../../../src/components/organisms";
import { useRouter } from "expo-router";

const GOOGLE_MAP_KEY = Constants.expoConfig.extra.GOOGLE_MAP_KEY;

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
            },
          }}
          textInputProps={{
            clearButtonMode: "never",
            placeholderTextColor: "#444",
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

        <View
          className={
            "fixed border-t-[1px] border-[#f6f6f6] px-[28px] pt-[12px]"
          }
        >
          <Button
            value={t("ADD_NEW_ADDRESS__STEP_1_CONTINUE_BUTTON")}
            onClick={() => setStep(2)}
          />
          <Link
            cn="py-[14px] items-center justify-center"
            value={t("ADD_NEW_ADDRESS__STEP_1_CANCEL_BUTTON")}
            onClick={router.back}
          />
        </View>
      </View>
    );
  }

  if (step === 2) {
    return (
      <PageStructure
        title="Add a Name"
        backButton={() => setStep(1)}
      ></PageStructure>
    );
  }
};

export default AddNewAddress;
