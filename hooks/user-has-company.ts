import { Session } from "next-auth";

export const hasCompany = (session: Session | null): boolean => {
  return session?.user?.company !== undefined;
};
