import React, {useState} from "react";
import { TaskUi} from "@/components/molecule/task";
import {useTasks} from "@/hooks/useTasks";
import {Box, Fab, List, Paper} from "@mui/material";
import {Add} from "@mui/icons-material";
import {FormAddTask} from "@/components/organisms/formAddTask";
export const TasksList = () => {
    const {tasks} = useTasks()
    const [open,setOpen]  = useState(false)

    return(
        <Paper sx={{height:'100%'}} square>
            <Box sx={{height:'100%'}}>
                <List
                    sx={{ height:'100%',
                        position: 'relative',
                        overflow: 'auto',
                    }}
                    dense={true}
                    disablePadding={true}

                >
                    {tasks!.map((task) => <TaskUi key={task.id} task={task}/>)}
                </List>
                <Fab
                    onClick={() => {
                        setOpen(true)
                    }}
                    sx={{
                        position: 'absolute',
                        bottom: 50,
                        right: 50
                    }}
                >
                    <Add/>
                </Fab>
                <FormAddTask open={{open, setOpen}}/>
            </Box>
        </Paper>
    )
}


