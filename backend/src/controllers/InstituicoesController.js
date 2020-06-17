const connection = require('../database/connection');

module.exports = {
  async index(request, response) {
    try {
      const instituicao = await connection('instituicao').select('*');

      return response.json(instituicao);
    } catch (error) {
      return response.json(false);
    }
  },

  async create(req, res) {
    const { cnpj, name, phone, email, city, endereco, uf, necessidade } = req.body;
    
    try {
      const instituicao = await connection('instituicao').insert({
        cnpj,
        name,
        phone,
        email,
        city,
        endereco,
        uf,
        necessidade,
      })

      res.json(instituicao);
    } catch (error) {
      return res.json("Erro no cadastro.");
    }
  }
}
