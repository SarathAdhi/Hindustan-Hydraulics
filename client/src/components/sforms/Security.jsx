import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import {Link} from "react-router-dom"
import "./security.scss"

const Security = () => {
  return (
    <div className="security">
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
              
            <div className="SECURITY">
              <h4 className="form-titles">Book Register No.</h4>
                      <label> 
                        <input className="nml-input" type="number" placeholder="Enter the Book Register No."/> 
                      </label>               
            </div>
            
            <div className="READY">
                  <label className="store-secbutton">
                    <input className="store-secbutton-input" type="checkbox"/> 
                      Ready to Go Out
                  </label>
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

export default Security