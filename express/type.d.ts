declare global {
  namespace Express {
    interface User {
      minsu: string;
    }
  }
}

declare module "express-session" {
  interface SessionData {
    sessionData: string;
  }
}

export {};
