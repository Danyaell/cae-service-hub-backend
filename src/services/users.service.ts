import { DB_ERROR_CODES } from "../constants/errors.const";
import { USER } from "../constants/routes.const";
import { PrismaClient } from "../generated/prisma"

const prisma = new PrismaClient();

export const getAllUsersService = async () => {
    const users = await prisma.users.findMany({
        select: {
            id: true,
            name: true,
            role: true,
            created_at: true,
            updated_at: true,
        }
    });
    if (!users) {
        throw new Error(`${USER}_${DB_ERROR_CODES.NOT_FOUND}`);
    }
    return users;
};

export const getUserByIdService = async (id: number) => {
    const user = await prisma.users.findUnique({ where: { id } });
    if (!user) {
        throw new Error(`${USER}_${DB_ERROR_CODES.NOT_FOUND}`);
    }
    return user;
};

export const getUserByNameService = async (name: string) => {
    const user = await prisma.users.findUnique({ where: { name } });
    if (!user) {
        throw new Error(`${USER}_${DB_ERROR_CODES.NOT_FOUND}`);
    }
    return user;
};

export const signinService = async (data: any) => {
    if (!data?.name || !data?.password || !data?.role) {
        throw new Error(`${USER}_${DB_ERROR_CODES.INVALID_DATA}`);
    }
    const existingUser = await prisma.users.findUnique({ where: { name: data.name } });
    if (existingUser) {
        throw new Error(`${USER}_${DB_ERROR_CODES.DUPLICATE}`);
    }
    const user = await prisma.users.create({
        data: {
            name: data.name,
            password: data.password,
            role: data.role,
            created_at: data.created_at
        }
    });
    return user;
};

export const updateUserService = async (id: number, data: any) => {
    if (!data?.name || !data?.password || !data?.role) {
        throw new Error(`${USER}_${DB_ERROR_CODES.INVALID_DATA}`);
    } else if (!(await prisma.users.findUnique({ where: { id } }))) {
        throw new Error(`${USER}_${DB_ERROR_CODES.NOT_FOUND}`);
    }
    const updatedUser = await prisma.users.update({ where: { id }, data });
    return {
        id: updatedUser.id,
        name: updatedUser.name,
        role: updatedUser.role,
        created_at: updatedUser.created_at,
        updated_at: updatedUser.updated_at,
    };
};

export const deleteUserService = async (id: number) => {
    if (!(await prisma.users.findUnique({ where: { id } }))) {
        throw new Error(`${USER}_${DB_ERROR_CODES.NOT_FOUND}`);
    }
    const deletedUser = await prisma.users.delete({ where: { id } });
    return deletedUser;
};
