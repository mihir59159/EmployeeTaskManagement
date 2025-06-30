import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Auth API
export const authAPI = {
  login: (email, password) => api.post('/auth/login', { email, password }),
};

// Employee API
export const employeeAPI = {
  getAllEmployees: () => api.get('/employees'),
  getEmployee:(id)=> api.get(`/employees/${id}`),
  getEmployeesByManager: (managerId) => api.get(`/employees/managed/${managerId}`),
  createManager: (data) => api.post('/employees/create-manager', data),
  createEmployee: (data) => api.post('/employees/create-employee', data),
  updateRole: (id, role) => api.put(`/employees/update-role/${id}`, { role }),
};

// Task API
export const taskAPI = {
  createTask: (taskData) => api.post('/tasks/create', taskData),
  updateTaskStatus: (employeeId, taskId, status) => 
    api.put(`/tasks/update-status/${employeeId}/${taskId}`, { status }),
  withdrawTask: (employeeId, taskId) => 
    api.put(`/tasks/withdraw/${employeeId}/${taskId}`),
};

export default api;
