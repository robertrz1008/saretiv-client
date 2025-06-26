import type { Role } from "../Interface/InAuth";

class UserRoleValidator{
    private user: Role[] = [{name:"", id:0}];

    constructor(user: Role[]){
        this.user = user;
    }

    public isAdmin(): boolean{
        if(this.user.some(role => role.name === "ADMINISTRADOR")){
            return true
        }
        return false;
    }

     public isSeller(): boolean{
        if(this.user.some(role => role.name === "VENDEDOR")){
            return true
        }
        return false;
    }

     public isTechnical(): boolean{
        if(this.user.some(role => role.name === "TECNICO")){
            console.log("es tecnico")
            return true
        }
        return false;
    }
}

export default UserRoleValidator;