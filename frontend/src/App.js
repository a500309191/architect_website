import './App.css';
import { HousesList } from './components/HousesList'
import { House } from './components/House'
import { Images } from './components/Images'
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
        <Routes>
            <Route path='/' element={
                <HousesList
                    params_url = 'http://127.0.0.1:8000/api/houselist/'
                    images_url = 'http://127.0.0.1:8000/api/imagelist/'
                />
            }/>
            <Route path='/House' element={<House />}/>
        </Routes>
    </div>
  );
}

export default App;
