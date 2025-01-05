import {z} from "zod";


export const registerSchema = z.object({
    fullName:z.string().min(3, "Minimum 3 characters required").max(20, "Maximum 20 characters allowed"),
    email:z.string().email(),
    password: z.string()
        .min(6, "Minimum 6 characters required")
        .max(20, "Maximum 20 characters allowed")
})