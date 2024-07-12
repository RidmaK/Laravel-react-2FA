import { Link, Navigate } from "react-router-dom";
import { useRef, useState } from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import axiosClient from "../../axios-client";
import Input from "../../components/common/Input";
import PasswordInput from "../../components/common/PasswordInput";
import Button from "../../components/common/Button";

export default function Login() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const { setUser, setToken, token } = useStateContext();
  const [message, setMessage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!email || !password) {
      setMessage('Please enter both email and password.');
      return;
    }

    axiosClient.post('/login', { email, password })
      .then(({ data }) => {
        setUser(data.user);
        setToken(data.token);
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          if(response.data.errors){
            setMessage(response.data.errors || 'Invalid credentials.');
          }else{
            setMessage(response.data.message || 'Invalid credentials.');
          }
        } else {
          setMessage('An error occurred. Please try again later.');
        }
      });
  }

   // Redirect if user is already logged in
   if (token) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="login-signup-form animated fadeInDown">
      <div className="form">
        <form onSubmit={onSubmit}>
          <h1 className="title">Login into your account</h1>

          {message &&
            <div className="alert">
              <p>{message}</p>
            </div>
          }
          <Input ref={emailRef} type="email" placeholder="Email"/>
          <PasswordInput
            ref={passwordRef}
            placeholder="Password"
            showPassword={showPassword}
            onTogglePasswordVisibility={togglePasswordVisibility}
          />
          <Button type="submit" label="Login" btn="btn-block btn-auth" />
          <p className="message">Not registered? <Link to="/signup">Create an account</Link></p>
        </form>
      </div>
    </div>
  )
}
