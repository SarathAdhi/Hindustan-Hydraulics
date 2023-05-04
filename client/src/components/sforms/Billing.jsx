import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import {Link} from "react-router-dom"
import "./billing.scss"

const Billing = () => {
  return (
    <div className="billing">
        <Sidebar/>
        <div className="homeContainer">
          <Navbar/>
          <div className="courses-nav">
          <button className="sbutton">
              <Link to="/sup_main/supply_order">Order</Link>
            </button>
            <button className="sbutton">
              <Link to="/sup_main/supply_store">Store</Link>
            </button>
            <button className="sbutton">
              <Link to="/sup_main/supply_billing">Billing</Link>
            </button>
            <button className="sbutton">
              <Link to="/sup_main/supply_counter">Counter</Link>
            </button>
            <button className="sbutton">
              <Link to="/sup_main/supply_security">Security</Link> 
            </button>
	        </div>
          
          <div className="main-box">
            
            <div className="BILLING">
                <div className="ORDERSTATUS">
                  <h4 className="form-titles">Order Status</h4>
                    <select name="store" id="dropdown">
                      <option value="default" selected>Select an Option</option>
                      <option value="part-supply">Part Supply</option>
                      <option value="full-supply">Full Supply</option>
                    </select>
                </div>

                <div className="BILLNO">
                  <h4 className="form-titles">Bill No.</h4>
                      <label> 
                        <input type="date" className="date-input" placeholder="Enter the Date"/> 
                      </label>                       
                      <label> 
                        <input className="nml-input" type="number" placeholder="Enter the Bill No."/> 
                      </label> 
                </div>

                <div className="ROUTING">
                    <h4 className="form-titles">Routing</h4>
                        <select name="store" id="dropdown">
                          <option value="default" selected>Select an Option</option>
                          <option value="transport">Transport</option>
                          <option value="travel">Travel</option>
                          <option value="courier">Courier</option>
                          <option value="hand-delivery">Hand Delivery</option>
                          <option value="auto">Auto</option>
                          <option value="uhp">From UHP</option>
                          <option value="sam">From SAM</option>
                          <option value="branch-office">Branch Office</option>
                        </select>
                </div>

                <div className="BILLREADY">
                    <label className="store-billbutton">
                      <input className="store-billbutton-input" type="checkbox"/> 
                        Bill Ready
                    </label>
                </div>

                <div className="SUBMIT">
                  <button className="sbutton">
                    Submit
                  </button>
                </div>
          </div>
     </div>
    </div>
  </div>
  )
}

export default Billing