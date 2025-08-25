import type { SupportGet, SupportTypeGet } from "./SupportIn";

export interface activityGet{
    id?: number
    support: SupportGet | null
    supportType: SupportTypeGet
    isSaved: boolean
}
export interface activityDTO{
    support: {id:number}    
    supportType: {id:number}
}
