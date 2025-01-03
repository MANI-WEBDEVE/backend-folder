
export type UserRegister = {
    fullName: string;
    email: string;
    password: string;
}

export type TodoType = {
    _id?: number;
    title: string;
    description:string;
    isCompleted:boolean
}

export type TokenType = {
    email:string
    id:string
    exp:number
    iat:number
}