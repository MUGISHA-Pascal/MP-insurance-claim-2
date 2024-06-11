import React from 'react';
import { useNavigate } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
const navigate = useNavigate()
  return(

  
  <Route
    {...rest}
    render={(props) =>
      localStorage.getItem('token') ? (
        <Component {...props} />
      ) : (
        navigate('/login')
      )
    }
  />
);}

export default PrivateRoute;
