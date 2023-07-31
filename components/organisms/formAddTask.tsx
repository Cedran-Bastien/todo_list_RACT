import {
    Button,
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
    Stack,
    TextField, useMediaQuery,
} from "@mui/material";
import {SubmitHandler, useForm} from "react-hook-form";
import {useTheme} from "@mui/system";
import {Dispatch, SetStateAction} from "react";
import {useTasks} from "@/hooks/useTasks";
import {Task} from "@/components/molecule/task";
import { dataTask } from "@/type";


export const FormAddTask = ({open}: {open: { open : boolean, setOpen: Dispatch<SetStateAction<boolean>> }}) => {
    const context = useTasks()
   

    // Form variable
    const fullScreen = useMediaQuery(useTheme().breakpoints.down('md'));
    const { register, reset, handleSubmit, formState: { errors } } = useForm<dataTask>({
        defaultValues: {
            title: '',
            description: ''
        }
    });

    const onSubmit : SubmitHandler<any> = (data) => {
        // creating the task
        const newTasks: Task ={
            title: data.title,
            content: data.description,
            status: false
        } as Task

        //adding task
        context.addTask(newTasks)

        handleClose()

    }
    const handleClose = () => {
         open.setOpen(false)
         
         reset({
            title: '',
            description: ''
         })
    }

    return (
        <Dialog
            open={open.open}
            onClose={handleClose}
            maxWidth='lg'
            fullWidth
            fullScreen={fullScreen}
            scroll='paper'
        >
            <DialogTitle>New Task</DialogTitle>
            <DialogContentText sx={{pl: 3, pb: 1}}>Complete the following field for create task</DialogContentText>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <DialogContent dividers>
                    <Stack spacing={2} >
                        <TextField
                            label="Title"
                            {...register("title",{
                                required: "Title is required"
                            })}
                            variant="filled"
                            error={!!errors.title}
                            helperText={errors.title?.message}
                        />
                        <TextField
                            label="Description"
                            variant="filled"
                            multiline
                            minRows={5}
                            {...register("description")}
                        />
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type='submit'>Add</Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}