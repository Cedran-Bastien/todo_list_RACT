'use client'

import './globals.css'
import React, {useEffect, useState} from "react";
import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";
import {Checkbox} from "@mui/material";


export type Task = {
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
        <div className="bg-white flex flex-row gap-5 rounded-xl mx-5 shadow-2xl p-4 max-h-40">

            <Checkbox
                checked={task.status}
                onChange={(e) => {
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
                }}

            />

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


        </div>
    )
}

export default function RootLayout({children,}: { children: React.ReactNode }) {
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
                if (data.error){
                    // TODO : Show error in snackbar
                    return
                }

                if (!data.data){
                    return
                }

                setTasks(data.data)
            })
    }, [])



    return (
    <html className="h-screen" lang="en">
      <body className="h-screen ">
        <div className="w-screen  inline-block">
            <div className="flex flex-col h-screen bg-cyan-100 gap-4 py-5 ">
                {tasks.map((task) => {
                    return <Tile key={task.id} setTasks={setTasks} task={task}/>
                })}
            </div>
            {children}
        </div>
      </body>
    </html>
  )
}
