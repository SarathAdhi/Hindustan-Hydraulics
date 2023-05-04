import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import { Link} from 'react-router-dom'
import "./stores.scss"

const Stores = () => {
  return (
    <div className="store">
        <Sidebar/>
        <div className="homeContainer">
          <Navbar/>
          <div className="courses-nav">
            <button className="ibutton">
              <Link to="/in_main/inward_material">Material</Link>
            </button>
            <button className="ibutton">
              <Link to="/in_main/inward_security">Security</Link>
            </button>
            <button className="ibutton">
              <Link to="/in_main/inward_store">Store</Link>
            </button>
          </div>
          
          <div className="main-box">
            <form>
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
                  <label className="store-cb">
                    <input type="checkbox"/> 
                    TC Counter
                  </label>
                  <label className="store-cb">
                    <input type="checkbox"/> 
                    LC Counter
                  </label>

                  <select name="store" id="dropdown">
                    <option value="default" selected>Select an Option</option>
                    <option value="recieved">Recieved</option>
                    <option value="not-recieved">Not Recieved</option>
                  </select>
            </div>

            <div className="CUSTOMER">
              <h4 className="form-titles">Customer</h4>
                <label> 
                <input type="string" className="nml-input" placeholder="Enter the Customer Name"/> 
               </label>                       
            </div>

            <div className="DOCNO-IN">

            <h4 className="form-titles">DOC No. Inward</h4>
                <label> 
                  <input type="date" className="date-input" placeholder="Enter the Date"/> 
                </label>                       

                <select name="docno" id="dropdown">
                  <option value="default" selected>Select an Option</option>
                  <option value="billno">Bill No.</option>
                  <option value="dcno">DC No.</option>
                  <option value="noteno">Note No.</option>
                  <option value="uhpdc">UHP DC No.</option>
                  <option value="samdc">SAM DC No.</option>
                  <option value="ret-inv-no">Return Invoice No.</option>
                  <option value="ser-mat-no">Service Materials No.</option>
                </select>

                <label> 
                  <input className="nml-input" type="number" placeholder="Enter the DOC No."/> 
                </label>                 
            </div>

            <div className="MATERIALS">
              <h4 className="form-titles">Materials Recieved</h4> 
                <select name="materials" id="dropdown">
                  <option value="default" selected>Select an Option</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
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

export default Stores