import {useContext} from "react";
import {TodoListContext} from "@/context/TodoListContext";

export const useTasks = () => useContext(TodoListContext)
