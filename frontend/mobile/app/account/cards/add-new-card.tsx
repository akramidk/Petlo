import { PageStructure } from "../../../src/components/organisms";
import {
  useStripe,
  CardField,
  StripeProvider,
} from "@stripe/stripe-react-native";
import { useEffect, useState } from "react";
import Constants from "expo-constants";

const AddNewCard = () => {
  const { createToken } = useStripe();
  const [token, setToken] = useState<unknown>();

  useEffect(() => {
    console.log("token", token);
  }, [token]);

  return (
    <PageStructure title="Add New Card">
      <StripeProvider
        publishableKey={Constants.expoConfig.extra.STRIPE_PUBLISHABLE_KEY}
      >
        <CardField
          postalCodeEnabled={false}
          onCardChange={(card) => {
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
