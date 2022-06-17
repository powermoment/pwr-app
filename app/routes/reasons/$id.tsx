import type { ActionFunction } from "@remix-run/node";
import { Form, useOutletContext, useParams } from "@remix-run/react";
import { useEffect, useMemo, useState } from "react";
import type { Reason } from "~/remix-app";

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const id = form.get("id");
  const name = form.get("name");

  console.log(id, name);

  return null;
};

const ReasonForm = () => {
  const { id } = useParams();
  const { reasons } = useOutletContext<{ reasons: Reason[] }>();
  const [form, setForm] = useState<Partial<Reason>>();

  const reason = useMemo(
    () => reasons.find((el) => el.id === id),
    [id, reasons]
  );

  useEffect(() => {
    setForm(reason);
  }, [reason]);

  if (!reason) {
    return <div>Something went wrong...</div>;
  }

  // TODO: Use formik as ex.
  const handleFieldChange =
    (field: "id" | "name") => (event: React.ChangeEvent<HTMLInputElement>) => {
      setForm({ ...form, [field]: event.target.value });
    };

  return (
    <Form method="post" className="relative mx-auto mb-0 space-y-4">
      <div>
        <div className="relative">
          <input
            type="text"
            className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
            placeholder="Reason name"
            value={form?.name || ""}
            onChange={handleFieldChange("name")}
            name="name"
          />
        </div>
      </div>
      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="inline-block rounded-lg bg-blue-500 px-6 py-2 text-sm font-medium text-white"
        >
          Save
        </button>
      </div>
    </Form>
  );
};

export default ReasonForm;
