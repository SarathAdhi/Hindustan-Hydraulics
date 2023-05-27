import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import {Link} from "react-router-dom"
import axios from "axios";
import "./store.scss"

const store = async (form_data) => {
  var data = JSON.stringify({
    "store": form_data.store,
    "purchase_order_no": form_data.purchase_order_no,
    "supply": form_data.supply,
    "ready": form_data.ready,
    "ready_to_bill": form_data.ready_to_bill
  });

  var config = {
    method: 'put',
    url: 'http://lab.zuvatech.com:3000/',
    headers: { 
      'Authorization': 'Bearer ', 
      'Content-Type': 'application/json'
    },
    data : data
  };

  axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});

}

const handleSubmit = (e) => {

  e.preventDefault();
  store();
  console.log("submit works");
}



const Store = () => {
  return (
    <div className="store">
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
          <form onSubmit={handleSubmit}>
            <div className="STORE">
              <h4 className="form-titles">Store</h4>
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

                  <select name="store" id="dropdown">
                    <option value="default" selected>Select an Option</option>
                    <option value="part-supply">Part Supply</option>
                    <option value="full-supply">Full Supply</option>
                  </select>
            </div>
            <br /> 

            <div className="DOCNO">
              <h4 className="form-titles">DOC No.</h4>
                  <label> 
                    <input type="date" className="date-input" placeholder="Enter the Date"/> 
                  </label>                       

                    <select name="docno" id="dropdown">
                      <option value="default" selected>Select an Option</option>
                      <option value="sono">SO No.</option>
                      <option value="proforma">Proforma No.</option>
                      <option value="dcno">DC No.</option>
                      <option value="uhpdc">UHP DC No.</option>
                      <option value="samdc">SAM DC No.</option>
                    </select>

                    <label> 
                      <input className="nml-input" type="number" placeholder="Enter the DOC No."/> 
                    </label> 
                      
            </div>

            <div className="PONO">
            <h4 className="form-titles">PO No.</h4>
                    <label> 
                      <input className="nml-input" type="number" placeholder="Enter the DOC No."/> 
                    </label>    
                
                  <label> 
                    <input type="number" className="nml-input" placeholder="Enter the PO No."/> 
                  </label>                       
            </div>

            <div className="CUSTOMER">
              <h4 className="form-titles">Customer</h4>

              <label> 
                <input type="string" className="nml-input" placeholder="Enter the Customer Name"/> 
              </label>                       
            </div>

            <div className="READY">
                <label className="store-billbutton">
                  <input className="store-billbutton-input" type="checkbox"/> 
                    Ready
                </label>
                <label className="store-billbutton">
                  <input className="store-billbutton-input" type="checkbox"/> 
                    Ready to bill
                </label>
            </div>

            <div className="SUBMIT">
              <button className="sbutton" type="submit">
                Submit
              </button>
            </div>
            </form>
          </div>
        </div>
    </div>
  )
}

export default Store