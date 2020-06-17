import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './pages/Login';
import CADItens from './pages/CADItens';
import ItensDoados from './pages/ItensDoados';
import CadDoados from './pages/CadDoados';

import CadFab from './pages/CadFab';

import Instituicoes from './pages/Instituicoes';
import Home from './pages/Home';
import Solidario from './pages/Solidario';
import AvaliarDoacao from './pages/Avaliacao';
import CadInstituicoes from './pages/CadInstituicoes';

import Profile from './pages/Profile';
import New from './pages/NewIncident';
import Register from './pages/Register';
import Doador from './pages/Doador';

export default function Routes() {
  return (
    <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Login} />
      <Route path="/CADItens" component={CADItens} />
      <Route path="/Instituicoes" component={Instituicoes} />
      <Route path="/Home" component={Home} />
      <Route path="/New" component={New} />
      <Route path="/CadInstituicoes" component={CadInstituicoes} />

      <Route path="/Solidario" component={Solidario} />
      <Route path="/Doador" component={Doador} />
      <Route path="/CadFab" component={CadFab} />
      <Route path="/AvaliarDoacao" component={AvaliarDoacao} />
      
      <Route path="/ItensDoados" component={ItensDoados} />
      <Route path="/Profile" component={Profile} />
      <Route path="/Register" component={Register} />
      <Route path="/CadDoados" component={CadDoados} />


    </Switch>
    </BrowserRouter>
  );
}