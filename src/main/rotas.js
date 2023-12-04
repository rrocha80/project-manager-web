import React from "react";

import { Route, Switch, HashRouter } from 'react-router-dom'
import Pessoa from "../Views/Pessoa/pessoa";
import Home from "../Views/home";
import Projeto from "../Views/Projeto/projeto";

function Rotas() {
    return (
        <HashRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/pessoa" component={Pessoa} />    
                <Route path="/projeto" component={Projeto} />        
            </Switch>
        </HashRouter>
    )
}

export default Rotas