import { Form, Link, useActionData, useTransition } from "@remix-run/react";
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { authenticator } from "~/services/auth.server";
import { AuthorizationError } from "remix-auth";
import { useToastTransition } from "~/hooks/useToastTransition";
import type { Breadcrumb } from "~/remix-app";

export const loader: LoaderFunction = async ({ request }) => {
  return await authenticator.isAuthenticated(request, {
    successRedirect: "/",
  });
};

export const action: ActionFunction = async ({ request }) => {
  try {
    return await authenticator.authenticate("user-pass", request, {
      successRedirect: "/",
      throwOnError: true,
    });
  } catch (error) {
    if (error instanceof AuthorizationError)
      return json({ success: false, message: error.message });
    return error;
  }
};

export const handle = {
  breadcrumb: (): Breadcrumb[] => [
    { title: "Sign Up", to: "/signup" },
  ],
};

export const SignUp = () => {
  const data = useActionData();
  const { state } = useTransition();

  useToastTransition(data?.message);

  return (
    <div
      className={`${
        state === "submitting" ? "pointer-events-none animate-pulse" : ""
      } mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8`}
    >
      <div className="mx-auto max-w-lg text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">PowerMoment</h1>
        <p className="mt-4 text-gray-500">Take your power under control</p>
      </div>
      <Form method="post" className="mx-auto mt-8 mb-0 max-w-md space-y-4">
        <div>
          <label htmlFor="username" className="sr-only">
            Username
          </label>

          <div className="relative">
            <input
              name="username"
              type="text"
              className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
              placeholder="Enter username"
            />

            <span className="absolute inset-y-0 right-4 inline-flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </span>
          </div>
        </div>

        <div>
          <label htmlFor="email" className="sr-only">
            Email
          </label>

          <div className="relative">
            <input
              name="email"
              type="email"
              className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
              placeholder="Enter email"
            />

            <span className="absolute inset-y-0 right-4 inline-flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                />
              </svg>
            </span>
          </div>
        </div>

        <div>
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <div className="relative">
            <input
              name="password"
              type="password"
              className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
              placeholder="Enter password"
            />

            <span className="absolute inset-y-0 right-4 inline-flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </span>
          </div>
        </div>

        <input
          defaultChecked
          type="radio"
          name="type"
          value="sign_up"
          className="hidden"
        ></input>

        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Has account?
            <Link className="ml-1 underline" to="/login">
              Log In
            </Link>
          </p>

          <button
            type="submit"
            className="ml-3 inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
          >
            Sign Up
          </button>
        </div>
      </Form>
    </div>
  );
};

export default SignUp;
