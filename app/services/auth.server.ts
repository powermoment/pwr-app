import { Authenticator } from "remix-auth";
import { sessionStorage } from "~/services/session.server";
import { FormStrategy } from "remix-auth-form";
import { supabase } from "./supabase.server";
import { GitHubStrategy } from "remix-auth-github";

export const authenticator = new Authenticator(sessionStorage);

authenticator.use(
  new FormStrategy(async ({ form }) => {
    let email = form.get("email");
    let password = form.get("password");
    let user = await supabase.auth.api.signInWithEmail(
      email?.toString()!,
      password?.toString()!
    );
    return user;
  }),
  "user-pass"
);

authenticator.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
    },
    async ({ accessToken, extraParams, profile }) => {
      return profile;
    }
  )
);
