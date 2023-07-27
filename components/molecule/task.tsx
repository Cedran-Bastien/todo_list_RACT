import {
    Box,
    Checkbox, Fab, IconButton,
    ListItem,
    ListItemButton,
    Stack, Typography
} from "@mui/material";
import React, {useEffect, useState} from "react";
import {useTasks} from "@/hooks/useTasks";
import {useRouter} from "next/navigation";
import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";
import {CreateOutlined} from "@mui/icons-material";


export type Task = {
    id: string,
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
        router.push(`/${task?.id}`)
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

            disablePadding={true}
        >
            <ListItemButton onClick={handleClick} dense>
                <Stack direction="column">
                    <Typography variant="h6" sx={{fontWeight:'bold'}}>{task.title}</Typography>
                    <Stack direction="column">
                        {task.content.split('\n').map(item =>
                            <Typography key={item} sx={{opacity:'50%'}}>
                                {item}
                            </Typography>
                        ).at(0)}
                    </Stack>
            </Stack>
            </ListItemButton>
        </ListItem>
    )
}

export const TaskDetailsUi = ({currentTask}: {currentTask : Task}) => {
    const { tasks, isSetUp } = useTasks()



    return (
        <Box sx={{padding:4}}>
            <Stack spacing={5}>
                <Stack direction="row"  spacing={3}>
                    <Typography variant="h3">
                        {currentTask?.title}
                    </Typography>
                </Stack>

                <Stack spacing={2} sx={{pl: 5}}>
                    {currentTask?.content.split('\n').map(item =>
                        <Stack key={item} direction="row" spacing={4}>
                            {
                                item.split('\t').map(word => <div key={word} className="text-xl">{word}</div>)
                            }
                        </Stack>
                    )}
                </Stack>
            </Stack>
        </Box>
    )
}