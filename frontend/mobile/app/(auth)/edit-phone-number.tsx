import { useRouter, useLocalSearchParams } from "expo-router";
import { PageStructure } from "../../src/components/organisms";
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
  const { sessionToken } = useLocalSearchParams<{ sessionToken: string }>();

  const [countryCode, setCountryCode] = useState<BaseOption>(
    COUNTIES_PHONE_CODE_OPTIONS.find((code) => code.value === "+962")
  );
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  const { response, trigger, status } = useAPIMutation<
    EditPhoneNumberOnVerificationRequest,
    EditPhoneNumberOnVerificationResponse
  >({
    endpoint: Endpoints.EDIT_PHONE_NUMBER_ON_VERIFICATION,
    method: "PATCH",
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
    <PageStructure
      title={t("EDIT_PHONE_NUMBER__TITLE")}
      button={{
        value: t("EDIT_PHONE_NUMBER__EDIT_BUTTON"),
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
        name={t("EDIT_PHONE_NUMBER__NEW_PHONE_NUMBER_FILED_LABEL")}
        helperText={t("COMMON__PHONE_NUMBER_WITHOUT_ZERO")}
        require={true}
        placeholder={t("EDIT_PHONE_NUMBER__NEW_PHONE_NUMBER_PLACEHOLDER")}
        options={COUNTIES_PHONE_CODE_OPTIONS}
        signalSelect={{
          selectedOption: countryCode,
          setSelectedOption: setCountryCode,
        }}
        value={phoneNumber}
        onChange={setPhoneNumber}
        keyboardType="number-pad"
      />
    </PageStructure>
  );
};

export default EditPhoneNumber;
