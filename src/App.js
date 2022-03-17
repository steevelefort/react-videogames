import './App.css';
import Home from './pages/Home';
import Details from './pages/Details';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/details/:slug" element={<Details/>} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
