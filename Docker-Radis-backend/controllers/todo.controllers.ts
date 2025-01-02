import type { Request, Response } from "express"
import type { TodoType, TokenType } from "../types/user";
import { todosSchema } from "../Schemas/todos.Schema";
import { Todo } from "../models/todo.model";
import jwt from 'jsonwebtoken';
import User from "../models/user.model";

export const createTodo = async (req: Request, res: Response): Promise<any> => {
    try {
        const { title, description }: TodoType = req.body;
        const { token } = req.cookies;
       
        if(!title || !description){
            return res.status(302).json({message:"All fields are required"});
        }

        const zodResult = todosSchema.safeParse({title, description});
        if(!zodResult.success){
            let zodError = {};
            zodError = {...zodError , [zodResult.error.errors[0].path[0]]: zodResult.error.errors[0].message};
            return res.status(400).json({zodError, message:"Validation Error"});
        }

        if(!token){
            return res.status(401).json({message:"Unauthorized"});
        }

        let logUser:TokenType | any = {};

        jwt.verify(token, process.env.JWT_SECRET as string, (err:any, user:any) => {
            if(err){
                return res.status(401).json({message:"Unauthorized"});
            }
            logUser = user;
        });

        const findUser = await User.findOne({email:logUser.email});
        
        if(!findUser){
            return res.status(404).json({message:"User not found"});
        }

        // const todo = await Todo.findOne({title});

        // if(todo){
        //     return res.status(400).json({message:"Todo already exists"});
        // }

        const checkTodoUser =  findUser.todos.find((todo:any) => todo.title === title);
        if(checkTodoUser){
            return res.status(400).json({message:"Todo already exists"});
        }

        const addFindUserTodo = await findUser.updateOne({$push:{todos:{title, description}}});

        if(!addFindUserTodo){
            return res.status(400).json({message:"Todo not added"});
        }


    
        return res.status(201).json({success:true, message:"Create Todo Successfully", addFindUserTodo})
    } catch (error) {
        console.log(error);
        return res.status(500).json({error});
    }
}


export const getTodos = async (request:Request, response:Response):Promise<any> =>{
    try {
        const { token } = request.cookies;
        if(!token){
            return response.status(401).json({message:"Unauthorized"});
        } 

        let logUser:TokenType | any = {};

        jwt.verify(token, process.env.JWT_SECRET as string, (err:any, user:any) => {
            if(err){
                return response.status(401).json({message:"Unauthorized"});
            }
            logUser = user;
        }
        );

        let findUser = await User.findOne({email:logUser.email});
        if(!findUser){
            return response.status(404).json({message:"User not found"});
        }

        const todos = findUser.todos;

        const userData = {
            _id:findUser._id,
            fullName:findUser.fullName,
            email:findUser.email,
        }

        return response.status(200).json({success:true, message:"Get Todos Successfully", todos, userData})
    } catch (error) {
        console.log(error);
        return response.status(500).json({error});
    }
}


export const updateTodo = async (request:Request, response:Response):Promise<any> =>{
    try {
        const todoId = request.params.todoId;

        const {title, description}:TodoType = request.body;

        if(!todoId){
            return response.status(302).json({message:"Todo Id is required"});
        }

        const updateTodo = await Todo.findByIdAndUpdate(todoId, {title, description}, {new:true});

        if(!updateTodo){
            return response.status(404).json({message:"Todo not found"});
        }

        return response.status(200).json({success:true, message:"Update Todo Successfully", updateTodo})

    } catch (error) {
        console.log(error);
        return response.status(500).json({error});
    }
}

export const deleteTodo = async (request:Request, response:Response):Promise<any> =>{
    try {
        const todoId = request.params.todoId;

        if(!todoId){
            return response.status(302).json({message:"Todo Id is required"});
        }

       const deleteTodo = await Todo.findByIdAndDelete(todoId);

       if(!deleteTodo){
        return response.status(404).json({message:"Todo not found"});
       }

       return response.status(200).json({success:true, message:"Delete Todo Successfully", deleteTodo})
    } catch (error) {
        console.log(error)
        return response.status(500).json({error});   
    }
}