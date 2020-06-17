const connection = require('../database/connection');

module.exports = {

  async logar(request, response) {
    const email = request.body;
    try {
      const ong = await connection('ongs')
        .where('email', email)
        .select('*')

      if (!ong) {
        return true;
      } else {
        return response.json(ong);
      }
    } catch (error) {
      response.status(401).json({ error: 'Falha na Operação!' });
    }
  }

}