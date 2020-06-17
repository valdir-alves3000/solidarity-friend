import React, { useState, useEffect } from 'react';

import { Link, useHistory } from 'react-router-dom';
import carimbo from '../../assets/corona.png';
import { FiArrowLeft } from 'react-icons/fi';

import Swal from 'sweetalert2';
import 'animate.css';

import './styles.css';

import api from '../../services/api';

export default function Doador() {
  const [value, setValor] = useState(0);
  const [doador, setDoador] = useState();

  const title = localStorage.getItem('title');
  const ong_id = localStorage.getItem('ong_id');
  const varHoje = new Date();
  const date = "05/05/2020";

  const history = useHistory();


  useEffect(() => {
  
  }, []);

  function handleAlert() {
    Swal.fire({
      title: 'Como é bom ser Solidario',
      text: 'Parabéns por conquistar mais um sorriso!',
      icon: 'success',
      showClass: {
        popup: `animate__animated animate__tada`
      },
      hideClass: {
        popup: `animate__animated animate__slideOutDown`
      },
    })
  }

  function handleFormat(e) {
    const response = (Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(e));
    return response;
  }

  function handleCartao() {
    const varBoleto = document.querySelector('#boleto');
    const varCartao = document.querySelector('#doacao');
    const varPessoais = document.querySelector('#pessoais');

    varPessoais.setAttribute('class', 'hide');
    varCartao.removeAttribute('class', 'hide');
    varBoleto.setAttribute('class', 'hide');
  }

  function handleBoleto() {
    const varBoleto = document.querySelector('#boleto');
    const varCartao = document.querySelector('#doacao');
    const varPessoais = document.querySelector('#pessoais');

    varPessoais.setAttribute('class', 'hide');
    varCartao.setAttribute('class', 'hide');
    varBoleto.removeAttribute('class', 'hide');
  }

  async function handleFinalizar(e) {

    const description = `Doação via ${e}.`;
    const data = { title, date, value, doador, description, ong_id };

    try {
      const response = await api.post('/avaliardoacoes', data);
      handleAlert();
      history.push('/solidario');

    } catch (error) {
      return alert(`falha na conexao.`);
    }
  }

  return (
    <div className="container-pagamento">
      <div className="pessoais" id="pessoais">
        <input onChange={e => setDoador(e.target.value)}
          id="name"
          placeholder="Digite seu nome completo" />

        <input id="email" placeholder="Digite seu email" />
        <input id="conf-email" placeholder="Confirme seu email" />
        <input id="doc" placeholder="Digite o número do documento" />

        <input id="digito" placeholder="XX" />
        <input id="number" placeholder="9 99999999" />

        <h2>Sua Doação será</h2>
        <input id="value"
          placeholder="00"
          type="number"
          min="10" step="5"
          onChange={e => setValor(e.target.value)}
        />

        <p>Valor da doação</p>
        <div id="total">

          <h4 id="desc-total">{handleFormat(value)}</h4>
        </div>

        <button id="btn-proximo" onClick={handleCartao}></button>
      </div>

      <div id="doacao" className="hide">
        <img onClick={handleBoleto} />
        <input id="n_cartao" placeholder="Digite somente números" />
        <input id="titular" placeholder="Nome do tituult do cartão" />
        <select id="sel_mes">
          <option value="">MM</option>
          <option value="01">Janeiro</option>
          <option value="02">Fevereiro</option>
          <option value="03">Março</option>
          <option value="04">Abril</option>
          <option value="05">Maio</option>
          <option value="06">Junho</option>
          <option value="07">Julho</option>
          <option value="08">Agosto</option>
          <option value="09">Setembro</option>
          <option value="10">Outubro</option>
          <option value="11">Novembro</option>
          <option value="12">Dezembro</option>


        </select>
        <select id="sel_ano">
          <option value="" >AA</option>
          <option value="2020">2020</option>
          <option value="2021">2021</option>
          <option value="2022">2022</option>
          <option value="2023">2023</option>
          <option value="2024">2024</option>
          <option value="2024">2024</option>
          <option value="2025">2025</option>
          <option value="2026">2026</option>
          <option value="2027">2027</option>
          <option value="2028">2028</option>
          <option value="2029">2029</option>
          <option value="2030">2030</option>
          <option value="2031">2031</option>
          <option value="2032">2032</option>
          <option value="2033">2033</option>
          <option value="2034">2034</option>
          <option value="2034">2034</option>
          <option value="2035">2035</option>
          <option value="2036">2036</option>
          <option value="2037">2037</option>
          <option value="2038">2038</option>
          <option value="2039">2039</option>
          <option value="2040">2040</option>
          <option value="2041">2041</option>
          <option value="2042">2042</option>
          <option value="2043">2043</option>
          <option value="2044">2044</option>
          <option value="2045">2045</option>
          <option value="2046">2046</option>
          <option value="2047">2047</option>
          <option value="2048">2048</option>
          <option value="2049">2049</option>
          <option value="2050">2050</option>
          <option value="2051">2051</option>
        </select>

        <input id="codigo" placeholder="3 ou 4 dígitos" />

        <select id="parcela" >
          <option value={value}>1 x de {handleFormat(value)}</option>
          <option value={value}>2 x de {handleFormat(value / 2)}</option>
          <option value={value}>3 x de {handleFormat(value / 3)}</option>
          <option value={value}>4 x de {handleFormat(value / 4)}</option>
          <option value={value}>5 x de {handleFormat(value / 5)}</option>
          <option value={value}>6 x de {handleFormat(value / 6)}</option>
          <option value={value}>7 x de {handleFormat(value / 7)}</option>
          <option value={value}>8 x de {handleFormat(value / 8)}</option>
          <option value={value}>9 x de {handleFormat(value / 9)}</option>
          <option value={value}>10 x de {handleFormat(value / 10)}</option>
        </select>

        <h2>Sua Doação será</h2>

        <div id="total">

          <h4 id="desc-total">{handleFormat(value)}</h4>
        
        </div>

        <button id="btn-doar" onClick={() => handleFinalizar("cartão de credito")}>Doar Agora</button>
      </div>

      <div id="boleto" className="hide">
        <img onClick={handleCartao} />
        <button name="gerar_boleto" onClick={() => handleFinalizar("boleto")} ></button>
        <h2>Sua Doação será</h2>
        <div id="total">

          <h4 id="desc-total">{handleFormat(value)}</h4>
        </div>
      </div>

    <div id="footer">
      
      <span>tela para teste:</span>
      <a href="https://pay.hotmart.com/U7980475B?off=b9m9hk0k"><p>fonte: Pay Hot Mart</p></a> 
      
    </div>
    </div>
    
  );
}