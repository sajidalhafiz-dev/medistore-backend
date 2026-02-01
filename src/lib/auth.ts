import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { admin, createAccessControl } from "better-auth/plugins";
import { adminRoles, customerRoles, sellerRoles } from "./permission";




export const auth = betterAuth({

    appName: "MediStore",
    baseURL: process.env.BETTER_AUTH_URL,
    // basePath: "/api/auth/",


  database: prismaAdapter(prisma, { provider: "postgresql" }),

  trustedOrigins: [process.env.FRONTEND_URL!],

  emailAndPassword: { enabled: true },

  user: {
    additionalFields: {
        role: {
            type: ["customer", "seller"],
            required: false,
            defaultValue: "customer",
            input: true
        },
        address: {
            type: "string",
            required: false
        }
    }
  },

  plugins: [
    admin({
        adminRoles: ["admin"],
        publicRoles: ["customer", "seller"],
        defaultRole: "customer",
        roles: {
            admin: adminRoles,
            customer: customerRoles,
            seller: sellerRoles
        },
    })
  ]
});
