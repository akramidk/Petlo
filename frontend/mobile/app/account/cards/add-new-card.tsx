import { PageStructure } from "../../../src/components/organisms";
import {
  useStripe,
  CardField,
  StripeProvider,
  CardForm,
} from "@stripe/stripe-react-native";
import { useEffect, useState } from "react";

const AddNewCard = () => {
  const { createToken } = useStripe();
  const [token, setToken] = useState<unknown>();

  useEffect(() => {
    console.log("token", token);
  }, [token]);

  return (
    <PageStructure title="Add New Card">
      <StripeProvider publishableKey="pk_test_51MLCpbBOEiCvkdTpNPVHQTabYpsAlE2aOm3lH4P6CgOhdYWVDBZs7bpDGHR5ewLjia5eii60w78ZkACtudbrWEun00gDTjfPaX">
        <CardField
          postalCodeEnabled={false}
          onCardChange={(cardDetails) => {
            createToken({
              type: "Card",
            }).then((response) => setToken(response?.token?.id));
          }}
          cardStyle={{ textColor: "#000" }}
          style={{
            height: 60,
            backgroundColor: "#f6f6f6",
            borderRadius: 4,
            padding: 20,
          }}
        />
      </StripeProvider>
    </PageStructure>
  );
};

export default AddNewCard;
