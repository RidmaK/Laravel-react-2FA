import { Link } from "react-router-dom";
import "./index.css";
import { useRef } from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import axiosClient from "../../axios-client";

export default function Login() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const onSubmit = (ev: any) => {
    ev.preventDefault();
    const payload = {
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
    };
    console.log(payload)

    const { setUser, setToken } = useStateContext();

    axiosClient.post('/login',payload).then(({data}) => {
      setToken(data.user);
      setUser(data.token);
    }).catch((err) => {
      const response = err.response;
      console.log(response)
      if(response && response.status === 422) {
        console.log(response.data.errors)
      }
    })
  };
  return (
    <div className="login-signup-form animated fadeInDown">
      <div className="form">
        <form onSubmit={onSubmit}>
          <h1 className="title">Login into your account</h1>
          <input ref={emailRef} type="email" name="" id="" placeholder="Email" />
          <input ref={passwordRef} type="password" name="" id="" placeholder="Password" />
          <button type="submit" className="btn btn-block">Login</button>
          <p className="message">
            Not Registed? <Link to="/signup">Create an account.</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
