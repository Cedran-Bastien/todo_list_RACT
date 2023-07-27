import { useTasks } from "@/hooks/useTasks";
import { dataTask } from "@/type";
import { useTheme } from "@mui/system";
import { useMediaQuery, Dialog, DialogTitle, DialogContentText, DialogContent, Stack, TextField, DialogActions, Button, FormControlLabel, Checkbox, FormControl,  FormLabel } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Task } from "../molecule/task";




export const FormUpdateTask = ({open , current}: {open: { open : boolean, setOpen: Dispatch<SetStateAction<boolean>> }, current: Task | undefined}) => {
    const context = useTasks()

    console.log(current);
    

    // Form variable
    const fullScreen = useMediaQuery(useTheme().breakpoints.down('md'));
    const { control, reset, register, handleSubmit, formState: { errors } } = useForm<dataTask>({
        defaultValues: {
            title: current != undefined ? current.title : '',
            description: current != undefined ? current.content : '',
            status: current != undefined ? current.status : false
        }
    });

    const onSubmit : SubmitHandler<any> = (data) => {
        context.updateTask({
            ...current as Task, 
            title: data.title,
            content: data.description,
            status: data.status
        })
        
        handleClose()
    }
    

    const handleClose = () => {
        
        open.setOpen(false)
        reset({
            title: current!.title,
            description: current!.content,
            status: current!.status
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
            <DialogTitle>Update Task</DialogTitle>
            <DialogContentText sx={{pl: 3, pb: 1}}>Make your modification before submit to update your task</DialogContentText>
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
                        <FormControl error={!!errors.status} component="fieldset" variant="standard">
                            <FormLabel >Status</FormLabel>
                            <FormControlLabel
                                control={
                                    <Controller
                                        name="status"
                                        control={control}
                                        render={({ field }) =>{
                                            console.log(field);
                                            return (<Checkbox {...field} checked={field.value} />)
                                        }}
                                    />
                                } 
                                label="Finish"
                            />
                        </FormControl>
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type='submit'>Update</Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}