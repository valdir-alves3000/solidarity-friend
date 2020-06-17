import React, { useState } from 'react';
import { FiLogIn } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import MsgAlert from '../Script/script';

import api from '../../services/api';

import './style.css';
//import logoImg from '../../assets/corona.png';

export default function Login() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  async function handleLogin(e) {
    e.preventDefault();

    if(!id || !password) {
      const a = "Preencha todos os campos!";
      const b = "info";
      const c = "animate__tada";
      const d = "animate__slideOutDown";
      const e = "";

      MsgAlert(a, b, c, d, e);

    } else {      

    try {
      const response = await api.post('sessions', 
      { id, password });

      localStorage.setItem('ongId', id);
      localStorage.setItem('ongName', response.data.name);

      history.push('/home');
    } catch (err) {
      const a = "Dados Incorretos";
      const b = "info";
      const c = "animate__zoomInDown";
      const d = "animate__slideOutDown";
      const e = "Usuário ou senha não confere!";

      MsgAlert(a, b, c, d, e);
    }
  }
  }

  return (
    <div className="login_container">
      <section className="form">
        <form onSubmit={handleLogin}>
          <h1>Login da Instituição</h1>

          <input 
          placeholder="Digite o ID" 
          value={id}
          onChange={e => setId(e.target.value)}
          />

          <input 
          type="password"
          placeholder="Senha" 
          value={password}
          onChange={e => setPassword(e.target.value)}
          />
          
          <button className="button" type="submit" >Acessar</button>

          <Link to="/register">
            <FiLogIn size={18} />
            Não tenho cadastro
          </Link>

        </form>

      </section>
      <div className="logoimg">
        <h1>Conheça a campanha!</h1>
        <h2>Contribua! Alguém precisa da sua ajuda neste momento.</h2>
        <h5>Cultive Solidariedade, para colhermos mais humanidade.</h5>
        <Link className="button" to="/Solidario">S<span role="img">❤️</span>u Solidário</Link>
      </div>
    </div>

  );
}