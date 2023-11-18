import React, { useEffect, useMemo, useState } from "react";
import { Endpoints } from "../../enums";
import { useAPIFetching } from "../../hooks";
import {
  BriefItem,
  CategoriesResponse,
  CategoryItemsRequest,
  CategoryItemsResponse,
} from "../../interfaces";
import PageStructure from "../organisms/PageStructure";
import Tabs from "../organisms/Tabs";
import ItemsList from "./ItemsList";

interface CategoryPage {
  publicId: string;
  name: string;
  backButton: () => void;
  onItemClick: (item: BriefItem) => void;
}

const CategoryPage = ({
  publicId,
  name,
  backButton,
  onItemClick,
}: CategoryPage) => {
  const [selectedCategory, setSelectedCategory] = useState<{
    public_id: string;
    name: string;
  }>();
  const { response: categoriesResponse } = useAPIFetching<
    unknown,
    CategoriesResponse
  >({
    endpoint: Endpoints.CATEGORIES,
  });

  const slugs = selectedCategory
    ? {
        category: selectedCategory.public_id,
      }
    : undefined;

  const {
    response: itemsResponse,
    fetchMore,
    reset,
  } = useAPIFetching<CategoryItemsRequest, CategoryItemsResponse>({
    endpoint: Endpoints.CATEGORY,
    slugs: slugs,
    options: {
      wait: !selectedCategory,
      withPagination: true,
    },
    body: {
      limit: 6,
    },
  });

  const categoriesData = useMemo(() => {
    if (!categoriesResponse?.body?.data) return [];

    return categoriesResponse.body.data.filter(
      (category) => category.parent_public_id === publicId
    );
  }, [categoriesResponse]);

  useEffect(() => {
    if (categoriesData.length === 0) return;

    setSelectedCategory(categoriesData[0]);
  }, [categoriesData]);

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
            reset();
          }}
        />
      }
      scrollEnabled={false}
    >
      <ItemsList
        data={itemsResponse?.body?.data}
        fetchMore={fetchMore}
        onItemClick={onItemClick}
        isFetching={itemsResponse?.isFetching ?? true}
      />
    </PageStructure>
  );
};

export default CategoryPage;
