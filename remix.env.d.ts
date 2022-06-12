/// <reference types="@remix-run/dev" />
/// <reference types="@remix-run/node/globals" />

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      REACT_APP_SUPABASE_URL: string;
      REACT_APP_SUPABASE_ANON_KEY: string;
      REACT_APP_SUPABASE_SERVICE_ROLE_KEY: string;
      GITHUB_CLIENT_ID: string;
      GITHUB_CLIENT_SECRET: string;
      GITHUB_CALLBACK_URL: string;
    }
  }
}

export declare function installGlobals(): void;
