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

export type LogInFormInputs = z.infer<typeof loginSchema>;
export type RegistrationFormInputs = z.infer<typeof registrationSchema>;
