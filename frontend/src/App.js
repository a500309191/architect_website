import './App.css';
import { Header } from './components/Header';
import { Main } from './components/Main';
import { HousesListPage } from './components/HousesListPage';
import { House } from './components/House';
import { Routes, Route } from "react-router-dom";

function App() {
    return (
        <div className="app">
            <div className="header">
                <Header />
            </div>
            <div className="content">
                <Routes>

                    <Route path='/' element={<Main/>}/>
                    <Route path='/houses' element={<HousesListPage/>}/>
                    <Route path='/houses/:model_name' element={<House />}/>

                </Routes>
            </div>
        </div>
    );
}

export default App;

