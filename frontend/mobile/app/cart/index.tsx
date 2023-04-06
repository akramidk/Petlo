import { useRouter } from "expo-router";
import { PageStructure } from "../../src/components/organisms";
import { useCartContext } from "../../src/hooks";
import Loading from "../_Loading";

const Cart = () => {
  const router = useRouter();
  const { summary } = useCartContext();

  if (!summary) {
    return <Loading />;
  }

  return <PageStructure title="Cart" backButton={router.back} />;
};

export default Cart;
