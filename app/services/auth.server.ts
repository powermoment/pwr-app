import { Authenticator } from "remix-auth";
import { sessionStorage } from "~/services/session.server";
import { FormStrategy } from "remix-auth-form";
import { supabase, supabaseAdmin } from "./supabase.server";
import { GitHubStrategy } from "remix-auth-github";

export const authenticator = new Authenticator(sessionStorage);

authenticator.use(
  new FormStrategy(async ({ form }) => {
    const type = form.get("type");
    const email = form.get("email");
    const password = form.get("password");

    const { data: user, error: signError } = await supabase.auth.api[
      type === "sign_up" ? "signUpWithEmail" : "signInWithEmail"
    ](email?.toString()!, password?.toString()!);

    if (signError) {
      console.error(signError.message);
      throw signError.message;
    }

    const { data, error: updateError } = await supabaseAdmin
      .from("profiles")
      .upsert(
        {
          email,
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

    if (updateError) {
      console.error(updateError.message);
      throw updateError.message;
    }

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
      const updates = {
        email: profile.emails ? profile.emails[0].value : null,
        username: profile.displayName,
        avatar_url: profile.photos[0].value,
        updated_at: new Date(),
      };

      const { data, error } = await supabaseAdmin
        .from("profiles")
        .upsert(updates, {
          onConflict: "email",
        })
        .single();

      if (error) {
        console.log(error.message);
        throw error.message;
      }

      return { profile, accessToken, extraParams, data };
    }
  )
);
