import { useRouter, useSearchParams } from "expo-router";
import { PageStructure } from "../../src/components/organisms";

const Item = () => {
  const router = useRouter();
  const { publicId } = useSearchParams();

  return <PageStructure title={publicId} backButton={router.back} />;
};

export default Item;
