import { Request, Response, NextFunction } from "express"
import { auth as betterAuth } from "../lib/auth"
import { ResourceType } from "../constants/resources"

const auth = (resource: ResourceType , action: string) => {
    return async (req: Request, res: Response, next: NextFunction) => {


        try {
            const session = await betterAuth.api.getSession({
                headers: req.headers
            })

            if(!session) res.status(401).send({message: "Unauthorized!"})
            
            const hasPermission = await betterAuth.api.userHasPermission({
                body: {
                    userId: session?.user.id,
                    role: session?.user.role as any,
                    permission: {[resource]:[action]}
                }
            })

            if(!hasPermission || !hasPermission.success) res.status(403).send({message: `Forbidden: You are not allowed to ${action} ${resource}`})

            // console.log(session, "permission", hasPermission)
            next();
        } catch (e) {
            console.error(e)
        }
    }
}

export default auth 