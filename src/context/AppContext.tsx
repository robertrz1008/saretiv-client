import { useContext, createContext, type ReactNode, useState } from "react";
import type { User } from "../Interface/InAuth";
import type { Customer, Product, ProductGet, ProductPost, Supplier } from "../Interface/InApp";
import { customerListRequest, deleteCustomerRequest, getCustomerByFilterRequest } from "../services/Customer.service";
import { deletesupplierRequest, getSupplierByFilterRequest, getSupplierRequest } from "../services/Supplier.service";
import { deleteProductRequest, getProductByFilterRequest, getProductRequest } from "../services/Product.service";
import type { ProductDetail, ProductDetailPost } from "../Interface/SalesInterfaces";
import { createProDetailRequest, createSaleRequest, updateSaleRequest } from "../services/Sale.service";
const appContext = createContext({})

export const useAppContext =() => {
     const context = useContext(appContext)
        if(!context){
            throw new Error("Context invalid")
        }
        return context
}

interface ContexArg{
    children:ReactNode
}

export const AppContexProvider = ({children}: ContexArg) => {

    const [globalTitle, setGlobalTitle] = useState("");

    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [isUserUpdMode, setUserUpdMode] = useState(false)
    const [userModify, setUserToModify] = useState<User>()
    const [isShowConfirmModal, setShowConfirmModal] = useState(false)
    const [userDoc, setUserDoc] = useState("")

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
    const [total, setTotal]= useState(0)



    function setGlobalTitleFn(title: string) {
        setGlobalTitle(title);
    }
    function showFormModal(val: boolean) {
        setIsFormModalOpen(val);
        if(!val){
            setUserUpdMode(false)
        }
    }
    function showConfirmModal(val: boolean) {
        setShowConfirmModal(val);
    }
     function userUpdateMode(val: boolean){
        setUserUpdMode(val)
    }
    function setUserUpdate(user: User) {
        setUserToModify(user)
    }

     function setCustUpdateMode(val: boolean){
        setCustUpdMode(val)
    }
    function setCustUpdate(cust: Customer) {
        setCustomersModify(cust)
    }
    function addUserDoc(str: string){
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
    async function deleteCustomer(id: number){
        try {
            await deleteCustomerRequest(id)
            showConfirmModal(false)
            customerList()
        } catch (error) {
            console.log(error)
        }
    }
    async function customerListByFilter(str: string){
        if(str == ""){
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
    function addCustomerDoc(str:string){
        setCustomerDoc(str)
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
    async function deleteSupplier(id: number){
        try {
            await deletesupplierRequest(id)
            showConfirmModal(false)
            supplierList()
        } catch (error) {
            alert("it wasn`t possible to delete the supplier")
            console.log(error)
        }
    }
    async function supplierListByFilter(str: string){
        if(str == ""){
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
    async function productList(){
        try {
            const response = await getProductRequest()
            setProducts(response.data)
        } catch (error) {
            console.log(error)
        }
    }
    async function deleteProduct(id: number){
        try {
            await deleteProductRequest(id)
            showConfirmModal(false)
            productList()
        } catch (error) {
            console.log(error)
        }
    }
    async function productListByFilter(str: string){
        if(str == ""){
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
    //sales
    function sumTotal(){
        const newTotal = productDetails.reduce((con, el) => con + el.subtotal, 0)
        setTotal(newTotal)
      }
      function totalZero(){
        setTotal(0)
      }
    function addDetailProductToList( id: number){
        setProductDetails((prevProducts) => {
          return prevProducts.map((product) => {
            return product.id === id
              ? { ...product, subtotal: product.price* product.amount }
              : product;
          });
        });
    }
    function addProductAmout(id: number){
        setProductDetails((detailPro) => {
          return detailPro.map((pro) => {
            return pro.id == id? { ...pro, amount: pro.amount + 1 } : pro
          })
        })
      }
    function changeProductAmount(id: number, amountCurrent: number){

        if(!amountCurrent) return
  
        setProductDetails((detailPro) => {
          return detailPro.map((pro) => {
            return pro.id == id? { ...pro, amount: amountCurrent, subtotal: pro.price * amountCurrent } : pro
          })
        })
        sumTotal()
      }
    
    function handleAddProduct(pro: ProductDetail){
        if(productDetails.some((data) => data.id == pro.id)){
            addProductAmout(pro.id as number);
          } else {
            setProductDetails([...productDetails, pro])
          }
          addDetailProductToList(pro.id as number);
          console.log(productDetails)
    }
    async function deleteProductDetail(id: number){
        const newPd= productDetails.filter(data => data.id != id)
        setProductDetails(newPd)
    }
    async function createSale(){
        if(productDetails.length === 0) return

        try {
            const SaleCreated = await createSaleRequest({
                total:0,
                createAt: new Date()
            })    

            const proDetailToSave: ProductDetailPost[] = productDetails.map((pro) => {
                return {
                    ProductAmount: pro.amount,
                    subtotal: pro.subtotal,
                    product: {id: pro.id as number},
                    sale: {id: SaleCreated.data.id as number}
                }
            })
            await createProDetailRequest(proDetailToSave)

            await updateSaleRequest(SaleCreated.data.id, {total: total});

            setProductDetails([])
            productList()
            totalZero()
        } catch (error) {
            console.log(error)
        }
    }




    return (
        <appContext.Provider value={{
            isFormModalOpen, showFormModal, showConfirmModal, isShowConfirmModal, setGlobalTitleFn, globalTitle,
            userUpdateMode, setUserUpdate, isUserUpdMode, userModify, addUserDoc, userDoc,
            customers, customerList, iscustUpdMode, customerModify, setCustUpdate, setCustUpdateMode,  deleteCustomer, customerListByFilter, addCustomerDoc, customerDoc,
            suppliers, supplierList, isSupUpdMode, supplierModify, setSupUpddateMode, setSupplierUpdate, deleteSupplier, supplierListByFilter,
            products, productList, isProductUpdMode, productModify, setProductModify, setProductUpdateMode, setProductUpdate, deleteProduct, productListByFilter,
            productDetails, changeProductAmount, handleAddProduct, deleteProductDetail,total,sumTotal, createSale,
        }}>
            {children}
        </appContext.Provider>
    )
}