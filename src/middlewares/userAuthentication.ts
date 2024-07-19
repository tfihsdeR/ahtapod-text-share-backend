import User from '../models/user';
import { Request, Response, NextFunction } from 'express';
import { readUserToken } from '../utils/user';
import { IUser } from '../types/types';

import { ErrorHandler } from '../utils/errorHandler';
import { catchAsyncErrors } from './catchAsyncErrors';

// Check if user is authenticated
export const isAuthenticatedUser = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const token = await readUserToken(req);

    if (!token) {
        return next(new ErrorHandler('You need to login to access this resource', 401));
    }

    const user = await User.findOne({ email: token.email });

    if (!user) {
        return next(new ErrorHandler('User not found', 404));
    }

    req.user = user as IUser;

    next();
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



// export const isAuthenticatedUser = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const token = await readUserToken(req);

//         if (!token) {
//             return res.status(401).json({
//                 message: 'You need to login to access this resource',
//             });
//         }

//         const user = await User.findOne({ email: token.email });

//         if (!user) {
//             return res.status(404).json({
//                 message: 'User not found',
//             });
//         }

//         req.user = user as IUser;

//         next();
//     } catch (error: any) {
//         res.status(500).json({
//             error: 'An error occurred while authenticating user!',
//             message: error.message,
//         });
//     }
// }