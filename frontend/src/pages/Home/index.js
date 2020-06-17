import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import api from '../../services/api';

import Swal from 'sweetalert2';
import 'animate.css';

import carimbo from '../../assets/corona.png';

import { FaHome } from 'react-icons/fa';
import { FiTrash2 } from 'react-icons/fi';
import { GiRank3 } from 'react-icons/gi';
import { BsCardChecklist } from 'react-icons/bs';
import { RiFileEditLine } from 'react-icons/ri';

import './style.css';


export default function Home() {
  const [campanhas, setCampanhas] = useState([]);
  const [N_doacoes, setDoados] = useState(0);
  const [doacoesRecebidas, setRecebidas] = useState(0);
  const [fabricados, setFabricados] = useState(0);
  const [avaliacao, setAvaliacao] = useState(0);
  const [total, setTotal] = useState(0);
  const [instituicoes, setinstituicoes] = useState(0);

  const ong_id = localStorage.getItem('ongId');
  const ongName = localStorage.getItem('ongName');

  const data = { headers: { Authorization: ong_id } }

  useEffect(() => {

    loadCampanha();
    loadCountDoados();
    loadCampanhaOng();
    loadinstituicoes();
    loadCountFabricados();
    loadDoacoesAvaliacao();
    loadCountDoacoesRecebidas();

  }, []);

  function loadCampanhaNull() {
    const id = 0;
    const title = "Título da Campanha";
    const description = "Descreva sua campanha, para encontar pessoas que possa colaborar!";
    const value = 0;
    const dateInicio = "01/01/1990";
    const dateFim = "01/01/1991"

    const data = [{ id, title, description, value, dateInicio, dateFim }, { id, title, description, value, dateInicio, dateFim }]
    setCampanhas(data);
  }

  async function loadCampanhaOng() {
    try {
      const response = await api.get('CountCampanhasOng', {
        headers: {
          Authorization: ong_id,
        }
      })
      setTotal(response.data);
      if (!response.data) {
        loadCampanhaNull();
      }

    } catch (error) {
      loadCampanhaNull();
    }
  }

  async function loadinstituicoes() {
    try {
      const response = await api.get('CountInstituicoes');

      setinstituicoes(response.data);

    } catch (error) {
      setinstituicoes(0);
    }
  }

  async function loadCampanha() {
    try {
      const response = await api.get('profile', {
        headers: {
          Authorization: ong_id,
        }
      })
      setCampanhas(response.data);

    } catch (error) {

    }
    //setReceber(JSON.stringify(response.data));
  }

  async function loadCountDoados() {
    const response = await api.get('/Countdoados', data);
    setDoados(response.data);
    if (!response.data) {
      setDoados(0);
    }
  }

  async function loadCountDoacoesRecebidas() {
    const response = await api.get('/CountRecebidas', data);
    setRecebidas(response.data);
    if (!response.data) {
      setRecebidas(0);
    }
  }

  async function loadDoacoesAvaliacao() {
    const response = await api.get('/CountAvaliacao', data);
    setAvaliacao((response.data));

  }

  async function loadCountFabricados() {
    const response = await api.get('/CountFabricados', data);
    setFabricados(response.data);

    if (!response.data) {
      setFabricados(0);
    }
  }

  return (
    <div className="container">
      <div className="header">
        <div className="top">
          <p>Bem vindo</p>
          <h1>{ongName}</h1>
        </div>

        <Link to="#" className="active"><FaHome /> Home</Link>
        <Link to="AvaliarDoacao" className="" ><GiRank3 /> Avaliar Doações</Link>
        <Link to="/CADItens" className=""><RiFileEditLine />Itens Fabricados</Link>
        <Link to="/Instituicoes" className=""><BsCardChecklist />Doações Recebidas</Link>
        <Link to="/ItensDoados" className=""><BsCardChecklist />Itens Doados</Link>
      </div>
      <div className="section">
        <div className="context_home">
        <div className="item_home">
            <div className="hedearList">

             <img src={carimbo}  width="150px"/>

            </div>
          </div>

          <div className="item_home">

            <div className="hedearList">
              <p id="total">Doações em avaliação</p>
              <h3><span>Total: </span>{avaliacao} </h3>

            </div>

          </div>

          <div className="item_home">
            <div className="hedearList">
             
              <p>Itens doados</p>
              <h3><span>Total: </span>{N_doacoes}</h3>

            </div>
          </div>
          <div className="item_home">
            <div className="hedearList">

              <p>Doações recebidas</p>
              <h3><span>Total: </span>{doacoesRecebidas} </h3>

            </div>
          </div>
          <div className="item_home">
            <div className="hedearList">

              <p>Itens fabricados</p>
              <h3><span>Total: </span>{fabricados} </h3>

            </div>            
          </div>
         
        </div>

        <div className="home-list">
          <div id="hedearList">
            <h1>Ultimas Campanhas</h1>
            <p>Total de <b>{total}</b> campanhas</p>
          </div>

          <ul>
            {campanhas.map(campanha => (
              <li key={campanha.id}>
                <strong>CAMPANHA: </strong>
                <p>{campanha.title}</p>

                <strong>DESCRIÇÃO: </strong>
                <p>{campanha.description} </p>

                <strong>Valor: </strong>
                <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(campanha.value)}</p>

                <p id="inicio">Inicio em <b>{campanha.dateInicio}</b></p>
                <p id="fim">Fim em <b>{campanha.dateFim}</b></p>
                
              </li>
            ))}
          </ul>



          <Link className="button" to="/profile">Ver Campanhas</Link>
          <div id="sombra"></div>

        </div>

      </div>
    </div>
  );
}
