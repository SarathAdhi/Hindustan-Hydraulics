import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import { Link} from 'react-router-dom'
import "./informs.scss"

const Informs = () => {
  return (
    <div className="iform">
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
         </div>
    </div>
  )
}

export default Informs