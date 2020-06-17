import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'

import api from '../../services/api';
import './styles.css';

import MsgAlert from '../Script/script';

import carimbo from '../../assets/corona.png';

export default function Register() {
  const [name, setName] = useState();
  const [endereco, setEndereco] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [city, setCity] = useState();
  const [password, setPassword] = useState();

  const history = useHistory();

  async function handRegister(e) {
    e.preventDefault();
    const select = document.getElementById('estado');
    const uf = select.options[select.selectedIndex].value;
    const data = {
      name,
      email,
      phone,
      city,
      uf,
      password,
      endereco,

    };

    if (!name || !endereco || !email || !phone || !city || !uf || !password) {

      const a = "Obrigatório preencher todos os campos!";
      const b = "info";
      const c = "animate__fadeInDown";
      const d = "animate__rotateOutDownRight";
      const e = "";

      MsgAlert(a, b, c, d, e);

    } else {
      //
      try {
        const response = await api.post('logar', { email });
        const cadastrado = (JSON.stringify(response.data));

        if (cadastrado == "true") {

          const a = "Email já cadastrado!";
          const b = "info";
          const c = "animate__tada";
          const d = "animate__fadeOutUp";
          const e = "Tente outro E-mail!";

          MsgAlert(a, b, c, d, e);

        } else {
          try {

            const response = await api.post('ongs', data);

            const a = (`Seu ID de Acesso é: ${response.data.id}`);
            const b = "info";
            const c = "animate__tada";
            const d = "animate__fadeOutUp";
            const e = "Obrigatório para Entrar!!!";

            MsgAlert(a, b, c, d, e);

            history.push('/');
          } catch (err) {

            const a = (`Falha no cadastro`);
            const b = "error";
            const c = "animate__flip";
            const d = "animate__fadeOutUp";
            const e = "Tente novamente";

            MsgAlert(a, b, c, d, e);
          }
        }

      } catch (error) {

      }
    }

  };

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={carimbo} alt="" width="300px" />

          <h1>Cadastro</h1>
          <p>Faça seu cadastro, acesse a plataforma e mostre como podemos ajudar na sua causa.</p>

          <Link className="back-link" to="/">
            <FiArrowLeft size={20} />
            Já tenho cadastro
          </Link>
        </section>

        <form onSubmit={handRegister} >
          <input
            placeholder="Nome da ETEC/FATEC"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <input
            placeholder="E-mail"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input placeholder="Phone"
            value={phone}
            onChange={e => setPhone(e.target.value)}
          />

          <input placeholder="Endereço"
            value={endereco}
            onChange={e => setEndereco(e.target.value)}
          />

          <input 
          type="password"
          placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />

          <div className="input-group">

            <input placeholder="Cidade"
              value={city}
              onChange={e => setCity(e.target.value)}

            />
            <select id="estado" >
              <option value="">UF</option><option value="AC">AC</option>
              <option value="AL">AL</option>
              <option value="AP">AP</option>
              <option value="AM">AN</option>
              <option value="BA">BA</option>
              <option value="CE">CE</option>
              <option value="DF">DF</option>
              <option value="ES">ES</option>
              <option value="GO">GO</option>
              <option value="MA">MA</option>
              <option value="MS">MS</option>
              <option value="MT">MT</option>
              <option value="MG">MG</option>
              <option value="PA">PA</option>
              <option value="PB">PB</option>
              <option value="PR">PR</option>
              <option value="PE">PE</option>
              <option value="PI">PI</option>
              <option value="RJ">RJ</option>
              <option value="RN">RN</option>
              <option value="RS">RS</option>
              <option value="RO">RO</option>
              <option value="RR">RR</option>
              <option value="SC">RC</option>
              <option value="SP">SP</option>
              <option value="SE">SE</option>
              <option value="TO">TO</option>
            </select>

          </div>

          <button className="button" type="submit">Cadastrar</button>

        </form>

      </div>
    </div>
  );
}