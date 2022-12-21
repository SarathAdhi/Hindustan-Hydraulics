import Sidebar from "../../components/sidebar/Sidebar"
import "./home.scss"

const Home = () => {
  return (
    <div className="home">
        <Sidebar/>
        <div className="homeContainer">container_1</div>
    </div>
  )
}

export default Home