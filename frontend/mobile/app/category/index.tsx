import { useRouter, useSearchParams } from "expo-router";
import { View } from "react-native";
import { Item } from "../../src/components/molecules";
import { PageStructure } from "../../src/components/organisms";
import { Endpoints } from "../../src/enums";
import { useAPIFetching } from "../../src/hooks";
import { CategoriesRequest, CategoriesResponse } from "../../src/interfaces";
import { Loading } from "../../src/components/pages";

const Category = () => {
  const router = useRouter();
  const { name, category } = useSearchParams();
  const { response } = useAPIFetching<CategoriesRequest, CategoriesResponse>({
    endpoint: Endpoints.CATEGORIES,
    slugs: {
      category,
    },
    SWROptions: {
      revalidateIfStale: false,
    },
    options: {
      withPagination: true,
    },
  });

  if (response.isFetching) {
    return <Loading />;
  }

  return (
    <PageStructure title={name} backButton={router.back}>
      <View className="space-y-[12px]">
        {response.body.data.map((item, i) => {
          return (
            <View key={i}>
              <Item variant="large" data={item} />
            </View>
          );
        })}
      </View>
    </PageStructure>
  );
};

export default Category;
