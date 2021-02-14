<<<<<<< HEAD
const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {
  async index(request, response) {
    try {
      const transactions = await connection('transactions').select('*');

      return response.json(transactions);

    } catch (error) {
      return response.json('Não localizado!');
    }
  },

  async create(request, response) {
    const { description, amount, date } = request.body;

    const id = crypto.randomBytes(4).toString('HEX');

    try {
      const transaction = await connection('transactions').insert({
        id,
        description,
        amount,
        date

      });

      return response.json({ id });
    } catch (error) {

      return response.status(401).json({ error: 'Operation not permitted.' });

    }
  },

  async delete(request, response) {
    const { id } = request.body;

    
    
    
    const transactions = await connection('transactions')
      .where('id', id)
      .select('id')
      .first();


    if (transactions.id !== id) {
      return response.status(401).json({ error: 'Operation not permitted.' });
    }

    await connection('transactions')
      .where('id', id)
      .delete();

    return response.status(204).send();
  }
  
=======
const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {
  async index(request, response) {
    try {
      const transactions = await connection('transactions').select('*');

      return response.json(transactions);

    } catch (error) {
      return response.json('Não localizado!');
    }
  },

  async create(request, response) {
    const { description, amount, date } = request.body;

    const id = crypto.randomBytes(4).toString('HEX');

    try {
      const transaction = await connection('transactions').insert({
        id,
        description,
        amount,
        date

      });

      return response.json({ id });
    } catch (error) {

      return response.status(401).json({ error: 'Operation not permitted.' });

    }
  },

  async delete(request, response) {
    const { id } = request.body;

    
    
    
    const transactions = await connection('transactions')
      .where('id', id)
      .select('id')
      .first();


    if (transactions.id !== id) {
      return response.status(401).json({ error: 'Operation not permitted.' });
    }

    await connection('transactions')
      .where('id', id)
      .delete();

    return response.status(204).send();
  }
  
>>>>>>> bb07243445a75e20011fe70023b59e9a0d03502c
};