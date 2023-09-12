'use client'

import { AuthContextProvider } from '@/context/AuthContext'
import { CssBaseline } from '@mui/material'
import { usePathname, useRouter } from 'next/navigation'
import { ToastContainer } from 'react-toastify'
import './globals.css'
import { useEffect } from 'react'


export default function RootLayout({children}: { children: React.ReactNode }) {
    const router = useRouter()
    const path = usePathname()

    useEffect(() => {
        // If we are on root page
        // redirecting to sign in page 
        if (path == '/') {
            router.push('/auth/sign-in')
        }
    }, [])
    

    return (
        <html lang="en">
            <body className="h-screen">
                <CssBaseline />
                <ToastContainer/>
                <AuthContextProvider>
                    {children}  
                </AuthContextProvider> 
            </body>
        </html>
    )
}
