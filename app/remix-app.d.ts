import type { useMatches } from "@remix-run/react";
import type { Session, User } from "@supabase/supabase-js";
import type { GitHubProfile } from "remix-auth-github";

export type DBUser = {
  id: string;
  email: string;
  username: string | null;
  avatar_url: string | null;
  updated_at: string;
  role: string;
};

// TODO: Move at another .d.ts file
export type Reason = { id: string; name: string };
export type Check = {
  id: string;
  created_at: string;
  reason_ids: string[];
  value: number;
  user_id: string;
};

export type AuthenticatedUser = {
  user: Session | User | null;
  profile?: GitHubProfile;
  data: DBUser;
};

export type Breadcrumb = string | { title: string; to: string };

declare global {
  // FYI: Well, love utility types in ts
  type RouteMatch = ReturnType<typeof useMatches>[0];

  interface Window {
    ENV: {
      REACT_APP_SUPABASE_URL: string;
      REACT_APP_SUPABASE_ANON_KEY: string;
    };
  }
}

export {};
