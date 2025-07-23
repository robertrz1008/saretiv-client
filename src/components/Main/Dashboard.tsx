import { FaRegUser } from "react-icons/fa";
import { AiOutlineProduct } from "react-icons/ai";
import { LuUsers } from "react-icons/lu";
import { BsCurrencyDollar } from "react-icons/bs";


function Dashboard() {
  return (
    <div className="sidebar-body">
        <section className="sidebar-targets">
          {/* client */}
            <div className="target dash-target target-cust">
              <div className="dash-target-up">
                <div className="dash-target-icon target-cust-icon">
                  <a><FaRegUser/></a>
                </div>
                <h3 style={{marginLeft:"10px", color:"#34abcf"}}>Clientes</h3>
              </div>

              <div className="dash-target-down">
                <div className="dash-target-report">
                  <div style={{color:"#383636"}}>
                      <p style={{fontSize:"26px"}}>40</p>
                      <p>Activos</p>
                  </div>
                </div>
                <div className="dash-target-report" style={{borderLeft:"1px solid #ccc"}}>
                   <div style={{color:"#383636"}}>
                      <p style={{fontSize:"26px"}}>120</p>
                      <p>Total</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="target dash-target target-pro">
              <div className="dash-target-up">
                <div className="dash-target-icon target-pro-icon">
                  <a><AiOutlineProduct/></a>
                </div>
                <h3 style={{marginLeft:"10px", color:"#c0515f"}}>Productos</h3>
              </div>

              <div className="dash-target-down">
                <div className="dash-target-report">
                  <div style={{color:"#383636"}}>
                      <p style={{fontSize:"26px"}}>40</p>
                      <p>Stock</p>
                  </div>
                </div>
                <div className="dash-target-report" style={{borderLeft:"1px solid #ccc"}}>
                   <div style={{color:"#383636"}}>
                      <p style={{fontSize:"26px"}}>120</p>
                      <p>Total</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="target dash-target target-sales">
              <div className="dash-target-up">
                <div className="dash-target-icon target-sales-icon">
                  <a style={{fontSize:"18px"}}><BsCurrencyDollar/></a>
                </div>
                <h3 style={{marginLeft:"10px", color:"#69d88a"}}>Ventas</h3>
              </div>

              <div className="dash-target-down">
                <div className="dash-target-report">
                  <div style={{color:"#383636"}}>
                      <p style={{fontSize:"26px"}}>40</p>
                      <p>Hoy</p>
                  </div>
                </div>
                <div className="dash-target-report" style={{borderLeft:"1px solid #ccc"}}>
                   <div style={{color:"#383636"}}>
                      <p style={{fontSize:"26px"}}>120</p>
                      <p>Total</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="target dash-target target-tec">
              <div className="dash-target-up">
                <div className="dash-target-icon target-tec-icon">
                  <a><LuUsers/></a>
                </div>
                <h3 style={{marginLeft:"10px", color:"#f08e4c"}}>Soportes</h3>
              </div>

              <div className="dash-target-down">
                <div className="dash-target-report">
                  <div style={{color:"#383636"}}>
                      <p style={{fontSize:"26px"}}>40</p>
                      <p>Activos</p>
                  </div>
                </div>
                <div className="dash-target-report" style={{borderLeft:"1px solid #ccc"}}>
                   <div style={{color:"#383636"}}>
                      <p style={{fontSize:"26px"}}>120</p>
                      <p>Total</p>
                  </div>
                </div>
              </div></div>     
        </section>


        <div className="sidebar-data">
            <div className="target"></div>
            <div className="target">
            </div>
        </div>
    </div>
  )
}

export default Dashboard