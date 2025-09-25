import { useContext, createContext, type ReactNode, useState } from "react";
import type { User } from "../Interface/InAuth";
import type { Customer, CustomerParams, ProductGet, ProductParams, Supplier } from "../Interface/InApp";
import { customerListRequest, deleteCustomerRequest, getCustomerByFilterRequest, getCustomerByParamsRequest } from "../services/Customer.service";
import { deletesupplierRequest, getSupplierByFilterRequest, getSupplierRequest } from "../services/Supplier.service";
import { deleteProductRequest, getProductByFilterRequest, getProductByIdRequest, getProductByParamsRequest, getProductRequest, updateProductRequest, updateProductStockRequest } from "../services/Product.service";
import type { ProductDetail, ProductDetailGet, ProductDetailPost } from "../Interface/SalesInterfaces";
import { createProDetailRequest, createSaleRequest, deleteProductDetailRequest, getProductDetailByIdRequest, getProductDetailBySupportRequest, updateSaleRequest } from "../services/Sale.service";
import { deleteSupportTypeRequest, getSupportTypeByParamRequest, getSupportTypeFilterRequest, getSupportTypeRequest } from "../services/SupportType.service";
import type { DeviceGet, SupportCustomGet, SupportTypeGet, SupportTypeParams, SuppProductDetail } from "../Interface/SupportIn";
import { deleteSupportRequest, getSupportsCustomRequest, updateSupportTotalRequest } from "../services/Support.Service";
import type { AxiosResponse } from "axios";
import type { ActivityDTO, ActivityGet } from "../Interface/Activities";
import { deleteActivityRequest, getActivitiesBySupportIdRequest, postActivitiesRequest } from "../services/Activities.service";
import { deleteDeviceRequest, getDeviceBySupportIdReq } from "../services/Device.service";
const appContext = createContext({})

export const useAppContext = () => {
    const context = useContext(appContext)
    if (!context) {
        throw new Error("Context invalid")
    }
    return context
}

interface ContexArg {
    children: ReactNode
}

export const AppContexProvider = ({ children }: ContexArg) => {

    const [globalTitle, setGlobalTitle] = useState("");

    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [isUserUpdMode, setUserUpdMode] = useState(false)
    const [userModify, setUserToModify] = useState<User>()
    const [isFilterSidebarOpen, setFilterSidebarOpen] = useState(false)
    const [isShowConfirmModal, setShowConfirmModal] = useState(false)
    const [isShowDetailModal, setShowDetailModal] = useState(false)
    const [userDoc, setUserDoc] = useState("")
    const [showRSidebar, setShowRSidebar] = useState(false)

    //abm
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [iscustUpdMode, setCustUpdMode] = useState(false);
    const [customerModify, setCustomersModify] = useState<Customer>();
    const [customerDoc, setCustomerDoc] = useState("")
    // supplier
    const [suppliers, setSuppliers] = useState<Supplier[]>([]);
    const [isSupUpdMode, setSupUpdMode] = useState(false);
    const [supplierModify, setSupplierModify] = useState<Supplier>();
    //product
    const [products, setProducts] = useState<ProductGet[]>([]);
    const [isProductUpdMode, setProductUpdMode] = useState(false);
    const [productModify, setProductModify] = useState<ProductGet>();
    //sales 
    const [productDetails, setProductDetails] = useState<ProductDetail[]>([]);
    const [total, setTotal] = useState(0)
    const [saleButtonDisable, setSaleButtonDisable] = useState(false)
    //support type
    const [supportTypes, setSupportTypes] = useState<SupportTypeGet[]>([])
    const [supportTypeUpdMode, setSupportTypeUpdMode] = useState(false)
    const [supportTypeModify, setSupportTypeModify] = useState<SupportTypeGet>()
    //support
    const [supports, setSupports] = useState<SupportCustomGet[]>([])
    const [supportUpdMode, setSupportsUpdMode] = useState(false)
    const [supportModify, setSupportModify] = useState<SupportCustomGet>()
    const [supProDetail, setSupProDetail] = useState<SuppProductDetail[]>([])
    const [supTotal, setSupTotal] = useState(0)
    const [supportCurrent, setSupportCurrent] = useState<SupportCustomGet>()
    //support activities
    const [activities, setActivities] = useState<ActivityGet[]>([])

    const [formTitle, setFormTitle] = useState("")


    function setModalFormTitle(title: string) {
        setFormTitle(title)
    }
    function setFilterSidebar(val: boolean) {
        setFilterSidebarOpen(val)
    }
    function setGlobalTitleFn(title: string) {
        setGlobalTitle(title);
    }
    function showFormModal(val: boolean) {
        setIsFormModalOpen(val);
        if (!val) {
            setUserUpdMode(false)
        }
    }
     function showDetailModal(val: boolean) {
        setShowDetailModal(val);
    }
    function showConfirmModal(val: boolean) {
        setShowConfirmModal(val);
    }
    function userUpdateMode(val: boolean) {
        setUserUpdMode(val)
    }
    function setUserUpdate(user: User) {
        setUserToModify(user)
    }

    function setCustUpdateMode(val: boolean) {
        setCustUpdMode(val)
    }
    function setCustUpdate(cust: Customer) {
        setCustomersModify(cust)
    }
    function addUserDoc(str: string) {
        setUserDoc(str)
    }

    //customer
    async function customerList() {
        try {
            const response = await customerListRequest()
            setCustomers(response.data)
        } catch (error) {
            console.log(error)
        }
    }
    async function deleteCustomer(id: number) {
        try {
            await deleteCustomerRequest(id)
            showConfirmModal(false)
            customerList()
        } catch (error) {
            console.log(error)
        }
    }
    async function customerListByFilter(str: string) {
        if (str == "") {
            customerList()
            return
        }
        try {
            const res = await getCustomerByFilterRequest(str)
            setCustomers(res.data)
        } catch (error) {
            console.log(error)
        }
    }
    function addCustomerDoc(str: string) {
        setCustomerDoc(str)
    }
    async function getCustomerByParams(params: CustomerParams){
        try {
            const res = await getCustomerByParamsRequest(params)
            setCustomers(res.data)
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }
    // supplier
    async function supplierList() {
        try {
            const response = await getSupplierRequest()
            setSuppliers(response.data)
        } catch (error) {
            console.log(error)
        }
    }
    async function deleteSupplier(id: number) {
        try {
            await deletesupplierRequest(id)
            showConfirmModal(false)
            supplierList()
        } catch (error) {
            alert("it wasn`t possible to delete the supplier")
            console.log(error)
        }
    }
    async function supplierListByFilter(str: string) {
        if (str == "") {
            supplierList()
            return
        }
        try {
            const res = await getSupplierByFilterRequest(str)
            setSuppliers(res.data)
        } catch (error) {
            console.log(error)
        }
    }
    function setSupplierUpdate(sup: Supplier) {
        setSupplierModify(sup)
    }
    function setSupUpddateMode(val: boolean) {
        setSupUpdMode(val)
    }

    //product
    async function productList() {
        try {
            const response = await getProductRequest()
            setProducts(response.data)
        } catch (error) {
            console.log(error)
        }
    }
    async function deleteProduct(id: number) {
        try {
            await deleteProductRequest(id)
            showConfirmModal(false)
            productList()
        } catch (error) {
            console.log(error)
        }
    }
    async function productListByFilter(str: string) {
        if (str == "") {
            productList()
            return
        }

        try {
            const res = await getProductByFilterRequest(str)
            setProducts(res.data)

        } catch (error) {
            console.log(error)
        }
    }
    function setProductUpdate(sup: ProductGet) {
        setProductModify(sup)
    }
    function setProductUpdateMode(val: boolean) {
        setProductUpdMode(val)
    }
    async function getProductsByParams(params: ProductParams){
        try {
            const res = await getProductByParamsRequest(params)
            setProducts(res.data)
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }

    //support type
    async function listSupportType() { 
        try {
            const response = await getSupportTypeRequest()
            setSupportTypes(response.data)
        } catch (error) {
            console.log(error)
        }
    }
    async function deleteSupportType(id: number) {
        try {
            await deleteSupportTypeRequest(id)
            listSupportType()
        } catch (error) {
            console.log(error)
        }
    }
    async function setSupportTypeUpdate(sup: SupportTypeGet) {
        setSupportTypeModify(sup)
    }
    async function setSupportTypeUpdateMode(val: boolean) {
        setSupportTypeUpdMode(val)
    }
    async function listSupportTypeByFilter(str: string) {
        if (str == "") {
            listSupportType()
            return
        }

        try {
            const res = await getSupportTypeFilterRequest(str)
            setSupportTypes(res.data)

        } catch (error) {
            console.log(error)
        }
    }
    async function listSupportTypeByParams(params: SupportTypeParams){
       try {
            const res = await getSupportTypeByParamRequest(params)
            setSupportTypes(res.data)
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }

    //sales
    function sumTotal() {
        const newTotal = productDetails.reduce((con, el) => con + el.subtotal, 0)
        setTotal(newTotal)
    }
    function totalZero() {
        setTotal(0)
    }
    function addDetailProductToList(id: number) {
        setProductDetails((prevProducts) => {
            return prevProducts.map((product) => {
                return product.id === id
                    ? { ...product, subtotal: product.price * product.productAmount }
                    : product;
            });
        });
    }
    function addProductAmout(id: number) {
        setProductDetails((detailPro) => {
            return detailPro.map((pro) => {
                return pro.id == id ? { ...pro, amount: pro.productAmount + 1 } : pro
            })
        })
    }
    function changeProductAmount(id: number, amountCurrent: number) {

        if (!amountCurrent) return

        setProductDetails((detailPro) => {
            return detailPro.map((pro) => {
                return pro.id == id ? { ...pro, amount: amountCurrent, subtotal: pro.price * amountCurrent } : pro
            })
        })
        sumTotal()
    }

    function handleAddProduct(pro: ProductDetail) {
        if (productDetails.some((data) => data.id == pro.id)) {
            addProductAmout(pro.id as number);
        } else {
            setProductDetails([...productDetails, pro])
        }
        addDetailProductToList(pro.id as number);
    }
    async function deleteProductDetail(id: number) {
        const newPd = productDetails.filter(data => data.id != id)
        setProductDetails(newPd)
    }
    async function createSale() {
        if (productDetails.length === 0) return true
        console.log(productDetails)
        try {
            setSaleButtonDisable(true)
            const SaleCreated = await createSaleRequest({
                total: 0,
                createAt: new Date()
            })

            const proDetailToSave: ProductDetailPost[] = productDetails.map((pro) => {
                return {
                    productAmount: pro.productAmount,
                    subtotal: pro.subtotal,
                    product: { id: pro.id as number },
                    sale: { id: SaleCreated.data.id as number },
                    support: null
                }
            })

            await createProDetailRequest(proDetailToSave)

            await updateSaleRequest(SaleCreated.data.id, { total: total });

            // modifyin the product`s stock
            for (const productDetail of productDetails) {
                const proId = productDetail.id
                const pro = await getProductByIdRequest(proId)
                const newStok = pro.data.stock - productDetail.productAmount

                await updateProductRequest(proId, { ...pro.data, stock: newStok })
            }

            setProductDetails([])
            productList()
            totalZero()
            return true
        } catch (error) {
            alert("no se pudo realizar la venta")
            return false
        } finally {
            setSaleButtonDisable(false)
        }
    }

    //support
    async function listSupport() {
        try {
            const response = await getSupportsCustomRequest()
            setSupports(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    //product detail for support
    function sumSupTotal() {
        const propTotal = supProDetail.reduce((con, el) => con + el.subtotal, 0)
        const actTotal = activities.reduce((con, el) => con + el.supportType.amount, 0)

        const total = propTotal + actTotal
        setSupTotal(total)
    }
    function supTotalZero() {
        setSupTotal(0)
    }
    function addDetailProductToSuppList(id: number) {
        setSupProDetail((prevProducts) => {
            return prevProducts.map((product) => {
                return product.id == id
                    ? { 
                        ...product, 
                        subtotal: product.price? (product.price * product.productAmount) : 0 
                    }
                    : product;
            });
        });
    }
    function addSuppProductAmout(id: number) {
        setSupProDetail((detailPro) => {
            return detailPro.map((pro) => {
                return pro.id == id ? { ...pro, productAmount: pro.productAmount + 1 } : pro
            })
        })
    }

    function handleAddSuppProduct(pro: ProductDetail) {
        if (supProDetail.some((data) => data.id == pro.id)) {
            addSuppProductAmout(pro.id as number);
        } else {
            setSupProDetail([...supProDetail, {...pro, isSaved: false}])
        }
        addDetailProductToSuppList(pro.id as number);
    }

    function resetSuppProduct(id: number){
        const newPro = supProDetail.filter(pro => pro.id != id)
        setSupProDetail(newPro)
    }
    function suppDetailConcel(){
        setSupProDetail([])
        setSupTotal(0)
    }
    async function getSupportDetials(id: number){
        try {
            //getting product by support
            const pro  = await getProductDetailBySupportRequest(id)
            const newPro: SuppProductDetail[] = pro.data.map((pro: SuppProductDetail) => ({...pro, isSaved: true}))
            setSupProDetail(newPro)

            //getting activities registered
            const res = await getActivitiesBySupportIdRequest(id)
            const newAct: ActivityGet[] = res.data.map((act: ActivityGet) => ({...act, isSaved: true}))
            setActivities(newAct)
        } catch (error) {
            console.log(error)
        }
    }
    async function registerSaleForSupport(products: SuppProductDetail[], support: SupportCustomGet){
        if(products.length == 0) return false
        
       try {
        //creating sale
         const SaleCreated = await createSaleRequest({total: 0, createAt: new Date()})
 
         //preparing product
         const proDetailToSave: ProductDetailPost[] = products.map((pro) => {
                 return {
                    //  id: pro.id,
                     productAmount: pro.productAmount,
                     subtotal: pro.subtotal,
                     product: { id: pro.id as number },
                     sale: { id: SaleCreated.data.id as number },
                     support: {
                         id: support.id as number
                     }
                 }
         })
         console.log(proDetailToSave)
         await createProDetailRequest(proDetailToSave)

         //suming total
         const saleTotal = proDetailToSave.reduce((con, el) => con+el.subtotal, 0)

         await updateSaleRequest(SaleCreated.data.id, { total: saleTotal });
 
         //registering products details in the sale
         for (const productDetail of products) {
             const proId = productDetail.id
             const pro = await getProductByIdRequest(proId)
             const newStok = pro.data.stock - productDetail.productAmount

            // substracting product stock
             await updateProductRequest(proId, { ...pro.data, stock: newStok })
         }
         setSupProDetail([])
         supTotalZero()
         return true
       } catch (error) {
        console.log(error)
        return false
       }
       
    }
    async function registerSupportDetails(
        support: SupportCustomGet, 
        products: SuppProductDetail[],
        activities: ActivityGet[]
    ){
        //regiter products and acitivities
        const sale = await registerSaleForSupport(products, support)
        const activitiesRegister = await registerActivityForSupport(activities)

        if(!sale && !activitiesRegister) return false

        //modifing the support`s total
        try {
            await updateSupportTotalRequest(support.id as number, supTotal);
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }
    async function resetSuppProductFromDB(id: number){

        try {
             //getting productDetail
            const proDRes: AxiosResponse<ProductDetailGet> = await getProductDetailByIdRequest(id)

            const proD = proDRes.data

            //getting product
            const productFound: AxiosResponse<ProductGet> = await getProductByIdRequest(proD.product.id as number)

            //updating product stock
            const newStock = productFound.data.stock + proD.productAmount

            await updateProductStockRequest(
                productFound.data.id as number,
                newStock
            )
            await deleteProductDetailRequest(id)

            const newTotal = supTotal - proD.subtotal
            setSupTotal(newTotal)

            //updating support total
            await updateSupportTotalRequest(
                supportCurrent?.id as number, 
                newTotal
            )
           

            //getting support details
            getSupportDetials(supportCurrent?.id as number)
            showConfirmModal(false)
        } catch (error) {
            console.log(error)
        }

    }

    //activities
    function addActivitesToList(act: ActivityGet){
        setActivities([...activities, act])
    }
    function resetActivityFromCache(id: number){
        const newList = activities.filter(act => act.supportType.id != id)
        console.log(newList)
        setActivities(newList)
    } 
    async function registerActivityForSupport(activities: ActivityGet[]){
        if(activities.length == 0) return false

        //listing activities for register
        let activitiesForSave: ActivityDTO[] = []
        activities.map((act) => {
            const item: ActivityDTO = {
                support: {id: supportCurrent?.id as number},
                supportType: {id: act.supportType.id as number}
            }
            activitiesForSave.push(item)
        })
        try {
            await postActivitiesRequest(activitiesForSave)
            return true
        } catch (error) {
            console.log(error)
            return false
        }

    }
    
    async function resetActivityFromDB(actvityId: number){
        console.log(actvityId)
        const thisActivity: ActivityGet | undefined  = activities.find(act => act.id == actvityId)

        if(!thisActivity) return

        const activityAmount = thisActivity.supportType.amount
        const newTotal = supTotal - activityAmount

        try {
            await updateSupportTotalRequest(
                supportCurrent?.id as number,
                newTotal
            )

            // setSupTotal(newTotal)
            await deleteActivityRequest(actvityId)

            //update the activity list
            const newList = activities.filter(act => act.id != actvityId)
            console.log(newList)
            setActivities(newList)

            console.log("sacando de la lista")
            
            
        } catch (error) {
            console.log(error)
        }
    }
    async function deleteSupport(suppId: number){
        try {
            const dev: AxiosResponse<DeviceGet> = await getDeviceBySupportIdReq(suppId)

            const activities: AxiosResponse<ActivityGet[]> = await getActivitiesBySupportIdRequest(suppId)
            const productsFound: AxiosResponse<ProductDetailGet[]> = await getProductDetailBySupportRequest(suppId)

            if(activities.data.length > 0 || productsFound.data.length > 0){
                alert("se han realizado transacciones")
                return
            }
            await deleteDeviceRequest(dev.data.id as number)
            await deleteSupportRequest(suppId)

            listSupport()
            showConfirmModal(false)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <appContext.Provider value={{
            isFormModalOpen, showFormModal, showConfirmModal, isShowConfirmModal, setGlobalTitleFn, globalTitle,showDetailModal, isShowDetailModal, isFilterSidebarOpen, setFilterSidebar,
            userUpdateMode, setUserUpdate, isUserUpdMode, userModify, addUserDoc, userDoc, showRSidebar, setShowRSidebar,
            customers, customerList, iscustUpdMode, customerModify, setCustUpdate, setCustUpdateMode, deleteCustomer, customerListByFilter, addCustomerDoc, customerDoc, getCustomerByParams,
            suppliers, supplierList, isSupUpdMode, supplierModify, setSupUpddateMode, setSupplierUpdate, deleteSupplier, supplierListByFilter,
            products, productList, isProductUpdMode, productModify, setProductModify, setProductUpdateMode, setProductUpdate, deleteProduct, productListByFilter, getProductsByParams,
            productDetails, changeProductAmount, handleAddProduct, deleteProductDetail, total, sumTotal, createSale,
            formTitle, setModalFormTitle, saleButtonDisable,
            listSupportType, deleteSupportType, setSupportTypeUpdate, setSupportTypeUpdateMode, supportTypes, supportTypeUpdMode, supportTypeModify, listSupportTypeByFilter, deleteSupport, listSupportTypeByParams,
            listSupport, supports, supportUpdMode, supportModify, setSupportsUpdMode, setSupportModify,
            suppDetailConcel, handleAddSuppProduct, supProDetail, resetSuppProduct, resetSuppProductFromDB, sumSupTotal, supTotal,registerSupportDetails, getSupportDetials, setSupportCurrent, supportCurrent, activities, addActivitesToList, resetActivityFromCache, resetActivityFromDB
        }}>
            {children}
        </appContext.Provider>
    )
}