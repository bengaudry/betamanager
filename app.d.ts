import { Session } from "next-auth";

type Organization = {
  id: string;
  name: string;
};

type Project = {
  id: string;
  organizationId: string;
  name: string;
  description: string;
  nbTesters: number;
  visibility: "public" | "private";
  version?: string;
};

type SubscriptionPlan = "free" | "premium";

type PropsWithSession = { session: Session | null }
