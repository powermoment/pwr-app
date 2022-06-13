import { Form } from "@remix-run/react";
import React from "react";

const checks = () => {
  return (
    <Form>
      <input
        type="text"
        placeholder="Type here"
        className="input input-bordered input-primary w-full max-w-xs"
      />
    </Form>
  );
};

export default checks;
