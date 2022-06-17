import { useTransition } from "@remix-run/react";
import { useState, useEffect, useMemo } from "react";
import toast from "react-hot-toast";

export const useToastTransition = (message: string) => {
  const { state } = useTransition();

  const [toastId, setToastId] = useState<string>();
  const loading = useMemo(
    () => state === "loading" || state === "submitting",
    [state]
  );

  useEffect(() => {
    if (loading) setToastId(toast.loading("Loading..."));

    if (!loading && toastId) {
      toast.remove(toastId);
      setToastId(undefined);

      if (message) toast.error(message);
    }

    return () => toast.remove(toastId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  return;
};
