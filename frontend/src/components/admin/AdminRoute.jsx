import React, { useEffect } from 'react'
import { loggedIn } from '../../context/AuthProvider'
import { useNavigate } from 'react-router-dom';

const AdminRoute = ({children}) => {
  const {isLoggedIn} = loggedIn();
  const navigate = useNavigate();

  useEffect(()=>{
    if(!isLoggedIn) {
      navigate("/home")
    }
  })
  return (
    <div>
      {children}
    </div>
  )
}

export default AdminRoute
