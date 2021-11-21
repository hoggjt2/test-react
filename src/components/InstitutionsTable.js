import React, {useState, useEffect} from 'react'
import { Table } from 'reactstrap'
import axios from 'axios'

const InstitutionsTable = () => {
  const BASE_URL = 'https://in607-laravel-api-hoggjt2.herokuapp.com';
  const SUB_URL = "/api/v1/institutions";
  const [institutions, setInstitutions] = useState([])

  useEffect(() => {
    
      axios.get(`${BASE_URL}${SUB_URL}`)
     .then((response) => {
        setInstitutions(response.data.data)
        console.log(response);
      })
    }, [])
     


  return (
    <Table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Region</th>
          <th>Country</th>
          <th>Students</th>
        </tr>
      </thead>
      <tbody>
      {institutions.map((institution) =>
                    <tr key={institution.id}>    
                      <td>{institution.name}</td>
                      <td>{institution.region}</td>
                      <td>{institution.country}</td>
                      <td>{institution.student_count}</td>         
                    </tr>
                  )} 
      </tbody>
    </Table>
  )
}

export default InstitutionsTable;
