import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials";

import { LoginSchema } from "app/schemas";
import { getUserByEmail } from "app/data/user";
import bcrypt from "bcrypt";

export default {
  providers: [
    Credentials({
     async authorize(credentials) {
        const validatedField = LoginSchema.safeParse(credentials);
        if (!validatedField.success) {
          const {email, password} = validatedField.data;

          const user = await getUserByEmail(email);
          if (!user || !user.password) return null;
          const passwordMatch = await bcrypt.compare(
            password, 
            user.password
        );

        if (passwordMatch) return user;
        }
        return null;
     }
    })
  ]
} satisfies NextAuthConfig