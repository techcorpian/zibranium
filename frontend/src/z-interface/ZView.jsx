import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ZView = () => {
    const [customers, setCustomers] = useState([]);
    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

    useEffect(() => {
        axios.get(`${apiUrl}/zibranium`)
          .then((res) => {
            setCustomers(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }, []);
  return (
      
    <div>        
        {
        customers.map((item)=>(
            <div className={`${ item.status == 1 ? 'border-green-400 bg-green-800' : 'border-red-600 bg-red-900'}  p-4 rounded-lg border `}>{item.ipaddress} is { item.status == 1 ? 'connected' : 'not connected'} to zibranium</div>
            ))
        }</div>
  )
}

export default ZView