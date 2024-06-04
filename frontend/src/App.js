import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import GlobalState from "./context/globalContext"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Memory from "./pages/Memory"

function App() {

  return (
    <div className="App">
      <GlobalState>
        <BrowserRouter>
          <Navbar />
          <div className="pages">
            <Routes>
              <Route path='/' element={< Home />} />
              <Route path='/:id' element={< Memory />} />
            </Routes>
          </div>
        </BrowserRouter>
        </GlobalState>
    </div>
  );
}

export default App;
