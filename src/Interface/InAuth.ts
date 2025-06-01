export interface UserLogin{
    username: string,
    password: string
}
export interface Role{
    id?:number
    name:string;
}

export interface User extends UserLogin{
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

export interface Profile extends User{
}

export interface UserView extends User{
    accountNoExpired: boolean,
    credentialNoLocked: boolean,
    credentialNoExpired: boolean,
    enaABoolean: boolean,
    accountNoExpited: boolean
}

export interface AuthContextIn{
    singIn: (user: UserLogin) => void
    loading: boolean,
    isAutenticate: boolean,
    usersList: () => void
    authLoading: boolean,
    user: Profile
    users: UserView[]
    createUser: (user: CreateUser) => User
}