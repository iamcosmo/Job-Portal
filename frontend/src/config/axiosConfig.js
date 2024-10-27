import axios from 'axios';
import React from 'react';

const instance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL, 
});

export default instance;