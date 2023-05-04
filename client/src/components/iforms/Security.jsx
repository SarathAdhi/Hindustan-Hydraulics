import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import { Link} from 'react-router-dom'
import "./security.scss"

const Security = () => {
  return (
    <div className="security">
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

            <div className="SECURITY">
              <h4 className="form-titles">Security Inward</h4>
              <form> 
                <select name="materials" id="dropdown">
                  <option value="default" selected>Select an Option</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </form>
            </div>

            <div className="INV_REGNO">
              <h4 className="form-titles">Inward Register No.</h4>
              <form>
                <label> 
                  <input className="nml-input" type="number" placeholder="Enter the Inward Register No."/> 
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

export default Security