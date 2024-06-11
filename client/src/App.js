import React, { useState } from 'react';
import Register from './components/Register';
import Login from './components/Login';
import Claims from './components/Claims';
import CreateClaim from './components/CreateClaim';
import UpdateClaim from './components/UpdateClaim';

function App() {
  const [route, setRoute] = useState(window.location.pathname);

  const renderComponent = () => {
    switch (route) {
      case '/register':
        return <Register />;
      case '/login':
        return <Login />;
      case '/claims':
        return <Claims />;
      case '/create-claim':
        return <CreateClaim />;
      case '/update-claim/:id':
        return <UpdateClaim />;
      default:
        return <div>Page Not Found</div>;
    }
  };

  return (
    <div className="App">
      {renderComponent()}
    </div>
  );
}

export default App;
