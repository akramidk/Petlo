import { useRouter } from "expo-router";
import { PageStructure } from "../../../src/components/organisms";

const Cards = () => {
  const router = useRouter();

  return (
    <PageStructure
      title="Cards"
      button={{
        value: "Add New Card",
        onClick: () => router.push("/account/cards/add-new-card"),
      }}
      backButton={router.back}
    />
  );
};

export default Cards;
