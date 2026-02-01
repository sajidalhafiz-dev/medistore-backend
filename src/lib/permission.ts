import { createAccessControl } from "better-auth/plugins";

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
