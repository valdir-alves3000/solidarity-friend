const connection = require('../database/connection');

module.exports = {
  async create(request, response) {
    const { id, password } = request.body;

    const ong = await connection('ongs')
      .where({ id: id, password: password })
      .select('name')
      .first();

    if (!ong) {
      return response.status(400).json({ error: 'Usuário ou senha incorretos.' });
    }
    return response.json(ong);
  },

  async logar(request, response) {
    const { email } = request.body;

    const ong = await connection('ongs')
      .where('email', email)
      .select('name')
      .first();   

      if(!ong) {
        return response.json(false);
      }else {
      return response.json(true);
    }
  }     
}