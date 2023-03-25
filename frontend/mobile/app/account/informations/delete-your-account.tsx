import { useRouter } from "expo-router";
import { useState } from "react";
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

const DeleteYourAccount = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const { t } = useTranslationsContext();
  const { direction } = useInternationalizationContext();
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

  const [verificationCode, setVerificationCode] = useState<string>("");

  if (step === 1) {
    return (
      <PageStructure
        title={t("DELETE_YOUR_ACCOUNT_STEP_1_TITLE")}
        helperText={t("DELETE_YOUR_ACCOUNT_STEP_1_HELPER_TEXT")}
        button={{
          value: t("DELETE_YOUR_ACCOUNT_STEP_1_BUTTON"),
          onClick: () => {
            requestPermissionTrigger({
              permission: APIPermissions.DELETE_CUSTOMER,
            });
            setStep(2);
          },
          cn: "bg-[#E64848]",
        }}
        link={{
          value: t("DELETE_YOUR_ACCOUNT_CANCEL_BUTTON"),
          onClick: router.back,
          valueCN: "text-[#0E333C]",
        }}
      />
    );
  }

  if (step === 2) {
    return (
      <PageStructure
        title={t("DELETE_YOUR_ACCOUNT_STEP_2_TITLE")}
        helperText={t("DELETE_YOUR_ACCOUNT_STEP_2_HELPER_TEXT", {
          verificationCodeLength: VERIFICATION_CODE_LENGTH,
        })}
        button={{
          value: t("DELETE_YOUR_ACCOUNT_STEP_2_BUTTON"),
          onClick: () => console.log("ddd"),
          cn: "bg-[#E64848]",
        }}
        link={{
          value: t("DELETE_YOUR_ACCOUNT_CANCEL_BUTTON"),
          onClick: router.back,
          valueCN: "text-[#0E333C]",
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
                permission: APIPermissions.DELETE_CUSTOMER,
              })
            }
            value={t("DELETE_YOUR_ACCOUNT_RESEND_CODE_LINK")}
            status={resendCodeStatus}
          />
        </View>
      </PageStructure>
    );
  }
};

export default DeleteYourAccount;
