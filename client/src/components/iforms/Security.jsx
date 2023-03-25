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
              <Link to="/in_main/inward_security">Security</Link>
            </button>
            <button className="ibutton">
              <Link to="/in_main/inward_store">Store</Link>
            </button>
          </div>
          Security
          </div>
    </div>
  )
}

export default Security