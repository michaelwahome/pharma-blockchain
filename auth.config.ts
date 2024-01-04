import type { NextAuthConfig } from 'next-auth';
import { CompanyType, UserType } from './app/lib/types';

 
export const authConfig = {
    pages: {
        signIn: '/signin',
    },
    callbacks: {
        async jwt({token, account, user, profile}){
            if (user) {
                const typedUser = convertToTypedUser(user);
                token.id = typedUser._id;
                token.username = typedUser.username;
                token.role = typedUser.role;
                if("companyName" in typedUser){
                    token.companyName = typedUser.companyName
                }else{
                    token.firstName = typedUser.firstName;
                    token.lastName = typedUser.lastName;
                }
              }

            return token;
        },
        async session({session, token, user}){
            if(session.user){
                session.user.id = token.id as string;
                session.user.username = token.username as string;
                session.user.role = token.role as string;

                if("companyName" in token){
                    session.user.companyName = token.companyName as string;
                }else{
                    session.user.firstName = token.firstName as string;
                    session.user.lastName = token.lastName as string;
                }
            }

            return session;
        },
        async authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isHome = nextUrl.pathname.length === 1 || 
            nextUrl.pathname.startsWith('/about') || 
            nextUrl.pathname.startsWith('/contact') ||
            nextUrl.pathname.startsWith('/signup') ||
            nextUrl.pathname.startsWith('/registercompany');
            const isOnUser = nextUrl.pathname.startsWith('/user');
            const isOnManufacturer = nextUrl.pathname.startsWith('/manufacturer');
            const isOnDistributor = nextUrl.pathname.startsWith('/distributor');
            const isOnRetailer = nextUrl.pathname.startsWith('/retailer');
            const isOnAdmin = nextUrl.pathname.startsWith('/admin');
            const isOnSuperAdmin = nextUrl.pathname.startsWith('/superadmin');

            if(!isLoggedIn && !isHome){
                return false;
            } else if(isLoggedIn){
                const role = auth?.user.role;

                if(role==="user" && !isOnUser){
                    return Response.redirect(new URL('/user', nextUrl));
                }

                if(role==="manufacturer" && !isOnManufacturer){
                    return Response.redirect(new URL('/manufacturer', nextUrl));
                }

                if(role==="distributor" && !isOnDistributor){
                    return Response.redirect(new URL('/distributor', nextUrl));
                }

                if(role==="retailer" && !isOnRetailer){
                    return Response.redirect(new URL('/retailer', nextUrl));
                }

                if(role==="admin" && !isOnAdmin){
                    return Response.redirect(new URL('/admin', nextUrl));
                }

                if(role==="superadmin" && !isOnSuperAdmin){
                    return Response.redirect(new URL('/superadmin', nextUrl));
                }
                
            }

            return true;
        }
    },
    providers: [], 
} satisfies NextAuthConfig;

function convertToTypedUser(user: any) {
    if ('companyName' in user) {
      return user as CompanyType;
    } else {
      return user as UserType;
    }
}
  