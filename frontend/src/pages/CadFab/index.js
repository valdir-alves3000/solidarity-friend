import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';
import Swal from 'sweetalert2';
import 'animate.css';

import '../NewIncident/styles.css';
import carimbo from '../../assets/corona.png';

export default function NewCampanha() {
  const [unidade, setUnidade] = useState('');
  const [date, setDate] = useState('');
  const [quantidade, setQtda] = useState('');
  const [custo, setCusto] = useState('');
  const [description, setDescription] = useState('');

  const history = useHistory();

  const ong_id = localStorage.getItem('ongId');

  async function handleCadFab(e) {
    e.preventDefault();
    const data = { unidade, description, custo, ong_id, date, quantidade};

    if (!unidade || !description || !custo || !date || !quantidade) {
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
        const response = await api.post('/itensFabricados', data);

        Swal.fire({
          title: 'Produto cadastrado com sucesso!',
          icon: 'success',
          showClass: {
            popup: 'animate__animated animate__zoomIn'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          },
        })

        history.push('/CADItens');
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

          <h1>Cadastrar Produto</h1>
          <p>Descreva o produto que foi fabricado.</p>

          <Link className="back-link" to="/CADItens">
            <FiArrowLeft size={20} />
          Voltar
        </Link>
        </section>

        <form onSubmit={handleCadFab}>
        <input
            value={description}
            placeholder="Descrição do item"
            onChange={e => setDescription(e.target.value)} />

            
          <input
            value={quantidade}
            placeholder="Quantidade"
            onChange={e => setQtda(e.target.value)} />

          <input
            value={unidade}
            placeholder="Unidade, ex:(ml, litros"
            onChange={e => setUnidade(e.target.value)}
          />
         


          <input 
          placeholder="Custo de fabricação"
            value={custo}
            onChange={e => setCusto(e.target.value)} />

          <input
            value={date}
            placeholder="Data"
            onChange={e => setDate(e.target.value)} />

          <button className="button" type="submit">Cadastrar</button>

        </form>

      </div>
    </div>
  );
}