'use client'

import React, {useEffect, useState} from "react";
import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";
import {Task} from "@/app/layout";


export default function taskDetail({params}: {params: {id: number}}) {
    const [currentTask, setCurrentTask] = useState<Task | null>(null)

    // Init database
    const supabase = createClientComponentClient()

    // Get data from database
    useEffect(() => {
        supabase
            .from('Tasks')
            .select('*')
            .eq('id', params.id)
            .then((data) => {

                if (!data.data){return}

                setCurrentTask(data.data[0])
            })
    }, [])

    return (
        <div>
            <h1>{currentTask?.title}</h1>
            <div className="flex flex-col">
                {currentTask?.content.split('\n').map(item =>
                    <div className="flex gap-4">
                        {
                            item.split('\t').map(word => <div>{word}</div>)
                        }
                    </div>
                )}
            </div>
        </div>
    )

}