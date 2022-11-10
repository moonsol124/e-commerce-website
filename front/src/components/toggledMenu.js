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
                        <p>
                            Login
                        </p>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default ToggledMenu;