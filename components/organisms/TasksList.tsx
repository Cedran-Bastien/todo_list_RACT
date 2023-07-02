import React from "react";
import { TaskUi} from "@/components/atomes/task";
import {useTasks} from "@/hooks/useTasks";
import { List} from "@mui/material";

export const TasksList = () => {
    const {tasks} = useTasks()

    return(
        <List className="flex flex-col mx-2 gap-3 h-screen">
            {tasks!.map((task) => <TaskUi key={task.id} task={task}/>)}
        </List>

        // <div className="flex flex-col h-full w-full bg-cyan-50 gap-4 p-5">
        //     {tasks!.map((task) => <TaskUi key={task.id} task={task}/>)}
        // </div>
    )
}


