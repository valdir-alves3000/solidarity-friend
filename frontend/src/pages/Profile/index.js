import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiTrash2,FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';
import Swal from 'sweetalert2';
import 'animate.css';

import carimbo from '../../assets/corona.png';
import './styles.css';

export default function Profile() {
  const [campanhas, setCampanhas] = useState([]);
  
  const ong_id = localStorage.getItem('ongId');
  const ongName = localStorage.getItem('ongName');

  useEffect(() => {
    loadCampanha();
  }, []);

  async function loadCampanha() {
    await  api.get('profile', {
      headers: {
        Authorization: ong_id,
      }
    }).then(response => {
      setCampanhas(response.data);
    })
  }

  async function handleDeleteCampanha(id) {
      
    const data = { id, ong_id};
        
    try {
      await api.delete('campanhas', { data } );

      setCampanhas(campanhas.filter(campanha => campanha.id !== id));
      
    } catch (err) {
      alert('Erro ao Deletar campanha!!!');
    }
    
  }

  function testDelete(id) {
    Swal.fire({
      title: 'Você tem certeza?',
      text: "Não poderá reverter isso!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Deletado!',
          'Sua campanha foi deletada.',
          'success'
        )
        handleDeleteCampanha(id);
      } else {
        Swal.fire(
          'Cancelado',
          'Sua campanha continua no sistema :)',
          'error'
        )
      }
    })
  }

  return (
    <div className="profile-container">
      <header>
        <img src={carimbo} />
        <span>Bem Vindo, <b>{ongName}</b></span>

       <Link className="button" to="/new">Cadastrar nova campanha</Link>
       
          
          <Link to="home" id="left">
          <FiArrowLeft className="power" size={20} color="#41414d"  />
          </Link>           
            
      </header>

      <h1>Campanhas cadastradas</h1>
         
         <ul>
           {campanhas.map(campanha => (
            <li key={campanha.id}>
            <strong>CAMPANHA: </strong>
            <p>{campanha.title}</p>

            <strong>DESCRIÇÂO: </strong>
            <p>{campanha.description} </p>

            <strong>Valor: </strong>
            <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(campanha.value)} </p>

            <p id="inicio">Inicio em <b>{campanha.dateInicio}</b></p>
            <p id="fim">Fim em <b>{campanha.dateFim}</b></p>

            <button onClick={() => testDelete(campanha.id)} type="button">
              <FiTrash2 size={20} color="#a8a8b3" />
            </button>

          </li>
           ))}           
         </ul>
    </div>
  );
}