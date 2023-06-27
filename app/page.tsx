'use client'

import React, {useEffect, useState} from "react";
import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";
type Task = {
  id: number,
  title: string,
  content: string,
  status: boolean,
}

const Tile = ({
        task,
        setTasks
    }: {
        task: Task ,
        setTasks : (tasks : any) => void
    }) => {
    return (
        <div className="rounded-l shadow-2xl">
            <h1>{task.title}</h1>
            <p className="text-opacity-50 ">{task.content}</p>
            <input type={"checkbox"} checked={task.status} onChange={(e) => {
                const target = e.target as HTMLInputElement
                setTasks( (lastTasks : Task[]) => {
                    return  lastTasks.map( (item) => {
                        if (item.id != task.id){
                            return item
                        }

                        return {
                            ...task,
                            status: target.checked
                        }
                    } )
                } )
                task.status = target.checked
            }}/>
        </div>
    )
}

export default function Home() {
    const [tasks , setTasks] = useState<Task[]>([])

    // Init database
    const supabase = createClientComponentClient()

    // Get data from database
    useEffect(() => {
        // Get data
        supabase
            .from('Tasks')
            .select('*')
            .then((data) => {
                if (!data.data){return}
                console.log(data.data)
                setTasks(data.data)
            })
    }, [])


    return (
        <div className="flex flex-col gap-2">
            {tasks.map((task) => {
                return <Tile key={task.id} setTasks={setTasks} task={task}/>
            })}
        </div>
    )
}
