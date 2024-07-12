import { Link } from "react-router-dom";
import "./index.css";
import { useRef } from "react";
import axiosClient from "../../axios-client";
import { useStateContext } from "../../contexts/ContextProvider";

export default function Signup() {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneNumberRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmationRef = useRef<HTMLInputElement>(null);

  const onSubmit = (ev: any) => {
    ev.preventDefault();
    const payload = {
      name: nameRef.current?.value,
      email: emailRef.current?.value,
      phone_number: phoneNumberRef.current?.value,
      password: passwordRef.current?.value,
      password_confirmation: passwordConfirmationRef.current?.value,
    };

    const { setUser, setToken } = useStateContext();

    axiosClient.post('/register',payload).then(({data}) => {
      setToken(data.user);
      setUser(data.token);
    }).catch((err) => {
      const response = err.response;
      if(response && response.status === 422) {
        console.log(response.data.errors)
      }
    })
  };

  return (
    <div className="login-signup-form animated fadeInDown">
      <div className="form">
        <form onSubmit={onSubmit}>
          <h1 className="title">Signup for free</h1>
          <input
            ref={nameRef}
            type="text"
            name=""
            id=""
            placeholder="Full Name"
          />
          <input
            ref={emailRef}
            type="email"
            name=""
            id=""
            placeholder="Email Address"
          />
          <input
            ref={phoneNumberRef}
            type="number"
            name=""
            id=""
            placeholder="Phone Number"
          />
          <input
            ref={passwordRef}
            type="password"
            name=""
            id=""
            placeholder="Password"
          />
          <input
            ref={passwordConfirmationRef}
            type="password"
            name=""
            id=""
            placeholder="Password Confirmation"
          />
          <button type="submit" className="btn btn-block">Sign up</button>
          <p className="message">
            Allredy Registered? <Link to="/login">Sign in.</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
