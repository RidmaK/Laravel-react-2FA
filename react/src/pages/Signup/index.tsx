import { Link } from "react-router-dom";
import "./index.css";

export default function Signup() {
  const onSubmit = (ev: any) => {
    ev.preventDefault();
  };
  return (
    <div className="login-signup-form animated fadeInDown">
      <div className="form">
        <form onSubmit={onSubmit}>
          <h1 className="title">Signup for free</h1>
          <input type="text" name="" id="" placeholder="Full Name" />
          <input type="email" name="" id="" placeholder="Email Address" />
          <input type="number" name="" id="" placeholder="Phone Number" />
          <input type="password" name="" id="" placeholder="Password" />
          <input
            type="password"
            name=""
            id=""
            placeholder="Password Confirmation"
          />
          <button className="btn btn-block">Sign up</button>
          <p className="message">
            Allredy Registered? <Link to="/login">Sign in.</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
