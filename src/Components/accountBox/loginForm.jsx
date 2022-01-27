import React, { useState, useContext } from "react";
import { useNavigate, Redirect } from 'react-router-dom';
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,

} from "./register";
import { Marginer } from "../marginer";
import { AccountContext } from "./accountContext";
import { auth, db } from '../../fbconfig.js'
import GreenCheck from './ok_check.png'
// import './common.scss'
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';

export const LoginForm = (props) => {
  // const { switchToSignup } = useContext(AccountContext);
  const navigate = useNavigate();
  const [state, setState] = useState({
    email: '',
    password: '',
  })


  const changeCreds = (event) => {

    setState({ ...state, [event.target.name]: event.target.value })
  }

  const [loading, setLoading] = useState(false);
  function handleClick(e) {
    e.preventDefault();
    
    console.log(state.email)
    console.log(state.password)
    setTimeout(() => {
     
    signInWithEmailAndPassword(auth, state.email, state.password).then((userCredential) => {
      setLoading(true);
      setTimeout(() => {
      console.log("login Successful");
      localStorage.setItem('authenticated', true)
      setLoading(false);
      navigate('/')
       
    }, 3000);
    
    }).catch((error) => {
        alert('Invalid Email Id or Password')
        const errorCode = error.code;
        const errorMessage = error.message;
      });
    }, 1000);
  }


  function switchToSignup(e) {
    navigate('/signup')

  }
  function handleLogOut(e) {
    signOut(auth).then(() => {
      // Sign-out successful.
      console.log('Sign-out successful')
      localStorage.removeItem('authenticated');
      navigate('/signin')
    }).catch((error) => {
      // An error happened.
      const errorCode = error.code;
      console.log(errorCode)
    });

  }


  return (
    
    <BoxContainer>

      {/* <button className="close-btn close" aria-label="Close" onClick={() => props.setTrigger(false)}>  <span aria-hidden="true">&times;</span></button>
        {props.children} */}
        {loading ? (
      <div
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          margin : "auto"
        }}
      >
        <img src={GreenCheck} alt="green-check-success" />
        <span style={{ fontSize: "1.4em" }}>Successfully login</span>
      </div>
    ) : (
      <div>
      <FormContainer>

        <Input id="email" type="email" name="email" onChange={(event) => changeCreds(event)} placeholder="Email" />
        <Input id="password" type="password" name="password" onChange={(event) => changeCreds(event)} placeholder="Password" />
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <MutedLink className="forget" href="#">Forget your password?</MutedLink>
      <Marginer direction="vertical" margin="1.6em" />
      <SubmitButton type="submit" onClick={handleClick}>Signin</SubmitButton>
      {/* <br></br>
      <SubmitButton type="submit" onClick={handleLogOut}>SignOut</SubmitButton> */}
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">
        Don't have an account?{" "}
        <BoldLink onClick={switchToSignup}>
          Signup
        </BoldLink>
      </MutedLink>
      </div>
      )}
    </BoxContainer>
     
  );
}
