import React, {useState, useEffect} from 'react'
import { Table } from 'reactstrap'
import axios from 'axios'

const DepartmentsTable = () => {
  const BASE_URL = 'https://in607-laravel-api-hoggjt2.herokuapp.com';
  const SUB_URL = "/api/v1/departments";
  const [departments, setDepartments] = useState([])

  useEffect(() => {
    
      axios.get(`${BASE_URL}${SUB_URL}`)
     .then((response) => {
        setDepartments(response.data.data)
        console.log(response);
      })
    }, [])
     

  return (
    <Table>
      <thead>
        <tr>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
      {departments.map((department) =>
                    <tr key={department.id}>    
                      <td>{department.name}</td>       
                    </tr>
                  )} 
      </tbody>
    </Table>
  )
}

export default DepartmentsTable;
