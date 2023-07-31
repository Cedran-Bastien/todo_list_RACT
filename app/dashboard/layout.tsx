'use client'

import React, {useEffect, useState} from "react";
import {TaskContextProvider} from "@/context/TodoListContext";
import {TasksList} from "@/components/molecule/tasksList";
import {Box, CircularProgress, Fade, Stack} from "@mui/material";
import {usePathname} from "next/navigation";
import { useTasks } from '@/hooks/useTasks';


export default function DashboardRoot({children}: { children: React.ReactNode }) {
    
    return (
        <TaskContextProvider>
            <Loading>
                {children}
            </Loading>
        </TaskContextProvider>
  )
}

const Loading = ({children}: { children: React.ReactNode }) => {
    const {isSetUp} = useTasks()

    return (
        <>
        {!isSetUp &&
            <Stack sx={{height: '100%'}} justifyContent='center' alignItems='center'>
                <CircularProgress/>
            </Stack>
        }
        {isSetUp &&
            <Stack sx={{width: 1, height: '100%'}} justifyContent={'space-between'} direction="row">
                <Box sx={{height: '100%', flex: '1 auto'}}>
                    <TasksList/>
                </Box>
                {children}
            </Stack>
        }
        </>
        
    )
}
