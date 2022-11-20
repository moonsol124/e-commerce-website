import '../css/sidemenu.css';
import {Link} from 'react-router-dom';
import {useState, useEffect} from 'react';

function SideMenu(props) {
    const [isAdmin, setIsAdmin] = useState(false);
    
    function userLogout() {
        props.removeToken();
        props.setSideMenu();
    }

    useEffect(() => {
        if (props.user) {
            const user = JSON.parse(props.user);
            if (user.isAdmin === true) {
                setIsAdmin(true);
            }
            else {
                setIsAdmin(false);
            }
        }
    }, [])

    return (
        <div className="sideMenu-div">
            <div className="sidemenu">
                <div className="sidemenu-gender">
                    <Link to='/woman/'><div id="woman" onClick={props.setGenderCategory}>Woman</div></Link>
                    <Link to='/man/'><div id="man" onClick={props.setGenderCategory}>man</div></Link>
                </div>
            </div>
            <hr></hr>
            <ul className="side-menu-ul">
                <Link to={{pathname: `/${props.isWomans}/new_arrival`}}><li onClick={props.setSideMenu}>New Arrivals</li></Link>
                <Link to={{pathname: `/${props.isWomans}/trend`}}><li onClick={props.setSideMenu}>Trends</li></Link>
                <li>Seasonal Arrivals</li>
            </ul>
            <hr></hr>
            <ul className="side-menu-ul">
                <li>category1</li>
                <li>category2</li>
                <li>category3</li>
                <li>category4</li>
                <li>category5</li>
                <li>category6</li>
                <li>category7</li>
                <li>category8</li>
                <li>category9</li>
            </ul>
            <hr></hr>
            <ul className="side-menu-ul">
                {(props.user)?<li><button type="button" onClick={userLogout}> Log out </button></li>
                :<>
                <li>
                    <button type="button" onClick={props.setLoginPage}> Login </button>
                </li>
                <li>
                    <button type="button" onClick={props.setRegisterPage}> Sign up </button>
                </li>
                </>}
                {(isAdmin)?
                <Link to='/admin' onClick={props.setSideMenu}><button type="button"> Admin Dashboard </button></Link>:null}               
            </ul>
        </div>
    )
}

export default SideMenu;