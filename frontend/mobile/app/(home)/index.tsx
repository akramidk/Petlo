import { View } from "react-native";
import { Endpoints } from "../../src/enums";
import {
  useAPIFetching,
  useCustomerContext,
  useInternationalizationContext,
} from "../../src/hooks";
import {
  BannersRequest,
  BannersResponse,
  SectionsResponse,
} from "../../src/interfaces";
import { Loading } from "../../src/components/pages";
import Scrollable from "../_Scrollable";
import Section from "./_components/Seection";
import Banners from "./_components/Banners";
import { Warning } from "./_components/Warning";

const Home = () => {
  const { customer } = useCustomerContext();
  const { storedLanguage, languageGender } = useInternationalizationContext();

  const { response: bannersResponse } = useAPIFetching<
    BannersRequest,
    BannersResponse
  >({
    endpoint: Endpoints.BANNERS,
    body: {
      variant: languageGender ?? "masculine",
    },
    SWROptions: {
      revalidateIfStale: false,
    },
    options: {
      // TODO ther's a problem that the home page is rendered then
      // the user got redirct to right page by RoutesRestrictor
      // this should be fix
      wait: !storedLanguage && !customer && !languageGender,
    },
  });

  const { response: sectionsResponse } = useAPIFetching<void, SectionsResponse>(
    {
      endpoint: Endpoints.SECTIONS,
      SWROptions: {
        revalidateIfStale: false,
      },
      options: {
        // TODO ther's a problem that the home page is rendered then
        // the user got redirct to right page by RoutesRestrictor
        // this should be fix
        wait: !storedLanguage && !customer,
      },
    }
  );

  if (
    !storedLanguage ||
    !customer ||
    bannersResponse.isFetching ||
    sectionsResponse.isFetching
  ) {
    return <Loading />;
  }

  return (
    <Scrollable cn="px-[0px] space-y-[28px]">
      {bannersResponse.body.data.length > 0 && (
        <Banners data={bannersResponse.body.data} />
      )}

      <Warning firstText="What?" secondText="Click" />

      <View className="space-y-[28px]">
        {sectionsResponse?.body?.data?.map((section, i) => {
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
