export interface ProductDetail{
        id: number
        description: string
        price: number
        amount: number
        subtotal: number
}
export interface ProductDetailPost{
        id?: number
        ProductAmount: number
        subtotal: number
        product: {id: number}
        sale: {id:number}
}
export interface Sale{
        id?: number
        total: number
        createAt: Date
}