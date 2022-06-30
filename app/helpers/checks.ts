import format from "date-fns/format";
import type { Check } from "~/remix-app";

export const DEFAULT_FORMAT = "MM/dd/yyyy";
export const getChecksByDay = (checks: Check[], day: Date) => {
  const dayString = format(day, DEFAULT_FORMAT);

  return checks.filter(
    (check) => format(new Date(check.created_at), DEFAULT_FORMAT) === dayString
  );
};
