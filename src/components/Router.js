import React, { Component } from 'react'
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom"

import Menu from './Menu'
import Home from './Home'
import DetalleSerie from './DetalleSerie'
import PersonajesSerie from './PersonajesSerie'
import CreatePersoaje from './CreatePersoaje'
import UpdatePersonaje from './UpdatePersonaje'

export default class Router extends Component {
  render() {

    function DetalleSerieElement() {
      var { idSerie } = useParams();
      return (
        <DetalleSerie idSerie={idSerie} />
      )
    }

    function PersonajeSerieElement () {
      var {idSerie} = useParams();
      return(
        <PersonajesSerie idSerie={idSerie} />
      )
    }

    return (
      <BrowserRouter>
        <Menu />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/series/:idSerie' element={<DetalleSerieElement />} />
          <Route path='/series/personajesSerie/:idSerie' element={<PersonajeSerieElement />} />
          <Route path='/createPersonaje' element={<CreatePersoaje />} />
          <Route path='/updatePersonaje' element={<UpdatePersonaje/>} />
        </Routes>
      </BrowserRouter>
    )
  }
}
