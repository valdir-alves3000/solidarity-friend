import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import './styles.css';

import Swal from 'sweetalert2';
import 'animate.css';

import { FaHome } from 'react-icons/fa';
import { GiRank3 } from 'react-icons/gi';
import { BsCardChecklist, BsCheck } from 'react-icons/bs';
import { RiCloseLine } from "react-icons/ri";
import { RiFileEditLine } from 'react-icons/ri';
import api from '../../services/api';


export default function Avaliardoacoes() {
  const ongName = localStorage.getItem('ongName');
  const ong_id = localStorage.getItem('ongId');

  const [avaliarDoacoes, setDoacoes] = useState([]);

  async function loadAvaliardoacoes() {
    const response = await api('avaliardoacoes', {
      headers: {
        authorization: ong_id
      }
    });
    setDoacoes(response.data);
  }

  async function handleValidar(id) {
    try {
      const data = { headers: { authorization: id } }
      const doacao = await api.get('/avaliarDoacoesExat', data);

      try {
        const [data] = doacao.data;

        const response = await api.post('/doacoesrecebidas', data);
        setDoacoes(avaliarDoacoes.filter(doacao => doacao.id !== id));

        Swal.fire(
          'Registrado',
          'Doação cadastrada com sucesso.',
          'success'
        )
      } catch (error) {

      }

    } catch (error) {
      Swal.fire(
        'Falha na conexão',
        'Erro de conexão com o banco de dados.',
        'error'
      )
    }

  }

  function handleAlertValidar(id) {
    Swal.fire({
      title: 'Deseja registrar esta doação?',
      text: "Cadastrar doação no banco de dados!",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }

    }).then((result) => {
      if (result.value) {

        handleValidar(id);

      } else {
        Swal.fire(
          'Registro cancelado',
          'Doação não registrada.',
          'error'
        )
      }
    })
  }

  async function handleApagar(id) {
    const data = { id };
    try {

      const response = await api.delete('avaliardoacoes', { data });
      setDoacoes(avaliarDoacoes.filter(doacoes => doacoes.id !== id));

      Swal.fire(
        'Itens Excluido!',
        'Doação removida da lista com sucesso.',
        'success'
      )
    } catch (error) {

    }
  }

  function handleAlertApagar(id) {

    Swal.fire({
      title: 'Deseja remover da lista?',
      text: "Não será possível cadastrar esta doação no futuro.",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }

    }).then((result) => {
      if (result.value) {

        handleApagar(id);

      } else {
        Swal.fire(
          'Ação cancelada!',
          'Doação continua na lista, para futuro cadastro.',
          'error'
        )
      }
    })
  }

  useEffect(() => {
    loadAvaliardoacoes();
  }, []);

  return (
    <div className="container">
      <div className="header">
        <div className="top">
          <p>Bem vinda</p>
          <h1>{ongName}</h1>
        </div>

        <Link to="/Home" className="" ><FaHome /> Home</Link>
        <Link to="#" className="active" ><GiRank3 /> Avaliar Doações</Link>
        <Link to="/CADItens" className=""><RiFileEditLine />Itens Fabricados</Link>
        <Link to="/Instituicoes" className=""><BsCardChecklist />Doações Recebidas</Link>
        <Link to="/ItensDoados" className=""><BsCardChecklist />Itens Doados</Link>

      </div>
      <div className="section">
        <div className="section-top">
          <h2>Lista de Instituições</h2>
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
            {(avaliarDoacoes).map(doacoes => (
              <li key={doacoes.id} >
                <p> {doacoes.id} </p>
                <p>{doacoes.description}</p>
                <p> {doacoes.date} </p>
                <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(doacoes.value)} </p>
                <p>{doacoes.doador}</p>
                <BsCheck id="btn-validar" onClick={() => handleAlertValidar(doacoes.id)} />
                <RiCloseLine id="btn-apagar" onClick={() => handleAlertApagar(doacoes.id)} />
              </li>
            ))}
          </ul>

        </div>

      </div>
    </div>
  );
}