const fs = require('fs');
const { resolve } = require('path');
let employees = [];
let departments = [];

module.exports.initialize = () => {
  return new Promise((resolve, reject) => {
    fs.readFile('./data/employees.json', (err, data) => {
      if (err) {
        reject(err);
      }
      employees = JSON.parse(data);
      resolve();
    });
    fs.readFile('./data/departments.json', (err, data) => {
      if (err) {
        reject(err);
      }
      departments = JSON.parse(data);
      resolve();
    });
  });
};

module.exports.getAllEmployees = function () {
  return new Promise((resolve, reject) => {
    if (employees.length == 0) {
      reject('No Results Returned');
    }
    resolve(employees);
  });
};

module.exports.addEmployee = function (employeeData) {
  return new Promise((resolve, reject) => {
    if (employeeData.isManager == undefined) 
    employeeData.isManager = false;
    else 
    employeeData.isManager = true;
    employeeData.employeeNum = employees.length + 1;
    employees.push(employeeData);
    resolve(
      `Employee #${employeeData.employeeNum} has been added successfully!`
      );
    });
  };
  
  module.exports.getDepartments = function () {
    return new Promise((resolve, reject) => {
      if (departments.length == 0) {
        reject('No Results Returned');
      }
      resolve(departments);
    });
  };
  
  module.exports.getManagers = function () {
    return new Promise((resolve, reject) => {
      var managers = [];
      for (let i = 0; i < employees.length; i++) {
        if (employees[i].isManager == true) {
          managers.push(employees[i]);
        }
      }
      if (managers.length == 0) {
        reject('No Results Returned');
      }
      resolve(managers);
    });
  };
  
module.exports.getEmployeesByStatus = (status) => {
  return new Promise((resolve, reject) => {
    var empByStatus = [];
    empByStatus = employees.filter((employee) =>{
      return employee.status == status;
    });
    if (empByStatus.length == 0) reject('No Employee by this status found!');
    else resolve(empByStatus);
  });
};

module.exports.getEmployeesByDepartment = (department) => {
  return new Promise((resolve, reject) => {
    var empByDepartment = [];
    empByDepartment = employees.filter((employee) =>{
      return employee.department == department;
    });
    if (empByDepartment.length == 0) reject('No Employee by this status found!');
    else resolve(empByDepartment);
  });
};

module.exports.getEmployeesByManager = (manager) => {
  return new Promise((resolve, reject) => {
    var empByManager = [];
    empByManager = employees.filter((employee) =>{
      return employee.employeeManagerNum == manager; 
    });
    if (empByManager.length == 0) reject('No Employee by this status found!');
    else resolve(empByManager);
  });
};

module.exports.getEmployeeByNum = (num) => {
  return new Promise((resolve, reject) => {
    var empByNum = employees.filter((employee) =>{
      return employee.employeeNum == num; 
    });
    if (empByNum.length == 0) reject('No Employee by this status found!');
    else resolve(empByNum);
  });
};