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
                    <select name="docno" id="dropdown">
                      <option value="default" selected>Select an Option</option>
                      <option value="part-supply">SO No.</option>
                      <option value="full-supply">Proforma No.</option>
                      <option value="full-supply">DC No.</option>
                      <option value="full-supply">UHP DC No.</option>
                      <option value="full-supply">SAM DC No.</option>
                    </select>
                  </form>

                  <form>
                    <label> 
                      Enter the DOC No.
                      <input type="number"/> 
                    </label> 
                      
                  </form>
            </div>

            <div className="PONO">
            <h4 className="form-titles">PO No.</h4>

            <form>
              <label> 
                Enter the PO No.
                <input type="number"/> 
              </label>                       
            </form>
            </div>

            <div className="CUSTOMER">
              <h4 className="form-titles">Customer</h4>

            <form>
              <label> 
                Enter the customer name. 
                <input type="string"/> 
              </label>                       
            </form>
            </div>

            <div className="READY">
            <form>
                <label className="store-cb">
                  <input className="store-cb-input" type="checkbox"/> 
                    Ready
                </label>
                <br />
                <label className="store-cb">
                  <input type="checkbox"/> 
                    Ready to bill
                </label>
            </form>
            </div>

            <div className="SUBMIT">
              <button className="sbutton">
                Billing
              </button>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Store