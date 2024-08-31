import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';

const AddEmployee = () => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [hireDate, setHireDate] = useState('');
  const [directReports, setDirectReports] = useState('');
  const [active, setActive] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    const employee = {
      id: parseInt(id, 10),
      name,
      position,
      hireDate,
      directReports: directReports.split(',').map(reportId => parseInt(reportId.trim(), 10)),
      active
    };

    axios.post('http://localhost:8080/employees/add', employee)
      .then(response => {
        console.log('Employee added:', response.data);
      })
      .catch(error => {
        console.error('There was an error adding the employee!', error);
      });
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <label>
        ID:
        <input
          type="number"
          value={id}
          onChange={(e) => setId(e.target.value)}
          required
        />
      </label>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <label>
        Position:
        <input
          type="text"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          required
        />
      </label>
      <label>
        Hire Date:
        <input
          type="date"
          value={hireDate}
          onChange={(e) => setHireDate(e.target.value)}
          required
        />
      </label>
      <label>
        Direct Reports (comma-separated IDs):
        <input
          type="text"
          value={directReports}
          onChange={(e) => setDirectReports(e.target.value)}
        />
      </label>
      <label>
        Active:
        <input
          type="checkbox"
          checked={active}
          onChange={(e) => setActive(e.target.checked)}
        />
      </label>
      <button type="submit">Add Employee</button>
    </form>
  );
};

export default AddEmployee;
