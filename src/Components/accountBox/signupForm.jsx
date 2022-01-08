import React, { useState, } from "react";
import { auth, db } from '../../fbconfig.js'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc,setDoc} from 'firebase/firestore';
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
} from "./common";
import { Marginer } from "../marginer";
import { useNavigate } from "react-router-dom";
// import './common.scss'
export const SignupForm = (props) => {
  const [state, setState] = useState({
    name: '',
    email: '',
    zip: '',
    mobile: '',
    address: '',
    password: '',
    confirmp: '',
  })


  const changeCreds = (event) => {

    setState({ ...state, [event.target.name]: event.target.value })
  }
  const navigate = useNavigate()
  // const { switchToSignin } = useContext(AccountContext);
  function switchToSignin(e) {
    navigate('/signin')
  }
  function handleClick(e) {
    
    e.preventDefault();
    console.log(state.email)
    console.log(state.password)
    createUserWithEmailAndPassword(auth, state.email, state.password).then((userCredential) => {
      console.log("signup Successful");
      setDoc(doc(db, "users",userCredential.user.uid), {
        email: state.email, fullName: state.name, phoneNumber: state.mobile, address: [{
          address: state.address, zipCode: state.zip, tag: "Home"
        }],
        currentAddress:{address: state.address, zipCode: state.zip, tag: "Home"},
        id:userCredential.user.uid
      }).then(()=>navigate('/signin'))
      
    })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }
  return (

    <BoxContainer>
      {/* <button className="close-btn close" aria-label="Close" onClick={() => props.setTrigger(false)}>  <span aria-hidden="true">&times;</span></button>
        {props.children} */}
      <FormContainer>

        <Input type="text" id="name" name="name" onChange={(event) => changeCreds(event)} placeholder="Full Name" />
        <Input id="email" type="email" name="email" onChange={(event) => changeCreds(event)} placeholder="Email" />
        <Input id="mobile" type="text" name="mobile" onChange={(event) => changeCreds(event)} placeholder="Mobile Number" />
        <Input id="address" type="text" name="address" onChange={(event) => changeCreds(event)} placeholder="Address" />
        <Input id="zip" type="text" name="zip" onChange={(event) => changeCreds(event)} placeholder="ZIP Code" />
        <Input id="password" type="password" name="password" onChange={(event) => changeCreds(event)} placeholder="Password" />
        <Input id="confirmp" type="password" name="confirmp" onChange={(event) => changeCreds(event)} placeholder="Confirm Password" />
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <SubmitButton type="submit" onClick={handleClick}>Signup</SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">
        Already have an account?
        <BoldLink onClick={switchToSignin}>
          Signin
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}
