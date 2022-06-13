import { Form } from "@remix-run/react";
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { authenticator } from "~/services/auth.server";

export default function Screen() {
  return (
    <Form method="post">
      <input type="email" name="email" required />
      <input
        type="password"
        name="password"
        autoComplete="current-password"
        required
      />
      <button>Sign In</button>
    </Form>
  );
}

export const action: ActionFunction = async ({ request }) => {
  return await authenticator.authenticate("user-pass", request, {
    successRedirect: "/",
    failureRedirect: "/login",
  });
};

export const loader: LoaderFunction = async ({ request }) => {
  return await authenticator.isAuthenticated(request, {
    successRedirect: "/",
  });
};
