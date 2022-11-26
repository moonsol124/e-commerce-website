import '../css/landing.css';
import {Link} from 'react-router-dom';

function Landing() {
    return (
        <div className="landing-div">
            <div className="landing-bg-1">
            </div>
            <div className="landing-texts texts-container text-shadow-white-black">
                <p className="big-text">Woman & Only</p>
                <p>From woman, by woman, and for woman.</p>
                <div className="button-container">
                    <Link to='/home'><button className="landing-btn"> Shop Now </button></Link>
                </div> 
            </div>
        </div>
    )
}

export default Landing;