import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import { apiUrl } from '../env';
const GuestContext = createContext();

const GuestProvider = ({ children }) => {

  const [guest, setGuest] = useState([]);
useEffect(() => {
  updateGuest()
          // eslint-disable-next-line
}, [])

  const updateGuest =async () => {
    const url = `${apiUrl}/ReadPublicSurveys`;
    const Surveys= await axios.get(url);
    setGuest(Surveys.data?? [])
  };

  return (
    <GuestContext.Provider value={{ guest, updateGuest }}>
      {children}
    </GuestContext.Provider>
  );
};

export { GuestContext, GuestProvider };
