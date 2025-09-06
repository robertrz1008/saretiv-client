import type { SupportGet, SupportTypeGet } from "./SupportIn";

export interface ActivityGet{
    id?: number
    support: SupportGet | null
    supportType: SupportTypeGet
    isSaved: boolean
}
export interface ActivityDTO{
    support: {id:number}    
    supportType: {id:number}
}
