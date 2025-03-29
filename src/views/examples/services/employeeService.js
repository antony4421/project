import axios from "axios";

const API_URL = "http://localhost:8005/api/employees";

const EmployeeService = {
  getEmployees: () => axios.get(API_URL), // ✅ Updated function name
  getEmployeeById: (id) => axios.get(`${API_URL}/${id}`),
  addEmployee: (employee) => axios.post(API_URL, employee),
  updateEmployee: (id, employee) => axios.put(`${API_URL}/${id}`, employee),
  deleteEmployee: (id) => axios.delete(`${API_URL}/${id}`)
};

export default EmployeeService;
