import "./sidebar.scss"

const Sidebar = () => {
  return (
    <div className="sidebar">
        <div className="top">
            <span className="logo">logo</span>
        </div>
        <div className="center">
            <ul>
                <li>
                    <img src={'src/logos/Bar Chart.png'} alt="dashboard_pic"/>
                    <span>Dashboard</span>
                </li>
                <li>
                    <span>Forms</span>
                </li>
            </ul>
        </div>
        <div className="bottom">Logout</div>
    </div>
  )
}

export default Sidebar