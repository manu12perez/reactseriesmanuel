import React, { Component } from 'react'
import axios from "axios"
import Global from "./Global"
import { NavLink } from "react-router-dom"

export default class Menu extends Component {

    state = {
        series: [],
    };

    loadSeries = () => {
        var request = "api/Series";
        var url = Global.urlApi + request;

        axios.get(url).then((response) => {
            console.log("Leyendo Series");
            this.setState({
                series: response.data,
            })
        })
    }

    componentDidMount = () => {
        this.loadSeries();
    }

    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-sm navbar-dark bg-dark" aria-label="Third navbar example">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="/">
                            <img src="https://th.bing.com/th/id/OIP.WlIkNWOqCrbxP9xEDNTorQHaDq?rs=1&pid=ImgDetMain" style={{ height: "40px", width: "50px" }} />
                        </a>

                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarsExample03"
                            aria-controls="navbarsExample03"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarsExample03">
                            <ul className="navbar-nav me-auto mb-2 mb-sm-0">
                                <li className="nav-item">
                                    <NavLink className="nav-link active" aria-current="page" to="/">
                                        Home
                                    </NavLink>
                                </li>

                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/createPersonaje">
                                        Nuevo Personaje
                                    </NavLink>
                                </li>

                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/updatePersonaje">
                                        Modificar Personajes
                                    </NavLink>
                                </li>

                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false">
                                        Series
                                    </a>

                                    <ul className="dropdown-menu">
                                        {this.state.series.map((serie, index) => {
                                            return (
                                                <li key={index}>
                                                    <NavLink to={"/series/" + serie.idSerie} className="dropdown-item">
                                                        {serie.nombre}
                                                    </NavLink>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}
