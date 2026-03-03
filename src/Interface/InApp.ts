import { RefObject } from "react";
import type { ActivityGet } from "./Activities";
import type { User } from "./InAuth"
import type { ProductDetail, SaleGet, SaleParams } from "./SalesInterfaces";
import type { DeviceAmount, SupportCustomGet, SupportParams, SupportTypeGet, SupportTypeParams, SuppProductDetail } from "./SupportIn";
import { Toast } from "primereact/toast";
import { PurchaseGet, PurchasePost, PurchaseProductPost } from "./purchase";

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

export interface CustomerParams{
    property: string,
    order: string
    isActive: boolean
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
    entryPriceMin: number,
    entryPriceMay: number,
    salePrice: number,
    stock: number,
    barcode: string,
}
export interface ProductPost extends Product{
    category: {
        id: number
    }
}
export interface ProductGet extends Product{
    supplier?: Supplier
    category: Category
}
export interface ProductParams{
    property: string,
    category: string,
    supplier: string,
    order: string,
    isStock: string
    saleMin: number
    saleMax: number,
    buyMin: number,
    buyMax: number
}
export interface ProductForPurchase extends ProductGet{
    id?: number
    amount: number,
    subtotal: number
    formDB: boolean
}
export interface Enterprice{
    id?: number,
    name: string,
    telephone: string,
    direction: string
}
export interface Revenues{
    mes: string 
    ingresos: number
}


export interface AppContextIn{
    listDeviceAmount: () => void, 
    devicesAmount: DeviceAmount[]
    listRevenues: ()  => void
    revenues: Revenues[]
    handleEnterpriseModal: (val: boolean) => void
    showEnterpriseModal: boolean
    handleConfigSidebar: (val: boolean) => void
    showConfigSidebar: boolean
    setGlobalTitleFn: (str: string) => void, 
    globalTitle: string
    isFormModalOpen: boolean
    showFormModal:  (val: boolean) => void
    showDetailModal: (val: boolean) => void
    isShowDetailModal: boolean
    userUpdateMode: (val: boolean) => void
    isFilterSidebarOpen: boolean
    setFilterSidebar: (val: boolean) => void
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
    getCustomerByParams: (params: CustomerParams) => void
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
    getProductsByParams: (pro: ProductParams) => void
    productDetails: ProductDetail[]
    total: number
    sumTotal: () => void
    createSale: () => void
    formTitle: string
    setModalFormTitle: (title: string) => void
    saleButtonDisable: boolean
    listSupportType: () => void
    listSupportByFilter: (str: string) => void
    setSupportTypeUpdateMode: (val: boolean) =>  void
    deleteSupportType: (id: number) => void
    setSupportTypeUpdate: (sup: SupportTypeGet) => void
    supportTypes: SupportTypeGet[]
    supportTypeUpdMode: boolean
    supportTypeModify: SupportTypeGet
    listSupportTypeByFilter: (str: string) => void
    showRSidebar: boolean
    setShowRSidebar: (val: boolean) => void
    listSupport: () => void
    listSupportByParams: (params: SupportParams) => void
    supports: SupportCustomGet[]
    supportUpdMode: boolean
    supportModify: SupportCustomGet
    setSupportsUpdMode: (val: boolean) => void
    setSupportModify: (supp: SupportCustomGet) => void
    supProDetail: SuppProductDetail[]
    handleAddSuppProduct: (pro: ProductDetail) => void
    resetSuppProduct: (id: number) => void
    sumSupTotal: () => void
    supTotal: number,
    suppDetailConcel:() => void
    registerSupportDetails: (support: SupportCustomGet, products: SuppProductDetail[], activities: ActivityGet[]) => boolean
    getSupportDetials: (id: number) => void
    setSupportCurrent: (sup: SupportCustomGet) => void
    supportCurrent: SupportCustomGet
    resetSuppProductFromDB: (id:number) => void
    activities: ActivityGet[]
    addActivitesToList: (activity: ActivityGet) => void
    resetActivityFromCache: (id: number) => void
    listSalesByDates:(date1: string, date2: string) => void
    salesList: SaleGet[]
    listSalesByParams: (params: SaleParams) => void
    resetActivityFromDB: (actvityId: number) => void
    deleteSupport: (id: number) => void
    listSupportTypeByParams: (params: SupportTypeParams) => void
    toast: RefObject<Toast>
    showToasSuccess: (msg: string) => void
    showToasError: (msg: string) => void
    purchaseProSelected: ProductGet
    selectProductToPurchase: (pro: ProductGet | null) => void
    purchaseProList: ProductForPurchase[],
    handlePurchaseProductList: (pro: ProductForPurchase | null) => void
    sumPurchaseTotal: () => void
    purchaseTotal: number
    purchaseTotalZero: () => void
    deletePurchaseProduct: (id: number) => void
    createPurchaese: (purchase: PurchasePost) => boolean
    listPurchase: () => void
    purchaseList: PurchaseGet[], 
    purchaseModify: PurchaseGet | null 
    handlePurchaseModity: (purchase: PurchaseGet | null) => void
    changePurchaseProductForTable: () => void
    purchaseProMode: boolean,  
    purchaseProModify: ProductForPurchase, 
    handlePurchaseProductMode: (val: boolean) => void, 
    setPurchaseProductModify: (pro: ProductForPurchase) => void
    modifyPurchaseProductFromCache:(id: number, amount: number, cost: number, priMay: number, priMin: number) => void
    modifyPurchaseFromDB: (id: number, pro: PurchaseProductPost) => boolean
    finishPurchase:(purchase: PurchasePost) => void
    deletePurProModal: boolean
    showDeletePurProModal: (val: boolean) => void
    deletePurchaseProductfromDB: (id: number) => void
}