import "./sidebar.scss"

const Sidebar = () => {
  return (
    <div className="sidebar">

        <div className="top">
            <img src={require('./../logos/helper.png')} alt="enter" className="logo"/>
        </div>

        <div className="center">
            <ul>
                <span className="dashboard">Dashboard</span>
                <li>
                    <img src={require('./../logos/Enter.png')} alt="enter" className="icon"/>
                    <a href="/"> Inward</a>
                </li>
                <li>
                    <img src={require('./../logos/Shopping Cart.png')} alt="enter" className="icon"/>
                    <a href="/new"> Supply</a>
                </li>
                <br />

                <span className="forms">Forms</span>
                <li>
                    <img src={require('./../logos/Enter.png')} alt="enter" className="icon"/>
                    <a href="/in_main"> Inward</a>
                </li>
                <li>
                    <img src={require('./../logos/Shopping Cart.png')} alt="enter" className="icon"/>
                    <a href="/sup_main"> Supply</a>
                </li>
            </ul>

        </div>
        <div className="bottom">
            <span className="logout">Logout</span>
            
        </div>
    </div>
  )
}

export default Sidebar