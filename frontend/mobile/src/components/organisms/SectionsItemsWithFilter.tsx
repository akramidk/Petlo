import { View } from "react-native";
import { Endpoints } from "../../enums";
import { useAPIFetching } from "../../hooks";
import { SectionsResponse } from "../../interfaces";
import { Loading } from "../pages";

const SectionsItemsWithFilter = () => {
  const { response: sectionsResponse } = useAPIFetching<void, SectionsResponse>(
    {
      endpoint: Endpoints.SECTIONS,
    }
  );

  if (sectionsResponse.isFetching) {
    return <Loading />;
  }

  return (
    <View>
      <View></View>
      <View></View>
    </View>
  );
};

export default SectionsItemsWithFilter;
