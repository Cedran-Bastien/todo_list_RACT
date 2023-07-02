'use client'

import './globals.css'
import React from "react";
import {TaskContextProvider} from "@/context/TodoListContext";
import {TasksList} from "@/components/organisms/TasksList";


export default function RootLayout({children}: { children: React.ReactNode }) {
    // const { fetchTasks } = useContext(TodoListContext)
    // useEffect(() => {
    //     fetchTasks()
    // } , [fetchTasks])

    return (
    <html lang="en">
      <body className="h-screen">
        <TaskContextProvider>
            <TasksList/>
            {children}
        </TaskContextProvider>
      </body>
    </html>
  )
}
