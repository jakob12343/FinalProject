import React, { useContext, useEffect, useState } from 'react'
import useplaceholder from '../userPlaceholder.jpeg'
import {  Card} from 'react-bootstrap'
import { faCheck, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import './CssFiles/UserDetails.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { UserContext } from './UserContext';
const UserDetails = ({ data }) => {

  const [isAdressEditing, setisAdressEditing] = useState(false)
  const [isBirthDateEditing, setisBirthDateEditing] = useState(false)
  const [isGenderEditing, setIsGenderEditing] = useState(false)
  const [isMartialStatuseEditing, setIsMartialStatuseEditing] = useState(false)
  const [formData, setFormData] = useState({});
  const { UpdateUserDetails } = useContext(UserContext)
  const newData = formData

  useEffect(() => {
    setFormData(data)


  }, [data])
  const handleChange = (e) => {

    e.preventDefault();
    switch (e.target.name) {
      case 'address':
        newData.address = e.target.value
        setFormData(newData)
        break;
      case 'birthDate':
        newData.birthDate = e.target.value
        setFormData(newData)
        break;
      case 'gender':
        newData.gender = e.target.value
        setFormData(newData)
        break;
      case 'maritalStatus':
        newData.maritalStatus = e.target.value
        setFormData(newData)
        break;
      default:
        console.log("something went wrog !!!");
        break;
    }
  }
  const HandleIsMartialStatuseEditing = () => {
    setIsMartialStatuseEditing(!isMartialStatuseEditing)
  }
  const HandleAdressChange = () => {
    setisAdressEditing(!isAdressEditing)
  }
  const HandleBirthDateChange = () => {
    setisBirthDateEditing(!isBirthDateEditing)
  }
  const HandleGenderChange = () => {
    setIsGenderEditing(!isGenderEditing)
  }
  const Submit = () => {
    UpdateUserDetails(formData)
  }
  return (
<div className='User'>
<img src={useplaceholder} className='Img' alt="" />

    <Card className='User-Card'>
      <Card.Body>

        <Card.Title>Username: {formData.username}</Card.Title>
        <Card.Title>Email: {formData.email}</Card.Title>
        <Card.Title>Phone Number: {formData.phone}</Card.Title>
        {!isAdressEditing && (
          <Card.Title>Adress: {formData.address}
            <FontAwesomeIcon onClick={HandleAdressChange} icon={faPencilAlt} style={{ marginLeft: '10px', cursor: 'pointer' }} />
          </Card.Title>)
        }
        {isAdressEditing && (
          <Card.Title>Adress: {formData.address} <input
            className='User-input'
            type="text"
            placeholder="Address"
            name="address"
            onChange={handleChange}
          />
            <FontAwesomeIcon onClick={HandleAdressChange} icon={faCheck} style={{ marginLeft: '10px', cursor: 'pointer' }} />
          </Card.Title>)
        }
        {!isBirthDateEditing && (
          <Card.Title>BirthDate: {formData.birthDate}
            <FontAwesomeIcon onClick={HandleBirthDateChange} icon={faPencilAlt} style={{ marginLeft: '10px', cursor: 'pointer' }} />
          </Card.Title>)
        }
        {isBirthDateEditing && (
          <Card.Title>birthDate: {formData.birthDate} <input
            className='User-input'
            type="text"
            placeholder="birthDate"
            name="birthDate"
            onChange={handleChange}
          />
            <FontAwesomeIcon onClick={HandleBirthDateChange} icon={faCheck} style={{ marginLeft: '10px', cursor: 'pointer' }} />
          </Card.Title>)
        }
        {!isGenderEditing && (
          <Card.Title>Gender: {formData.gender}
            <FontAwesomeIcon onClick={HandleGenderChange} icon={faPencilAlt} style={{ marginLeft: '10px', cursor: 'pointer' }} />
          </Card.Title>)
        }
        {isGenderEditing && (
          <Card.Title>Gender: {formData.gender} <input
            className='User-input'
            type="text"
            placeholder="gender"
            name="gender"
            onChange={handleChange}
          />
            <FontAwesomeIcon onClick={HandleGenderChange} icon={faCheck} style={{ marginLeft: '10px', cursor: 'pointer' }} />
          </Card.Title>)
        }
        {!isMartialStatuseEditing && (
          <Card.Title>MaritalStatus: {formData.maritalStatus}
            <FontAwesomeIcon onClick={HandleIsMartialStatuseEditing} icon={faPencilAlt} style={{ marginLeft: '10px', cursor: 'pointer' }} />
          </Card.Title>)
        }
        {isMartialStatuseEditing && (
          <Card.Title>Personal Status: {formData.maritalStatus} <input
            className='User-input'
            type="text"
            placeholder="maritalStatus"
            name="maritalStatus"
            onChange={handleChange}
          />
            <FontAwesomeIcon onClick={HandleIsMartialStatuseEditing} icon={faCheck} style={{ marginLeft: '10px', cursor: 'pointer' }} />
          </Card.Title>)
        }







        {!(isAdressEditing || isBirthDateEditing || isGenderEditing || isMartialStatuseEditing) && <button onClick={Submit} className='User-Button '>Update Details</button>
        }


      </Card.Body>
    </Card>
    </div>
  )
}

export default UserDetails