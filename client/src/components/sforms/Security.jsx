import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import {Link} from "react-router-dom"
import "./security.scss"

const purcorder = () => {
  const ponos = [
    "Random stuff 1",
    "Random stuff 2",
    "Random stuff 3",
    "Random stuff 4"
  ];
  const pono = ponos.map(item => (<option key={item} value={item}>{item}</option>));
  return pono;
}

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
            
            <div className="PONO">
                  <h4 className="form-titles">Select PO No.</h4>
                    <select name="store" id="dropdown">
                      <option value="default" selected>Select an Option</option>
                      {purcorder()}
                    </select>
              </div>
            
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