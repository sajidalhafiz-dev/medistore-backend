import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { admin, createAccessControl } from "better-auth/plugins";
import { defaultRoles } from "better-auth/plugins/admin/access";



export const statement = {
    user: ["create", "read", "update", "delete"], 
    medicine: ["create", "read", "update", "delete"], 
    order: ["create", "read", "update", "delete"], 
    orderItem: ["create", "read", "update", "delete"], 
    review: ["create", "read", "update", "delete"], 
    category: ["create", "read", "update", "delete"], 
} as const;
const ac = createAccessControl(statement);


export const adminRoles = ac.newRole({ 
    user: ["create", "read", "update", "delete"], 
    medicine: ["create", "read", "update", "delete"], 
    order: ["create", "read", "update", "delete"], 
    orderItem: ["create", "read", "update", "delete"], 
    review: ["create", "read", "update", "delete"], 
    category: ["create", "read", "update", "delete"], 
}); 
export const customerRoles = ac.newRole({ 
    medicine: ["read"], 
    order: ["create", "read"], 
    orderItem: ["create", "read", "update", "delete"], 
    review: ["create", "read", "update", "delete"],  
}); 
export const sellerRoles = ac.newRole({ 
    medicine: ["create", "read", "update", "delete"], 
    order: ["read", "update"], 
    category: ["create", "read", "update", "delete"], 
}); 

export const auth = betterAuth({
  database: prismaAdapter(prisma, { provider: "postgresql" }),

  trustedOrigins: [process.env.FRONTEND_URL!],

  emailAndPassword: { enabled: true },

  user: {
    additionalFields: {
        role: {
            type: ["admin", "customer", "seller"],
            required: true,
            defaultValue: "customer",
            input: false
        },
        address: {
            type: "string",
            required: false
        }
    }
  },

  plugins: [
    admin({
        // adminRoles: ["admin", "customer", "seller"],
        defaultRoles: "regular",
        roles: {
            admin: adminRoles,
            customer: customerRoles,
            seller: sellerRoles
        }
    })
  ]
});
