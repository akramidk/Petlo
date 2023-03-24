import { useRouter } from "expo-router";
import { Fragment, useMemo } from "react";
import { Text, View } from "react-native";
import { DataCard } from "../../../src/components/molecules";
import { PageStructure } from "../../../src/components/organisms";
import { Endpoints } from "../../../src/enums";
import { useAPIFetching } from "../../../src/hooks";
import { CustomerInformationsResponse } from "../../../src/interfaces";

const Informations = () => {
  const router = useRouter();
  const { response } = useAPIFetching<undefined, CustomerInformationsResponse>({
    endpoint: Endpoints.CUSTOMER_INFORMATIONS,
  });

  const cardKeys = useMemo(() => {
    if (!response?.body) {
      return;
    }

    return [...Object.keys(response.body), "password"];
  }, [response]);

  if (response.isFetching) {
    return <Text>Loading...</Text>;
  }

  return (
    <PageStructure title="Informations" backButton={router.back}>
      <View className="space-y-[8px]">
        {cardKeys.map((key, i) => {
          return (
            <View key={i}>
              <DataCard
                primaryText={key}
                secondaryText={response.body[key]}
                actions={
                  key !== "country"
                    ? [
                        {
                          name: "Change",
                          onClick: () =>
                            router.push(
                              `/account/informations/chnage-${key.replaceAll(
                                "_",
                                "-"
                              )}`
                            ),
                        },
                      ]
                    : undefined
                }
              />
            </View>
          );
        })}
      </View>
    </PageStructure>
  );
};

export default Informations;
