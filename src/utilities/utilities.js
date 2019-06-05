import axios from 'axios';

export const getPersonas = (url, personagens, resolve, reject) => {
  axios.get(url)
    .then(resp => {
      const apiPersonas = personagens.concat(resp.data.results);
      if (resp.data.next !== null) {
        getPersonas(resp.data.next, apiPersonas, resolve, reject);
      } else {
        resolve(apiPersonas);
      }
    })
    .catch(error => {
      console.log(error);
      reject('Alguma coisa deu errado!');
    })
}
