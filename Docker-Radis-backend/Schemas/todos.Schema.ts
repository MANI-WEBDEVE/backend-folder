import {z} from "zod"


export const todosSchema = z.object({
    title:z.string().min(3 , "Minimum 3 characters").max(50 , "Maximum 255 characters"),
    description:z.string().min(3 , "Minimum 3 characters").max(100 , "Maximum 255 characters"),
})