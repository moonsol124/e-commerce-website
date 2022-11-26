import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from 'react';
import uniqid from 'uniqid';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './components/home';
import About from './components/about';
import Landing from './components/landing';
import Nav from './components/nav';
import NewArrival from './components/newArrival';
import Trend from './components/trend';
import SideMenu from './components/sideMenu';
import Login from './components/login';
import Register from './components/register';
import useToken from './useToken';
import AdminDashboard from './components/adminDashboard';
import Color from './components/admin/color';
import Gender from './components/admin/gender';
import Fit from './components/admin/fit';
import Care from './components/admin/care';
import Material from './components/admin/material';
import Size from './components/admin/size';
import Collection from './components/admin/collection';

function App() {
  const [reload, setReload] = useState(false);
  const [sideMenuToggled, setSideMenuToggled] = useState(false);
  const [loginToggled, setLoginToggled] = useState(false);
  const [registerToggled, setRegisterToggled] = useState(false);
  const [isWomans, setIsWomans] = useState('woman');
  const { token, removeToken, setToken, user } = useToken();
  
  function reRender() {
    setReload(true);
    setTimeout(() => {
      setReload(false);
    }, 1)
  }

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

  function closeSideMenu() {
    setSideMenuToggled(false);
  }

  function setLoginPage() {
    if (loginToggled) {
      setLoginToggled(false);
    }
    else {
      setLoginToggled(true);
    }
  }

  function closeLoginPage() {
    setLoginToggled(false);
  }

  function setRegisterPage() {
    if (registerToggled) {
      setRegisterToggled(false);
    }
    else {
      setRegisterToggled(true);
    }
  }

  function closeRegisterPage() {
    setRegisterToggled(false);
  }

  return (
    <div className="App">
      <BrowserRouter>
      <Nav user={user} closeLoginPage={closeLoginPage} closeRegisterPage={closeRegisterPage} closeSideMenu={closeSideMenu} setSideMenu={setSideMenu} setRegisterPage={setRegisterPage} setLoginPage={setLoginPage} token={token} removeToken={removeToken}/>
      {(loginToggled)?<Login setLoginPage={setLoginPage} setSideMenu={setSideMenu} setRegisterPage={setRegisterPage} setToken={setToken}/>:null}
      {(registerToggled)?<Register setLoginPage={setLoginPage} closeRegisterPage={closeRegisterPage} setRegisterPage={setRegisterPage} />:null}
      {(!sideMenuToggled)?null:<SideMenu removeToken={removeToken} user={user} setLoginPage={setLoginPage} setRegisterPage={setRegisterPage} setSideMenu={setSideMenu} isWomans={isWomans} setGenderCategory={setGenderCategory}/>}
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/about' element={<About />}></Route>

          {/* admin */}
          <Route path='admin' element={<AdminDashboard reRender={reRender}/>}>
            <Route path='color' element={<Color />}/> 
            <Route path='gender' element={<Gender />}/> 
            <Route path='fit' element={<Fit />}/>
            <Route path='care' element={<Care />} />
            <Route path='material' element={<Material />} />
            <Route path='size' element={<Size />} />
            <Route path='collection' element={<Collection />} />
          </Route>

          {/* woman */}
          <Route path='/home' element={<Home />}></Route>
          <Route path='/new_arrival' element={<NewArrival />}></Route>
          <Route path='/trend' element={<Trend />}></Route>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
