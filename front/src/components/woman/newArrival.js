import '../../css/newArrival.css';
import {Link} from 'react-router-dom';

function NewArrival() {
    return (
        <div className="newArrival-div">
            <h1>New Arrival</h1>
            <div className="path">
                <Link to="/woman/"><div>Home</div></Link>
                <div>/</div>
                <Link to="/woman/"><div>Woman</div></Link>
                <div>/</div>
                <Link to="/woman/new_arrival/"><div>New Arrival</div></Link>
            </div>
            <div className="newArrival-ul">
                <div>1</div>
                <div>2</div>
                <div>3</div>
                <div>4</div>
                <div>5</div>
                <div>6</div>
            </div>
            <div className="button-container">
                <Link to="/woman"><button>back</button></Link>
            </div>
        </div>
    )
}

export default NewArrival;