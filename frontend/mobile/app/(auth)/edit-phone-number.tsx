import { useRouter, useSearchParams } from "expo-router";
import { Form } from "../../src/components/organisms";
import { useAPIMutation, useTranslationsContext } from "../../src/hooks";
import { FiledWithSelector } from "../../src/components/atoms";
import { useState } from "react";
import { COUNTIES_PHONE_CODE_OPTIONS } from "../../src/constants";
import {
  BaseOption,
  EditPhoneNumberOnVerificationRequest,
  EditPhoneNumberOnVerificationResponse,
} from "../../src/interfaces";
import { Endpoints } from "../../src/enums";

const EditPhoneNumber = () => {
  const { t } = useTranslationsContext();
  const router = useRouter();
  const { sessionToken } = useSearchParams();

  const [countryCode, setCountryCode] = useState<BaseOption>(
    COUNTIES_PHONE_CODE_OPTIONS.find((code) => code.value === "+962")
  );
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  const { response, trigger, status } = useAPIMutation<
    EditPhoneNumberOnVerificationRequest,
    EditPhoneNumberOnVerificationResponse
  >({
    endpoint: Endpoints.EDIT_PHONE_NUMBER_ON_VERIFICATION,
    method: "POST",
    options: {
      onSucceeded: () => {
        router.replace(
          `/verify-your-account?${new URLSearchParams({
            phoneNumber: countryCode.value + phoneNumber,
            sessionToken: response.body.customer.session_token,
          }).toString()}`
        );
      },
      fireOnSucceededAfter: 1000,
      overwriteSessionToken: sessionToken,
    },
  });

  return (
    <Form
      title={t("EDIT_PHONE_NUMBER_TITLE")}
      button={{
        value: t("EDIT_PHONE_NUMBER_EDIT_BUTTON"),
        onClick: () =>
          trigger({
            phone_number: countryCode.value + phoneNumber,
          }),
        status:
          status ??
          (countryCode && phoneNumber.trim().length > 0
            ? "active"
            : "inactive"),
      }}
      backButton={() => router.back()}
    >
      <FiledWithSelector
        name={t("EDIT_PHONE_NUMBER_NEW_PHONE_NUMBER_FILED_LABEL")}
        require={true}
        placeholder={t("EDIT_PHONE_NUMBER_NEW_PHONE_NUMBER_PLACEHOLDER")}
        options={COUNTIES_PHONE_CODE_OPTIONS}
        signalSelect={{
          selectedOption: countryCode,
          setSelectedOption: setCountryCode,
        }}
        value={phoneNumber}
        onChange={setPhoneNumber}
        keyboardType="number-pad"
      />
    </Form>
  );
};

export default EditPhoneNumber;
