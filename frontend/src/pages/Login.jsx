import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formValues;
  const handleChanges = (e) => {
    setFormValues((current) => {
      return { ...current, [e.target.name]: e.target.value };
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formValues);
  };
  return (
    <div className="prose flex flex-col justify-center items-center mx-auto">
      <h2 className="text-start">Login To your account</h2>
      <form className="form-control gap-2" onSubmit={handleSubmit}>
        <input
          onChange={handleChanges}
          name="email"
          value={email}
          type="email"
          placeholder="Email"
          className="input input-bordered input-primary max-w-xs"
        />{" "}
        <input
          value={password}
          name="password"
          onChange={handleChanges}
          type="password"
          placeholder="Password"
          className="input input-bordered input-primary max-w-xs"
        />
        <button type="submit" className="btn btn-primary max-w-xs">
          Register
        </button>
      </form>
      <p>
        Don't have an account?{" "}
        <Link to="/register">
          <span className="text-primary">Register</span>
        </Link>
      </p>
    </div>
  );
};

export default Login;
