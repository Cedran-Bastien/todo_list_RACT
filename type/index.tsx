export type dataTask = {
    title: string,
    description: string,
    status: boolean | undefined
}

export type authData = {
    firstname?: string
    lastname?: string
    email: string
    password: string
    passwordConfirmation? : string
}