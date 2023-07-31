import {useContext} from "react";
import {TasksListContext} from "@/context/TasksListContext";

export const useTasks = () => useContext(TasksListContext)
