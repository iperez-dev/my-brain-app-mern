import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
// import GlobalState from "./context/globalContext"
// import AuthContextProvider from "./context/AuthContext"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Memory from "./pages/Memory"
import Login from "./pages/Login"
import Signup from "./pages/Signup"

function App() {

  return (
    <div className="App">
      {/* <AuthContextProvider> */}
        {/* <GlobalState> */}
          <BrowserRouter>
            <Navbar />
            <div className="pages">
              <Routes>
                <Route path='/' element={< Home />} />
                <Route path='/:id' element={< Memory />} />
                <Route path="/signup" element={< Signup />}></Route>
                <Route path="/login" element={< Login />}></Route>
              </Routes>
            </div>
          </BrowserRouter>
        {/* </GlobalState> */}
      {/* </AuthContextProvider> */}
    </div>
  );
}

export default App;
