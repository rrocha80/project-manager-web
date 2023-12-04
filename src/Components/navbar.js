import React from "react";

import NavbarItem from "./navbarItem";

function Navbar() {
    return (
        <div className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary" >
        <div className="container">
          <a href="home.html" className="navbar-brand" style={ {fontSize: '20px', fontWeight: 'bolder'} } >Gerenciador de Projetos</a>
          <button  className="navbar-toggler" type="button" 
                   data-toggle="collapse" data-target="#navbarResponsive" 
                   aria-controls="navbarResponsive" aria-expanded="false" 
                   aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav">
                <NavbarItem href="#/" label="Home"></NavbarItem>
                <NavbarItem href="#/pessoa" label="Pessoa"></NavbarItem>
                <NavbarItem href="#/projeto" label="Projeto"></NavbarItem>
            </ul>
          </div>
        </div>
      </div>
    )
}

export default Navbar