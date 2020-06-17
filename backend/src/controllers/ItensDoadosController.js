const connection = require('../database/connection');

module.exports = {
  async index(request, response) {
    const ong_id = request.headers.authorization;
try {
  
  const itens = await connection('cadItensDoados')
  .where('ong_id', ong_id)
  .select('*');
  if(!itens){
    return response.json("Falha na localização");
  }
  return response.json(itens);

} catch (error) {
  return response.json("Falha na localização da Ong.");  
}
},

  async create (request, response) {
    const { quantidade, description, unidade, custo, date, ong_id } = request.body;
    
    const [id] = await connection('cadItensDoados').insert({
      quantidade,
      description,
      unidade,
      custo,
      date,
      ong_id,
    });

    return response.json({id});
  },

  async delete(request, response) {
    const { id } = request.body;

    const cadItensDoados = await connection('cadItensDoados')
    .where('id', id)
    .select('id')
    .first();

    if(cadItensDoados.id  !== id) {
      return response.status(401).json({ error: 'Operation not permitted.'});
    }

    await connection('cadItensDoados').where('id', id).delete();
    return response.status(204).send;

  }
}

