import {Link} from 'react-router-dom';

function ToggledMenu(props) {

    function getLoginPage() {
        props.setLoginPage();
        props.closeSideMenu();
    }

    function getSideMenu() {
        props.setSideMenu();
        props.closeLoginPage();
        props.closeRegisterPage(); 
    }

    return (
        <>
            <div className="toggled-nav">
                <ul className="toggled-menu">
                    <li className="menu-icon-container nav-left">
                        <div onClick={getSideMenu} className="menu-img scale-on-hover"></div> 
                    </li>
                    <li className="nav-center">
                        <Link to='/home'><p className="shop-name scale-on-hover text-shadow-white-black"> W&O </p></Link>
                    </li>
                    <li className="nav-right"> 
                    {(props.user)?<p onClick={props.removeToken} className="scale-on-hover"> Log out </p>
                        :<div className="display-flex small-text text-shadow-white-black">
                            <p> Hello, Stranger.</p>
                            <p type="button" onClick={getLoginPage} className="scale-on-hover"> Login </p>
                        </div>
                        }
                    </li>
                </ul>
            </div>
        </>
    )
}

export default ToggledMenu;