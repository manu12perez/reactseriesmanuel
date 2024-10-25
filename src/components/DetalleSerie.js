import React, { Component } from 'react'

import axios from 'axios'
import Global from './Global'
import { NavLink } from "react-router-dom"

export default class DetalleSerie extends Component {

    state = {
        serie: null,
    }

    loadSerie = () => {
        let idSerie = this.props.idSerie;
        let request = "api/Series/" + idSerie;
        let url = Global.urlApi + request;

        axios.get(url).then(response => {
            console.log("Leyendo Serie");
            console.log(idSerie);
            this.setState({
                serie: response.data
            })
        })
    }

    componentDidMount = () => {
        this.loadSerie();
    }

    componentDidUpdate = (oldProps) => {
        if (this.props.idSerie != oldProps.idSerie) {
            this.loadSerie();
        }
    }

    render() {
        return (
            <div className="card" style={{ width: '18rem', margin: '20px auto', textAlign: 'center' }}>
                {this.state.serie && (
                    <>
                        <img
                            src={this.state.serie.imagen}
                            className="card-img-top"
                            alt={this.state.serie.nombre}
                            style={{ height: '200px', objectFit: 'cover' }}
                        />
                        <div className="card-body text-center">
                            <h5 className="card-title">{this.state.serie.nombre}</h5>
                            <p className="card-text">
                                <strong>IMDB:</strong> {this.state.serie.puntuacion}
                            </p>
                            <p className="card-text">
                                <strong>Año:</strong> {this.state.serie.año}
                            </p>
                            <NavLink
                                to={"/series/personajesSerie/" + this.state.serie.idSerie}
                                className="btn btn-success w-100"
                                aria-current="page"
                            >
                                Personajes
                            </NavLink>
                        </div>
                    </>
                )}
            </div>
        )
    }
}
