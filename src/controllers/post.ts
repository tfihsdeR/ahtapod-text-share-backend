import { NextFunction, Request, Response } from "express";
import Post from "../models/post";
import { getCurrentDateFormatted } from "../utils/time";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors";
import { ErrorHandler } from "../utils/errorHandler";

export const createPost = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { title, content, image }: { title: string, content: string, image: string } = req.body;

    if (!title || !content) {
        return next(new ErrorHandler('Please provide all fields', 400));
    }

    const post = new Post({
        title,
        content,
        image,
        createdAt: await getCurrentDateFormatted('tr'),
    })

    await post.save();

    res.status(201).json({
        success: true,
        post
    })
})