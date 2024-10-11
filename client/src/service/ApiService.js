import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const apiService = {
  register: async (data) => {
    const config = {
      method: 'post',
      url: `${API_URL}/api/register`,
      headers: {
        'Content-Type': 'application/json',
      },
      data,
    };
    return axios(config);
  },

  login: async (data) => {
    const config = {
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}/api/auth`,
      headers: {
        'Content-Type': 'application/json',
      },
      data,
    };
    return axios(config);
  },

  addTask: async (data,token) => {
    const config = {
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}/tasks`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data,
    };
    return axios(config);
  },


  getAllTasks: async (token) => {
    const config = {
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}/tasks`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,

      },
    };
    return axios(config);
  },

  getSingleTask: async (id, token) => {
    const config = {
      method: 'get',
      url: `${API_URL}/tasks/${id}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    return axios(config);
  },

  updateTask: async (id, data,token) => {
    const config = {
      method: 'put',
      url: `${API_URL}/tasks/${id}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data,
    };
    return axios(config);
  },

  deleteTask: async (id,token) => {
    const config = {
      method: 'delete',
      url: `${API_URL}/tasks/${id}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    return axios(config);
  },
};

export default apiService;
