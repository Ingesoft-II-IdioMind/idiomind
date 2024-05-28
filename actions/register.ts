"use server";

import { RegisterSchema } from "app/schemas";
import * as z from "zod";
import bcrypt from "bcrypt";
import { db } from "../lib/db";
import { get } from "http";
import { getUserByEmail } from "app/data/user";


export const register2 = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedField = RegisterSchema.safeParse(values);

  if (!validatedField.success) {
    return { error: "Invalid fields!" };
  }
  
  const { first_name, last_name, email, password } = validatedField.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);
  
  if (existingUser) {
    return { error: "Email already in use!" };
  }

  await db.user.create({
    data: {
      first_name,
      last_name,
      email,
      password: hashedPassword,
    },
  });

  // Send email

  return { success: "Email send!" };
};
