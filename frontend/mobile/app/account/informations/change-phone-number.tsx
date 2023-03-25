import { PageStructure } from "../../../src/components/organisms";
import { useTranslationsContext, useAPIMutation } from "../../../src/hooks";
import { Filed, FiledWithSelector } from "../../../src/components/atoms";
import { COUNTIES_PHONE_CODE_OPTIONS } from "../../../src/constants";
import {
  BaseOption,
  RequestPasswordPermissionRequest,
  RequestPasswordPermissionResponse,
} from "../../../src/interfaces";
import { useState } from "react";
import { Endpoints } from "../../../src/enums";
import { APIPermissions } from "../../../src/enums/APIPermissions";

const ChangePhoneNumber = () => {
  const { t } = useTranslationsContext();
  const [step, setStep] = useState(1);

  const [password, setPassword] = useState<string>("");

  const [countryCode, setCountryCode] = useState<BaseOption>(
    COUNTIES_PHONE_CODE_OPTIONS.find((code) => code.value === "+962")
  );
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  const {
    response: requestPermissionResponse,
    trigger: requestPermissionTrigger,
    status: requestPermissionStatus,
  } = useAPIMutation<
    RequestPasswordPermissionRequest,
    RequestPasswordPermissionResponse
  >({
    endpoint: Endpoints.REQUEST_PASSWORD_PERMISSION,
    method: "POST",
    options: {
      onSucceeded: () => setStep(2),
      fireOnSucceededAfter: 1000,
    },
  });

  if (step === 1) {
    return (
      <PageStructure
        title={t("CHANGE_PHONE_NUMBER__STEP_1_TITLE")}
        helperText={t("CHANGE_PHONE_NUMBER__STEP_1_HELPER_TEXT")}
        button={{
          value: t("CHANGE_PHONE_NUMBER__STEP_1_CONTINUE_BUTTON"),
          onClick: () =>
            requestPermissionTrigger({
              permission: APIPermissions.CHANGE_CUSTOMER_PHONE_NUMBER,
              password: password,
            }),
          status:
            requestPermissionStatus ??
            (password.trim().length === 0 ? "inactive" : "active"),
        }}
        link={{
          value: t("CHANGE_PHONE_NUMBER__CANCEL_BUTTON"),
          onClick: () =>
            requestPermissionTrigger({
              permission: APIPermissions.CHANGE_CUSTOMER_PHONE_NUMBER,
              password: password,
            }),
        }}
      >
        <Filed
          placeholder={t("CHANGE_PHONE_NUMBER__STEP_1_FILED_PLACEHOLDER")}
          onChange={setPassword}
          value={password}
          secureTextEntry={true}
        />
      </PageStructure>
    );
  }

  if (step === 2) {
    return (
      <PageStructure
        title={t("CHANGE_PHONE_NUMBER__STEP_2_TITLE")}
        button={{
          value: t("CHANGE_PHONE_NUMBER__STEP_2_CHANGE_BUTTON"),
          onClick: () => {},
        }}
        link={{
          value: t("CHANGE_PHONE_NUMBER__CANCEL_BUTTON"),
          onClick: () => {},
        }}
      >
        <FiledWithSelector
          placeholder={t("CHANGE_PHONE_NUMBER__STEP_2_FILED_PLACEHOLDER")}
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
  }
};

export default ChangePhoneNumber;
