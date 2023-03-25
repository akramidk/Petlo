import { PageStructure } from "../../../src/components/organisms";
import { useTranslationsContext } from "../../../src/hooks";
import { FiledWithSelector } from "../../../src/components/atoms";
import { COUNTIES_PHONE_CODE_OPTIONS } from "../../../src/constants";
import { BaseOption } from "../../../src/interfaces";
import { useState } from "react";

const ChangePhoneNumber = () => {
  const { t } = useTranslationsContext();

  const [countryCode, setCountryCode] = useState<BaseOption>(
    COUNTIES_PHONE_CODE_OPTIONS.find((code) => code.value === "+962")
  );
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  return (
    <PageStructure
      title={t("CHANGE_PHONE_NUMBER__STEP_1_TITLE")}
      button={{
        value: t("CHANGE_PHONE_NUMBER__STEP_1_CHANGE_BUTTON"),
        onClick: () => {},
      }}
      link={{
        value: t("CHANGE_PHONE_NUMBER__CANCEL_BUTTON"),
        onClick: () => {},
      }}
    >
      <FiledWithSelector
        placeholder={t("CHANGE_PHONE_NUMBER__STEP_1_FILED_PLACEHOLDER")}
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

export default ChangePhoneNumber;
