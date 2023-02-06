import "./sidebar.scss"

const Sidebar = () => {
  return (
    <div className="sidebar">

        <div className="top">
            <img src={require('./../logos/helper.png')} alt="enter" className="logo"/>
        </div>

        <div className="center">
            <ul>
                <img src={require('./../logos/Bar Chart.png')} alt="enter" className="icons"/>
                <span className="dashboard">Dashboard</span>
                <li>
                    <img src={require('./../logos/Enter.png')} alt="enter" className="icon"/>
                    <a href="./"> Inward</a>
                </li>
                <li>
                    <img src={require('./../logos/Shopping Cart.png')} alt="enter" className="icon"/>
                    <a href="./new"> Supply</a>
                </li>

                <img src={require('./../logos/Google Forms.png')} alt="enter" className="icons"/>
                <span className="forms">Forms</span>
                <li>
                    <img src={require('./../logos/Enter.png')} alt="enter" className="icon"/>
                    <span> Inward</span>
                </li>
                <li>
                    <img src={require('./../logos/Shopping Cart.png')} alt="enter" className="icon"/>
                    <span> Supply</span>
                </li>
            </ul>

        </div>
        <div className="bottom">
            <img src={require('./../logos/Logout.png')} alt="enter" className="logout"/>
            <span>Logout</span>
        </div>
    </div>
  )
}

export default Sidebar