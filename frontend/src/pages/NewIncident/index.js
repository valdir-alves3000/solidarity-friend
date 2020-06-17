import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';
import Swal from 'sweetalert2';
import 'animate.css';

import './styles.css';
import carimbo from '../../assets/corona.png';

export default function NewCampanha() {
  const [title, setTitle] = useState('');
  const [dateInicio, setInicio] = useState('');
  const [dateFim, setFim] = useState('');
  const [value, setValue] = useState('');
  const [description, setDescription] = useState('');
  const history = useHistory();

  const ong_id = localStorage.getItem('ongId');

  async function handleNewCampanha(e) {
    e.preventDefault();
    const data = { title, description, value, ong_id, dateInicio, dateFim };

    if (!title || !description || !value || !dateFim || !dateInicio) {
      Swal.fire({
        title: 'Preencha todos os campos',
        icon: 'error',
        showClass: {
          popup: 'animate__animated animate__zoomIn'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        },
      })
    } else {



      try {
        const response = await api.post('campanhas', data);

        Swal.fire({
          title: 'Campanha cadastrada com sucesso!',
          icon: 'success',
          showClass: {
            popup: 'animate__animated animate__zoomIn'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          },
        })

        history.push('/profile');
      } catch (err) {
        alert('Falha no Login, Tente Novamente!');
      }
    }
  }


  return (
    <div className="new-container">
      <div className="content">
        <section>
          <img src={carimbo} alt="" width="300px" />

          <h1>Cadastrar nova campanha</h1>
          <p>Descreva a campanha detalhadamente para encontrar um <b>Solidário</b> disposto a contribuir.</p>

          <Link className="back-link" to="/profile">
            <FiArrowLeft size={20} />
          Ver campanhas
        </Link>
        </section>

        <form onSubmit={handleNewCampanha}>
          <input
            value={title}
            placeholder="Título da campanha"
            onChange={e => setTitle(e.target.value)}
          />
          <textarea
            value={description}
            placeholder="Descrição"
            onChange={e => setDescription(e.target.value)} />

          <input
            value={value}
            placeholder="Valor em Reais"
            onChange={e => setValue(e.target.value)} />

          <input
            value={dateInicio}
            placeholder="Data de Início"
            onChange={e => setInicio(e.target.value)} />

          <input
            value={dateFim}
            placeholder="Data Final da campanha"
            onChange={e => setFim(e.target.value)} />

          <button className="button" type="submit">Cadastrar</button>

        </form>

      </div>
    </div>
  );
}