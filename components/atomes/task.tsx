import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import {Checkbox, ListItem, ListItemButton} from "@mui/material";
import React from "react";
import {useTasks} from "@/hooks/useTasks";
import {useRouter} from "next/navigation";


export type Task = {
    id: number,
    title: string,
    content: string,
    status: boolean,
}

export const TaskUi = ({
    task
}: {
    task: Task
}) => {
    const { updateTask } = useTasks()
    const router = useRouter()

    const handleClick= () => {
        router.push(`/${task.id}`)
    }

    return (
        <ListItem
            key={task.id}
            secondaryAction={
                <Checkbox
                    checked={task.status}
                    onChange={({target}) => {
                        updateTask({
                            ...task,
                            status: target.checked
                        })
                    }}
                />
            }
            onClick={() => {router.push(`/${task.id}`)}}
            disablePadding={true}
            className="rounded-2xl w-full"
        >

            <ListItemButton className="gap-4" role={undefined} onClick={handleClick} dense>

                <CreateOutlinedIcon className="opacity-50"/>

                <div className="flex flex-col">
                    <h1 className="font-bold text-base">{task.title}</h1>
                    <div className="flex flex-col">
                        {task.content.split('\n').map(item =>
                            <div key={item} className="text-black text-opacity-50">
                                {item}
                            </div>
                        ).at(0)}
                    </div>
                </div>
            </ListItemButton>

        </ListItem>

    )
}