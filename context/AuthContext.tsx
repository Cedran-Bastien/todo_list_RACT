import { User } from "@/type"
import { RoomService } from "@mui/icons-material"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { AuthResponse } from "@supabase/supabase-js"
import { ReactNode, createContext, useState } from "react"


type AuthContextModel = {
    user: User | null
    isSetUp: boolean
    signIn: (email : string, password :string) => Promise<AuthResponse>
    signUp: (email : string, password : string, firstName : string, lastName : string) => Promise<AuthResponse>
    forgotPassword: () => void
}

export const AuthContext = createContext<AuthContextModel>({
    user: null,
    isSetUp: false,
    signIn: (email : string, password :string) => new Promise( () => {} ),
    signUp: (email : string, password : string, firstName : string, lastName : string) => new Promise( () => {} ),
    forgotPassword: () => {},
})


export const AuthContextProvider = ({children} : {children : ReactNode}) => {
    const [user , setUser] = useState<User | null>(null)
    const [isSetUp, setIsSetUp] = useState(false)

    // Init database
    const supabase = createClientComponentClient()

    // Set sign in function
    const signIn = (email : string, password :string) => {
        return new Promise<AuthResponse>((resolve, reject) => {
            supabase.auth.signInWithPassword({
                email: email,
                password: password
            })
            .then((data) => {
                console.log(data)
                // TODO set user of context

                resolve(data)
            })
            .catch( (err) => {
                reject(err)
            })
        })
    }

    // Set sign up function
    const signUp = (email : string, password : string, firstName : string, lastName : string) => {
        return new Promise<AuthResponse>((resolve, reject) => {
            supabase.auth.signUp({
                email: email,
                password: password,
                options: {
                    data: {
                        Firstname:firstName,
                        LastName: lastName, 
                    }
                }
            })
            .then((data) => {
                supabase.auth.signOut()
                resolve(data)
            })
            .catch(err => {
                reject(err)
            })
        })
        
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

