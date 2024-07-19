import { getToken, JWT } from "next-auth/jwt"
import { Request } from "express"

//--------------------------------------------------
// This file contains user related utility functions 
//--------------------------------------------------

export const readUserToken = async (req: Request): Promise<JWT | null> => {
    // Print request headers
    console.log('headers:', req.headers);
    console.log('secret:', process.env.NEXTAUTH_SECRET);

    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    console.log('token:', token);

    return token;
}