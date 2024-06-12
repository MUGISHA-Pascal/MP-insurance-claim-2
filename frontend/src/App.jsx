import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Claims from './components/Claims';
import CreateClaim from './components/CreateClaim';
import UpdateClaim from './components/UpdateClaim';
import PrivateRoute from './components/PrivateRoute';
import Example from './Example';
import Footer from './components/Footer';
import Header from './components/Header';

function App() {
  return (
    <div>
      <Header/>
    <Router>
      <div className="App">
        <Routes>
          <Route path="/"exact element={<Register />}/>
          <Route path="/login" exact element={<Login/>} />
          <Route path="/claims" exact element={<Claims/>} />
          <Route path="/create-claim" exact element={<CreateClaim/>} />
          <Route path="/update-claim/:id" exact element={<UpdateClaim/>} />
        </Routes>
      </div>
    </Router>
    <Footer/>
    </div>
  );
}

export default App;