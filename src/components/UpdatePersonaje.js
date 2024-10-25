import React, { Component } from 'react'
import axios from 'axios'
import Global from './Global'

export default class UpdatePersonaje extends Component {

    selectSerie = React.createRef();
    selectPersonaje = React.createRef();

    state = {
        series: [],
        personajes: [],
        status: false,
        datosPersonaje: null
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

    loadPersonajes = () => {
        var request = "/api/Personajes";
        var url = Global.urlApi + request;

        axios.get(url).then((response) => {
            console.log("Leyendo Personajes");
            this.setState({
                personajes: response.data,
            })
        })

    }

    updatePersonaje = (e) => {
        e.preventDefault();       

        let personaje = this.state.personajes;    
        personaje.nombre = this.selectPersonaje.current.value;
        personaje.idSerie = parseInt(this.selectSerie.current.value);

        let request = "api/Personajes";
        let url = Global.urlApi + request;
        axios.put(url, personaje).then((response) => {
          console.log("Personaje actualizado");
          this.setState({
            status: true,
          });
        });
      };

    componentDidMount = () => {
        this.loadSeries();
        this.loadPersonajes();
    }

    render() {
        return (
            <div>
                <h1 style={{ color: "blue" }}>Personajes y Series</h1>
                <form>
                    <div className="mb-3">
                        <label htmlFor="seriesSelect" className="form-label">Selecciona una serie</label>
                        <select className="form-select" id="seriesSelect" ref={this.selectSerie}>
                            {this.state.series.map((serie) => (
                                <option key={serie.id} value={serie.id}>{serie.nombre}</option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="personajesSelect" className="form-label">Selecciona un personaje</label>
                        <select className="form-select" id="personajesSelect" ref={this.selectPersonaje}>
                            {this.state.personajes.map((personaje) => (
                                <option key={personaje.id} value={personaje.id}>{personaje.nombre}</option>
                            ))}
                        </select>
                    </div>

                    <button type="submit" onClick={this.updatePersonaje} className="btn btn-primary">Modificar personaje</button>
                </form>
            </div>
        )
    }
}