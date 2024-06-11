import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Claims from './components/Claims';
import CreateClaim from './components/CreateClaim';
import UpdateClaim from './components/UpdateClaim';
import PrivateRoute from './components/PrivateRoute';
import Example from './Example';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/register"exact element={<Register />}/>
          <Route path="/login" exact element={<Login/>} />
          <Route path="/claims" exact element={<Claims/>} />
          <Route path="/create-claim" exact element={<CreateClaim/>} />
          <Route path="/update-claim/:id" exact element={<UpdateClaim/>} />
        </Routes>
      </div>
    </Router>
    
  
  );
}

export default App;