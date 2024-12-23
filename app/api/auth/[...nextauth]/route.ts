import { User } from "@/app/lib/user.model";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
 // Ensure bcrypt is installed

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID  || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET|| "",
    }),

   

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "email", type: "text", placeholder: "" },
        password: { label: "password", type: "password", placeholder: "" },
      },
      async authorize(credentials: any): Promise<any> {
        try {
          console.log(credentials);
          return {
            id: "1",
            email: "SAemr",
            name: "saemr"
          };
        } catch (error) {
          console.error("Authorization error:", error);
          return null;
        }
      },
      
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET || "default_secret", // Use environment variable
});

export { handler as GET, handler as POST };
