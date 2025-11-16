import { FaRegUser } from "react-icons/fa";
import { AiOutlineProduct } from "react-icons/ai";
import { LuUsers } from "react-icons/lu";
import { BsCurrencyDollar } from "react-icons/bs";
import { useEffect, useState } from "react";
import { customerListRequest } from "../../services/Customer.service";
import type { Customer, ProductGet } from "../../Interface/InApp";
import type { AxiosResponse } from "axios";
import { getProductRequest } from "../../services/Product.service";
import type { SaleGet } from "../../Interface/SalesInterfaces";
import { getSaleByDatesRequest } from "../../services/Sale.service";
import { getDateDaysAgo, toDay } from "../../utils/DateUtils";
import type { SupportCustomGet } from "../../Interface/SupportIn";
import { getSupportsCustomRequest } from "../../services/Support.Service";
import LineChart from "../reusable/LineChart";
import DeviceAmountChart from "./DeviceAmountChart";


function Dashboard() {

  interface DashboardEntityAmount {
    first: number
    second: number
  }

  const [customerAmount, setCustomerAmount] = useState<DashboardEntityAmount>({ first: 0, second: 0 })
  const [productsAmount, setProductsAmount] = useState<DashboardEntityAmount>({ first: 0, second: 0 })
  const [salesAmount, setSalesAmount] = useState<DashboardEntityAmount>({ first: 0, second: 0 })
  const [supportAmount, setSupportsAmount] = useState<DashboardEntityAmount>({ first: 0, second: 0 })





  async function gettingDatas() {
    const cus: AxiosResponse<Customer[]> = await customerListRequest()
    const cus1 = cus.data.length
    const cus2 = cus.data.filter(data => data.status == true).length
    setCustomerAmount({ first: cus1, second: cus2 })

    const pro: AxiosResponse<ProductGet[]> = await getProductRequest()
    const pro1 = pro.data.filter(data => data.stock > 0).length
    const pro2 = pro.data.length
    setProductsAmount({ first: pro1, second: pro2 })

    toDay()
    const saleRes: AxiosResponse<SaleGet[]> = await getSaleByDatesRequest({ date1: toDay().fechaA01, date2: toDay().fechaActual })
    const sal1 = saleRes.data.length
    const getDate = getDateDaysAgo(30);
    const sal2: AxiosResponse<SaleGet[]> = await getSaleByDatesRequest({ date1: getDate.fechaPasada, date2: getDate.fechaHoy })
    setSalesAmount({
      first: sal1,
      second: sal2.data.length
    })

    const sup: AxiosResponse<SupportCustomGet[]> = await getSupportsCustomRequest()
    const sup1 = sup.data.filter(sup => sup.status == "ACTIVO").length
    const sup2 = sup.data.filter(sup => sup.status == "FINALIZADO").length
    setSupportsAmount({
      first: sup1,
      second: sup2
    })
  }






  useEffect(() => {
    gettingDatas()
  }, [])



  return (
    <div className="sidebar-body">
      <section className="sidebar-targets">
        {/* client */}
        <div className="target dash-target target-cust">
          <div className="dash-target-up">
            <div className="dash-target-icon target-cust-icon">
              <a><FaRegUser /></a>
            </div>
            <h3 style={{ marginLeft: "10px", color: "#34abcf" }}>Clientes</h3>
          </div>

          <div className="dash-target-down">
            <div className="dash-target-report">
              <div style={{ color: "#383636" }}>
                <p style={{ fontSize: "26px" }}>{customerAmount.second}</p>
                <p>Activos</p>
              </div>
            </div>
            <div className="dash-target-report" style={{ borderLeft: "1px solid #ccc" }}>
              <div style={{ color: "#383636" }}>
                <p style={{ fontSize: "26px" }}>{customerAmount.first}</p>
                <p>Total</p>
              </div>
            </div>
          </div>
        </div>

        <div className="target dash-target target-pro">
          <div className="dash-target-up">
            <div className="dash-target-icon target-pro-icon">
              <a><AiOutlineProduct /></a>
            </div>
            <h3 style={{ marginLeft: "10px", color: "#c0515f" }}>Productos</h3>
          </div>

          <div className="dash-target-down">
            <div className="dash-target-report">
              <div style={{ color: "#383636" }}>
                <p style={{ fontSize: "26px" }}>{productsAmount.first}</p>
                <p>Stock</p>
              </div>
            </div>
            <div className="dash-target-report" style={{ borderLeft: "1px solid #ccc" }}>
              <div style={{ color: "#383636" }}>
                <p style={{ fontSize: "26px" }}>{productsAmount.second}</p>
                <p>Total</p>
              </div>
            </div>
          </div>
        </div>

        <div className="target dash-target target-sales">
          <div className="dash-target-up">
            <div className="dash-target-icon target-sales-icon">
              <a style={{ fontSize: "18px" }}><BsCurrencyDollar /></a>
            </div>
            <h3 style={{ marginLeft: "10px", color: "#69d88a" }}>Ventas</h3>
          </div>

          <div className="dash-target-down">
            <div className="dash-target-report">
              <div style={{ color: "#383636" }}>
                <p style={{ fontSize: "26px" }}>{salesAmount.first}</p>
                <p>Hoy</p>
              </div>
            </div>
            <div className="dash-target-report" style={{ borderLeft: "1px solid #ccc" }}>
              <div style={{ color: "#383636" }}>
                <p style={{ fontSize: "26px" }}>{salesAmount.second}</p>
                <p>Total</p>
              </div>
            </div>
          </div>
        </div>

        <div className="target dash-target target-tec">
          <div className="dash-target-up">
            <div className="dash-target-icon target-tec-icon">
              <a><LuUsers /></a>
            </div>
            <h3 style={{ marginLeft: "10px", color: "#f08e4c" }}>Soportes</h3>
          </div>

          <div className="dash-target-down">
            <div className="dash-target-report">
              <div style={{ color: "#383636" }}>
                <p style={{ fontSize: "26px" }}>{supportAmount.first}</p>
                <p>Activos</p>
              </div>
            </div>
            <div className="dash-target-report" style={{ borderLeft: "1px solid #ccc" }}>
              <div style={{ color: "#383636" }}>
                <p style={{ fontSize: "26px" }}>{supportAmount.second}</p>
                <p>Finalizados</p>
              </div>
            </div>
          </div></div>
      </section>


      <section className="sidebar-data">
        <div className="target" style={{ color: "#383636" }}>
          <h4>Categorías de dispositivos con mas soportes finalizados en el año</h4>
          <DeviceAmountChart/>
        </div>

        <div className="target" style={{ color: "#383636" }}>
          <h4>Ingresos mensuales del año</h4>
          <LineChart/>
        </div>
      </section>
    </div>
  )
}

export default Dashboard