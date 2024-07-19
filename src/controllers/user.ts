import { Request, Response, NextFunction } from "express";
import { IUser } from "../types/types"
import user from "../models/user";
import { getCurrentDateFormatted } from "../utils/time";
import { readUserToken } from "../utils/user";
import { ErrorHandler } from "../utils/errorHandler";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors";

interface IResponse {
    user?: IUser;
    users?: IUser[];
    message: string;
}

// The password is set to a random string if it is not provided.
// Exmp: When user login with Google, the password is not provided.
export const createUser = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const reques = req.body;
    console.log('body:', reques);

    let { email, password, name, image }: { email: string, password: string, name: string, image: string } = req.body;

    if (password?.toLowerCase() === 'password') {
        return res.status(400).json({
            message: "Please provide a password other than 'password'"
        });
    } else if (!password) {
        password = Math.random().toString(36).slice(-8);
    }

    if (!email || !password || !name) {
        return next(new ErrorHandler('Please provide all fields', 400));
    }

    const newUser = new user({
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
            image: newUser.image
        },
        message: "User created successfully",
    }

    res.status(201).json(response);
})

export const readUserByEmail = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.params;

    const _user = await user.findOne({ email });

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
            role: _user.role,
            image: _user.image
        },
        message: "User found"
    }
})

export const readUserById = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const _user = await user.findById(id);

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
            role: _user.role,
            image: _user.image
        },
        message: "User found"
    }

    res.status(200).json(response);
})

export const updateUser = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.params;

    const _user = await user.findOne({ email });

    if (!_user) {
        return next(new ErrorHandler('User not found', 404));
    }

    const { name, image, password, newEmail }: { name: string, image: string, password: string, newEmail: string } = req.body;

    _user.name = name;
    _user.image = image;
    _user.email = newEmail;
    _user.password = password;
    _user.updatedAt = await getCurrentDateFormatted('tr');

    await _user.save();

    const response: IResponse = {
        user: {
            id: _user._id,
            email: _user.email,
            name: _user.name,
            createdAt: _user.createdAt,
            updatedAt: _user.updatedAt,
            role: _user.role,
            image: _user.image
        },
        message: "User updated successfully"
    }

    res.status(200).json(response);
})

export const deleteUserByEmail = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.params;

    const _user = await user.findOne({ email });

    if (!_user) {
        return next(new ErrorHandler('User not found', 404));
    }

    await _user.deleteOne();

    const response: IResponse = {
        message: "User deleted successfully"
    }

    res.status(200).json(response);
})

export const deleteUserById = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const _user = await user.findById(id);

    if (!_user) {
        return next(new ErrorHandler('User not found', 404));
    }

    await _user.deleteOne();

    const response: IResponse = {
        message: "User deleted successfully"
    }

    res.status(200).json(response);
})

export const checkUser = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const token = await readUserToken(req);

    if (!token) {
        return next(new ErrorHandler('Unauthorized', 401));
    }

    const { email, name } = token;
    const _user = await user.findOne({ email });

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
            role: _user.role,
            image: _user.image,
        },
        message: "User found",
    };

    res.status(200).json(response);
})

export const getAllUsers = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const token = await readUserToken(req);

    if (!token) {
        return next(new ErrorHandler('Unauthorized', 401));
    }

    const { email } = token;

    const _user = await user.findOne({ email });

    if (!_user || _user.role !== 'admin') {
        return next(new ErrorHandler('Unauthorized', 401));
    }

    const _users = await user.find();

    const response: IResponse = {
        users: _users,
        message: "All users found",
    };

    res.status(200).json(response);
})

export const testFunc = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.params;

    const _user = await user.findOne({ email });

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
            role: _user.role,
            image: _user.image
        },
        message: "User found"
    }

    res.status(200).json(response);
})