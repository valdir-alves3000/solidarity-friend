const crypto = require('crypto');
const connection = require('../database/connection');


module.exports = {
  async index(request, response) {
    try {
      const ongs = await connection('ongs').select('*');

      return response.json(ongs);
      
    } catch (error) {
      return response.json('Não localizado!');
    }   
  },

  async create(request, response) {
    const { name, email, phone, city, uf, password, endereco } = request.body;

    const id = crypto.randomBytes(4).toString('HEX');
    const data = {id, name, email, phone, city, uf, password, endereco};
   
    try {
      const ong = await connection('ongs').insert({
        id,
        name,
        email,
        phone,
        city,
        uf,
        endereco,
        password,
      });

      return response.json({ id });
    } catch (error) {

      return response.status(401).json({ error: 'Operation not permitted.' });
   
    }  
  },

  async autenticOng(request, response) {
    const { id } = request.body;

    const ongs = await connection('ongs')
      .where('id', id)
      .select('id')
      .first();
    if (ongs.id != id) {
      return response.status(204).send();
    } else {
      return response.json(ongs);
    }
  },

  async delete(request, response) {
    const {id} = request.body;

    const ongs = await connection('ongs')
      .where('id', id)
      .select('id');

    if (ongs.id !== id) {
      return response.status(401).json({ error: 'Operation not permitted.' });
    }

    await connection('ongs').where('id', id).delete();
    return response.status(204).send();

  }
};