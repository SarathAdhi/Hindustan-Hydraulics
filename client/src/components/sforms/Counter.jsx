import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import {Link} from "react-router-dom"
import "./counter.scss"

const Counter = () => {
  return (
    <div className="counter">
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
            <form>

            <div className="COUNTER">
              <h4 className="form-titles">Counter No.</h4>
                    <label> 
                      <input type="date" className="date-input" placeholder="Enter the Date"/> 
                    </label>                       
                  <select name="counter" id="dropdown">
                    <option value="default" selected>Select an Option</option>
                    <option value="tcbill">TC Bill No.</option>
                    <option value="proforma">Proforma No.</option>
                    <option value="dcno">DC No.</option>
                    <option value="tcnote">TC Note No.</option>
                    <option value="lcbill">LC Bill No.</option>
                    <option value="lcnote">LC Note No.</option>
                  </select>
                    <label> 
                      <input className="nml-input" type="number" placeholder="Enter the Counter No."/> 
                    </label>   
            </div>

            <div className="CUSTOMER">
              <h4 className="form-titles">Customer</h4>
                 <label> 
                   <input type="string" className="nml-input" placeholder="Enter the Customer Name"/> 
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
                        </select>
            </div>

            <div className="SUBMIT">
                  <button className="sbutton">
                    Submit
                  </button>
            </div>
            </form>
        </div>
    </div>
  </div>
  )
}

export default Counter