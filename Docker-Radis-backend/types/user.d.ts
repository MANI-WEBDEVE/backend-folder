
export type UserRegister = {
    fullName: string;
    email: string;
    password: string;
}

export type TodoType = {
    title: string;
    description:string
}

export type TokenType = {
    email:string
    id:string
    exp:number
    iat:number
}