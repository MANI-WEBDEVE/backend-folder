import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Pen, Trash2 } from "lucide-react";
import { Checkbox } from "./ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "./ui/label";

interface TodoDataType {
  _id?: number;
  title: string;
  description: string;
  isCompleted: boolean;
}

const TodoData = () => {
  const [todoData, setTodoData] = useState<TodoDataType[]>([]);
  const [checkBox, setCheckBox] = useState(false);
  useEffect(() => {
    const getTodoData = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/v1/todo/", {
          withCredentials: true,
        });
        if (res.status === 200) {
          setTodoData(res.data.todos);
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
        let err = error as AxiosError;
        toast.error(
          (err.response?.data as { message: string })?.message ||
            "Something went wrong"
        );
        console.log(error);
      }
    };
    getTodoData();
  }, [todoData]);

  const todoDeleteHandler = async (id: number) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/v1/todo/${id}`,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        toast.success(response.data.message);
        setTodoData((prev) => prev.filter((todo) => todo._id !== id));
      }
    } catch (error) {
      let err = error as AxiosError;
      toast.error(
        (err.response?.data as { message: string })?.message ||
          "Something went wrong"
      );
    }
  };

  const checkTodoCom = async (id: number) => {
    setCheckBox(!checkBox);
  };
  return (
    <div className="grid grid-cols-1  md:grid-cols-2 gap-4 p-4">
      {todoData.length === 0 && (
        <p className="text-center mt-4 text-neutral-500">No Todo Data</p>
      )}
      {todoData.map((todo) => (
        <div
          key={todo._id}
          className="bg-neutral-700/10 rounded-lg shadow-md p-4 flex items-center justify-between"
        >
          <div>
            <h1 className="text-base sm:text-lg md:text-xl font-semibold text-gray-300 leading-tight tracking-normal break-words">
              {todo.title}
            </h1>
            <p className="text-sm sm:text-base text-gray-400 mt-1 leading-relaxed tracking-normal break-words">
              {todo.description}
            </p>
          </div>
          <div className="flex flex-col items-center justify-between gap-3">
            <div>
              <Checkbox
                className="border-[1px] border-gray-300"
                checked={checkBox}
                onClick={() => checkTodoCom(todo._id as number)}
              />
            </div>
            <div>
              <Trash2
                className="text-red-500"
                onClick={() => todoDeleteHandler(todo._id as number)}
              />
            </div>
            <div>
              <Dialog>
                <DialogTrigger asChild>
                  <Pen className="text-blue-500 " />
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                      Make changes to your profile here. Click save when you're
                      done.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Name
                      </Label>
                      <Input
                        id="name"
                        value="Pedro Duarte"
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="username" className="text-right">
                        Username
                      </Label>
                      <Input
                        id="username"
                        value="@peduarte"
                        className="col-span-3"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Save changes</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TodoData;

