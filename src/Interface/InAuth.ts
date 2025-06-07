export interface UserLogin{
    username: string,
    password: string
}
export interface Role{
    id?:number
    name:string;
}

export interface User extends UserLogin{
    id: number
    name: string,
    lastname: string,
    telephone: string,
    document: string,
    username: string,
    password: string,
    entryDate: Date,
    status: boolean,
    roles: Role[]
}

export interface CreateUser extends UserLogin{
    telephone: String,
    roleRequest: {
        roleListName: string[]
    }
}
export interface LoginResponse{
    username: string,
    message: string,
    wt: string,
    status: boolean
}

export interface Profile extends User{
}

export interface AuthContextIn{
    singIn: (user: UserLogin) => void
    loading: boolean,
    isAutenticate: boolean,
    usersList: () => void
    authLoading: boolean,
    user: Profile
    createUser: (user: CreateUser) => User
    buttonDisable: boolean
    loginResponse: LoginResponse
    getUserList: () => void
    userList: User[]
}