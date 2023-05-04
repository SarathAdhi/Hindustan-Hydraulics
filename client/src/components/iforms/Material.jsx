import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import { Link} from 'react-router-dom'
import "./material.scss"

const Material = () => {
  return (
    <div className="material">
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

                    <div className="DOCNO">
                        <h4 className="form-titles">DOC No.</h4>
                              <label> 
                                <input className="nml-input" type="number" placeholder="Enter the DOC No."/> 
                              </label>       
                    </div>

                    <div className="CUSTOMER">
                      <h4 className="form-titles">Customer</h4>
                      <label> 
                        <input type="string" className="nml-input" placeholder="Enter the Customer Name"/> 
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

export default Material