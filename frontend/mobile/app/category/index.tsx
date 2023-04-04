import { useRouter, useSearchParams } from "expo-router";
import { PageStructure } from "../../src/components/organisms";
import { Endpoints } from "../../src/enums";
import { useAPIFetching } from "../../src/hooks";

const Category = () => {
  const router = useRouter();
  const { name, category } = useSearchParams();
  const { response } = useAPIFetching<undefined, undefined>({
    endpoint: Endpoints.CATEGORIES,
    slugs: {
      category,
    },
  });

  return <PageStructure title={name} backButton={router.back} />;
};

export default Category;
