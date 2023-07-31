import { User } from "@/type"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { ReactNode, createContext, useState } from "react"


type AuthContextModel = {
    user: User | null
    isSetUp: boolean
    signIn: () => void
    signUp: () => void
    forgotPassword: () => void
}

export const AuthContext = createContext<AuthContextModel>({
    user: null,
    isSetUp: false,
    signIn: () => {},
    signUp: () => {},
    forgotPassword: () => {},
})


export const AuthContextProvider = ({children} : {children : ReactNode}) => {
    const [user , setUser] = useState<User | null>(null)
    const [isSetUp, setIsSetUp] = useState(false)

    // Init database
    const supabase = createClientComponentClient()

    // Set sign in function
    const signIn = () => {
        
    }

    // Set sign up function
    const signUp = () => {

    }

    const forgotPassword = () => {

    }


    return (
        <AuthContext.Provider
            value={{
                user,
                isSetUp,
                signIn,
                signUp,
                forgotPassword
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

