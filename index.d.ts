import { Session } from "next-auth";
import { type Project as PrismaProject } from "@prisma/client"

declare global {
  type SubscriptionPlan = "free" | "premium";
  
  type PropsWithSession = { session: Session | null };
  
  type ServerError = { error: string; details?: unknown };
  type Project = PrismaProject;
}
