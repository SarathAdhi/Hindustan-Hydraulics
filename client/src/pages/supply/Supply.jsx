import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Store from "../../components/sforms/Store"
import "./supply.scss"
import { Route } from "react-router-dom"


const Supply = () => {

  return (
    <div className="supply">
        <Sidebar/>
        <div className="homeContainer">  
          <Navbar/>
            <a href = ""><button class="button" >Store Entry</button></a>
            <button class="button" >Billing Entry</button>
            <button class="button" >Counter Entry</button>
            <button class="button" >Security Entry</button>
            
            <div id="dark"></div>
            <div id="Register">
              <div className="form-class">
                <button id="button-x1">
                  <div id="x-icon"></div>
                </button>
                <h2>Register</h2>
                <form>
                  <input type="text" placeholder="First Name"/> 
                  <input type="text" placeholder="Last Name"/> 
                  <input type="email" placeholder="Email ID"/> 
                  <input type="password" placeholder="Password"/> 
                  <input type="password" placeholder="Password"/> 
                </form>
              </div>
            </div>

        </div>
    </div>
  )
}

export default Supply