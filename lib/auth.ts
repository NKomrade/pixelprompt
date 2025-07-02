import { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { DefaultSession } from "next-auth"
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { connectDB } from '@/lib/mongodb'
import User from '@/lib/models/User'

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"]
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        try {
          await connectDB()
          
          const user = await User.findOne({ email: credentials.email })
          
          if (!user) {
            return null
          }

          const isPasswordValid = await bcrypt.compare(credentials.password, user.password)
          
          if (!isPasswordValid) {
            return null
          }

          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
          }
        } catch (error) {
          console.error('Auth error:', error)
          return null
        }
      }
    })
  ],
  session: {
    strategy: 'jwt'
  },
  pages: {
    signIn: '/login',
    newUser: '/register'
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'google') {
        try {
          await connectDB()
          
          // Check if user already exists
          const existingUser = await User.findOne({ email: user.email })
          
          if (!existingUser) {
            // Create new user with 5 credits and basic plan
            await User.create({
              name: user.name,
              email: user.email,
              password: 'google-oauth', // placeholder for OAuth users
              profilePicture: user.image || null,
              credits: 5,
              plan: 'basic'
            })
          } else if (!existingUser.profilePicture && user.image) {
            // Update existing user with profile picture if they don't have one
            await User.findByIdAndUpdate(existingUser._id, {
              profilePicture: user.image
            })
          }
          
          return true
        } catch (error) {
          console.error('Error creating user:', error)
          return false
        }
      }
      return true
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id
      }
      if (account?.provider === 'google') {
        // Fetch user data from database to get profile picture
        try {
          await connectDB()
          const dbUser = await User.findOne({ email: token.email })
          if (dbUser) {
            token.profilePicture = dbUser.profilePicture
          }
        } catch (error) {
          console.error('Error fetching user data:', error)
        }
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
        session.user.image = token.profilePicture as string || session.user.image
      }
      return session
    }
  }
}
