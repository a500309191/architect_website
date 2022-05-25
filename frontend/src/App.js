import './App.css';
import { HousesList } from './components/HousesList'
import { House } from './components/House'
import { TestComponent } from './components/TestComponent'
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
        <Routes>
            <Route path='/' element={
                <HousesList
                    houses_url = 'http://127.0.0.1:8000/api/house/'
                    images_url = 'http://127.0.0.1:8000/api/image/'
                />
            }/>
            <Route path='/House/:id' element={<House />}/>
        </Routes>
    </div>
  );
}

export default App;
