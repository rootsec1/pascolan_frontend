import React from 'react';
import {
  Container,
  TextField,
  Card,
  CardContent,
  FormLabel,
  FormControlLabel,
  Radio,
  RadioGroup,
  Button,
  Paper,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableContainer,
  TableHead
} from '@material-ui/core';
import './sanfrancisco.css';
import axios from 'axios';

class App extends React.Component {
  state = {
    type: 'Junior',
    data: [],
    average: 0,
    empId: null,
    name: null,
    salary: null
  }

  componentDidMount() {
    this.createNewEmployee = this.createNewEmployee.bind(this);
    this.renderTableComponent = this.renderTableComponent.bind(this);
    this.getHighestPaidEmployees = this.getHighestPaidEmployees.bind(this);
    this.getAverageSalaryType0 = this.getAverageSalaryType0.bind(this);
    this.renderTableComponent();
  }

  render() {
    return (
      <Container>
        <div style={styles.textStyle}>Hotel Employee Management System</div>

        <Card variant="outlined" style={{marginTop: 32}}>
          <CardContent>
            <div style={{fontSize: 32, fontWeight: 100, marginBottom: 16}}>Add New Employee</div>
            <form>
              <TextField value={this.state.empId} onChange={ event => this.setState({ empId: event.target.value }) } name='emp_id' id="emp_id" label="Employee ID" variant="outlined" />&emsp;
              <TextField value={this.state.name} onChange={ event => this.setState({ name: event.target.value }) } name='name' id="name" label="Employee Name" variant="outlined" />&emsp;
              <TextField value={this.state.salary} onChange={ event => this.setState({ salary: event.target.value }) } name='salary' id="salary" label="Employee Salary" variant="outlined" />&emsp;
              <FormLabel component="legend" style={{marginTop: 16}}>Employee Type</FormLabel>
              <RadioGroup aria-label="Type" name={this.state.type} value={this.state.type} onChange={ (event) => this.setState({ type: event.target.value })}>
                <FormControlLabel value={'Senior'} control={<Radio />} label="Senior" />
                <FormControlLabel value={'Junior'} control={<Radio />} label="Junior" />
              </RadioGroup>

              <Button onClick={this.createNewEmployee} variant="outlined" color="primary" style={{marginTop: 24}}>Create Employee</Button>&emsp;
              <Button onClick={this.renderTableComponent} variant="outlined" color="primary" style={{marginTop: 24}}>List All Employess</Button>&emsp;
              <Button onClick={this.getHighestPaidEmployees} variant="outlined" color="primary" style={{marginTop: 24}}>Highest Paid Employees</Button>&emsp;
              <Button onClick={this.getAverageSalaryType0} variant="outlined" color="primary" style={{marginTop: 24}}>Average Salary of Type 0</Button>
              
            </form>
          </CardContent>
        </Card>

        <Card style={{marginTop: 64}}>
          <CardContent>
            <div style={{fontSize: 32, fontWeight: 100, marginBottom: 16}}>Employee List</div>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Employee ID</TableCell>
                    <TableCell align="right">Name</TableCell>
                    <TableCell align="right">Salary</TableCell>
                    <TableCell align="right">Type</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    this.state.data.map(row => (
                      <TableRow key={row._id}>
                        <TableCell component="th" scope="row">{row.emp_id}</TableCell>
                        <TableCell align="right">{row.name}</TableCell>
                        <TableCell align="right">{row.salary}</TableCell>
                        <TableCell align="right">{row.type}</TableCell>
                      </TableRow>
                    ))
                  }
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Container>
    );
  }

  createNewEmployee() {
    const postBody = {
      emp_id: this.state.empId,
      name: this.state.name,
      salary: parseInt(this.state.salary),
      type: this.state.type.toLowerCase()
    };
    axios.post('https://damp-chamber-13772.herokuapp.com/api/v1/employee', postBody)
      .then(resp => {
        alert('New employee created with Employee ID '+resp.data.data['emp_id']);
        this.renderTableComponent();
      })
      .catch(err => console.log(err));
  }

  renderTableComponent() {
    axios.get('https://damp-chamber-13772.herokuapp.com/api/v1/employee')
      .then(resp => {
        const rows = resp.data["data"];
        this.setState({ data: rows });
      })
      .catch(err => console.log(err));
  }

  getHighestPaidEmployees() {
    axios.get('https://damp-chamber-13772.herokuapp.com/api/v1/employee/salary/max')
      .then(resp => {
        const rows = resp.data["data"];
        this.setState({ data: rows });
      })
      .catch(err => console.log(err));
  }

  getAverageSalaryType0() {
    axios.get('https://damp-chamber-13772.herokuapp.com/api/v1/employee/salary/average/0')
      .then(resp => {
        const average = resp.data.data[0].salary;
        alert('Average salary of type 0 employees is INR '+average);
      })
      .catch(err => console.log(err));
  }
};

const styles = {
  backgroundStyle: {
    backgroundColor: 'purple'
  },
  textStyle: {
    fontWeight: 100,
    fontSize: 64
  }
};

export default App;
