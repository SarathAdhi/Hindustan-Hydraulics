import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Supply from "../../components/supply/Supply" 
import "./new.scss"

const New = () => {
  return (
    <div className="home">
        <Sidebar/>
        <div className="homeContainer">
          <Navbar/>
          <Supply/>
        </div>
    </div>
  )
}

export default New