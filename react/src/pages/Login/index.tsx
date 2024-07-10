import { Link } from "react-router-dom";
import "./index.css";

export default function Login() {
  const onSubmit = (ev: any) => {
    ev.preventDefault();
  };
  return (
    <div className="login-signup-form animated fadeInDown">
      <div className="form">
        <form onSubmit={onSubmit}>
          <h1 className="title">Login into your account</h1>
          <input type="email" name="" id="" placeholder="Email" />
          <input type="password" name="" id="" placeholder="Password" />
          <button className="btn btn-block">Login</button>
          <p className="message">
            Not Registed? <Link to="/signup">Create an account.</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
