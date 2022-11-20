import {Link} from 'react-router-dom';

function ToggledMenu(props) {
    return (
        <>
            <div className="toggled-nav">
                <ul className="toggled-menu">
                    <li>
                        <button onClick={props.setSideMenu}> menu </button>
                    </li>
                    <li>
                        <Link to={{pathname: `/${props.isWomans}`}}><h3> Shop Name </h3></Link>
                    </li>
                    <li>
                        <button type="button"> menu </button> 
                        {/* {(!props.token)?<Link to="/user/login"><p>
                            Login
                        </p>
                        </Link>:
                        <p onClick={props.removeToken}>Log out</p>
                        } */}
                    </li>
                </ul>
            </div>
        </>
    )
}

export default ToggledMenu;