import React, { Component } from "react"
import { Link } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"



export default class NavBar extends Component {
    render() {
        return (
            <nav className="navbar navbar-light bg-dark flex-md-nowrap p-0 shadow">
                <ul className="nav nav-pills">
                    <li className="nav-item">
                        <Link className="nav-link" to="/login">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/goals">Goals</Link>
                    </li>
                    {/* <li className="nav-item">
                        <Link className="nav-link" to="/journals">Journals</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/rewards">Rewards</Link>
                    </li> */}
                    <li className="nav-logout-item">
                        <Link onClick ={() => sessionStorage.clear()} className="nav-link" to="/login">Logout</Link>
                    </li>
                </ul>
            </nav>
        )
    }
}
