const connection = require('../database/connection');

module.exports = {
  
  async index(request, response) {
    const ong_id = request.headers.authorization;
    console.log(ong_id);
    const itens = await connection('cadItensFabricados')
    .where('ong_id', ong_id)
    .select('*');

    return response.json(itens);
  },

  async create (request, response) {
    const { quantidade, description, unidade, custo, date, ong_id} = request.body;
    
    const [id] = await connection('cadItensFabricados').insert({
      quantidade,
      description,
      unidade,
      custo,
      date,
      ong_id,
    });

    return response.json({id});
  }
}