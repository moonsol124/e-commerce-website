import '../css/landing.css';
import {Link} from 'react-router-dom';

function Landing() {
    return (
        <div className="landing-div">
            <div className="landing-bg-1">
            </div>
            <div  className="landing-bg-2">
            </div>
            <div className="landing-texts texts-container">
                <h1> some header </h1>
                <h3> some sub header </h3>
                <p> some paragraph </p>
                <div className="button-container">
                    <Link to='/woman/'><button> some button </button></Link>
                </div> 
            </div>
        </div>
    )
}

export default Landing;