import React, { Component } from 'react'

import Global from './Global'
import axios from 'axios'
import { NavLink, Navigate } from "react-router-dom"

export default class CreatePersoaje extends Component {

    
    cajaNombre = React.createRef();
    cajaImagen = React.createRef();
    selecSerie = React.createRef();

    state = {
        status: false,
        series: []
    }

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

    crearPersonaje = (e) => {
        e.preventDefault();

        let nombre = this.cajaNombre.current.value;
        let imagen = this.cajaImagen.current.value;
        let idSerie = parseInt(this.selecSerie.current.value);

        let personaje = {
            nombre: nombre,
            imagen: imagen,
            idSerie: idSerie
        }

        let request = "api/Personajes";
        let url = Global.urlApi + request;

        axios.post(url, personaje).then(response => {
            console.log(response);
            this.setState({
                status: true
            })
        })
    }
    render() {
        return (
            <div className="container mt-4">
                {this.state.status == true && <Navigate to="/" />}
                <h1 style={{ color: "blue" }}>Nuevo Personaje</h1>
                <form onSubmit={this.crearPersonaje}>
                    <div className="mb-3">
                        <label className="form-label">Nombre: </label><br />
                        <input
                            type="text"
                            className="form-control"
                            ref={this.cajaNombre}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Imagen: </label><br />
                        <input
                            type="text"
                            className="form-control"
                            ref={this.cajaImagen}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Serie:</label><br />
                        <select className="form-select" ref={this.selecSerie}>
                            {this.state.series.map((serie, index) => {
                                return (
                                    <option key={index} value={serie.idSerie}>
                                        {serie.nombre}
                                    </option>
                                );
                            })}
                        </select>
                    </div>

                    <button type="submit" className="btn btn-primary">
                        Insertar Personaje
                    </button>
                </form>
            </div>
        )
    }
}
