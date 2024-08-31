import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/employees/active')
      .then(response => {
        console.log('Employee data:', response.data); 
        if (Array.isArray(response.data)) {
          setEmployees(response.data);
        } else {
          console.error('Expected an array but got:', response.data);
        }
      })
      .catch(error => console.error('Error fetching employees:', error));
  }, []);

  const handleEdit = (id) => {
    console.log('Edit employee with ID:', id);
  };

  const handleDeactivate = (id) => {
    axios.post(`http://localhost:8080/employees/deactivate/${id}`)
      .then(response => {
        console.log('Employee deactivated:', response.data);
        setEmployees(employees.filter(employee => employee.id !== id));
      })
      .catch(error => console.error('There was an error deactivating the employee!', error));
  };

  return (
    <div>
      <h1 className="header">Employee List</h1>
      <ul className="list">
        {employees.length > 0 ? (
          employees.map(employee => (
            <li key={employee.id} className="list-item">
              {employee.name} - {employee.position}
              <button className="button" onClick={() => handleEdit(employee.id)}>Edit</button>
              <button className="button" onClick={() => handleDeactivate(employee.id)}>Deactivate</button>
            </li>
          ))
        ) : (
          <p>No employees found.</p>
        )}
      </ul>
    </div>
  );
};

export default EmployeeList;
