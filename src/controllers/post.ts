import { NextFunction, Request, Response } from "express";
import Post from "../models/post";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors";
import { ErrorHandler } from "../utils/errorHandler";
import User from "../models/user";
import { getCurrentDateFormatted } from "../utils/time";
import { ObjectId } from "mongoose";

interface IPostResponseDto {
    id: unknown | string;
    title: string;
    content?: string;
    summary: string;
    createdAt: Date;
    updatedAt?: Date;
    createdBy?: string;
    createdByName?: string;
}

interface IResponse {
    post?: IPostResponseDto;
    posts?: IPostResponseDto[];
    success: boolean;
}

export const createPost = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { title, content, summary }: { title: string, content: string, image: string, summary: string } = req.body;

    if (!title || !content || !summary) {
        return next(new ErrorHandler('Please provide all fields', 400));
    }

    const post = new Post({
        title,
        content,
        summary,
        createdBy: req.user!.id,
        createdByName: req.user!.name
    })

    await post.save();

    const response: IResponse = {
        post: {
            id: post._id,
            title: post.title,
            content: post.content,
            summary: post.summary,
            createdAt: post.createdAt,
            createdBy: post.createdBy.toString(),
            createdByName: req.user!.name
        },
        success: true
    }

    res.status(201).json(response)
})

export const readAllPosts = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const posts = await Post.find();

    if (!posts) {
        return next(new ErrorHandler('No post found', 404));
    }

    const response: IResponse = {
        posts: posts.map(post => {
            return {
                id: post._id,
                title: post.title,
                summary: post.summary,
                createdAt: post.createdAt,
                createdByName: post.createdByName
            }
        }),
        success: true
    }

    res.status(200).json(response);
})

export const readPostById = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const post = await Post.findById(req.params.id);

    if (!post) {
        return next(new ErrorHandler('No post found', 404));
    }

    const response: IResponse = {
        post: {
            id: post._id,
            title: post.title,
            content: post.content,
            summary: post.summary,
            createdAt: post.createdAt,
            createdBy: post.createdBy.toString(),
            createdByName: post.createdByName
        },
        success: true
    }

    res.status(200).json(response);
})

export const removePostById = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { role, id } = req.user!;

    const post = await Post.findById(req.params.id);

    if (!post) {
        return next(new ErrorHandler('No post found', 404));
    }

    if (role !== 'admin' && post.createdBy.toString() !== id) {
        return next(new ErrorHandler('You are not authorized to delete this post', 401));
    }

    await post.deleteOne();

    const response: IResponse = {
        success: true
    }

    res.status(200).json(response);
})

export const updatePostById = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { title, content, summary }: { title: string, content: string, summary: string } = req.body;

    if (!title || !content || !summary) {
        return next(new ErrorHandler('Please provide all fields', 400));
    }

    let post = await Post.findById(req.params.id);

    if (!post) {
        return next(new ErrorHandler('No post found', 404));
    }

    if (post.createdBy.toString() !== req.user!.id && req.user!.role !== 'admin') {
        return next(new ErrorHandler('You are not authorized to update this post', 401));
    }

    post.title = title;
    post.content = content;
    post.summary = summary;
    post.updatedAt = await getCurrentDateFormatted('tr');
    post.updatedBy = req.user!.id as ObjectId;

    await post.save();

    const response: IResponse = {
        post: {
            id: post._id,
            title: post.title,
            content: post.content,
            summary: post.summary,
            createdAt: post.createdAt,
            createdBy: post.createdBy.toString(),
            createdByName: post.createdByName
        },
        success: true
    }

    res.status(200).json(response);
})