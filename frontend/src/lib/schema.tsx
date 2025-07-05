import * as z from "zod";

export const registrationSchema = z
  .object({
    username: z.string().min(1, { message: "Provide your user name." }),
    email: z.string().min(1, { message: "Provide a valid email." }),
    wallet: z.string().optional(),
    password: z
      .string()
      .min(8, { message: "Password is too short" })
      .max(20, { message: "Password is too long" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Password is too short" })
      .max(20, { message: "Password is too long" }),
  })
  .refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    {
      message: "Passwords must match!",
      path: ["confirmPassword"],
    }
  );

export const loginSchema = z.object({
  email: z.string().min(1, { message: "Provide a valid email." }),
  password: z
    .string()
    .min(8, { message: "Password is too short" })
    .max(20, { message: "Password is too long" }),
});
