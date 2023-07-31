import { useEffect, useState } from "react";
import { PageStructure } from "../../../src/components/organisms";
import { VERIFICATION_CODE_LENGTH } from "../../../src/constants";
import { Endpoints } from "../../../src/enums";
import { APIPermissions } from "../../../src/enums";
import {
  useAPIMutation,
  useInternationalizationContext,
  useTranslationsContext,
} from "../../../src/hooks";
import {
  RequestPermissionRequest,
  RequestPermissionResponse,
  VerifyRequestedPermissionRequest,
  VerifyRequestedPermissionResponse,
  ChangePasswordRequest,
  ChangePasswordResponse,
} from "../../../src/interfaces";
import { Filed, Link } from "../../../src/components/atoms";
import clsx from "clsx";
import { View } from "react-native";
import { useRouter } from "expo-router";

const ChangePassword = () => {
  const router = useRouter();
  const { t } = useTranslationsContext();
  const { direction } = useInternationalizationContext();

  const [step, setStep] = useState(1);
  const [verificationCode, setVerificationCode] = useState<string>("");
  const [password, setPassword] = useState("");

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

  const {
    response: verifyRequestedPermissionResponse,
    trigger: verifyRequestedPermissionTrigger,
    status: verifyRequestedPermissionStatus,
  } = useAPIMutation<
    VerifyRequestedPermissionRequest,
    VerifyRequestedPermissionResponse
  >({
    endpoint: Endpoints.VERIFY_REQUESTED_OTP_PERMISSION,
    method: "POST",
    options: {
      onSucceeded: () => setStep(2),
      fireOnSucceededAfter: 1000,
    },
  });

  const { trigger: changePasswordTrigger, status: changePasswordStatus } =
    useAPIMutation<ChangePasswordRequest, ChangePasswordResponse>({
      endpoint: Endpoints.CHANGE_CUSTOMER_PASSWORD,
      method: "PATCH",
      options: {
        onSucceeded: router.back,
        fireOnSucceededAfter: 1000,
        overwriteSessionToken:
          verifyRequestedPermissionResponse?.body?.customer?.session_token,
      },
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
          onClick: () =>
            verifyRequestedPermissionTrigger({
              permission: APIPermissions.CHANGE_CUSTOMER_PASSWORD,
              verification_code: Number(verificationCode),
            }),
          status:
            verifyRequestedPermissionStatus ??
            (verificationCode.trim().length === VERIFICATION_CODE_LENGTH
              ? "active"
              : "inactive"),
        }}
        link={{
          value: t("CHANGE_PASSWORD__CANCEL_BUTTON"),
          onClick: router.back,
          status: verifyRequestedPermissionStatus ? "inactive" : "active",
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

  if (step === 2) {
    return (
      <PageStructure
        title={t("CHANGE_PASSWORD__STEP_2_TITLE")}
        button={{
          value: t("CHANGE_PASSWORD__STEP_2_CHANGE_BUTTON"),
          onClick: () =>
            changePasswordTrigger({
              password: password,
            }),
          status:
            changePasswordStatus ??
            (password.trim().length >= 8 ? "active" : "inactive"),
        }}
        link={{
          value: t("CHANGE_PASSWORD__CANCEL_BUTTON"),
          onClick: router.back,
          status: changePasswordStatus ? "inactive" : "active",
        }}
      >
        <Filed
          name={t("CHANGE_PASSWORD__STEP_2_FILED_LABEL")}
          helperText={t("CHANGE_PASSWORD__STEP_2_FILED_HELPER_TEXT")}
          placeholder={t("CHANGE_PASSWORD__STEP_2_FILED_PLACEHOLDER")}
          onChange={setPassword}
          value={password}
          secureTextEntry={true}
        />
      </PageStructure>
    );
  }
};

export default ChangePassword;
