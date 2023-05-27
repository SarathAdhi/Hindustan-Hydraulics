import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import {Link} from "react-router-dom"
import "./order.scss"

const Order = () => {
  return (
    <div className="order">
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
            <div className="ORDER">
            
            <div className="PONO">
            <h4 className="form-titles">PO No.</h4>  
                
                  <label> 
                    <input type="number" className="nml-input" placeholder="Enter the PO No."/> 
                  </label>       
                  <label> 
                    <input type="date" className="date-input" placeholder="Enter the Date"/> 
                  </label>                 
            </div>

            <div className="CUSTOMER">
              <h4 className="form-titles">Customer</h4>
              <label> 
                <input type="string" className="nml-input" placeholder="Enter the Customer Name"/> 
              </label>                       
            </div>

            <div className="SUBMIT">
              <button className="sbutton" type="submit">
                Submit
              </button>
            </div>
                
            </div>
            </form>
        </div>
    </div>
  </div>
  )
}

export default Order