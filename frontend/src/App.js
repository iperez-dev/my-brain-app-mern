import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { useAuthContext } from './hooks/useAuthContext';
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Memory from "./pages/Memory"
import Login from "./pages/Login"
import Signup from "./pages/Signup"

function App() {
  const { user } = useAuthContext()

  return (
    <div className="App">
      {/* <AuthContextProvider> */}
        {/* <GlobalState> */}
          <BrowserRouter>
            <Navbar />
            <div className="pages">
              <Routes>
                <Route path='/' element={user ? < Home /> : < Navigate to="/login" />} />
                <Route path='/:id' element={< Memory />} />
                <Route path="/signup" element={!user ? < Signup /> : < Navigate to="/" />}></Route>
                <Route path="/login" element={!user ? < Login /> : < Navigate to="/" />}></Route>
              </Routes>
            </div>
          </BrowserRouter>
        {/* </GlobalState> */}
      {/* </AuthContextProvider> */}
    </div>
  );
}

export default App;
