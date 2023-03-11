import { useSearchParams } from "expo-router";
import { useState } from "react";
import { Filed } from "../../src/components/atoms";
import { Form } from "../../src/components/organisms";

const VerifyYourAccount = () => {
  const { phone_number, session_token } = useSearchParams();
  const [verificationCode, setVerificationCode] = useState<string>();

  return (
    <Form
      title="Verify Your Phone Number"
      helperText={`You should verify your phone number to use your account.${"\n"}We sent a sms with X digit code to your phone number ${phone_number}, type it below to verify it.`}
      button={{
        value: "Verify",
        onClick: () => {},
        status: verificationCode?.trim()?.length === 6 ? "active" : "inactive",
      }}
    >
      <Filed
        value={verificationCode}
        onChange={setVerificationCode}
        keyboardType="number-pad"
      />
    </Form>
  );
};

export default VerifyYourAccount;
