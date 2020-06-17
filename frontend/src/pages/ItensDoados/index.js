import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import api from '../../services/api';

import { FaHome } from 'react-icons/fa';
import { GiRank3 } from 'react-icons/gi';
import { BsCardChecklist } from 'react-icons/bs';
import { RiFileEditLine } from 'react-icons/ri';

import './styles.css';

export default function Instituicoes() {
  const ongName = localStorage.getItem('ongName');
  const ong_id = localStorage.getItem('ongId');
  const [itensDoados, setDoados] = useState([]);

  useEffect(() => {
    loadItensDoados();
  }, []);

  async function loadItensDoados() {

    const response = await api.get('cadItensDoados', {
      headers: {
        Authorization: ong_id,
      }
    });
    setDoados(response.data);
  }

  return (
    <div className="container">
      <div className="header">

        <div className="top">
          <p>Bem vindo</p>
          <h1>{ongName}</h1>
        </div>

        <Link to="/Home" className="" ><FaHome /> Home</Link>
        <Link to="AvaliarDoacao" className="" ><GiRank3 /> Avaliar Doações</Link>
        <Link to="/CADItens" className=""><RiFileEditLine />Itens Fabricados</Link>
        <Link to="/Instituicoes" className=""><BsCardChecklist />Doações Recebidas</Link>
        <Link to="#" className="active"><BsCardChecklist />Itens Doados</Link>

      </div>

      <div className="section">
        <div className="section-top">
          <h2>Lista de Itens Doados</h2>
        </div>

        <div className="home-list">
          <div className="cad-list">
            <h2>Descrição</h2>
            <h2>Unidade</h2>
            <h2>Quantidade</h2>
            <h2>Custo</h2>
            <h2>Data</h2>
          </div>

          <ul id="list-itens">
            {(itensDoados).map(itens => (

              <li >
                <p> {itens.description} </p>
                <p>{itens.unidade} </p>
                <p>{itens.quantidade}</p>   
                <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(itens.custo)}</p>            
                <p>{itens.date}</p>
              </li>
            ))}
          </ul>

        </div>
        <Link id="btn" to="/CadDoados">Cadastrar</Link>
      </div>
    </div>
  );
}