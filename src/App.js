import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} 


from "react-router-dom";
import Home from './components/Home';
import Login from './components/Login';
import Signin from './components/Signin';
import Profile from './components/Profile';
import Api_form from './components/Api_form';
import Approvals from './components/Approvals';
import Status from './components/Status';
import Navbar_main from './components/Navbar_main'
import First from './components/First';
function App() {
  return (
   <>
   <Navbar_main></Navbar_main>
    <Router>
        <div style={{backgroundColor:"white"}}>
          <Routes>
          <Route exact path="/fi" element={<First/>} />
            <Route exact path="/home" element={<Home/>} />
            <Route exact path="/" element={<Login />} />
            <Route exact path="/api_form" element={<Api_form/>} />
            <Route exact path="/approvals" element={<Approvals/>} />
            <Route exact path="/signup" element={<Signin />} />
            <Route exact path="/status" element={<Status />} />
           
          </Routes>
        </div>
      </Router>
   </>
  );
}

export default App;
