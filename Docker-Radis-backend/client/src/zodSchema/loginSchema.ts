import { z } from "zod";


export const loginSchema = z.object({
    email:z.string().email(),
    password:z.string().min(6, "Minimum 6 characters required").max(20, "Maximum 20 characters allowed"),
})