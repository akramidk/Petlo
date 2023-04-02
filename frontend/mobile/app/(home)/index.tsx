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
    <Scrollable>
      <View>
        {sectionsResponse.body.data.map((section, i) => {
          return (
            <Fragment key={i}>
              <Section {...section} />
            </Fragment>
          );
        })}
      </View>
    </Scrollable>
  );
};

export default Home;
