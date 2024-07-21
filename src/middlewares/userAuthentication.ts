import User from '../models/user';
import { Request, Response, NextFunction } from 'express';
import { readUserToken } from '../utils/user';
import { IUser } from '../types/types';

import { ErrorHandler } from '../utils/errorHandler';
import { catchAsyncErrors } from './catchAsyncErrors';
import { getToken } from 'next-auth/jwt';

// Check if user is authenticated
export const isAuthenticatedUser = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

        if (!token) {
            return next(new ErrorHandler('You need to login to access this resource', 401));
        }

        const user = await User.findOne({ email: token.email });

        if (!user) {
            return next(new ErrorHandler('User not found', 404));
        }

        req.user = user as IUser;

        next();
    } catch (error: any) {
        return next(new ErrorHandler('An error occurred while authenticating user!', 500));
    }
})

// Handling users roles
export const authorizeRoles = (...roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.user?.role || !roles.includes(req.user.role)) {
            return res.status(403).json({
                message: `Role (${req.user?.role}) is not allowed to access this resource`,
            });
        }

        next();
    }
}