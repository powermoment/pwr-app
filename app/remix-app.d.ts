declare global {
  interface Window {
    ENV: {
      REACT_APP_SUPABASE_URL: string;
      REACT_APP_SUPABASE_ANON_KEY: string;
    };
  }
}

export {};
