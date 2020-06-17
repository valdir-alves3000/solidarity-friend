import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'

import api from '../../services/api';

import MsgAlert from '../Script/script';

import carimbo from '../../assets/corona.png';

export default function Register() {
  const [cnpj, setCnpj] = useState();
  const [name, setName] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();
  const [city, setCity] = useState();
  const [uf, setUf] = useState();
  const [endereco, setEndereco] = useState();
  const [necessidade, setNecessidade] = useState();

  const ong_id = localStorage.getItem('ongId');

  const history = useHistory();

  async function handRegister(e) {
    e.preventDefault();
    const data = {
      cnpj,
      name,
      phone,
      email,
      city,
      uf,
      endereco,
      necessidade,
    };

    if (!cnpj || !name || !phone || !email || !city || !endereco) {

      const a = "Obrigatório preencher todos os campos!";
      const b = "info";
      const c = "animate__fadeInDown";
      const d = "animate__rotateOutDownRight";
      const e = "";

      MsgAlert(a, b, c, d, e);

    } else {
      //
      try {

        const response = await api.post('instituicoes', data);

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

          <Link className="back-link" to="/Instituicoes">
            <FiArrowLeft size={20} />
            Voltar
          </Link>
        </section>

        <form onSubmit={handRegister} >
          <input
            placeholder="CNPJ"
            value={cnpj}
            onChange={e => setCnpj(e.target.value)}
          />
          <input
            placeholder="name"
            value={name}
            onChange={e => setName(e.target.value)}
          />

          <input
            placeholder="Telefone"
            value={phone}
            onChange={e => setPhone(e.target.value)}
          />

          <input placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          <input placeholder="cidade"
            value={city}
            onChange={e => setCity(e.target.value)}
          />

          <input placeholder="Endereço"
            value={endereco}
            onChange={e => setEndereco(e.target.value)}
          />

          <button className="button" type="submit">Cadastrar</button>

        </form>

      </div>
    </div>
  );
}