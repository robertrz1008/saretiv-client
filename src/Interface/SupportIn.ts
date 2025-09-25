import type { Category, Customer } from "./InApp"
import type { User } from "./InAuth"
import type { ProductDetail } from "./SalesInterfaces"

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
export interface SupportTypeParams{
    property: string,
    category: string,
    order: string,
    amountMin: number,
    amountMax: number
}

export interface Support{
    id?: number
    startDate: Date
    endDate?: Date
    total: number
    status: string
}

export interface SupportCustomGet extends Support{
    description: string
    observation: string
    categoryDev: string
    categoryDevId: number
    customer: string
    devId: number
    customerId: number
    document: string
    user: string
    userId: number
}
export interface SupportGet extends Support{
    customer: Customer
    user: User
}

export interface SupportPost{
    customerId: number
    startDate: Date,
    status: string,
    total: number,
    userId: number
}


export interface Device{
    id?: number
    description: string;
    observation: string
}

export interface DevicePost extends Device{
    categoryId: number
    supportId: number
}

export interface DeviceGet extends Device{
    category: Category
    support: Support
}
export interface SuppProductDetail extends ProductDetail{
    isSaved: boolean
}
