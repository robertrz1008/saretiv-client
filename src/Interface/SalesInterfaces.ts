import type { ProductGet } from "./InApp"
import type { SupportGet } from "./SupportIn"

export interface ProductDetail{
        id: number
        description: string
        price: number
        productAmount: number
        subtotal: number
}

export interface ProductDetailGet{
        id: number
        product: ProductGet
        sale: Sale
        productAmount: number
        subtotal: number
        support: SupportGet
}

export interface ProductDetailPost{
        id?: number
        productAmount: number
        subtotal: number
        product: {id: number}
        sale: {id:number}
        support: {id: number} | null
}
export interface Sale{
        id?: number
        total: number
        createAt: Date 
}