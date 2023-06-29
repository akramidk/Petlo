import { PageStructure } from "../../../src/components/organisms";
import { useTranslationsContext } from "../../../src/hooks";
import DateTimePicker from "@react-native-community/datetimepicker";
import { DateTime } from "luxon";
import { FiledWithSelector, Selector } from "../../../src/components/atoms";
import BaseSelector from "../../../src/components/bases/BaseSelector";

const SelectDate = () => {
  const { t } = useTranslationsContext();

  return (
    <PageStructure title={t("CREATE_AN_AUTOSHIP__STEPS.WHEN.PRIMARY_TEXT")}>
      <BaseSelector value="" onClick={() => {}} />
    </PageStructure>
  );
};

const SelectNextShipment = () => {
  return;
};

export default SelectDate;
