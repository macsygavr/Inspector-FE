import { format } from "date-fns";

type DateOrEmpty = Date | string | null | undefined;

const validDate =
  (formatter: (v: Date | string) => string) => (value: DateOrEmpty) =>
    value == null ||
    value === "" ||
    new Date(value).toString() === "Invalid Date"
      ? "-"
      : formatter(value);

export const formatDate = validDate((v) => format(new Date(v), `dd.MM.yyyy`));
