import { Session } from "next-auth";

declare global {
  type Project = {
    id: string;
    userId: string;
    name: string;
    description: string;
    nbTesters: number;
    visibility: "public" | "private";
    version?: string;
  };

  type SubscriptionPlan = "free" | "premium";

  type PropsWithSession = { session: Session | null };

  type ServerError = { error: string; details?: unknown };
}
