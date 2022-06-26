import format from "date-fns/format";
import { DEFAULT_FORMAT } from "~/constants";
import type { Check } from "~/remix-app";

// FYI: Can we do it better? Hmm.
export const getChecksByDay = (checks: Check[], day: Date) => {
  const dayString = format(day, DEFAULT_FORMAT);

  return checks.filter(
    (check) => format(new Date(check.created_at), DEFAULT_FORMAT) === dayString
  );
};
