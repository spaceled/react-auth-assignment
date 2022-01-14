import React, { useContext, useState } from 'react';
import { UserContext } from '../../App';
import { useLocation } from 'react-router';
import { Button } from 'react-bootstrap'
import './Login.css';
import Facebook from '../../Images/Facebook-logo.png';
import Google from '../../Images/Google-logo.png';
import firebaseConfig from './firebase.config';
import firebase from 'firebase/compat/app';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth';


if(firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

function Login() {
  const [newUser, setNewUser] = useState(false)
  const[password, setPassword] = useState('')
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    photo: '',
    password: ''
  })
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  
  
  const navigate = useNavigate();
  const location = useLocation()
  let { from } = location.state || { from: { pathname: "/" } };

  const handleGoogleSignIn = () => {
    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();

    return signInWithPopup(auth, googleProvider)
      .then(res => {
        const { displayName, email, photoURL } = res.user;
        const signedInUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
          photo: photoURL,
        }
        handleResponse(res);
        navigate.replace(from);
      })
      .catch(error => {
        console.log(error);
        console.log(error.message);
      });
  }

  const handleFacebookSignIn = () => {
    const facebookProvider = new FacebookAuthProvider();
    const auth = getAuth();
    return signInWithPopup(auth, facebookProvider)
      .then((result) => {
        console.log(result.user);
        const { displayName, email, photoURL } = result.user;
        const signedInUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
          photo: photoURL
        }
        // setUser(signedInUser);
        // setLoggedInUser(signedInUser);
        // // history.replace(from);
        // navigate(from);
        return signedInUser;

      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        console.log(error);
      });
  }

  const handleChange = (event) => {
    let isFieldValid = true;
    if (event.target.name === 'email') {
      isFieldValid = /\S+@\S+\.\S+/.test(event.target.value);

    }
    if (event.target.name === 'password') {
      const isPasswordValid = event.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(event.target.value);
      isFieldValid = passwordHasNumber && isPasswordValid;
  
    }
    if (isFieldValid) {
      const newUser = { ...user };
      newUser[event.target.name] = event.target.value;
      setUser(newUser)
     
    }

  }
  const handleResponse = (res) => {
    setUser(res);
    setLoggedInUser(res);
  }

  const handleSubmit = (event) => {
    if (newUser && user.email && user.password) {
      const auth = getAuth();
      // console.log(user.email,user.password); 
      createUserWithEmailAndPassword(auth, user.email, user.password)
        .then(res => {
          const newUser = { ...user }
          newUser.error = '';
          newUser.success = true;
          setUser(newUser);
          updateUserInfo(user.name, user.photo, user.email)
        })
        .catch((error) => {
          const newUser = { ...user };
          newUser.error = error.message;
          newUser.success = false;
          setUser(newUser);
        });
    }
    if (!newUser && user.email && user.password) {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, user.email, user.password)
        .then((res) => {
          const newUser = { ...user }
          newUser.error = '';
          newUser.success = true;
          handleResponse(res);
          const { displayName, email, photoURL } = res.user;
          console.log('hello', res.user);
          const signedInUser = {
            isSignedIn: true,
            name: displayName,
            email: email,
            photo: photoURL
          }
          handleResponse(res)
          // history.replace(from);
          navigate(from)
        })
        .catch((error) => {
          const newUser = { ...user };
          newUser.error = error.message;
          newUser.success = false;
          setUser(newUser);

        });
        event.preventDefault();
    }
  }

  const updateUserInfo = (name, photo, email) => {
    const auth = getAuth();
    const user = auth.currentUser;

    user.updateProfile({
      displayName: name,
      photoURL: photo,
      email: email
    })
      .then((res) => {

      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div>
      <div className="login">
        <p>Email: {loggedInUser.email}</p>
        <form className="login-form" onSubmit={handleSubmit}>
          {
            !newUser ? <h3>Sign In</h3> : <h3>Create an account</h3>
          }
          {
            newUser && <input type="text" name="name" onBlur={handleChange} placeholder="Enter Your Name" />
          }

          <br />
          <input type="email" name="email" onBlur={handleChange} placeholder="Enter Your Email" /><br />
          <input type="password" name="password" onBlur={handleChange} placeholder="Enter your password" /><br />
          {
            newUser && <input type="password" name="confirmPassword" onBlur={handleChange} placeholder=" Confirm Your Password" />
          }
          <input type="submit" className=" mt-3" style={{ backgroundColor: 'orangered', color: 'white' }} value={newUser ? 'Sign Up' : 'Sign In'} />
          {
            !newUser ? <p>Don't have an account?<span onClick={() => setNewUser(!newUser)} className="text-primary"> Sign Up Now</span></p> : <p>Already have an account?<span onClick={() => setNewUser(!newUser)} className="text-primary">Sign In</span></p>
          }
        </form>
        <p style={{ color: 'red' }}>{user.error}</p>
        {
          user.success && <p style={{ color: 'green' }}>User {newUser ? 'created ' : 'Logged In'}successfully</p>
        }
      </div>
      <div className="signIn_button ">
          <Button onClick={handleFacebookSignIn} variant="contained" >
            <span className="facebook_btn"><img src={Facebook} alt="" /></span> Continue with facebook</Button>
          <br />
          <Button onClick={handleGoogleSignIn} variant="contained"  >
            <span className="google_btn"><img src={Google} alt="" /></span> Continue with google</Button>
      </div>
    </div>
  );
}

export default Login;