import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiTrash2, FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import carimbo from '../../assets/corona.png';
import './styles.css';

export default function Solidario() {  
  const [campanhas, setCampanhas] = useState([]);
  
  const [total, setTotal] = useState(0);
  const history = useHistory();

  useEffect(() => {
    api.get('/campanhas').then(response => {
      setCampanhas(response.data);
    })
    api.get('/countcampanhas').then(response => {
      setTotal(response.data);
      if (!response.data) {
        setTotal(0);
      }
    })
  }, []);

  function handleDoar(e) {
    localStorage.setItem('ongName', e.name);
    localStorage.setItem('ong_id', e.ong_id);
    localStorage.setItem('title', e.title);
    
    history.push('Doador');

  }

  return (
    <div className="solidario-container">
      <header>

        <img src={carimbo} id="carimbo" />
        <p>Total de <b>{total}</b> Campanhas</p>

      </header>

      <h1>Bem Vindo! <b>Grande Solidário</b></h1>
      <p className="description">Escolha a campanha que tocar seu ❤️! Com pouco já é possível conquistar o sorriso de quem necessita!</p>
      <ul>
        {campanhas.map(campanha => (

          <li key={campanha.id}>
            <div className="column-left">
              <strong>INSTITUIÇÂO: </strong>
              <p>{campanha.name}</p>

              <strong>Ação: </strong>
              <p>{campanha.title}</p>

              <strong >DESCRIÇÂO: </strong>
              <p id="desc">{campanha.description} </p>

              <strong>Valor: </strong>
              <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(campanha.value)} </p>
            </div>
            <div className="column-rigth">
              <p className="title">Seja Solidário!</p>
              <p className="text">Contribua com esse Sorrisso!</p>

              <Link id="doar" className="button" onClick={() => handleDoar(campanha)} >Doar Agora</Link>
              <p className="text">mais informações</p>
              <Link className="button" >WhatsApp</Link >
              <Link className="button">E-mail</Link>
            </div>
          </li>


        ))}
      </ul>
    </div>
  );
}