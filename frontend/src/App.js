import './App.css';
import { Header } from './components/Header';
import { AboutPage } from './components/AboutPage/AboutPage';
import { HousesListPage } from './components/HousesListPage/HousesListPage';
import { HousePage } from './components/HousesListPage/HousePage/HousePage';
import { PageNotFound } from './components/PageNotFound';
import { Routes, Route } from "react-router-dom";

function App() {
    return (
        <div className="app">
            <div className="header">
                <Header />
            </div>
            <div className="content">
                <Routes>
                    <Route path='/' element={<AboutPage/>}/>
                    <Route path='/houses' element={<HousesListPage/>}/>
                    <Route path='/houses/:model_name' element={<HousePage />}/>
                    <Route path='*' element={<PageNotFound />}/>
                </Routes>
            </div>
        </div>
    );
}

export default App;

