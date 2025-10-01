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
export interface SaleGet{
        description: string
        category: string
        amount: number
        subtotal: number
        price: string
        date: Date
}
export interface SaleDates{
        date1: string
        date2: string
}
export interface SaleParams{
        property: string
        category: string
        order: string
        subtotalMin: number
        subtotalMax: number
        dateFrom: string
        dateTo: string
}