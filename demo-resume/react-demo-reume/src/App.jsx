import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import './App.css'
import Layout from './components/Layout';
import CreateProtfolio from './pages/CreateProtfolio';
import HomePage  from './pages/HomePage';
import Section1main1 from './components/templates/template1/Section1main1';
import Porfolio from './pages/Porfolio';


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path='/' element={<Layout/>}>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/about' element={<h1>About</h1>}/>
          <Route path='/contact' element={<h1>Contact</h1>}/>
          <Route path='*' element={< h1>Error 404</h1>}/>

          <Route path='/portfolio/create' element={ <CreateProtfolio/>}/>
        </Route> */}
          {/* <Route path='/section1main1' element={<Section1main1/>}/> */}
          <Route path='/' element={<Section1main1/>}/>
          <Route path='/portfolio' element={<Porfolio/>}/>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App
