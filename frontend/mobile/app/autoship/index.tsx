import { useMemo } from "react";
import { DataCards, PageStructure } from "../../src/components/organisms";
import { Endpoints } from "../../src/enums";
import { useAPIFetching } from "../../src/hooks";
import { DataCardProps } from "../../src/interfaces";
import { AutoshipsResponse } from "../../src/interfaces/Endpoints/Autoships";
import Loading from "../_Loading";

const Autoship = () => {
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
        secondaryText: `Next shipment on ${autoship.next_shipment_on}`,
      };
    });
  }, [response]);

  if (response === undefined || response.isFetching) {
    return <Loading />;
  }

  console.log(autoships);

  return (
    <PageStructure title="Autoship">
      <DataCards data={autoships} />
    </PageStructure>
  );
};

export default Autoship;
