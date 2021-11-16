import axios from 'axios';

const BASE_URL = '/api/persons';

const getAll = () => {
  return axios
      .get(BASE_URL)
      .then((response) => response.data);
};

const create = (newPerson) => {
  return axios
      .post(BASE_URL, newPerson)
      .then((response) => response.data);
};

const update = (id, newObject) => {
  return axios
      .put(`${BASE_URL}/${id}`, newObject)
      .then((response) => response.data);
};

const del = (id) => {
  return axios
      .delete(`${BASE_URL}/${id}`)
      .then((response) => response.data);
};

export default {
  getAll,
  create,
  update,
  del,
};
