import type { ActionFunction} from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Form,
  useActionData,
  useOutletContext,
  useParams,
} from "@remix-run/react";
import { useEffect, useMemo, useState } from "react";
import { useToastTransition } from "~/hooks/useToastTransition";
import type { Breadcrumb, Reason } from "~/remix-app";
import { supabase } from "~/services/supabase.server";

const EMPTY_REASON = { name: "Reason name" };

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const id = form.get("id")?.toString();
  const name = form.get("name")?.toString();

  if (id) {
    const { error } = await supabase
      .from("reasons")
      .update({ name })
      .eq("id", id);
    if (error) return json({ message: error.message });
    return null;
  }

  const { error } = await supabase.from("reasons").upsert({ name });
  if (error) return json({ message: error.message });

  return null;
};

export const handle = {
  breadcrumb: (match: RouteMatch): Breadcrumb[] => [
    { title: "Edit", to: match.pathname },
  ],
};

const ReasonForm = () => {
  const { id } = useParams();
  const { reasons } = useOutletContext<{ reasons: Reason[] }>();
  const [form, setForm] = useState<Partial<Reason>>();
  const data = useActionData();

  useToastTransition(data?.message);

  const reason = useMemo(
    () => reasons.find((el) => el.id === id),
    [id, reasons]
  );

  useEffect(() => {
    setForm(reason);
  }, [reason]);

  useEffect(() => {
    if (id === "create") setForm(EMPTY_REASON);
  }, [id]);

  // TODO: Use formik as ex.
  const handleFieldChange =
    (field: "id" | "name") => (event: React.ChangeEvent<HTMLInputElement>) => {
      setForm({ ...form, [field]: event.target.value });
    };

  return (
    <Form method="post" className="relative mx-auto mb-0 space-y-4">
      <div>
        <div className="relative">
          <input hidden defaultValue={form?.id} name="id" />
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
