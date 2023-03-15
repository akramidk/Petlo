import { useRouter, useSearchParams } from "expo-router";
import { useState } from "react";
import { Filed } from "../../src/components/atoms";
import { Form } from "../../src/components/organisms";
import { Endpoints } from "../../src/enums";
import { useAPIMutation } from "../../src/hooks";

const VERIFICATION_CODE_LENGTH = 6;

const VerifyYourAccount = () => {
  const router = useRouter();

  const { phoneNumber, sessionToken } = useSearchParams();
  const [verificationCode, setVerificationCode] = useState<string>();
  const { trigger, status } = useAPIMutation<unknown, unknown>({
    endpoint: Endpoints.VERIFY_CUSTOMER_ACCOUNT,
    method: "POST",
    options: {
      onSucceeded: () => router.replace("/"),
      overwriteSessionToken: sessionToken,
    },
  });

  return (
    <Form
      title="Verify Your Phone Number"
      helperText={`You should verify your phone number to use your account.${"\n"}We sent a sms with ${VERIFICATION_CODE_LENGTH} digit code to your phone number ${phoneNumber}, type it below to verify it.`}
      button={{
        value: "Verify",
        onClick: () =>
          trigger({
            verification_code: Number(verificationCode),
          }),
        status:
          status ??
          (verificationCode?.trim()?.length === VERIFICATION_CODE_LENGTH
            ? "active"
            : "inactive"),
      }}
    >
      {
        // TODO use figma design
      }
      <Filed
        value={verificationCode}
        onChange={setVerificationCode}
        keyboardType="number-pad"
        maxLength={VERIFICATION_CODE_LENGTH}
      />
    </Form>
  );
};

export default VerifyYourAccount;
