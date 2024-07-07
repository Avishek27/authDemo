"use server"
import { RegisterSchema } from "@/schemas";
import * as z from "zod";
import bcrypt from 'bcryptjs';
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";


export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validateFields = RegisterSchema.safeParse(values);

    if(!validateFields.success){
        return {error: "Invalid email"}
    }
    
    const { email,password,name } = validateFields.data;
    const hashedPassword = await bcrypt.hash(password,10);

    const existingUser = await getUserByEmail(email);

    if(existingUser){
        return { error: "Email is already in use!"}
    }

    await db.user.create({
        data: {
            email,
            name,
            password: hashedPassword,
        }
    });

    //todo: Send token email verification
    return { success : "User is created!"}
}