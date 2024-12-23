import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

// Define the structure of the user object returned by authorize
interface User {
  id: string;
  email: string;
  name: string;
}

// Define the structure of the credentials object
interface Credentials {
  username: string;
  password: string;
}

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Email", type: "text", placeholder: "Enter your email" },
        password: { label: "Password", type: "password", placeholder: "Enter your password" },
      },
      async authorize(credentials: Credentials | null): Promise<User | null> {
        if (!credentials) {
          return null; // Return null if credentials are not provided
        }

        const { username, password } = credentials;

        try {
          console.log("Credentials received:", { username, password });

          // Here, you should validate the username and password with your backend
          // Replace this mock user with your actual validation logic
          const user: User = {
            id: "1",
            email: username,
            name: "Sample User",
          };

          return user; // Return the user object on successful validation
        } catch (error) {
          console.error("Authorization error:", error);
          return null; // Return null if authorization fails
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET || "default_secret", // Use environment variable
});

export { handler as GET, handler as POST };
