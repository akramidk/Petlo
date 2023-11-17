import { PageStructure } from "../../src/components/organisms";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Tabs } from "../../src/components/organisms";
import { useMemo, useState } from "react";
import { useAPIFetching } from "../../src/hooks";
import { BrandCategoriesResponse } from "../../src/interfaces";
import { Endpoints } from "../../src/enums";

const ALL_CATEGORY = {
  name: "All",
  public_id: "ALL",
};

const brand = () => {
  const router = useRouter();
  const { slug, name } = useLocalSearchParams();
  const [selectedCategory, setSelectedCategory] = useState(ALL_CATEGORY);
  const { response: categoriesResponse } = useAPIFetching<
    unknown,
    BrandCategoriesResponse
  >({
    endpoint: Endpoints.BRAND_CATEGORIES,
    slugs: {
      publicId: slug,
    },
  });

  const categoriesData = useMemo(() => {
    if (!categoriesResponse?.body?.data) return [];
    return [ALL_CATEGORY, ...categoriesResponse.body.data];
  }, [categoriesResponse]);

  return (
    <PageStructure title={name} backButton={router.back}>
      <Tabs
        data={categoriesData}
        showSkeleton={categoriesData.length === 0}
        selectedTab={selectedCategory}
        onTabClick={(tab) => {
          setSelectedCategory(tab);
        }}
      />
    </PageStructure>
  );
};

export default brand;
