import type { Reason } from "~/remix-app";

type ReasonSelectProps = {
  reasons: Reason[];
};

const ReasonSelect = ({ reasons }: ReasonSelectProps) => {
  return (
    <ul className="flex flex-wrap gap-2">
      {reasons.map((reason) => (
        <li key={reason.id} className="relative">
          <input
            className="peer sr-only"
            type="checkbox"
            value={reason.id}
            name="reasons"
            id={reason.name}
          />
          <label
            className="flex cursor-pointer rounded border border-current px-3 py-1.5 text-[12px] font-medium lowercase text-pwr peer-checked:border-transparent peer-checked:bg-pwr peer-checked:text-white"
            htmlFor={reason.name}
          >
            {reason.name}
          </label>
        </li>
      ))}
    </ul>
  );
};

export default ReasonSelect;
