import NextAuth from 'next-auth';
import { authConfig } from '@/auth.config';
import Credentials from 'next-auth/providers/credentials';
import {z} from "zod";
import connectDB from '@/lib/mongodb';
import User from '@/models/user';
import Company from '@/models/company';
import bcrypt from "bcrypt";

export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [Credentials({
        async authorize(credentials){
            const parsedCredentials = z
            .object({ username: z.string(), password: z.string() })
            .safeParse(credentials);

            if (parsedCredentials.success) {
                const { username, password } = parsedCredentials.data;
                
                try {
                    connectDB();
                    
                    const user = await User.findOne({ username });
                    const company = await Company.findOne({ username });
            
                    if (!user && !company) {
                        return null;
                    }
    
                    const passwordsMatch = async (inputPassword:string, hashedPassword:string) => {
                        return await bcrypt.compare(inputPassword, hashedPassword);
                    };
    
                    if (user && (await passwordsMatch(password, user.password))) {
                        return user;
                    }
             
                    if (company && (await passwordsMatch(password, company.password))) {
                    return company;
                    }                    
                } catch (error) {
                    throw new Error("Error")
                }
            }
            return null;
        }
    })]
});
  