import { ProductGet, Supplier } from "./InApp"

export interface Purchase{
    id?:number
    total: number
    createAt: Date
    factura: string
    editable: string
}
export interface PurchaseGet extends Purchase{
    supplier: Supplier
}

export interface PurchasePost extends Purchase{
    supplier:{id: number}
}

export interface PurchaseProduct{
    id?: number
    amount: number,
    subtotal: number,
    costo: number,
    priceMin: number
    priceMay: number
}

export interface PurchaseProductGet extends PurchaseProduct{
    product: ProductGet
}
export interface PurchaseProductPost extends PurchaseProduct{
    product: {id:number}
    purchase:{id:number}
}