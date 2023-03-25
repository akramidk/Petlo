import { useEffect, useState } from "react";
import { PageStructure } from "../../../src/components/organisms";
import { VERIFICATION_CODE_LENGTH } from "../../../src/constants";
import { Endpoints } from "../../../src/enums";
import { APIPermissions } from "../../../src/enums/APIPermissions";
import { useAPIMutation, useTranslationsContext } from "../../../src/hooks";
import {
  RequestPermissionRequest,
  RequestPermissionResponse,
} from "../../../src/interfaces";

const ChangePassword = () => {
  const { t } = useTranslationsContext();
  const [step, setStep] = useState(1);

  const { trigger: requestPermissionTrigger } = useAPIMutation<
    RequestPermissionRequest,
    RequestPermissionResponse
  >({
    endpoint: Endpoints.REQUEST_OTP_PERMISSION,
    method: "POST",
    options: {},
  });

  useEffect(() => {
    requestPermissionTrigger({
      permission: APIPermissions.CHANGE_CUSTOMER_PASSWORD,
    });
  }, []);

  if (step === 1) {
    return (
      <PageStructure
        title={t("CHANGE_PASSWORD__STEP_1_TITLE")}
        helperText={t("CHANGE_PASSWORD__STEP_1_HELPER_TEXT", {
          verificationCodeLength: VERIFICATION_CODE_LENGTH,
        })}
        button={{
          value: t("CHANGE_PASSWORD__STEP_1_CONTINUE_BUTTON"),
          onClick: () => {},
        }}
        link={{
          value: t("CHANGE_PASSWORD__CANCEL_BUTTON"),
          onClick: () => {},
        }}
      ></PageStructure>
    );
  }
};

export default ChangePassword;
