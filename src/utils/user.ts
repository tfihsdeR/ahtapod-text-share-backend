import { getToken, JWT } from "next-auth/jwt"
import { Request } from "express"

//--------------------------------------------------
// This file contains user related utility functions 
//--------------------------------------------------

export const readUserToken = async (req: Request): Promise<JWT | null> => {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    return token;
}