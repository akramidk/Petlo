import { useRouter } from "expo-router";
import { PageStructure } from "../../src/components/organisms";

const Checkout = () => {
  const router = useRouter();

  return <PageStructure title="Checkout" backButton={router.back} />;
};

export default Checkout;
