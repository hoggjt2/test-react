import React, {useState, useEffect} from 'react'
import { Table, Button, Col } from 'reactstrap'
import axios from 'axios'
import ModalForm from './Modals/StudentModal'

const StudentsTable = () => {
    const BASE_URL = 'https://in607-laravel-api-hoggjt2.herokuapp.com';
    const SUB_URL = "/api/v1/students";
    const [students, setStudents] = useState([])


    const addItemToState = (student) => {
      setStudents([...students, student])
    }   
    const updateState = (student) => {
      const studentIndex = students.findIndex(data => data.id === student.id)
      const newArray = [...students.slice(0, studentIndex), student, ...students.slice(studentIndex + 1)]
      setStudents(newArray)
    }
  
   //change the status of delete
    const deleteItemFromState = id => {
      const updatedstudents = students.filter(student => student.id !== id)
      setStudents(updatedstudents)
    }
  
     const deleteItem = (id) => {
      let confirmDelete = window.confirm('Are you sure you?')
      if(confirmDelete){
        axios.delete(`${BASE_URL}${SUB_URL}/${id}`, {
          headers: { 
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          }
      })
        .then((response) => {
          if (response.status === 202) {
            deleteItemFromState(id)
            window.alert("Student Deleted.")
          }
        })
        .catch(err => console.log(err))
      }
    } 


    useEffect(() => {
      
        axios.get(`${BASE_URL}${SUB_URL}`)
       .then((response) => {
          setStudents(response.data.data)
          //console.log(response);

        })
      }, [])
       
  


  return (
    <Table>
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Date of Birth</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
      {students.map((student) =>
                    <tr key={student.id}>  
                    {console.log(student.id)}  
                      <td>{student.first_name}</td>
                      <td>{student.last_name}</td>
                      <td>{student.dob}</td>
                      <td>{student.email}</td>
                      <td>
                          <div style={{width:"120px"}}>
                            <ModalForm buttonLabel="Edit" student={student} updateState={updateState} BASE_URL={BASE_URL} SUB_URL={SUB_URL}/>
                            <Button color="danger" onClick={() => deleteItem(student.id)}>Del</Button>
                          </div>
                      </td>        
                    </tr>
                  )}
                  <tr>
              <Col>
              <ModalForm buttonLabel="Add Student" 
              addItemToState={addItemToState} 
              BASE_URL={BASE_URL} SUB_URL={SUB_URL}
              />
            </Col>
                    </tr>    
      </tbody>
    </Table>
  )
}

export default StudentsTable;
