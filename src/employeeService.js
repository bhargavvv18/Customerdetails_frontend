// employeeService.js

const BASE_URL = 'https://customerdetails.onrender.com'; // Replace with your backend server URL

export const createEmployee = async (employeeData) => {
  const response = await fetch(`${BASE_URL}/employee/addemp`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(employeeData),
  });
  return response.json();
};

export const getAllEmployees = async () => {
  const response = await fetch(`${BASE_URL}/employee/allemp`);
  return response.json();
};

export const getEmployeeById = async (id) => {
  const response = await fetch(`${BASE_URL}/employee/emp/${id}`);
  return response.json();
};

export const updateEmployee = async (id, employeeData) => {
  const response = await fetch(`${BASE_URL}/employee/update/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(employeeData),
  });
  return response.json();
};

export const deleteEmployee = async (id) => {
    const response = await fetch(`${BASE_URL}/employee/delete/${id}`, {
      method: 'DELETE',
    });
  
    if (!response.ok) {
      throw new Error('Failed to delete employee');
    }
  
    // No need to parse response body since DELETE requests typically don't have one
    // If you still want to return something, you can return null or a success message
    return null;
  };
  