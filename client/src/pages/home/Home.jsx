import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Inward from "../../components/inward/Inward"
//import Supply from "../../components/supply/Supply"
import "./home.scss"

const Home = () => {
  return (
    <div className="home">
        <Sidebar/>
        <div className="homeContainer">
          <Navbar/>
          <Inward/>
        </div>
    </div>
  )
}

export default Home