import { User } from "@/app/lib/user.model";
import NextAuth from "next-auth"
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
        name: 'Credentials',
        credentials: {
          username: { label: 'email', type: 'text', placeholder: '' },
          password: { label: 'password', type: 'password', placeholder: '' },
        },
        async authorize(credentials: any) {
            console.log(credentials)
            const userName = credentials?.username
            const passWord = credentials?.password
           
            const user = await User.findOne({ email: userName, password: passWord });
            console.log(user)
            if (user) {
              return user
            } else {
              return null
            }
        },
      })
  ],
  secret: "Sae"
})

export { handler as GET, handler as POST }