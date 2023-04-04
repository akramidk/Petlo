import { useRouter, useSearchParams } from "expo-router";
import { PageStructure } from "../../src/components/organisms";
import { Endpoints } from "../../src/enums";
import { useAPIFetching } from "../../src/hooks";
import Loading from "../_Loading";

const Item = () => {
  const router = useRouter();
  const { publicId } = useSearchParams();
  const { response } = useAPIFetching<void, undefined>({
    endpoint: Endpoints.ITEM,
    slugs: {
      publicId,
    },
  });

  if (response.isFetching) {
    return <Loading />;
  }

  return <PageStructure title={publicId} backButton={router.back} />;
};

export default Item;
