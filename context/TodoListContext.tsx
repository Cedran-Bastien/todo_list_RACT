import {createContext, ReactNode, useEffect, useState} from "react";
import {Task} from "@/components/atomes/task";
import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";

type TasksModel = {
    tasks: Task[] | null
    updateTask: (tasks: Task) => void
    addTask: (task : Task) => void
}

export const TodoListContext = createContext<TasksModel>({
    tasks : null,
    updateTask: () => {},
    addTask: () => {}
})


export const TaskContextProvider = ({children} : {children : ReactNode}) => {
    const [tasks , setTasks] = useState<Task[]>([])

    // Init database
    const supabase = createClientComponentClient()

    // fetching TasksList
    useEffect(() => {
        supabase
            .from('Tasks')
            .select('*')
            .then((data) => {
                if (data.error){
                    // TODO : Show error in snackbar
                    console.log("Failed to fetch Tasks list data")
                    console.log(data.error)
                    return
                }

                if (!data.data){
                    // TODO -> snackbar error
                    console.log("No data tasks")
                    return
                }

                setTasks(data.data)
                console.log("Tasks fetched")
            })
    }, [])




    // Set Updating data
    const updateTask = (task: Task) => {
        // Change database
        supabase
            .from('Tasks')
            .update({
                'title': task.title,
                'content': task.content,
                'status': task.status
            })
            .eq('id', task.id)
            .then(res => {
                if (res.error){
                    // TODO -> snackbar error
                    return
                }

                // Change local constext
                setTasks( (lastTasks : Task[]) => {
                    return lastTasks.map( (item) => {
                        if (item.id != task.id){
                            return item
                        }

                        return task
                    })
                })
            })
    }

    // Set adding task
    const addTask = (task : Task) => {
        // Change database
        supabase
            .from('Tasks')
            .insert([{
                'title': task.title,
                'content': task.content,
                'status': task.status
            }])
            .then(res => {
                if (res.error){
                    // TODO -> snackbar error
                    return
                }

                // Change local constext
                setTasks( (lastTasks : Task[]) => {
                        return [...lastTasks, task]
                })
            })
    }


    return (
        <TodoListContext.Provider
            value={{
                tasks,
                updateTask,
                addTask
            }}
        >
            {children}
        </TodoListContext.Provider>
    )
}

