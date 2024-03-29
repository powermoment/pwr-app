import type {
  LinksFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import AppLayout from "./components/AppLayout";
import { Toaster } from "react-hot-toast";
import type { AuthenticatedUser } from "./remix-app";
import { authenticator } from "./services/auth.server";
import styles from "./styles/app.css";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "PowerMoment",
  viewport: "width=device-width,initial-scale=1",
});

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: styles },
    { rel: "icon", type: "image/png", href: "favicon.png" },
    {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
      crossOrigin: "anonymous",
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css?family=Work+Sans:300,400,600,700&amp;lang=en",
    },
  ];
};

export const loader: LoaderFunction = async ({ request }) => {
  return {
    ENV: {
      REACT_APP_SUPABASE_URL: process?.env?.REACT_APP_SUPABASE_URL,
      REACT_APP_SUPABASE_ANON_KEY: process?.env?.REACT_APP_SUPABASE_ANON_KEY,
    },
    user: await authenticator.isAuthenticated(request),
  };
};

export default function App() {
  const data = useLoaderData();
  const user = data.user as AuthenticatedUser;

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <AppLayout user={user}>
          <Outlet />
        </AppLayout>
        <ScrollRestoration />
        {data && data.ENV && (
          <script
            dangerouslySetInnerHTML={{
              __html: `window.ENV = ${JSON.stringify(data.ENV)}`,
            }}
          />
        )}
        <Scripts />
        <LiveReload />
        <Toaster />
      </body>
    </html>
  );
}
