import React, { useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap'
import EmployeeAddEditForm from '../StudentAddEditForm'

function StudentModal(props) {
  const [modal, setModal] = useState(false)

  const toggle = () => {
    setModal(!modal)
  }

  const closeBtn = <button className="close" onClick={toggle}>&times;</button>
  const label = props.buttonLabel

  let button = ''
  let title = ''

  if(label === 'Edit'){
    button = <Button
              color="warning"
              onClick={toggle}
              style={{float: "left", marginRight:"10px"}}>{label}
            </Button>
    title = 'Edit Item'
  }   
   else {
    button = <Button
              color="success"
              onClick={toggle}
              style={{float: "left", marginRight:"10px"}}>{label}
            </Button>
    if(label === "Add Student")
    {
      title = 'Add New Student'
    } 
  }


  return (
    <div>
      {button}
      <Modal isOpen={modal} toggle={toggle} className={props.className}>
        <ModalHeader toggle={toggle} close={closeBtn}>{title}</ModalHeader>
        <ModalBody>
          <EmployeeAddEditForm
            addItemToState={props.addItemToState}
            updateState={props.updateState}
            toggle={toggle}
            label={label} 
            BASE_URL={props.BASE_URL} 
            SUB_URL={props.SUB_URL}
            student={props.student} />
        </ModalBody>
      </Modal>
    </div>
  )
}

export default StudentModal