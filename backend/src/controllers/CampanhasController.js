const connection = require('../database/connection');


module.exports = {
  async index(request, response) {
    try {

      const [count] = await connection('campanhas').count();
           
      const campanhas = await connection('campanhas')
        .join('ongs', 'ongs.id', '=', 'campanhas.ong_id')       
        .select([
          'campanhas.*',
          'ongs.name',
          'ongs.email',
          'ongs.phone',
          'ongs.city',
          'ongs.uf'
        ]);
     
      return response.json(campanhas);
      
    } catch (error) {

      return response.json(false);
    }
  },

  async create(request, response) {
    const { title, description, value, ong_id, dateInicio, dateFim } = request.body;
    // const ong_id = request.headers.authorization;

    const [id] = await connection('campanhas').insert({
      title,
      description,
      value,
      ong_id,
      dateInicio,
      dateFim,
    });

    return response.json({ id });
  },

  async delete(request, response) {
    const { id, ong_id } = request.body;
    //const ong_id = request.headers.authorization;

    const campanha = await connection('campanhas')
      .where('id', id)
      .select('ong_id')
      .first();

    if (!campanha) {
      return response.status(401).json({ error: 'Não localizado' });

    } else if (campanha.ong_id !== ong_id) {
      return response.status(401).json({ error: 'Operação não Permitida.' });
    }

    await connection('campanhas').where('id', id).delete();

    return response.status(204).send();
  }
}