'use client'

import { SignIn } from '@/components/organisms/signIn'
import { CssBaseline } from '@mui/material'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'
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
                {children}       
            </body>
        </html>
    )
}
