import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Index from "./pages/Index"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Memory from "./pages/Memory"


function App() {
  return (
    <div className="App">
          <BrowserRouter>
            {/* <Navbar /> */}
            <div className="pages">
              <Routes>
                <Route path='/' element={ < Home /> } />
                <Route path='/:id' element={< Memory />} />
              </Routes>
            </div>
          </BrowserRouter>
    </div>
  );
}

export default App;
