import Home from "./pages/home/Home"
import Login from "./pages/auth/Login"
import New from "./pages/new/New"
//import Supply from "./pages/supply/Supply"
import MainFrame from "./pages/mainform/Mainform"
import Order from "./components/sforms/Order"
import Billing from "./components/sforms/Billing"
import Security from  "./components/sforms/Security"
import Store from "./components/sforms/Store"
import Counter from "./components/sforms/Counter"
import Inframe from "./pages/informs/Informs"
import Istore from "./components/iforms/Store"
import Isecurity from "./components/iforms/Security"
import Imaterial from "./components/iforms/Material"
import { Route, Routes, BrowserRouter} from "react-router-dom";


function App() {
  return (
    <div className='App'>
      {<BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home/>} />
            <Route path = "new" element={<New/>} />
            <Route path = "login" element={<Login/>} />
            <Route path = "sup_main" element={<MainFrame/>} />
            <Route path = "sup_main/supply_billing" element = {<Billing/>} />
            <Route path = "sup_main/supply_security" element = {<Security/>} />
            <Route path = "sup_main/supply_store" element = {<Store/>} />
            <Route path = "sup_main/supply_counter" element = {<Counter/>} />
            <Route path = "sup_main/supply_order" element = {<Order/>} />
            <Route path = "in_main" element = {<Inframe/>} />
            <Route path = "in_main/inward_store" element = {<Istore/>} />
            <Route path = "in_main/inward_security" element = {<Isecurity/>} />
            <Route path = "in_main/inward_material" element = {<Imaterial/>} />
          </Route>
        </Routes>
      </BrowserRouter> 
      }
    </div>
  );
}

export default App;
