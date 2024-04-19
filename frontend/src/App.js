// App.js
import { BrowserRouter, Routes, Route } from "react-router-dom";
// BrowserRouter => Obaluje celé routování
// Routes => Obaluje jednotlivé routy
// Route => Routy 

// Stránky a komponenty
import Home from "./pages/Home"
import Navbar from "./components/Navbar"

function App() {
  return (
    <div className="App">
        <BrowserRouter>

        <Navbar />
        
          <div className="pages">
            <Routes>
              <Route 
                path="/"
                element={<Home />}
              />
            </Routes>
          </div>
        </BrowserRouter>
    </div>
  );
}

export default App;