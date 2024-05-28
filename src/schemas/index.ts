import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  first_name: z.string().min(1, {
    message: "*Name is required",
  }).max(20, {
    message: "*Maximum 20 characters allowed",
  }),
  last_name: z.string().max(20, {
    message: "*Maximum 20 characters allowed",
  }),
  email: z.string().email({
    message: "*Email is required",
  }),
  password: z.string().min(6, {
    message: "*Minimun 6 characters required",
  }).max(20, {
    message: "*Maximum 20 characters allowed",
  }).refine(password => /\d/.test(password), {
    message: "*Password must contain at least one number",
  }).refine(password => /[A-Z]/.test(password), {
    message: "*Password must contain at least one uppercase letter",
  }),
    re_password: z.string().min(6, {
      message: "*Minimun 6 characters required",
    }),
    terms: z.boolean().refine(value => value === true, {
      message: "*You must accept the terms and conditions to register",
    }),
  });
