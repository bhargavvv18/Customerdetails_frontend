import React, { useState, useEffect } from 'react';
import { createEmployee, getAllEmployees, getEmployeeById, updateEmployee, deleteEmployee } from './employeeService';
import 'bootstrap/dist/css/bootstrap.min.css';


const EmployeeComponent = () => {
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: ''
  });

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    const response = await getAllEmployees();
    setEmployees(response);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createEmployee(formData);
    setFormData({
      name: '',
      email: '',
      phone: '',
      city: ''
    });
    loadEmployees();
  };

  const handleUpdate = async (id) => {
    await updateEmployee(id, formData);
    loadEmployees();
  };

  const handleDelete = async (id) => {
    await deleteEmployee(id);
    loadEmployees();
  };

  return (
    <div className="container py-4" style={{ backgroundColor: '#f0f0f0' }}>
      <h2 className="text-center mb-4">Create Employee</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name:</label>
          <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email:</label>
          <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">Phone:</label>
          <input type="text" className="form-control" id="phone" name="phone" value={formData.phone} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="city" className="form-label">City:</label>
          <input type="text" className="form-control" id="city" name="city" value={formData.city} onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      <h2 className="mt-5">All Employees</h2>
      <ul className="list-group mt-3">
        {employees.map((employee, index) => (
          <li key={employee._id} className={`list-group-item ${index % 2 === 0 ? 'bg-light' : 'bg-white'}`}>
            <div>
              <span>{employee.name}</span> - <span>{employee.email}</span> - <span>{employee.phone}</span> - <span>{employee.city}</span>
              <button className="btn btn-info btn-sm ms-2" onClick={() => handleUpdate(employee._id)}>Update</button>
              <button className="btn btn-danger btn-sm ms-1" onClick={() => handleDelete(employee._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeComponent;

