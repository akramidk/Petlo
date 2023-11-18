import React, { useMemo, useState } from "react";
import { Endpoints } from "../../enums";
import { useAPIFetching, useTranslationsContext } from "../../hooks";
import {
  BrandCategoriesResponse,
  BrandItemsRequest,
  BrandItemsResponse,
  BriefItem,
} from "../../interfaces";
import PageStructure from "../organisms/PageStructure";
import Tabs from "../organisms/Tabs";
import ItemsList from "./ItemsList";

interface BrandPage {
  publicId: string;
  name: string;
  backButton: () => void;
  onItemClick: (item: BriefItem) => void;
}

const ALL_CATEGORY = {
  name: "COMMON_ALL",
  public_id: "ALL",
};

const BrandPage = ({ publicId, name, backButton, onItemClick }) => {
  const { t } = useTranslationsContext();
  const [selectedCategory, setSelectedCategory] = useState(ALL_CATEGORY);
  const { response: categoriesResponse } = useAPIFetching<
    unknown,
    BrandCategoriesResponse
  >({
    endpoint: Endpoints.BRAND_CATEGORIES,
    slugs: {
      publicId,
    },
  });

  const filterByCategoryId =
    selectedCategory.public_id === "ALL"
      ? undefined
      : {
          category_public_id: selectedCategory.public_id,
        };

  const {
    response: itemsResponse,
    fetchMore,
    reset,
  } = useAPIFetching<BrandItemsRequest, BrandItemsResponse>({
    endpoint: Endpoints.BRAND_ITEMS,
    slugs: {
      publicId: publicId,
    },
    body: {
      limit: 6,
      ...filterByCategoryId,
    },
    options: {
      withPagination: true,
    },
  });

  const categoriesData = useMemo(() => {
    if (!categoriesResponse?.body?.data) return [];
    return [
      { name: t(ALL_CATEGORY.name), public_id: ALL_CATEGORY.public_id },
      ...categoriesResponse.body.data,
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
        isFetching={itemsResponse.isFetching}
        has_more={itemsResponse?.body?.has_more}
      />
    </PageStructure>
  );
};

export default BrandPage;
