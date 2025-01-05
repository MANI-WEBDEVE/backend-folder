import User from "../models/user.model";
import { loginUserSchema } from "../Schemas/loginUser.Schema";
import { registerSchema } from "../Schemas/register.Schema";
import type { UserRegister } from "../types/user";
import { request, type Request, type Response } from "express";
import jwt from "jsonwebtoken";

export const resgisterUser = async (
  request: Request,
  response: Response
): Promise<any> => {
  try {
    const { fullName, email, password }: UserRegister = request.body;
    if (!fullName || !email || !password) {
      return response.status(302).json({ message: "All fields are required" });
    }

    let zodError = {};
    const zodResult = registerSchema.safeParse({ fullName, email, password });

    if (!zodResult.success) {
      zodError = {
        ...zodError,
        [zodResult.error.errors[0].path[0]]: zodResult.error.errors[0].message,
      };
      return response
        .status(400)
        .json({ zodError, message: "Validation Error" });
    }

    const user = await User.findOne({ email });
    if (user) {
      return response.status(400).json({ message: "User already exists" });
    }

    const newUser = await User.create({ fullName, email, password });

    return response
      .status(201)
      .json({ success: true, message: "Create User Successfully" });
  } catch (error) {
    console.log(error);
    return response.status(500).json({ error });
  }
};

export const loginUser = async (
  request: Request,
  response: Response
): Promise<any> => {
  try {
    const { email, password }: UserRegister = request.body;
    if (!email || !password) {
      return response.status(302).json({ message: "All fields are required" });
    }

    const zodResult = loginUserSchema.safeParse({ email, password });
    let zodError = {};
    if (!zodResult.success) {
      zodError = {
        ...zodError,
        [zodResult.error.errors[0].path[0]]: zodResult.error.errors[0].message,
      };
      return response
        .status(400)
        .json({ zodError, message: "Validation Error" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return response.status(400).json({ message: "User not found" });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return response
        .status(400)
        .json({ success: false, message: "Invalid Credentials" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, fullName: user.fullName },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" }
    );

    const userData = {
      fullName: user.fullName,
      email: user.email,
      todos: user.todos,
      id: user._id,
    };

    return response
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,
        sameSite: "strict",
        secure: true,
      })
      .json({ success: true, message: "Login Successfully", userData, token });
  } catch (error) {
    console.log(error);
    return response.status(500).json({ error });
  }
};

export const logoutUser = async (
  request: Request, 
  response: Response
): Promise<any> => {
  try {
    const token = request.cookies.token;
    console.log('Token:', token);
    if (!token) {
      return response.status(401).json({ message: "You are already logged out" });
    }

    return response
      .status(200)
      .cookie("token", "", { maxAge: 0, httpOnly: true, sameSite: "strict", secure: process.env.NODE_ENV === "production" })
      .json({ success: true, message: "Logout Successfully" });
  } catch (error) {
    console.log(error);
    return response.status(500).json({ error });
  }
};

export const checkAuthenticated = async (
  request: Request,
  response: Response
):Promise<any> => {
  try {
    const { token } = request.cookies;
    if (!token) {
      console.log(token)
      return response.status(401).json({ message: "Please Login First" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    if (!decoded || typeof decoded === "string") {
      return response.status(401).json({ message: "Unauthorized" });
    }

    const userFind = await User.findOne({
      email: (decoded as jwt.JwtPayload).email,
    });

    if (!userFind) {
      return response.status(401).json({ message: "Unauthorized" });
    }
    return response.status(200).json({
      success: true,
      message: "Authorized",
      userFind: {
        email: userFind.email,
        fullName: userFind.fullName,
        todos: userFind.todos,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    return response
      .status(500)
      .json({ error, message: "Internal Server Error" });
  }
};
