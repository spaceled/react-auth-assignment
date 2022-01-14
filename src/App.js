import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home/Home';
import Profile from './components/Profile/Profile';
import ErrorPage from './components/ErrorPage/ErrorPage';
import Login from './components/Login/Login';
import { createContext, useState } from 'react';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Destination from './components/Destination/Destination';
import { getAuth } from 'firebase/auth';
import Header from './components/Header/Header';

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
        <Header/>

        <Routes>
          <Route path="/profile/:username" element={<Profile/>}/>
          <Route path="/" element={<Home/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/destination/:name" element={
            <RequireAuth redirectTo='/login'>
              <Destination/>
            </RequireAuth>
          }
          />
        </Routes>
      </Router>
    </UserContext.Provider>

  );
}
function RequireAuth({ children, redirectTo }) {
  let isAuthenticated = getAuth();
  return isAuthenticated ? children : <Navigate to={redirectTo} />;
}


export default App;
