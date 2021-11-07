query{
  getAllEmployee{
    employee_name
    salary
    employee_id
    designation
  }
}




mutation{
  createEmployee(
    employee_name:"siraj",
    designation:"sales",
    salary:4500){employee_id
  employee_name
  }
    
  
}
