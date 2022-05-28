import './App.css';
import { HousesList } from './components/HousesList'
import { House } from './components/House'
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
        <Routes>
            <Route path='/' element={<HousesList/>}/>
            <Route path='/House/:id' element={<House />}/>
        </Routes>
    </div>
  );
}

export default App;

