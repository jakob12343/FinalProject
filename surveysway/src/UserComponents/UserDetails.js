import React, { useState } from 'react'
import useplaceholder from '../userPlaceholder.jpeg' 
import { Button, Card } from 'react-bootstrap'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';

import './CssFiles/UserDetails.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const UserDetails = ({data}) => {
   const IMAGE=data.image
   const [isAdressEditing, setisAdressEditing]=useState(false)
   const [formData, setFormData] = useState({
    phone: data.phone,
    address: data.address,
    birthDate: data.birthDate,
    gender: data.gender,
    maritalStatus: data.maritalStatus,
  });
  return (
   
        <Card >
      <Card.Img className='Img' variant="top" src={IMAGE||useplaceholder} />
      <Card.Body>

        <Card.Title>Username: {data.username}</Card.Title>
        <Card.Title>Email: {data.email}</Card.Title>
        <Card.Title>Phone Number: {data.phone}</Card.Title>
        {!isAdressEditing&&(
        <Card.Title>Adress: {data.address}
        <FontAwesomeIcon icon={faPencilAlt} style={{marginLeft: '10px', cursor: 'pointer'}} />
         </Card.Title>)
        }
        
        
        

        <Card.Title>birthDate: {data.birthDate}</Card.Title>
        <Card.Title>Gender: {data.gender}</Card.Title>
        <Card.Title>Personal Status: {data.maritalStatus}</Card.Title>





        

        <Button variant="primary">Update Details</Button>
      </Card.Body>
    </Card>
  )
}

export default UserDetails