import Home from "./pages/home/Home"
import Login from "./pages/login/Login"
//import New from "./pages/new/New"
//import Single from "./pages/single/Single"
import { Route, Routes, BrowserRouter} from "react-router-dom";
//import Inward from "./components/inward/Inward";

function App() {
  return (
    <div className='App'>
      {<BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home/>} />
            <Route path = "login" element={<Login/>} />
          </Route>
        </Routes>
      </BrowserRouter> 
      }
    </div>
  );
}

export default App;
