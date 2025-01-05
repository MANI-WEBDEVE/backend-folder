import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterType } from "types/Input";
import { registerSchema } from "@/zodSchema/registerSchema";
import { Link,  useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios, { AxiosError } from "axios";

const Register = () => {
    const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterType>({resolver: zodResolver(registerSchema)});

  const handleRegiter: SubmitHandler<RegisterType> = async (data) => {
    try {
        const response = await axios.post("http://localhost:8000/api/v1/auth/register", {fullName: data.fullName, email: data.email, password: data.password}, {
            headers: {
                "Content-Type": "application/json"
            }   
        })
        if(response.status === 201){
            toast.success(response.data.message)
            navigate("/login")
        }
        else {
            toast.error(response.data.message)
        }
    } catch (error) {
        let err = error as AxiosError
        toast.error((err.response?.data as { message: string })?.message || "Something went wrong")
    }
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-900">
        <h2 className="text-2xl font-bold mb-4 text-white">Register</h2>
        <form onSubmit={handleSubmit(handleRegiter)} className="w-full max-w-sm bg-neutral-800/10 p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <label
              className="block text-neutral-400 text-sm font-medium mb-2"
              htmlFor="fullName"
            >
              Full Name
            </label>
            <Input
            {...register("fullName", { required: true })}
              name="fullName"
              type="text"
              placeholder="Full Name"
              className="border-[1px] border-neutral-500/80 text-white"
            />
            <p className="text-red-500 text-sm">{errors.fullName?.message}</p>
          </div>
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
              Register
            </Button>
          </div>
          <p className="text-blue-600 text-xs mt-4"><Link to={"/login"}>Already have an account?</Link></p>
        </form>
      </div>
    </>
  );
};

export default Register;
