import { createCookieSessionStorage } from "@remix-run/node";

const getExpiresDate = () => {
  // FYI: 604800 - one week in seconds
  return new Date(Date.now() + 604800 * 1000);
};

export let sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "_session",
    sameSite: "lax",
    path: "/",
    httpOnly: true,
    secrets: [process.env.SESSION_SECRET],
    expires: getExpiresDate(),
    secure: process.env.NODE_ENV === "production",
  },
});

export let { getSession, commitSession, destroySession } = sessionStorage;
