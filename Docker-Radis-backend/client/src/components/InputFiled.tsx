import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useForm, SubmitHandler } from "react-hook-form";
import InputType from "../../types/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { todoSchema } from "../zodSchema/todoSchema";
import axios from "axios";
import toast from "react-hot-toast";
const InputFiled = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputType>({ resolver: zodResolver(todoSchema) });

  const onSubmit: SubmitHandler<InputType> = async (data,e) => {
    try {
     
      const res = await axios.post(
        "http://localhost:8000/api/v1/todo",
        { title: data.title, description: data.description },
        {
          withCredentials:true
        }
      );
      if (res.status === 201) {
        toast.success(res.data.message);
        e?.target.reset();
      } else {
        toast.error(res.data.message);
      }
    }
    catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        
        toast.error(error.response?.data.message);
      }
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full h-full mx-auto flex justify-center items-start mt-3 gap-4"
      >
        <div className="flex flex-col space-y-4 w-1/2">
          <Input
            {...register("title", { required: true })}
            name="title"
            placeholder="Enter Your Todo"
            className="border-[1px] border-neutral-500/80 text-white"
          />
          <p className="text-xs text-red-500">{errors.title?.message}</p>
          <Textarea
            {...register("description", { required: true })}
            name="description"
            placeholder="Enter Your Todo Description"
            className="border-[1px] border-neutral-500/80 text-white"
          />
          <p className="text-xs text-red-500">{errors.description?.message}</p>
        </div>
        <div className="">
          <Button
            type="submit"
            className="bg-slate-300/15 rounded-xl uppercase font-bold "
          >
            ADD
          </Button>
        </div>
      </form>
    </>
  );
};

export default InputFiled;
