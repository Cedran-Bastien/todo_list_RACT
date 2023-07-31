import {createContext, ReactNode, useEffect, useState} from "react";
import {Task} from "@/components/molecule/task";
import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";
import {v4 as uuidV4} from "uuid";

type TasksContextModel = {
    tasks: Task[] | null
    isSetUp: boolean
    updateTask: (tasks: Task) => void
    addTask: (task : Task) => void
}

export const TasksListContext = createContext<TasksContextModel>({
    tasks : null,
    isSetUp : false,
    updateTask: () => {},
    addTask: () => {}
})


export const TaskContextProvider = ({children} : {children : ReactNode}) => {
    const [tasks , setTasks] = useState<Task[]>([])
    const [isSetUp, setIsSetUp] = useState(false)

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
                    return data.error
                }

                if (!data.data){
                    // TODO -> snackbar error
                    console.log("No data tasks")
                    return new Error("No data tasks")
                }

                setTasks(data.data)
                setIsSetUp(true)
                
                
                
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
                    return res.error
                }

                // Change local context
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
        // Set Id
        task.id = uuidV4()

        // Change database
        supabase
            .from('Tasks')
            .insert([{
                'id': task.id,
                'title': task.title,
                'content': task.content,
                'status': task.status
            }])
            .then(res => {
                if (res.error){
                    // TODO -> snackbar error
                    return res.error
                }


                // Change local constext
                setTasks( (lastTasks : Task[]) => {
                        return [...lastTasks, task]
                })

                // TODO -> snackbar confirmation
            })
    }


    return (
        <TasksListContext.Provider
            value={{
                tasks,
                isSetUp,
                updateTask,
                addTask
            }}
        >
            {children}
        </TasksListContext.Provider>
    )
}

