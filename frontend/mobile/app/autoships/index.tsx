import { useRouter } from "expo-router";
import { useMemo } from "react";
import { Text } from "../../src/components/atoms";
import { BaseButton } from "../../src/components/bases";
import { DataCards, PageStructure } from "../../src/components/organisms";
import { Endpoints } from "../../src/enums";
import { useAPIFetching } from "../../src/hooks";
import { DataCardProps } from "../../src/interfaces";
import { AutoshipsResponse } from "../../src/interfaces/Endpoints/Autoships";
import Loading from "../_Loading";

const Autoships = () => {
  const router = useRouter();
  const { response } = useAPIFetching<void, AutoshipsResponse>({
    endpoint: Endpoints.AUTOSHIPS,
    options: {
      withPagination: true,
    },
  });

  const autoships: DataCardProps[] = useMemo(() => {
    if (response.isFetching) return [];

    return response.body.data.map((autoship) => {
      return {
        primaryText: autoship.name,
        secondaryText: `Next shipment on ${autoship.next_shipment_on
          .split("-")
          .reverse()
          .join("-")}`,
        actions: [
          {
            name: "Change Name",
            onClick: () => router.push("/autoships/change-name"),
          },
          { name: "Change Address", onClick: () => {} },
          { name: "Change Items", onClick: () => {} },
          { name: "Change Payment Information", onClick: () => {} },
          { name: "Change Pets", onClick: () => {} },
        ],
      };
    });
  }, [response]);

  if (response === undefined || response.isFetching) {
    return <Loading />;
  }

  return (
    <PageStructure
      title="Autoships"
      floatingElement={
        <BaseButton
          cn="bg-[#8EAD99] px-[32px] py-[20px] rounded-full shadow-md"
          onClick={() => {}}
        >
          <Text font="extraBold" cn="text-[#fff] text-[14px]">
            Create an Autoship
          </Text>
        </BaseButton>
      }
    >
      <DataCards data={autoships} />
    </PageStructure>
  );
};

export default Autoships;
