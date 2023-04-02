import { Fragment, useMemo } from "react";
import { Text, View } from "react-native";
import { Endpoints } from "../../src/enums";
import { useAPIFetching } from "../../src/hooks";
import { SectionsResponse } from "../../src/interfaces";
import Loading from "../_Loading";
import Scrollable from "../_Scrollable";
import Section from "./_components/Seection";

const Home = () => {
  const { response: sectionsResponse } = useAPIFetching<void, SectionsResponse>(
    {
      endpoint: Endpoints.SECTIONS,
    }
  );

  if (sectionsResponse.isFetching) {
    return <Loading />;
  }

  return (
    <Scrollable cn="px-[0px]">
      <View className="space-y-[28px]">
        {sectionsResponse.body.data.map((section, i) => {
          return (
            <View key={i}>
              <Section {...section} />
            </View>
          );
        })}
      </View>
    </Scrollable>
  );
};

export default Home;
