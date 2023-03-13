import { useRouter, useSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Filed } from "../../src/components/atoms";
import { Form } from "../../src/components/organisms";
import { Endpoints } from "../../src/enums";
import { useAPIMutation } from "../../src/hooks";

const VerifyYourAccount = () => {
  const router = useRouter();

  const { phoneNumber, sessionToken } = useSearchParams();
  const [verificationCode, setVerificationCode] = useState<string>();
  const { trigger } = useAPIMutation<unknown, unknown>({
    endpoint: Endpoints.VERIFY_CUSTOMER_ACCOUNT,
    method: "POST",
    onSucceeded: () => router.replace("/"),
    sessionToken: sessionToken,
  });

  return (
    <Form
      title="Verify Your Phone Number"
      helperText={`You should verify your phone number to use your account.${"\n"}We sent a sms with X digit code to your phone number ${phoneNumber}, type it below to verify it.`}
      button={{
        value: "Verify",
        onClick: () =>
          trigger({
            verification_code: Number(verificationCode),
          }),
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
