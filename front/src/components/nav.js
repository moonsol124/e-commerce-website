import '../css/nav.css';
import Menu from './menu';
import { useState, useEffect } from 'react';
import ToggledMenu from './toggledMenu';

function Nav(props) {
    const [toggled, setToggled] = useState(false);

    useEffect(() => {
        if (window.innerWidth < 800) {
            setToggled(true);
        }
        else {
            setToggled(false);
        }
    }, [])

    return (
        <>
            {(toggled)?<ToggledMenu token={props.token} removeToken={props.removeToken} setSideMenu={props.setSideMenu} isWomans={props.isWomans}/>:<Menu />}
        </>
    )
}

export default Nav;