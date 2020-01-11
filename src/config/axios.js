import axios from 'axios';

const clienteAxios = axios.create({
    baseURL: 'https://my-json-server.typicode.com/EliasFunes/productos'
});

export default clienteAxios;