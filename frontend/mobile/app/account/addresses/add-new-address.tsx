import { View } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { useEffect, useState } from "react";
import { Icon, Button, Link } from "../../../src/components/atoms";
import * as Location from "expo-location";
import Loading from "../../_Loading";

const AddNewAddress = () => {
  const [loading, setLoading] = useState(true);

  const [step, setStep] = useState(1);
  const [coordinate, setCoordinate] = useState<any>();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
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
          <Button value="d" onClick={() => {}} />
          <Link
            cn="py-[14px] items-center justify-center"
            value="d"
            onClick={() => {}}
          />
        </View>
      </View>
    );
  }
};

export default AddNewAddress;
