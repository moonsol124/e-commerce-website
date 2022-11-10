import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './components/woman/home';
import About from './components/about';
import Landing from './components/landing';
import Nav from './components/nav';
import NewArrival from './components/woman/newArrival';
import Trend from './components/woman/trend';
import SideMenu from './components/sideMenu';
import HomeMan from './components/man/home';

function App() {
  const [sideMenuToggled, setSideMenuToggled] = useState(false);
  const [isWomans, setIsWomans] = useState('woman');

  function setGenderCategory(e) {
    setIsWomans(e.target.id);
  }
  function setSideMenu() {
    if (sideMenuToggled) {
      setSideMenuToggled(false);
    }
    else {
      setSideMenuToggled(true);
    }
  }

  return (
    <div className="App">
      <BrowserRouter>
      <Nav setSideMenu={setSideMenu} isWomans={isWomans}/>
      {(!sideMenuToggled)?null:<SideMenu setSideMenu={setSideMenu} isWomans={isWomans} setGenderCategory={setGenderCategory}/>}
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/about' element={<About />}></Route>

          {/* woman */}
          <Route path='/woman/' element={<Home />}></Route>
          <Route path='/woman/new_arrival' element={<NewArrival />}></Route>
          <Route path='/woman/trend' element={<Trend />}></Route>

          {/* man */}
          <Route path='/man/' element={<HomeMan />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
