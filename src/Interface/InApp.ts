import type { User } from "./InAuth"
import type { ProductDetail } from "./SalesInterfaces";

export interface DropdownItem{
    label: string, 
    code: string 
}

export interface Customer{
    id?: number
    name: string,
    lastname: string,
    telephone: string,
    document: string,
    status: boolean,
    address: string
}

export interface Category{
    id?: number;
    name: string
}
export interface Supplier{
    id?: number
    name: string,
    telephone: string
    ruc: string
    address: string
}
export interface Product{
    id?: number
    description: string,
    entryPrice: number,
    salePrice: number,
    stock: number,
    barcode: string,
}
export interface ProductPost extends Product{
    supplier: {
        id: number
    },
    category: {
        id: number
    }
}
export interface ProductGet extends Product{
    supplier: Supplier
    category: Category
}




export interface AppContextIn{
    setGlobalTitleFn: (str: string) => void, 
    globalTitle: string
    isFormModalOpen: boolean
    showFormModal:  (val: boolean) => void
    userUpdateMode: (val: boolean) => void
    setUserUpdate: (user: User) => void
    isUserUpdMode: boolean
    userModify: User
    showConfirmModal: (val: boolean) => void
    isShowConfirmModal: boolean
    customers: Customer[],
    suppliers: Supplier[]
    customerList: () => void,
    iscustUpdMode: boolean 
    customerModify: Customer
    setCustUpdateMode: (val: boolean) => void 
    setCustUpdate: (cust: Customer) => void
    deleteCustomer: (id: number) => void
    customerListByFilter: (str: string) => void
    addUserDoc: (doc: string) => void
    userDoc: string
    addCustomerDoc: (doc: string) => void
    customerDoc: string
    supplierList: () => void 
    isSupUpdMode: boolean
    supplierModify: Supplier 
    setSupUpddateMode: (val: boolean) => void
    setSupplierUpdate: (sup: Supplier) => void
    deleteSupplier: (id: number) => void 
    supplierListByFilter: (str: string) => void
    products: ProductGet[]
    productList: () => void
    isProductUpdMode: boolean
    productModify: ProductGet
    setProductUpdate: (pro: ProductGet) => void
    setProductUpdateMode: (val: boolean) => void
    deleteProduct: (id: number) => void
    productListByFilter: (str: string) => void
    changeProductAmount: (id: number, amountCurrent: number) => void
    deleteProductDetail: (id: number) => void
    handleAddProduct: (pro: ProductDetail) => void
    productDetails: ProductDetail[]
    total: number
    sumTotal: () => void
    createSale: () => void
    formTitle: string
    setModalFormTitle: (title: string) => void
    saleButtonDisable: boolean
}