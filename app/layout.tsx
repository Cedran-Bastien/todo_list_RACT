'use client'

import { AuthContextProvider } from '@/context/AuthContext'
import { CssBaseline } from '@mui/material'
import { usePathname, useRouter } from 'next/navigation'
// import './globals.css'


export default function RootLayout({children}: { children: React.ReactNode }) {
    const router = useRouter()
    const path = usePathname()

    // If we are on root page
    // redirecting to sign in page 
    if (path == '/') {
        router.push('/auth/sign-in')
    }

    return (
        <html lang="en">
            <body className="h-screen">
                <CssBaseline />
                <AuthContextProvider>
                    {children}  
                </AuthContextProvider> 
            </body>
        </html>
    )
}
