import {z} from "zod";

export const signupSchema = z.object({
    name:z.string().min(3,"Name must be at least 3 Characters"),
    username:z.string().min(3,"Name must be at least 3 Characters"),
    email:z.email("Invalid Email"),
    password:z.string().min(8,"Password must be atleast 8 characters"),
    role:z.string()
})

export const loginSchema = z.object({
    email:z.email("Invalid Email"),
    password:z.string().min(8,"Password must be atleast 8 characters")
})