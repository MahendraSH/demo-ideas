import { HashRouter, Route, Router, Routes } from 'react-router-dom';
import './App.css'
import Layout from './components/Layout';
import CreateProtfolio from './pages/CreateProtfolio';
import HomePage  from './pages/HomePage';


const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/about' element={<h1>About</h1>}/>
          <Route path='/contact' element={<h1>Contact</h1>}/>
          <Route path='/portfolio' element={<h1>Portfolio</h1>}/>
          <Route path='/portfolio/create' element={ <CreateProtfolio/>}/>
          <Route path='*' element={< h1>Error 404</h1>}/>
        

        </Route>
        
      </Routes>
    </HashRouter>
  );
}

export default App
