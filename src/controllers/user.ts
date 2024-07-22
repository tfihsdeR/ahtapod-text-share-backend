import { Request, Response, NextFunction } from "express";
import User from "../models/user";
import { getCurrentDateFormatted } from "../utils/time";
import { ErrorHandler } from "../utils/errorHandler";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors";
import { ObjectId } from "mongoose";

interface IUserResponseDto {
    id: unknown | string;
    email: string;
    name: string;
    createdAt: Date;
    updatedAt?: Date;
    updatedBy?: string;
    role: string;
    image: string;
}

interface IResponse {
    user?: IUserResponseDto;
    users?: IUserResponseDto[];
    success: boolean;
}

// The password is set to a random string if it is not provided.
// Exmp: When user login with Google, the password is not provided.
export const createUser = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const reques = req.body;

    let { email, password, name, image }: { email: string, password: string, name: string, image: string } = req.body;

    if (password?.toLowerCase() === 'password') {
        return res.status(400).json({
            message: "Please provide a password other than 'password'"
        });
    } else if (!password) {
        password = Math.random().toString(36).slice(-8);
    }

    if (!email || !password) {
        return next(new ErrorHandler('Please provide all fields', 400));
    }

    const newUser = new User({
        email,
        password,
        name,
        image
    })

    await newUser.save();

    const response: IResponse = {
        user: {
            id: newUser._id,
            email: newUser.email,
            name: newUser.name,
            createdAt: newUser.createdAt,
            role: newUser.role,
            image: newUser.image,
        },
        success: true
    }

    res.status(201).json(response);
})

export const readUserByEmail = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.params;

    const _user = await User.findOne({ email });

    if (!_user) {
        return next(new ErrorHandler('User not found', 404));
    }

    const response: IResponse = {
        user: {
            id: _user._id,
            email: _user.email,
            name: _user.name,
            createdAt: _user.createdAt,
            updatedAt: _user.updatedAt,
            updatedBy: _user.updatedBy?.toString(),
            role: _user.role,
            image: _user.image,
        },
        success: true
    }

    res.status(200).json(response);
})

// Admin Route
export const readUserById = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const user = await User.findById(id).lean();

    if (!user) {
        return next(new ErrorHandler('User not found', 404));
    }

    const response: IResponse = {
        user: {
            id: user._id,
            email: user.email,
            name: user.name,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            updatedBy: user.updatedBy?.toString(),
            role: user.role,
            image: user.image
        },
        success: true
    }

    res.status(200).json(response);
})

export const updateUser = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.params;

    const user = await User.findOne({ email });

    if (!user) {
        return next(new ErrorHandler('User not found', 404));
    }

    if (user.role !== 'admin' || user.email !== req.user?.email) {
        return next(new ErrorHandler('You are not allowed to update this user', 401));
    }

    const { name, image, password, newEmail }: { name: string, image: string, password: string, newEmail: string } = req.body;

    user.name = name;
    user.image = image;
    user.email = newEmail;
    user.password = password;
    user.updatedAt = await getCurrentDateFormatted('tr');
    user.updatedBy = req.user?.id as ObjectId;

    await user.save();

    const response: IResponse = {
        user: {
            id: user._id,
            email: user.email,
            name: user.name,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            updatedBy: user.updatedBy.toString(),
            role: user.role,
            image: user.image
        },
        success: true
    }

    res.status(200).json(response);
})

export const deleteUserByEmail = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.params;

    const user = await User.findOne({ email });

    if (!user) {
        return next(new ErrorHandler('User not found', 404));
    }

    await user.deleteOne();

    const response: IResponse = {
        success: true
    }

    res.status(200).json(response);
})

export const deleteUserById = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
        return next(new ErrorHandler('User not found', 404));
    }

    if (user.role !== 'admin' || user.email !== req.user?.email) {
        return next(new ErrorHandler('You are not allowed to delete this user', 401));
    }

    await user.deleteOne();

    const response: IResponse = {
        success: true
    }

    res.status(200).json(response);
})

// Admin route
export const readAllUsers = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const users = await User.find()

    if (!users) {
        return next(new ErrorHandler('Users not found', 404));
    }

    const _users = users.map(user => {
        return {
            id: user._id,
            email: user.email,
            name: user.name,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            updatedBy: user.updatedBy?.toString(),
            role: user.role,
            image: user.image
        }
    })

    const response: IResponse = {
        users: _users,
        success: true
    };

    res.status(200).json(response);
})