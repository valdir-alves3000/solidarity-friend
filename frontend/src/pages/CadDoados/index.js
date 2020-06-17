import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'

import api from '../../services/api';
import './styles.css';

import MsgAlert from '../Script/script';

import carimbo from '../../assets/corona.png';

export default function Register() {
  const [description, setdescription] = useState();
  const [quantidade, setQuantidade] = useState();
  const [custo, setCusto] = useState();
  const [date, setDate] = useState();
  const [unidade, setUnidade] = useState();

  const ong_id = localStorage.getItem('ongId');

  const history = useHistory();

  async function handRegister(e) {
    e.preventDefault();
    const data = {
      description,
      quantidade,
      custo,
      date,
      unidade,
      ong_id,
    };

    if (!description || !quantidade || !custo || !date || !unidade) {

      const a = "Obrigatório preencher todos os campos!";
      const b = "info";
      const c = "animate__fadeInDown";
      const d = "animate__rotateOutDownRight";
      const e = "";

      MsgAlert(a, b, c, d, e);

    } else {
      //
      try {

        const response = await api.post('cadItensDoados', data);

        const a = (`Cadastro Realizado com Sucesso!`);
        const b = "success";
        const c = "animate__tada";
        const d = "animate__fadeOutUp";
        const e = "Obrigatório para Entrar!!!";

        MsgAlert(a, b, c, d, e);

        history.push('/ItensDoados');
      } catch (err) {

        const a = (`Falha no cadastro`);
        const b = "error";
        const c = "animate__flip";
        const d = "animate__fadeOutUp";
        const e = "Tente novamente";

        MsgAlert(a, b, c, d, e);
      }
    }

  };

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={carimbo} alt="" width="300px" />

          <h1>Cadastro de Doação</h1>
          <p>Faça o cadastro dos produtos a serem doados.</p>

          <Link className="back-link" to="/ItensDoados">
            <FiArrowLeft size={20} />
            Voltar
          </Link>
        </section>

        <form onSubmit={handRegister} >
          <input
            placeholder="Descrição"
            value={description}
            onChange={e => setdescription(e.target.value)}
          />
          <input
            placeholder="Quantidade"
            value={quantidade}
            onChange={e => setQuantidade(e.target.value)}
          />

          <input
            placeholder="Unidade: 'ml/litro/Kg'"
            value={unidade}
            onChange={e => setUnidade(e.target.value)}
          />

          <input placeholder="Custo"
            value={custo}
            onChange={e => setCusto(e.target.value)}
          />

          <input placeholder="Date"
            value={date}
            onChange={e => setDate(e.target.value)}
          />

          <button className="button" type="submit">Cadastrar</button>

        </form>

      </div>
    </div>
  );
}