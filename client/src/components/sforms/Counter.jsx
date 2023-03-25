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
          Counter
        </div>
    </div>
  )
}

export default Counter