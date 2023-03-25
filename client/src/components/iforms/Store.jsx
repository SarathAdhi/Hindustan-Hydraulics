import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import { Link} from 'react-router-dom'
import "./store.scss"

const Store = () => {
  return (
    <div className="store">
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
          Store
          </div>
    </div>
  )
}

export default Store