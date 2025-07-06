import * as z from "zod";
import { loginSchema, registrationSchema } from "./schema";

export type IconProps = React.HTMLAttributes<SVGElement>;

export type NavItem = {
  name: string;
  href: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type Status = {
  status: "default" | "success" | "error";
  message: string;
  data?: object;
};

export type RewardCatalog = {
  id: string;
  name: string;
  type: string;
  description: string | null;
  imageUrl: string;
  rarity: string;
};

export type Reward = {
  id: string;
  userId: string;
  rewardCatalogId: string;
  name: string;
  obtainedAt: Date;
  status: string;
  rewardCatalog: RewardCatalog;
};

export type LogInFormInputs = z.infer<typeof loginSchema>;
export type RegistrationFormInputs = z.infer<typeof registrationSchema>;
