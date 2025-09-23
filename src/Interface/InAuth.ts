
export interface UserLogin{
    username: string,
    password: string
}
export interface Role{
    id?:number
    name:string;
}

export interface InUser extends UserLogin{
    id?: number
    name: string,
    lastname: string,
    telephone: string,
    document: string,
    username: string,
    password: string,
    entryDate: Date,
    status: boolean,
}
export interface UserParams{
    property: string,
    role: string
    order: string
    isActive: boolean
}

export interface User extends InUser{
    roles: Role[]
}

export interface CreateUser extends InUser{
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
    logout: () => void,
    deleteUser: (id: number) => Promise<boolean>
    listUserByFilter: (filter: string) => void
    getUserListByParams: (user: UserParams) => void
}