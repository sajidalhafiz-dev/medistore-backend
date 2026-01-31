import { Request, Response, NextFunction } from "express"
import { auth as betterAuth } from "../lib/auth"

const auth = () => {
    return async (req: Request, res: Response, next: NextFunction) => {


        try {
            const session = await betterAuth.api.getSession({
                headers: req.headers
            })

            next();
        } catch (e) {
            console.error(e)
        }
    }
}