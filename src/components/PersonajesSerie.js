import React, { Component } from 'react'

import axios from 'axios'
import Global from './Global'
import { NavLink } from "react-router-dom"

export default class PersonajesSerie extends Component {

    state = {
        personajes: []
    }

    loadPersonajes = () => {
        let idSerie = this.props.idSerie;
        let request = "api/Series/PersonajesSerie/" + idSerie;
        let url = Global.urlApi + request;

        axios.get(url).then(response => {
            console.log("Leyendo Personajes");
            console.log(idSerie);
            console.log(response.data);
            this.setState({
                personajes: response.data
            })
        })
    }

    componentDidMount = () => {
        this.loadPersonajes();
    }

    render() {
        return (
            <div className="container mt-4">
                <NavLink to={`/series/${this.props.idSerie}`} className="btn btn-danger mb-4">
                    Volver
                </NavLink>

                <h3 className="text-center mb-4">Personajes de la Serie</h3>
                <table className="table table-dark table-bordered table-striped text-center">
                    <thead>
                        <tr>
                            <th>Personaje</th>
                            <th>Imagen</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.personajes.map((personaje, index) => {
                                return (
                                    <tr key={index}>
                                        <td>
                                            {personaje.nombre}
                                        </td>
                                        <td><img
                                            src={personaje.imagen}
                                            alt={personaje.nombre}
                                            style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                                        /></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}