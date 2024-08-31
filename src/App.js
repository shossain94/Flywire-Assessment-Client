
import './App.css';
import AddEmployee from './component/AddEmployee';
import EmployeeList from './component/EmployeeList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <AddEmployee />
        <EmployeeList />
      </header>
    </div>
  );
}

export default App;
