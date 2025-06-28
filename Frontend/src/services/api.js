// import axios from 'axios';

// const API_BASE_URL = 'http://localhost:5000/api';

// const api = axios.create({
//   baseURL: API_BASE_URL,
//   timeout: 10000, // 10 second timeout
// });

// // Request interceptor to add auth token
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // Response interceptor for error handling
// api.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     if (error.response?.status === 401) {
//       // Token expired or invalid
//       localStorage.removeItem('token');
//       localStorage.removeItem('loggedInUser');
//       window.location.href = '/';
//     }
//     return Promise.reject(error);
//   }
// );

// // Auth API
// export const authAPI = {
//   login: (email, password) => api.post('/auth/login', { email, password }),
//   verifyToken: () => api.get('/auth/verify'),
// };

// // Employee API
// export const employeeAPI = {
//   getAllEmployees: () => api.get('/employees'),
//   getEmployeeById: (id) => api.get(`/employees/${id}`),
//   getEmployeesByManager: (managerId) => api.get(`/employees/managed/${managerId}`),
//   createManager: (data) =>
