import { db } from "../utils/db.server";
import {Role}  from "@prisma/client" 
import { User } from "@prisma/client";


export const listUsers = async (): Promise<User[]> => {
    return db.user.findMany({
        select: {
            id: true,
            photo :true,
            firstName: true,
            lastName: true,
            email: true,
            password: true,
            phoneNumber: true,
            role: true
        },
    });
};

export const getOneUser = async (id: number): Promise<User | null> => {
    return db.user.findUnique({
        where: { id: id },
    });
};

export const createUser = async (
    user: Omit<User, "id">
): Promise<User> => {
    const { firstName, lastName, email, phoneNumber, password , role,photo} = user;
    return db.user.create({
        data: {
            firstName,
            lastName,
            photo,
            email,
            phoneNumber,
            password,
            role

        },
        select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            password: true,
            phoneNumber : true , 
            role : true,
            photo : true

        },
    });
};

export const updateUser = async (user: Omit<User, "id">, id: number): Promise<User> => {
    const { firstName, lastName, email, photo,phoneNumber, password , role} = user;
    return db.user.update({
        where: {
            id,
        },
        data: {
            firstName,
            lastName,
            email,
            phoneNumber,
            photo,
            password,
            role

        },
        select: {
            id: true,
            firstName: true,
            lastName: true,
            photo :true,
            email: true,
            password: true,
            role: true , 
            phoneNumber : true 

        },
    });
};

export const deleteUser = async (id: number): Promise<void> => {
    await db.user.delete({
        where: {
            id: id,
        },
    });
};
