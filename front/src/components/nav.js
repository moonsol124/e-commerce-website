import '../css/nav.css';
import Menu from './menu';
import { useState, useEffect } from 'react';
import ToggledMenu from './toggledMenu';

function Nav(props) {
    const [toggled, setToggled] = useState(false);

    return (
        <>
            <ToggledMenu user={props.user} closeLoginPage={props.closeLoginPage} closeRegisterPage={props.closeRegisterPage}  closeSideMenu={props.closeSideMenu} setRegisterPage={props.setRegisterPage} token={props.token} setLoginPage={props.setLoginPage} removeToken={props.removeToken} setSideMenu={props.setSideMenu}/>
        </>
    )
}

export default Nav;