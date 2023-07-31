import {useContext} from "react";
import {TasksListContext} from "@/context/TodoListContext";

export const useTasks = () => useContext(TasksListContext)
