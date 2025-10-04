import { useEffect, useState } from 'react'
import type { AppContextIn } from '../../Interface/InApp'
import { useAppContext } from '../../context/AppContext'

interface Props {
  amountValue: number
  proId: number
}


function ProductAmountTF(prop: Props) {

  const context = useAppContext() as AppContextIn

  const [amount, setAmount] = useState<number>(0)
  const [productStock, setProductStock] = useState<number>(0)

  function getProStock() {
    const ps = context.products.filter(pr => pr.id == prop.proId)
    setProductStock(ps[0].stock)
  }

  function validateValue(v: string) {
    const val: number = Number(v)
    console.log("validating")
    if (val == 0) {
      setAmount(1) // si el valor es 0, se actualiza a 1
      return
    }
    if (val >= productStock) { // si la cantidad ingresada es mayor al stock del producto referenciado
      console.log("valor sobrepasado")
      v = "" + productStock // el valor de la entrada sera igual al stock
    }
    setAmount(Number(v)) // actualiza el estado de la cantidad
  }



  useEffect(() =>{
    setAmount(prop.amountValue)
    getProStock()
  },[])

  // useEffect(() => {
    
  // }, [context.productDetails])

  useEffect(() => {
    context.changeProductAmount(prop.proId, amount)
  }, [amount])








  return (
    <input
      onChange={(e) => validateValue(e.target.value)}
      value={amount}
      type='number'
      style={{ paddingLeft: "5px", width: "45px", height: "30px", marginTop: "5px" }}
    />
  )
}

export default ProductAmountTF