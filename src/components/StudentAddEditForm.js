import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';

function StudentAddEditForm(props) {
  const BASE_URL = props.BASE_URL
  const SUB_URL = props.SUB_URL
  const student = props.student
  const[form, setForm] = useState(
    !student ?{
    id: 0,
    first_name: '',
    last_name: '',
    dob: '',
    email: '',
    institution_id: 0
  }:student)

  const label = props.label
  const onChange = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }
    const submitFormAdd = e => {
      e.preventDefault()
        console.log(form);
        axios.post(`${BASE_URL}${SUB_URL}`, form,{
          headers: { 
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            Accept: 'application/json',
            'Content-Type': 'application/json'
          }
          })
          .then((response) => {
            if (response.status === 201) {
              form.id = response.data.id
              props.addItemToState(form);
              alert("Student created successfully."); 
              props.toggle()
            }
          })
          .catch((error) => {
            // Authentication error as specified in your Laravel API application
            if (error.response.status === 422) {
              alert("Invalid Input"); 
              props.toggle()
            }
            if (error.response.status === 401) {
              alert("Unauthorized."); 
              props.toggle()
            } else {
              alert("Unknown error."); 
              props.toggle()
            }
          }); 
    }
    const submitFormEdit = e => {
      e.preventDefault()
      console.log(form);
      axios.put(`${BASE_URL}${SUB_URL}/${form.id}`, [form.first_name, form.last_name, form.dob, form.email, form.institution_id], {
        headers: { 
          Authorization: `Bearer ${sessionStorage.getItem("token")}`
        },
      })
      .then((response) => {
        if (response.status === 200) {
          alert("Student updated successfully.");
          props.updateState(form);
          props.toggle()
        }
      }) 
      .catch((error) => {
        // Authentication error as specified in your Laravel API application
        if (error.response.status === 401) {
            alert("Unautherized."); 
            props.toggle()
          }
        if (error.response.status === 422) {
          alert("422 error."); 
          props.toggle()
        } else {
          alert("Unknown error."); 
          props.toggle()
        }
      });
    }

  return (
    <Form onSubmit={label === "Edit"? submitFormEdit : submitFormAdd}>
      <FormGroup>
        <Label for="first_name">First Name</Label>
        <Input type="text" name="first_name" id="first_name" onChange={onChange} value={form.first_name === null ? '' : form.first_name} />
      </FormGroup>
      <FormGroup>
        <Label for="last_name">Last Name</Label>
        <Input type="text" name="last_name" id="last_name" onChange={onChange} value={form.last_name === null ? '' : form.last_name}  />
      </FormGroup>
      <FormGroup>
        <Label for="dob">DOB</Label>
        <Input type="text" name="dob" id="dob" onChange={onChange} value={form.dob === null ? '' : form.dob}  />
      </FormGroup>
      <FormGroup>
        <Label for="email">Email</Label>
        <Input type="email" name="email" id="email" onChange={onChange} value={form.email === null ? '' : form.email}/>
      </FormGroup>
      <FormGroup>
        <Label for="institution_id">Institution_id</Label>
        <Input type="text" name="institution_id" id="institution_id" onChange={onChange} value={form.institution_id === null ? '' : form.institution_id}  />
      </FormGroup>
      <Button>Submit</Button>
    </Form>
  )
}

export default StudentAddEditForm