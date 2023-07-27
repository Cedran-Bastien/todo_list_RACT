'use client'

import './globals.css'
import React, {useEffect, useState} from "react";
import {TaskContextProvider} from "@/context/TodoListContext";
import {TasksList} from "@/components/molecule/tasksList";
import {Box, CircularProgress, Fade, Stack} from "@mui/material";
import {usePathname} from "next/navigation";
import { useTasks } from '@/hooks/useTasks';


export default function RootLayout({children}: { children: React.ReactNode }) {
    
    return (
    <html lang="en">
      <body className="h-screen">
        <TaskContextProvider>
            <Loading>
                {children}
            </Loading>
        </TaskContextProvider>
      </body>
    </html>
  )
}

const Loading = ({children}: { children: React.ReactNode }) => {
    const {isSetUp} = useTasks()
    const path = usePathname()
    const [listMenuLength, setLength] = useState(1)

    useEffect(() => {
        const reGexp = new RegExp("/[0-9]+")
        if (reGexp.test(path)){
            setLength(1/4)
        }else{
            setLength(1)
        }
    },[path])

    return (
        <>
        {!isSetUp &&
            <Stack sx={{height: '100%'}} justifyContent='center' alignItems='center'>
                <CircularProgress/>
            </Stack>
        }
        {isSetUp &&
            <Stack sx={{height: '100%'}} direction="row">
                <Box sx={{height: '100%', width: listMenuLength}}>
                    <TasksList/>
                </Box>
                {children}
            </Stack>
        }
        </>
        
    )
}
