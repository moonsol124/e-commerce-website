import { Link, Outlet } from 'react-router-dom';
import '../css/admin.css';

function AdminDashboard(props) {
    return (
        <>
        <div className="admin-div">
            <div className="admin-btns">
                <Link to="/admin/collection"><button className="admin-btn">Collections</button></Link>
                <Link to="/admin/care"><button className="admin-btn">Cares</button></Link>
                <Link to="/admin/color"><button className="admin-btn">Colors</button></Link>
                <Link to="/admin/fit"><button className="admin-btn">Fits</button></Link>
                <Link to="/admin/gender"><button className="admin-btn">Genders</button></Link>
                <Link to="/admin/material"><button className="admin-btn">Materials</button></Link>
                <Link to="/admin/size"><button className="admin-btn">Sizes</button></Link>
            </div>
        </div>
        <Outlet />
        </>
    )
}

export default AdminDashboard;