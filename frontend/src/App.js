import './App.css';
import { HousesListPage } from './components/HousesListPage'
import { House } from './components/House'
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
        <Routes>
            <Route path='/' element={<HousesListPage/>}/>
            <Route path='/House/:id' element={<House />}/>
        </Routes>
    </div>
  );
}

export default App;

