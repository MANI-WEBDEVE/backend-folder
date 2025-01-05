import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginType } from "types/Input";
import { loginSchema } from "@/zodSchema/loginSchema";
import { Link, useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import {jwtDecode} from 'jwt-decode';
import  { useEffect, useState } from 'react';

const Login = () => {
    const navigate = useNavigate()
    const [getToken, setGetToken] = useState<string | null>(null)
  const { register, handleSubmit, formState: { errors } } = useForm<LoginType>({resolver: zodResolver(loginSchema)});

  const handleRegiter: SubmitHandler<LoginType> = async (data) => {
    try {
        const response = await axios.post("http://localhost:8000/api/v1/auth/login", {email: data.email, password: data.password}, {
            headers: {
                "Content-Type": "application/json"
            },   
            withCredentials: true
        })
        if(response.status === 200){
            toast.success(response.data.message)
     
            console.log(response.data.token)
            setGetToken(response.data.token)
           
        }
        else {
            toast(response.data.message)
        }
    } catch (error) {
        let err = error as AxiosError
        toast.error((err.response?.data as { message: string })?.message || "Something went wrong")
    }
  }
    useEffect(() => {
        if(getToken){
            try {
                const decodedToken = jwtDecode(getToken);
                console.log('Decoded Token:', decodedToken);
                navigate('/')
            } catch (error) {
                console.error('Invalid token:', error);
            }
        }
    }, [getToken])
 
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-900">
        <h2 className="text-2xl font-bold mb-4 text-white">Login</h2>
        <form onSubmit={handleSubmit(handleRegiter)} className="w-full max-w-sm bg-neutral-800/10 p-6 rounded-lg shadow-md">
            
          <div className="mb-4">
            <label
              className="block text-neutral-400 text-sm font-medium mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <Input
            {...register("email", { required: true })}
              className="border-[1px] border-neutral-500/80 text-white"
              name="email"
              type="email"
              placeholder="Email"
            />
             <p className="text-red-500 text-sm">{errors.email?.message}</p>
          </div>
          <div className="mb-6">
            <label
              className="block text-neutral-400 text-sm font-medium mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <Input
            {...register("password", { required: true })}
              className="border-[1px] border-neutral-500/80 text-white"
              name="password"
              type="password"
              placeholder="Password"
            />
             <p className="text-red-500 text-sm">{errors.password?.message}</p>
          </div>
          <div className="flex items-center justify-between">
            <Button
              className="bg-blue-700  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Login
            </Button>
          </div>
          <p className="text-blue-600 text-xs mt-4"><Link to={"/register"}>please first sign in</Link></p>
        </form>
      </div>
    </>
  );
};

export default Login;
