import { Authenticator } from "remix-auth";
import { sessionStorage } from "~/services/session.server";
import { FormStrategy } from "remix-auth-form";
import { supabase, supabaseAdmin } from "./supabase.server";
import { GitHubStrategy } from "remix-auth-github";
import type { AuthenticatedUser } from "~/remix-app";

export const authenticator = new Authenticator<AuthenticatedUser>(
  sessionStorage
);

authenticator.use(
  new FormStrategy(async ({ form }): Promise<AuthenticatedUser> => {
    const type = form.get("type");
    const username = form.get("username");
    const email = form.get("email");
    const password = form.get("password");

    if (type === "sign_up") {
      const { data } = await supabase
        .from("users")
        .select()
        .eq("username", username)
        .single();
      if (data) throw new Error("This username already taken");
    }

    const { data: user, error: signError } = await supabase.auth.api[
      type === "sign_up" ? "signUpWithEmail" : "signInWithEmail"
    ](email?.toString()!, password?.toString()!);

    if (signError) throw new Error(signError.message);

    const { data, error: updateError } = await supabaseAdmin
      .from("users")
      .upsert(
        type === "sign_in"
          ? {
              email,
              updated_at: new Date(),
            }
          : {
              email,
              username,
              avatar_url: null,
              updated_at: new Date(),
            },
        type === "sign_in"
          ? {
              onConflict: "email",
            }
          : {}
      )
      .single();

    if (updateError) throw new Error(updateError.message);
    return { user, data };
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
      // TODO: Change updates fields if we already has user in DB
      const updates = {
        email: profile.emails ? profile.emails[0].value : null,
        username: profile.displayName,
        avatar_url: profile.photos[0].value,
        updated_at: new Date(),
      };

      const { data, error } = await supabaseAdmin
        .from("users")
        .upsert(updates, {
          onConflict: "email",
        })
        .single();

      if (error) throw new Error(error.message);

      return { user: null, profile, accessToken, extraParams, data };
    }
  )
);
