import Swipeable from "react-native-gesture-handler/Swipeable";
import { Banner } from "../../../src/interfaces";
import { Image } from "react-native";

interface BannersProps {
  data: Banner[];
}

const Banners = ({ data }: BannersProps) => {
  return (
    <Swipeable
      childrenContainerStyle={{
        height: 136,
        width: "100%",
        paddingHorizontal: 28,
        borderRadius: 4,
      }}
    >
      <Image
        style={{
          flex: 1,
          resizeMode: "cover",
          borderRadius: 4,
        }}
        source={{
          uri: data[0].image,
        }}
      />
    </Swipeable>
  );
};

export default Banners;
