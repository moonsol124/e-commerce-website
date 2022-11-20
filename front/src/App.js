import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from 'react';
import uniqid from 'uniqid';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './components/woman/home';
import About from './components/about';
import Landing from './components/landing';
import Nav from './components/nav';
import NewArrival from './components/woman/newArrival';
import Trend from './components/woman/trend';
import SideMenu from './components/sideMenu';
import HomeMan from './components/man/home';
import Login from './components/login';
import Register from './components/register';
import useToken from './useToken';
import AdminDashboard from './components/adminDashboard';
import Color from './components/admin/color';
import Gender from './components/admin/gender';

function App() {
  const [reload, setReload] = useState(false);
  const [sideMenuToggled, setSideMenuToggled] = useState(false);
  const [loginToggled, setLoginToggled] = useState(false);
  const [registerToggled, setRegisterToggled] = useState(false);
  const [isWomans, setIsWomans] = useState('woman');
  const { token, removeToken, setToken, user } = useToken();
  const [collections, setCollections] = useState([{path: "color", endpointMultiple: 'colors', fields: [{label: 'Name', type: 'text', name: 'name'}, {label: 'Color', type: 'color', name: 'rgbValue'}]},
  {path: "gender", endpointMultiple: 'genders', fields: [{label: 'Name', type: 'text', name: 'name'}]}
])

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

  function setLoginPage() {
    setSideMenu();
    if (loginToggled) {
      setLoginToggled(false);
    }
    else {
      setLoginToggled(true);
    }
  }

  function closeLoginPage() {
    if (loginToggled) {
      setLoginToggled(false);
    }
    else {
      setLoginToggled(true);
    }
  }

  function setRegisterPage() {
    setSideMenu();
    if (registerToggled) {
      setRegisterToggled(false);
    }
    else {
      setRegisterToggled(true);
    }
  }

  function closeRegisterPage() {
    if (registerToggled) {
      setRegisterToggled(false);
    }
    else {
      setRegisterToggled(true);
    }
  }

  return (
    <div className="App">
      <BrowserRouter>
      <Nav setSideMenu={setSideMenu} isWomans={isWomans} token={token} removeToken={removeToken}/>
      {(loginToggled)?<Login closeLoginPage={closeLoginPage} setToken={setToken}/>:null}
      {(registerToggled)?<Register closeRegisterPage={closeRegisterPage} setRegisterPage={setRegisterPage} />:null}
      {(!sideMenuToggled)?null:<SideMenu removeToken={removeToken} user={user} setLoginPage={setLoginPage} setRegisterPage={setRegisterPage} setSideMenu={setSideMenu} isWomans={isWomans} setGenderCategory={setGenderCategory}/>}
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/about' element={<About />}></Route>

          {/* admin */}
          <Route path='admin' element={<AdminDashboard reRender={reRender}/>}>
            <Route path='color' element={<Color />}/> 
            <Route path='gender' element={<Gender />}/> 
            {/* {collections.map((c) => {
              return <Route key={uniqid()} path={c.path} element={<Item fields={c.fields} endpointSingle={c.path} endpointMultiple={c.endpointMultiple} />}/>
            })} */}
            {/* <Route path='color' element={<Color />}>
            </Route> */}
          </Route>

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
