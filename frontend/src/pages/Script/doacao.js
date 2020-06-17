import { useEffect, useState } from 'react';

import api from '../../services/api';

async function Doacao() {

  const [data, setData] = useState('');

  try {
    const response = await api.post('CountDoados');
    setData(response.data);
  } catch (err) {
  }
setData("Não");


}

export default data;