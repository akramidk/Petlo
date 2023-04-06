import { useRouter } from "expo-router";
import { PageStructure } from "../../src/components/organisms";

const Cart = () => {
  const router = useRouter();

  return <PageStructure title="Cart" backButton={router.back} />;
};

export default Cart;
