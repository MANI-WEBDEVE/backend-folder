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
import { Button } from "./ui/button";

interface TodoDataType {
  _id?: number;
  title: string;
  description: string;
  isCompleted: boolean;
}

const TodoData = () => {
  const [todoData, setTodoData] = useState<TodoDataType[]>([]);
  const [updateTitle, setUpdateTitle] = useState("");
  const [updateDescription, setUpdateDescription] = useState("");
  const [checkbox, setCheckbox] = useState(false)
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

  const updateTodo = async (id:number) => {
      try {
        const res = await axios.put(`http://localhost:8000/api/v1/todo/${id}`, {title:updateTitle, description:updateDescription, isCompleted: checkbox}, {withCredentials: true});
        if(res.status === 200){
          toast.success(res.data.message)
        }
        console.log(res)
      } catch (error) {
        const err = error as AxiosError
        console.log(err)
        toast.error((err.response?.data as { message: string })?.message || "Something went wrong")
      }
  }

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
              {todo.isCompleted ? (<>
                <p className="text-green-600 text-sm">Compelete ✔</p>
              </>): (<>
                <p className="text-yellow-700 text-xs">Not Compelete ❌</p>
              </>)}
            </div>
            <div>
              <Trash2
                className="text-red-500"
                onClick={() => todoDeleteHandler(todo._id as number)}
              />
            </div>
            <div>
              <Dialog >
                <DialogTrigger asChild>
                  <Pen className="text-blue-500 " />
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] bg-neutral-900/60 text-white border-2 border-neutral-700">
                  <DialogHeader>
                    <DialogTitle>Edit Todo</DialogTitle>
                    <DialogDescription>
                      Make changes to your todo and save the changes 
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        update Title
                      </Label>
                      <Input
                        id="name"
                        value={updateTitle}
                        className="col-span-3"
                        onChange={(e) => setUpdateTitle(e.target.value)}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="username" className="text-right">
                        update Description
                      </Label>
                      <Input
                        
                        value={updateDescription}
                        className="col-span-3"
                        onChange={(e) => setUpdateDescription(e.target.value)}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                        Completed
                      </Label>
                      <Checkbox
                        className="border-[1px] border-gray-300"
                        checked={checkbox}
                        onClick={() => setCheckbox(!checkbox)}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button  onClick={() => updateTodo(todo._id as number)}>Save changes</Button>
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
