const connection = require('../database/connection');

module.exports = {
    async index (request, response) {
      const { page = 1} = request.query;
      const ong_id = request.headers.authorization;  
      
      const [count] = await connection('campanhas').count().where('ong_id', ong_id);
      const totalPage = ((count['count(*)'])); 
      
        const campanhas = await connection('campanhas')
        .where('ong_id', ong_id)
        .limit(6)
        .offset( (page - 1) * 6 )        
        .select('*');

        return response.json(campanhas);
    },

    async delete(request, response) {
        const { id, ong_id} = request.body;
        //const ong_id = request.headers.authorization;
        
        const campanha = await connection('campanhas')
        .where('id', id)
        .select('ong_id')
        .first();
    
        if(!campanha){
          return response.status(401).json({ error: 'Não localizado'});
        
        }else if(campanha.ong_id !== ong_id) {
          return response.status(401).json({ error: 'Operação não Permitida.'});
        }
    
        await connection('campanhas').where('id', id).delete();
    
        return response.status(204).send();
      }
}