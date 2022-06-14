import type { Session, User } from "@supabase/supabase-js";
import type { GitHubProfile } from "remix-auth-github";

export type AuthenticatedUser = {
  user: Session | User | null;
  profile?: GitHubProfile;
  data: any;
};

declare global {
  interface Window {
    ENV: {
      REACT_APP_SUPABASE_URL: string;
      REACT_APP_SUPABASE_ANON_KEY: string;
    };
  }
}

export {};
