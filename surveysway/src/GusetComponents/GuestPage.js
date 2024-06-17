import React, { useContext } from 'react'
import { GuestContext } from './GusetContext'
import Votes from '../UserComponents/Votes'

const GuestPage = () => {
  const { guest } = useContext(GuestContext)

  return (
    <div>
      {guest.map((survey, index) => (
        <Votes index={index} survey={survey} key={index} />
      ))} 
         </div>
  )
}

export default GuestPage