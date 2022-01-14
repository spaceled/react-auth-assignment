import React, { useContext } from 'react';
import {Navbar, Nav, NavDropdown, Container, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Header.css'
import { UserContext } from './../../App';

const Header = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    return(
      <div>
  <Navbar bg="light" expand="lg" >
  <Container>
    <Navbar.Brand href="#home" className="text-warning">Urban Riders</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="m-auto text-center ">
        <Link to="/home" className="text-dark active  nav_link">Home</Link>
        <Link to="" className="text-dark  nav_link">About</Link>
        <Link to="/destination" className="text-dark  nav_link">Destination</Link>
        <Link to="" className="text-dark  nav_link">Contract Us</Link>
      </Nav>
      {
        loggedInUser.isSignedIn ? 
        <span> 
        {
          loggedInUser.photo ? <span class="dropdown">
  <img src={loggedInUser.photo} alt="Not Available" style={{ height: '30%',width: '50%',borderRadius: '50%'}}/>
  <span class="dropdown-content">
  <Link to="#" className="bg-primary text-light">{loggedInUser.name}</Link>
  <Link to="#" onClick={()=>setLoggedInUser({})}>Sign Out</Link>

  </span>
</span>
:
 <NavDropdown title={loggedInUser.name} id="basic-nav-dropdown" >
          <NavDropdown.Item  className="active">My Profile</NavDropdown.Item>
          <NavDropdown.Item  onClick={()=>setLoggedInUser({})}>SignOut</NavDropdown.Item>
        </NavDropdown>
        }
      
          
           </span>
         :
     <Link to="/login"> <Button variant="success" className="nav_button">Login</Button></Link>
      }
      
    </Navbar.Collapse>
   
  </Container>
</Navbar>

    </div>
    )
}

export default Header;