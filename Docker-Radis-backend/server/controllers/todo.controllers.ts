import type { Request, Response } from "express";
import type { TodoType, TokenType } from "../types/user";
import { todosSchema } from "../Schemas/todos.Schema";
import { Todo } from "../models/todo.model";
import jwt from "jsonwebtoken";
import User from "../models/user.model";

export const createTodo = async (req: Request, res: Response): Promise<any> => {
  try {
    const { title, description, isCompleted, _id }: TodoType = req.body;
    const { token } = req.cookies;

    if (!title || !description) {
      return res.status(302).json({ message: "All fields are required" });
    }

    const zodResult = todosSchema.safeParse({ title, description });
    if (!zodResult.success) {
      let zodError = {};
      zodError = {
        ...zodError,
        [zodResult.error.errors[0].path[0]]: zodResult.error.errors[0].message,
      };
      return res.status(400).json({ zodError, message: "Validation Error" });
    }

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    let logUser: TokenType | any = {};

    jwt.verify(
      token,
      process.env.JWT_SECRET as string,
      (err: any, user: any) => {
        if (err) {
          return res.status(401).json({ message: "Unauthorized" });
        }
        logUser = user;
      }
    );

    const findUser = await User.findOne({ email: logUser.email });

    if (!findUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const checkTodoUser = findUser.todos.find(
      (todo: any) => todo.title === title
    );
    if (checkTodoUser) {
      return res.status(400).json({ message: "Todo already exists" });
    }

    let todoId = findUser.todos.length + 1;

    const addFindUserTodo = await findUser.updateOne({
      $push: { todos: { title, description, isCompleted: false, _id: todoId } },
    });

    if (!addFindUserTodo) {
      return res.status(400).json({ message: "Todo not added" });
    }

    return res
      .status(201)
      .json({
        success: true,
        message: "Create Todo Successfully",
        addFindUserTodo,
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};

export const getTodos = async (
  request: Request,
  response: Response
): Promise<any> => {
  try {
    const { token } = request.cookies;
    if (!token) {
      return response.status(401).json({ message: "Unauthorized" });
    }

    let logUser: TokenType | any = {};

    jwt.verify(
      token,
      process.env.JWT_SECRET as string,
      (err: any, user: any) => {
        if (err) {
          return response.status(401).json({ message: "Unauthorized" });
        }
        logUser = user;
      }
    );

    let findUser = await User.findOne({ email: logUser.email });
    if (!findUser) {
      return response.status(404).json({ message: "User not found" });
    }

    const todos = findUser.todos;

    if (!todos || todos.length === (0 as number)) {
      return response.status(404).json({ message: "No todos yet" });
    }

    const userData = {
      _id: findUser._id,
      fullName: findUser.fullName,
      email: findUser.email,
    };

    return response
      .status(200)
      .json({
        success: true,
        message: "Get Todos Successfully",
        todos,
        userData,
      });
  } catch (error) {
    console.log(error);
    return response.status(500).json({ error });
  }
};

export const updateTodo = async (
  request: Request,
  response: Response
): Promise<any> => {
  try {
    const todoId = request.params.todoId; // Todo ID jo update karni hai
    const { token } = request.cookies; // User ka token authenticate karne ke liye
    const { title, description, isCompleted }: TodoType = request.body; // Updated data

    // Validation: Agar `todoId` nahi hai
    if (!todoId) {
      return response.status(302).json({ message: "Todo Id is required" });
    }
    // Validation: Agar token nahi hai
    if (!token) {
      return response.status(401).json({ message: "Unauthorized" });
    }

    // JWT token verify kar ke logged-in user ka data nikalna
    let logUser: TokenType | any = {};
    jwt.verify(
      token,
      process.env.JWT_SECRET as string,
      (err: any, user: any) => {
        if (err) {
          return response.status(401).json({ message: "Unauthorized" });
        }
        logUser = user;
      }
    );

    // User find karna by email
    let findUser = await User.findOne({ email: logUser.email });

    if (!findUser) {
      return response.status(404).json({ message: "User not found" });
    }

    // User ke `todos` array se specific todo find karna by `_id`
    const todoIndex = findUser.todos.findIndex(
      (todo: any) => todo._id === Number(todoId)
    );
    console.log(todoIndex);
    if (todoIndex === -1) {
      return response.status(404).json({ message: "Todo not found" });
    }

    // Todo update karna with new data
    findUser.todos[todoIndex] = {
      ...findUser.todos[todoIndex], // Existing todo data
      title: title || findUser.todos[todoIndex].title, // Update title agar provided hai
      description: description || findUser.todos[todoIndex].description, // Update description agar provided hai
      isCompleted:
        isCompleted !== undefined
          ? isCompleted
          : findUser.todos[todoIndex].isCompleted, // Update status
    };

    // Updated user save karna
    await findUser.save();

    return response.status(200).json({
      success: true,
      message: "Todo updated successfully",
      todo: findUser.todos[todoIndex],
      allTodos: findUser.todos, // Updated todo return karna
    });
  } catch (error) {
    console.log(error);
    return response.status(500).json({ error });
  }
};

export const deleteTodo = async (
  request: Request,
  response: Response
): Promise<any> => {
  try {
    const todoId = request.params.todoId;
    const { token } = request.cookies;

    // Validation: Check if todoId is provided
    if (!todoId) {
      return response.status(400).json({ message: "Todo Id is required" });
    }

    // Validation: Check if token exists
    if (!token) {
      return response.status(401).json({ message: "Unauthorized" });
    }

    // JWT verification
    let logUser: TokenType | any = {};
    jwt.verify(
      token,
      process.env.JWT_SECRET as string,
      (err: any, user: any) => {
        if (err) {
          return response.status(401).json({ message: "Unauthorized" });
        }
        logUser = user;
      }
    );

    // Find the user
    const findUser = await User.findOne({ email: logUser.email });

    if (!findUser) {
      return response.status(404).json({ message: "User not found" });
    }

    // Filter out the todo with the matching _id
    const originalTodosLength = findUser.todos.length;

    findUser.todos = findUser.todos.filter(
      (todo: any) => todo._id.toString() !== todoId
    );

    // Check if the todo was found and deleted
    if (findUser.todos.length === originalTodosLength) {
      return response.status(404).json({ message: "Todo not found" });
    }

    // Save the updated user
    await findUser.save();

    return response
      .status(200)
      .json({
        success: true,
        message: "Todo deleted successfully",
        todos: findUser.todos,
      });
  } catch (error) {
    console.error(error);
    return response.status(500).json({ error });
  }
};
