const connection = require('../database/connection');

module.exports = {

  async itensDoados(request, response) {
    const ong_id = request.headers.authorization;

    const [itens] = await connection('cadItensDoados')
    .count('ong_id')
      .where('ong_id', ong_id);
      //.select('*')      
      
console.log(itens);

    const result = itens['count(`ong_id`)'];

    return response.json(result);
  },

  async itensFabricados(request, response) {
    const ong_id = request.headers.authorization;
    
    const [itens] = await connection('cadItensFabricados')
      .where('ong_id', ong_id)
      .sum('quantidade');

    const result = itens['sum(`quantidade`)'];
    
      return response.json(result); 
  },

  async campanhas(request, response) {
    const [total] = await connection('campanhas').count();

    try {
      const result = total['count(*)'];

      return response.json(result);
    } catch (error) {
      return response.json(false);
    }
  },

  async campanhasOng(request, response) {

    const ong_id = request.headers.authorization;
    const [total] = await connection('campanhas').count().where('ong_id', ong_id);

    try {
      const result = total['count(*)'];

      return response.json(result);
    } catch (error) {
      return response.json(false);
    }
  },

  async doacoesAvaliacao(request, response) {
    const ong_id = request.headers.authorization;
    try {

      const [total] = await connection('doacoes_avaliacao').count('ong_id').where('ong_id', ong_id);

      const result = total["count(`ong_id`)"];

      return response.json(result);
    } catch (error) {
      return response.json(false);
    }
  },

  async doacoesRecebidas(request, response) {
    const ong_id = request.headers.authorization;
    console.log(ong_id);
    try {
      const [total] = await connection('doacoes_recebidas').count('ong_id').where('ong_id', ong_id);
      const result = total['count(`ong_id`)'];

      return response.json(result);

    } catch (error) {
      return response.json(false);
    }
  },

  async instituicoes(request, response) {
    try {
      const [count] = await connection('instituicao').count();
      const result = count['count(*)'];

      return response.json(result);
    } catch (error) {
      return response.json('Erro na contagem');
    }
  }
}