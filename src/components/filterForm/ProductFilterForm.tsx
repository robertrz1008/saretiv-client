import { useEffect, useState } from "react";
import type { DropdownItem, ProductParams } from "../../Interface/InApp"
import { Dropdown, type DropdownChangeEvent } from "primereact/dropdown";
import { Button } from "primereact/button";
import { getCategoryProRequest } from "../../services/category.service";
import { getSupplierRequest } from "../../services/Supplier.service";
import { InputNumber } from "primereact/inputnumber";


interface Prop {
  submitParam: (user: ProductParams) => void
}

function ProductFilterForm(prop: Prop) {

  const [propertyItems, _etPropertyItems] = useState<DropdownItem[]>([
    { label: "Descripción", code: "pro.description" },
    { label: "Precio de compra", code: "pro.entry_price" },
    { label: "Precio de venta", code: "pro.entry_sale" }
  ]);
  
  const [propertySelect, setPropertySelect] = useState<DropdownItem | null>(null)

  const [stockItems, _setStockItems] = useState<DropdownItem[]>([
    { label: "En Stock", code: "y" },
    { label: "Sin Stock", code: "n" },
  ]);
  const [stockSelect, setStockSelect] = useState<DropdownItem | null>(null)

  const [orderItems, _setOrderItems] = useState<DropdownItem[]>([
    { label: "Ascendente A-Z", code: "ASC" },
    { label: "Descendente Z-A", code: "DESC" },
  ]);
  const [orderSelect, setOrderSelect] = useState<DropdownItem | null>(null)

  const [categoryItems, setCategoryItems] = useState<DropdownItem[]>([]);
  const [categorySelect, setcategorySelect] = useState<DropdownItem | null>()

  const [supplierItems, setSupplierItems] = useState<DropdownItem[]>([]);
  const [supplierSelect, setsupplierSelect] = useState<DropdownItem | null>(null)

  const [buyPriceMin, setBuyPriceMin] = useState(0)
  const [buyPriceMax, setBuyPriceMax] = useState(0)

  const [salePriceMin, setSalePriceMin] = useState(0)
  const [salePriceMax, setSalePriceMax] = useState(0)



  async function getItems() {
    const categories = await getCategoryProRequest()
    const suppliers = await getSupplierRequest()
    setCategoryItems(categories.data.map((cat: any) => ({ label: cat.name, code: cat.name })));
    setSupplierItems(suppliers.data.map((sup: any) => ({ label: sup.name, code: sup.name })));
  }

  async function handleSubmit() {
    const params: ProductParams = {
      supplier: supplierSelect?.code as string,
      category: categorySelect?.code as string,
      property: propertySelect?.code as string,
      order: orderSelect?.code as string,
      isStock: stockSelect?.code as string,
      buyMin: buyPriceMin,
      buyMax: buyPriceMax,
      saleMin: salePriceMin,
      saleMax: salePriceMax,
    }
    prop.submitParam(params)
  }




  useEffect(() => {
    getItems();
  }, [])



  return (
    <>
      <h3 style={{ position: "absolute", top: "25px", zIndex: "2" }}>Parametros</h3>
      <div className="filter-form-inputs">
        {/* category */}
        <div style={{ marginTop: "10px" }}>
          <label htmlFor="username" >Categoria</label>
          <Dropdown
            value={categorySelect}
            filter
            variant="filled"
            options={categoryItems}
            onChange={(e: DropdownChangeEvent) => setcategorySelect(e.value)}
            style={{ width: "100%", height: "40px", marginTop: "5px" }}
            // options={roles} 
            placeholder='Seleccionar'
            className="w-full md:w-14rem"
          />
        </div>
        {/* supplier */}
        <div style={{ marginTop: "10px" }}>
          <label htmlFor="username" style={{ marginTop: "10px" }}>Proveedor</label>
          <Dropdown
            variant="filled"
            filter
            options={supplierItems}
            onChange={(e: DropdownChangeEvent) => setsupplierSelect(e.value)}
            style={{ width: "100%", height: "40px", marginTop: "5px" }}
            value={supplierSelect}
            placeholder='Seleccionar'
            className="w-full md:w-14rem"
          />
        </div>
        {/* order by */}
        <div style={{ marginTop: "10px" }}>
          <label htmlFor="username" style={{ marginTop: "10px" }}>Ordenar por</label>
          <Dropdown
            variant="filled"
            options={propertyItems}
            value={propertySelect}
            onChange={(e: DropdownChangeEvent) => setPropertySelect(e.value)}
            style={{ width: "100%", height: "40px", marginTop: "5px" }}
            // key={`customer-${customerSelect?.code || 'empty'}`}
            placeholder='Seleccionar'
            className="w-full md:w-14rem"
          // invalid={customerEmpty}
          />
        </div>
        {/* order */}
        <div style={{ marginTop: "10px" }}>
          <label htmlFor="username" style={{ marginTop: "10px" }}>Orden</label>
          <Dropdown
            variant="filled"
            options={orderItems}
            value={orderSelect}
            onChange={(e: DropdownChangeEvent) => setOrderSelect(e.value)}
            style={{ width: "100%", height: "40px", marginTop: "5px" }}
            // key={`customer-${customerSelect?.code || 'empty'}`}
            placeholder='Seleccionar'
            className="w-full md:w-14rem"
          // invalid={customerEmpty}
          />
        </div>
        {/* stock */}
        <div style={{ marginTop: "10px" }}>
          <label htmlFor="username" style={{ marginTop: "10px" }}>Stock</label>
          <Dropdown
            variant="filled"
            filter
            options={stockItems}
            onChange={(e: DropdownChangeEvent) => setStockSelect(e.value)}
            style={{ width: "100%", height: "40px", marginTop: "5px" }}
            value={stockSelect}
            placeholder='Seleccionar'
            className="w-full md:w-14rem"
          />
        </div>

        <div style={{marginTop: "10px" }}>
          <h4>Precio de Compra</h4>
          <div className='doble-inputs' style={{ display: "flex", justifyContent: "space-between", width: "95%", marginTop: "10px" }}>
          <div style={{ width: "45%", display:"flex", flexDirection:"column"}}>
            <label htmlFor="username" >Minimo    </label>
            <InputNumber
              variant="filled"
              inputId="integeronly"
              
              value={buyPriceMin}
              style={{ marginTop: "5px",width:"100px", height: "40px" }}
              onValueChange={(e) => setBuyPriceMin(e.value as
                number)}
            />
          </div>

          <div style={{ width: "45%"}}>
            <label htmlFor="username" style={{ marginTop: "10px" }}>Maximo</label>
            <InputNumber
              inputId="integeronly"
              value={buyPriceMax}
              variant="filled"
              style={{ marginTop: "5px", width: "100%", height: "40px" }}
              onValueChange={(e) => setBuyPriceMax(e.value as
                number)}
            />
          </div>
          </div>
        </div>
        
        <div style={{marginTop: "10px" }}>
            <h4>Precio de Venta</h4>
           <div className='doble-inputs' style={{ display: "flex", justifyContent: "space-between", width: "95%", marginTop: "5px" }}>
          <div style={{ width: "45%", display:"flex", flexDirection:"column"}}>
            <label htmlFor="username" >Minimo</label>
            <InputNumber
              variant="filled"
              inputId="integeronly"
              
              value={salePriceMin}
              style={{ marginTop: "5px",width:"100px", height: "40px" }}
              onValueChange={(e) => setSalePriceMin(e.value as
                number)}
            />
          </div>

          <div style={{ width: "45%" }}>
            <label htmlFor="username" style={{ marginTop: "10px" }}>Maximo</label>
            <InputNumber
              inputId="integeronly"
              value={salePriceMax}
              variant="filled"
              style={{ marginTop: "5px", width: "100%", height: "40px" }}
              onValueChange={(e) => setSalePriceMax(e.value as
                number)}
            />
          </div>
        </div>
        </div>


        <div style={{ width: "340px", position: "absolute", bottom: "5px", right: "20px" }}>
          <Button
            onClick={handleSubmit}
            label="Filtrar"
            style={{ width: "100%", marginTop: "10px" }}
            size="small"
          />
        </div>
      </div>
    </>
  )
}

export default ProductFilterForm