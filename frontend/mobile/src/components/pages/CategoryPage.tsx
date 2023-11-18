import { useMemo, useState } from "react";
import { View } from "react-native";
import { Endpoints } from "../../enums";
import { useAPIFetching } from "../../hooks";
import { CategoriesResponse } from "../../interfaces";
import PageStructure from "../organisms/PageStructure";
import Tabs from "../organisms/Tabs";

interface CategoryPage {
  publicId: string;
  name: string;
  backButton: () => void;
}

const ALL_CATEGORY = {
  name: "All",
  public_id: "ALL",
};

const CategoryPage = ({ publicId, name, backButton }: CategoryPage) => {
  const [selectedCategory, setSelectedCategory] = useState(ALL_CATEGORY);
  const { response: categoriesResponse } = useAPIFetching<
    unknown,
    CategoriesResponse
  >({
    endpoint: Endpoints.CATEGORIES,
  });

  const categoriesData = useMemo(() => {
    if (!categoriesResponse?.body?.data) return [];

    return [
      ALL_CATEGORY,
      ...categoriesResponse.body.data.filter(
        (category) => category.parent_public_id === publicId
      ),
    ];
  }, [categoriesResponse]);

  return (
    <PageStructure
      title={name}
      backButton={backButton}
      HelperComponent={
        <Tabs
          data={categoriesData}
          showSkeleton={categoriesData.length === 0}
          selectedTab={selectedCategory}
          onTabClick={(tab) => {
            setSelectedCategory(tab);
            //reset();
          }}
        />
      }
    ></PageStructure>
  );
};

export default CategoryPage;
