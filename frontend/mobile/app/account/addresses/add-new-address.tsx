import { View } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { useState } from "react";
import { Icon, Button, Link } from "../../../src/components/atoms";

const AddNewAddress = () => {
  const [coordinate, setCoordinate] = useState<any>();

  console.log("coordinate", coordinate);

  return (
    <View className="flex-1">
      <MapView
        className="w-[100%] grow"
        onRegionChangeComplete={(e) => setCoordinate(e)}
        provider={PROVIDER_GOOGLE}
      />
      <View className="absolute top-[50%] left-[50%]">
        <Icon name="mapPin" size={32} />
      </View>

      <View
        className={"fixed border-t-[1px] border-[#f6f6f6] px-[28px] pt-[12px]"}
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
};

export default AddNewAddress;
