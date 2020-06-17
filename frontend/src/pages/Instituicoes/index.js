import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import { FaHome } from 'react-icons/fa';
import { GiRank3 } from 'react-icons/gi';
import { BsCardChecklist } from 'react-icons/bs';
import { RiFileEditLine } from 'react-icons/ri';
import api from '../../services/api';

export default function Instituicoes() {
  const ongName = localStorage.getItem('ongName'); 
  const ong_id = localStorage.getItem('ongId');

  const [doacoesRecebidas, setDoacoes] = useState([]);

  async function loadDoacoes() {
    const response = await api('doacoesrecebidas', {
      headers: {
        authorization: ong_id
      }
    });
    setDoacoes(response.data);
  }

  useEffect(() => {
    loadDoacoes();
  }, []);
  
  return (
    <div className="container">
      <div className="header">
        <div className="top">
          <p>Bem vinda</p>
          <h1>{ongName}</h1>
        </div>

        <Link to="/Home" className="" ><FaHome /> Home</Link>
        <Link to="AvaliarDoacao" className="" ><GiRank3 /> Avaliar Doações</Link>
        <Link to="/CADItens" className=""><RiFileEditLine />Itens Fabricados</Link>
        <Link to="#" className="active"><BsCardChecklist />Doações Recebidas</Link>
        <Link to="/ItensDoados" className=""><BsCardChecklist />Itens Doados</Link>

      </div>
      <div className="section">
        <div className="section-top">
          <h2>Doações Recebidas</h2>
        </div>

        <div className="home-list">
          <div className="cad-list">
            <h2>Código</h2>
            <h2>Descrição</h2>
            <h2>Data</h2>
            <h2>Valor</h2>
            <h2>Doador</h2>

          </div>

          <ul id="list-itens">
            {(doacoesRecebidas).map(doacoes => (
              <li key={doacoes.id} >
                <p> {doacoes.id} </p>
                <p>{doacoes.description}</p>
                <p> {doacoes.date} </p>
                <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(doacoes.value)} </p>
                <p>{doacoes.doador}</p>
                </li>
            ))}
          </ul>

          
        </div>
        <Link id="btn" to="/CadInstituicoes">Cadastrar</Link>
      </div>
    </div>
  );
}