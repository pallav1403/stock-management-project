import React from 'react'
import {Link} from 'react-router-dom'
export default function SideBar() {
    return (
        <div>
            <div class="list-group container">
                <Link to="/"    className="list-group-item list-group-item-action list-group-item-dark" >Home</Link>
                <Link to="/add-investor" className="list-group-item list-group-item-action list-group-item-light">Add Investor</Link>
                <Link to="/add-manager" className="list-group-item list-group-item-action list-group-item-dark">Add Manager</Link>
                <Link to="/manage-investor" className="list-group-item list-group-item-action list-group-item-light">Manage Investor</Link>
                <Link to="/Manage Stock" className="list-group-item list-group-item-action list-group-item-dark">Manage Stock</Link>
            </div>
        </div>
    )
}
