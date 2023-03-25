import { useEffect, useState } from "react";
import { PageStructure } from "../../../src/components/organisms";
import { VERIFICATION_CODE_LENGTH } from "../../../src/constants";
import { Endpoints } from "../../../src/enums";
import { APIPermissions } from "../../../src/enums/APIPermissions";
import {
  useAPIMutation,
  useInternationalizationContext,
  useTranslationsContext,
} from "../../../src/hooks";
import {
  RequestPermissionRequest,
  RequestPermissionResponse,
} from "../../../src/interfaces";
import { Filed, Link } from "../../../src/components/atoms";
import clsx from "clsx";
import { View } from "react-native";

const ChangePassword = () => {
  const { t } = useTranslationsContext();
  const { direction } = useInternationalizationContext();

  const [step, setStep] = useState(1);
  const [verificationCode, setVerificationCode] = useState<string>("");

  const { trigger: requestPermissionTrigger } = useAPIMutation<
    RequestPermissionRequest,
    RequestPermissionResponse
  >({
    endpoint: Endpoints.REQUEST_OTP_PERMISSION,
    method: "POST",
    options: {},
  });

  const { trigger: resendCodeTrigger, status: resendCodeStatus } =
    useAPIMutation<RequestPermissionRequest, RequestPermissionResponse>({
      endpoint: Endpoints.REQUEST_OTP_PERMISSION,
      method: "POST",
      options: {},
    });

  const { trigger, status } = useAPIMutation<
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
          status:
            verificationCode.trim().length === VERIFICATION_CODE_LENGTH
              ? "active"
              : "inactive",
        }}
        link={{
          value: t("CHANGE_PASSWORD__CANCEL_BUTTON"),
          onClick: () => {},
        }}
      >
        <Filed
          value={verificationCode}
          onChange={setVerificationCode}
          keyboardType="number-pad"
          maxLength={VERIFICATION_CODE_LENGTH}
        />

        <View
          className={clsx(
            "mt-[16px] justify-between",
            direction === "ltr" ? "flex-row" : "flex-row-reverse"
          )}
        >
          <Link
            onClick={() =>
              resendCodeTrigger({
                permission: APIPermissions.CHANGE_CUSTOMER_PASSWORD,
              })
            }
            value={t("CHANGE_PASSWORD__RESEND_CODE_LINK")}
            status={resendCodeStatus}
          />
        </View>
      </PageStructure>
    );
  }
};

export default ChangePassword;
