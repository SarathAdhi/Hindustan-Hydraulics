import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import {Link} from "react-router-dom"
import "./store.scss"

const Store = () => {
  return (
    <div className="store">
        <Sidebar/>
        <div className="homeContainer">
          <Navbar/>
          <div className="courses-nav">
            <button className="sbutton">
              <Link to="/sup_main/supply_billing">Billing</Link>
            </button>
            <button className="sbutton">
              <Link to="/sup_main/supply_store">Store</Link>
            </button>
            <button className="sbutton">
              <Link to="/sup_main/supply_counter">Counter</Link>
            </button>
            <button className="sbutton">
              <Link to="/sup_main/supply_security">Security</Link> 
            </button>
	        </div>
          
          <div className="main-box">
            
            <div className="STORE">
              <h4 className="form-titles">Store</h4>
                <form>
                  <label className="store-cb">
                    <input className="store-cb-input" type="checkbox"/> 
                    SMC
                  </label>
                  <label className="store-cb">
                    <input type="checkbox"/> 
                    General
                  </label>
                  <label className="store-cb">
                    <input type="checkbox"/> 
                    Instrumentation
                  </label>
                  <label className="store-cb">
                    <input type="checkbox"/> 
                    Hydraulics
                  </label>
                  <label className="store-cb">
                    <input type="checkbox"/> 
                    Hose
                  </label>
                </form>  

                <form>
                  <select name="store" id="dropdown">
                    <option value="default" selected>Select an Option</option>
                    <option value="part-supply">Part Supply</option>
                    <option value="full-supply">Full Supply</option>
                  </select>
                </form>
            </div>
            <br /> 

            <div className="DOCNO">
              <h4 className="form-titles">DOC No.</h4>
                <form>
                  <label> 
                    <input type="date" className="date-input" placeholder="Enter the Date"/> 
                  </label>                       
                </form>
                <form>
                    <select name="docno" id="dropdown">
                      <option value="default" selected>Select an Option</option>
                      <option value="sono">SO No.</option>
                      <option value="proforma">Proforma No.</option>
                      <option value="dcno">DC No.</option>
                      <option value="uhpdc">UHP DC No.</option>
                      <option value="samdc">SAM DC No.</option>
                    </select>
                  </form>

                  <form>
                    <label> 
                      <input className="nml-input" type="number" placeholder="Enter the DOC No."/> 
                    </label> 
                      
                  </form>
            </div>

            <div className="PONO">
            <h4 className="form-titles">PO No.</h4>
                <form>
                    <label> 
                      <input className="nml-input" type="number" placeholder="Enter the DOC No."/> 
                    </label>    
                </form>
                
                <form>
                  <label> 
                    <input type="number" className="nml-input" placeholder="Enter the PO No."/> 
                  </label>                       
                </form>
            </div>

            <div className="CUSTOMER">
              <h4 className="form-titles">Customer</h4>

            <form>
              <label> 
                <input type="string" className="nml-input" placeholder="Enter the Customer Name"/> 
              </label>                       
            </form>
            </div>

            <div className="READY">
            <form>
                <label className="store-billbutton">
                  <input className="store-billbutton-input" type="checkbox"/> 
                    Ready
                </label>
                <label className="store-billbutton">
                  <input className="store-billbutton-input" type="checkbox"/> 
                    Ready to bill
                </label>
            </form>
            </div>

            <div className="SUBMIT">
              <button className="sbutton">
                Submit
              </button>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Store