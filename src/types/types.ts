import { ObjectId } from "mongoose";

export interface IUser {
    id?: ObjectId | string;
    email: string;
    password?: string;
    name: string;
    createdAt?: Date;
    updatedAt?: Date;
    role: string;
    image: string;
}