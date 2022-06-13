import { Form } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/node";
import { authenticator } from "~/services/auth.server";
import React from "react";

export default function Screen() {
  return (
    <React.Fragment>
      <Form method="post" action="../auth/login">
        <input type="text" name="username" />
        <input type="email" name="email" required />

        <input
          type="password"
          name="password"
          autoComplete="current-password"
          required
        />

        <input type="radio" id="sign_up" name="type" value="sign_up"></input>
        <label htmlFor="sign_up">Sign Up</label>

        <input type="radio" name="type" id="sign_in" value="sign_in"></input>
        <label htmlFor="sign_in">Sign In</label>

        <button>Log In</button>
      </Form>
      <Form method="post" action="../auth/github">
        <button>Log In via Github</button>
      </Form>
    </React.Fragment>
  );
}

export const loader: LoaderFunction = async ({ request }) => {
  return await authenticator.isAuthenticated(request, {
    successRedirect: "/",
  });
};
