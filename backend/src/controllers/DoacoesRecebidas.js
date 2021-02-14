const connection = require('../database/connection');


module.exports = {
  async index(request, response) {
    const ong_id = request.headers.authorization;
    try {
      const doacoes = await connection('doacoes_recebidas')
      .where('ong_id', ong_id)
      .select('*');

      return response.json(doacoes);
    } catch (error) {
      return response.json(false);
    }   
  },

  async create(request, response) {
    const { id, date, value, doador, description, ong_id } = request.body;
console.log( { id, date, value, doador, description, ong_id });
    try {
      const validar = await connection('doacoes_avaliacao')
        .where('id', id)
        .select('date')
        .first();

        if(validar) {         

          await connection('doacoes_recebidas').insert({
            id,
            date,
            value,
            doador,
            description,
            ong_id,
          })

          await connection('doacoes_avaliacao').where('id',id).delete();

          return response.json (validar);
        } else {
          return response.json ("Código inválido!");
        }

    } catch (error) {
      return response.json("Não Localizado!!!");
    }
  }
}