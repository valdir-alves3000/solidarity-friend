const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {
  async indexExat(request, response) {
    const id = request.headers.authorization;
    try {
      const doacoes = await connection('doacoes_avaliacao')
        .where('id', id)
        .select('*');        

      return response.json(doacoes);
    } catch (error) {
      return response.json(false);
    }
  },

  async index(request, response) {
    const ong_id = request.headers.authorization;
    try {
      const doacoes = await connection('doacoes_avaliacao')
        .where('ong_id', ong_id)
        .select('*');

      return response.json(doacoes);
    } catch (error) {
      return response.json(false);
    }
  },

  async delete(request, response) {
    const { id } = request.body;
    console.log(id);
    try {

      const doacao = await connection('doacoes_avaliacao')
      
        .where('id', id)
        .select('id')
        .first();

      if (doacao.id !== id) {
        return response.status(401).json({ error: 'Operation not permitted.' });
      }

      await connection('doacoes_avaliacao').where('id', id).delete();
      return response.status(204).send();

    } catch (error) {
      return response.status(401).json({ error: 'Operação não permitida.' });
    }
  },

  async create(request, response) {
    const { date, value, doador, description, ong_id } = request.body;
    const id = crypto.randomBytes(4).toString('HEX');

    try {
      const doacoes = await connection('doacoes_avaliacao').insert({
        id,
        date,
        value,
        doador,
        description,
        ong_id,
      })
      return response.json({ id });

    } catch (error) {
      return response.status(401).json({ error: "Operação não permitida!" });
    }
  }
}
