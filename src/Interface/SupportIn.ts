import type { Category } from "./InApp"

export interface SupportType{
    id?: number
    description: string
    amount: number
}
export interface SupportTypeGet extends SupportType{
    category: Category
}
export interface SupportTypeDTO extends SupportType{
    category: {
        id: number
    }
}
