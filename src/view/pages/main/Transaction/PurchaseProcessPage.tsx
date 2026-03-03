import { useEffect, useState } from "react"
import { AppContextIn, DropdownItem } from "../../../../Interface/InApp"
import { useAppContext } from "../../../../context/AppContext"
import PurchaseDates from "../../../../components/purchase/PurchaseDates"
import PurchaseProductDetail from "../../../../components/purchase/PurchaseProductDetail"
import { Button } from "primereact/button"
import { useNavigate } from "react-router-dom"
import FormModal from "../../../../components/Modal/FormModal"
import PurchaseProductoForm from "../../../../components/form/PurchaseProductoForm"
import PurchaseProductFormModal from "../../../../components/Modal/search/PurchaseModal"
import PurchaseProductSearch from "../../../../components/Modal/search/PurchaseProductSearch"
import FinishPurchaseModal from "../../../../components/Modal/confirm/FinishPurchaseModal"
import { deletePurchaseProductRequest, deletePurchaseRequest, getPurchaseProductByPurchaseRequequest } from "../../../../services/purchase.service"
import { PurchaseProductGet } from "../../../../Interface/purchase"
import { AxiosResponse } from "axios"
import DeletePurchateModal from "../../../../components/Modal/confirm/DeletePurchateModal"

function PurchaseProcessPage() {
  const context = useAppContext() as AppContextIn
  const navigate = useNavigate()
  const [productSearchModal, setProSerachModal] = useState(false)
  const [productFormModal, setProFormModal] = useState(false)
  const [purchaseObj, setPurchaseObj] = useState<{factura: string, supplier:DropdownItem, date: Date} | null>()
  const [btnSaveDisabled, setBtnSaveDisabled] = useState(true)
  const [btnFinishDisabled, setBtnFinishDisabled] = useState(true)
  const [deletePurchaseModal, setDeletePurchaseModal] = useState(false)


  

  function hanldeModal(val: boolean){
    setDeletePurchaseModal(val)
  }
  function addPurchate(obj: {factura: string, supplier:DropdownItem, date: Date}){
    setPurchaseObj(obj)
  }

  const showProSearchModal= (val: boolean) => setProSerachModal(val)
  const newProModal = (val: boolean) => setProFormModal(val)

  async function savePurchase(){
    if(purchaseObj){

      await context.createPurchaese({
        createAt: new Date(purchaseObj.date),
        factura: purchaseObj.factura,
        supplier: {id: parseInt(purchaseObj.supplier.code)},
        editable: "EDICION",
        total: 0
      })
    }
    context.showToasSuccess("compra guardada")
    cancel()
  }

  async function finishThisPurchase(){
    if(purchaseObj){
      await context.finishPurchase({
      createAt: new Date(purchaseObj.date),
        factura: purchaseObj.factura,
        supplier: {id: parseInt(purchaseObj.supplier.code)},
        editable: "FINALIZADO",
        total: 0
      })
      cancel()
      context.showConfirmModal(false)
      context.showToasSuccess("Compra finalizada")
    }
  }
  async function deleteThisPurchase(){
    
    if(!context.purchaseProMode) return 

    const purchaseId: number = context.purchaseModify?.id as number
    try{
      const products: AxiosResponse<PurchaseProductGet[]> = await getPurchaseProductByPurchaseRequequest(purchaseId)

      for (let pro of products.data ) {
        await deletePurchaseProductRequest(pro.id as number)
      }

      await deletePurchaseRequest(purchaseId)
      context.listPurchase()
      cancel()
      context.showToasSuccess("Compra eliminada")
    } catch (error) {
      console.log(error)
    }
  }

  function cancel(){
    navigate("/Compra")
    context.handlePurchaseModity(null)
    context.handlePurchaseProductList(null)
    context.handlePurchaseModity(null)
    setPurchaseObj(null)
  }
  


  useEffect(() => {
    context.setGlobalTitleFn("Datos de la compra")
    context.handlePurchaseProductMode(false)
  }, [])

  useEffect(() => {
    if(purchaseObj?.date && purchaseObj?.factura && purchaseObj?.supplier){
      setBtnSaveDisabled(false)
    } else {
      setBtnSaveDisabled(true)
    }
  }, [purchaseObj])


  useEffect(() => {
    if(context.purchaseModify){
      setBtnFinishDisabled(false)
    }
    if(context.purchaseModify?.editable == "FINALIZADO"){
      setBtnSaveDisabled(true)
      setBtnFinishDisabled(true)
    }
  }, [context.purchaseModify])




  return (
    <div className="main-con">
      <div className="support-header flex" style={{marginTop:"10px"}}>
        <Button
          style={{ marginRight: "10px", width:"150px"}}
          label="Cancelar"
          severity="secondary"
          onClick={() => cancel()}
          size='small'
        />
        <Button
          style={{ marginRight: "10px", width:"150px"}}
          label="Eliminar"
          severity="danger"
          disabled={btnFinishDisabled}
          onClick={() => hanldeModal(true)}
          size='small'
        />
        <Button
          style={{ marginRight: "10px", width:"150px"}}
          label="Guardar"
          disabled={btnSaveDisabled}
          severity="info"
          onClick={savePurchase}
          size='small'
        />
        <Button
          style={{ marginRight: "10px", width:"150px"}}
          label="Finalizar"
          severity="success"
          disabled={btnFinishDisabled}
          onClick={() => context.showConfirmModal(true)}
          size='small'
        />
      </div>

      <PurchaseDates 
        addPurchate={addPurchate}/>
      <PurchaseProductDetail/>

      <FormModal>
        <PurchaseProductoForm 
          newProductModal={newProModal}
          modalShow={showProSearchModal}/>
      </FormModal>
      <PurchaseProductSearch
        showthisModal={productSearchModal}
        setThisModal={showProSearchModal}
      />
      <PurchaseProductFormModal
        showthisModal={productFormModal}
        setThisModal={newProModal}
      />
      <FinishPurchaseModal
        finishThisPurchase={finishThisPurchase}
      />
      <DeletePurchateModal
        deletePurchase={deleteThisPurchase}
        setShowModal={hanldeModal}
        showModal={deletePurchaseModal}
      />

    </div>
  )
}

export default PurchaseProcessPage