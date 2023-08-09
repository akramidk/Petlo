import { View } from "react-native";
import { Endpoints } from "../../src/enums";
import {
  useAPIFetching,
  useCustomerContext,
  useInternationalizationContext,
  useTranslationsContext,
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
import { Warning } from "../../src/components/molecules";
import { useRouter } from "expo-router";

const Home = () => {
  const router = useRouter();
  const { t } = useTranslationsContext();
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
      wait:
        !storedLanguage ||
        !customer ||
        (!languageGender && storedLanguage === "ar"),
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
        wait: !storedLanguage || !customer,
      },
    }
  );

  if (
    !storedLanguage ||
    !customer ||
    bannersResponse === undefined ||
    bannersResponse.isFetching ||
    sectionsResponse === undefined ||
    sectionsResponse.isFetching
  ) {
    return <Loading />;
  }

  return (
    <Scrollable cn="px-[0px] space-y-[28px]">
      {bannersResponse.body.data.length > 0 && (
        <Banners data={bannersResponse.body.data} />
      )}

      <View className="mx-[28px]">
        <Warning
          firstText={t("HOME__WARNING_1_FIRST_TEXT")}
          secondText={t("HOME__WARNING_1_SECOND_TEXT")}
          onClick={() => router.push("/request-a-product")}
        />

        <View className="h-[4px]" />

        <Warning
          firstText={t("HOME__WARNING_2_FIRST_TEXT")}
          secondText={t("HOME__WARNING_2_SECOND_TEXT")}
          onClick={() => router.push("/support-and-feedbacks")}
        />
      </View>

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
