import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Memory from "./pages/Memory"


function App() {
  return (
    <div className="App">
          <BrowserRouter>
            <Navbar />
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
