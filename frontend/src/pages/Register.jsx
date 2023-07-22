import { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    password: "",
    email: "",
  });
  const { name, password, email } = formValues;
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
      <h2 className="text-start">Create New account</h2>
      <form className="form-control gap-2" onSubmit={handleSubmit}>
        <input
          onChange={handleChanges}
          name="name"
          value={name}
          type="text"
          placeholder="Username"
          className="input input-bordered input-primary max-w-xs"
        />
        <input
          onChange={handleChanges}
          name="email"
          value={email}
          type="email"
          placeholder="Email"
          className="input input-bordered input-primary max-w-xs"
        />
        <input
          onChange={handleChanges}
          name="password"
          value={password}
          type="password"
          placeholder="Password"
          className="input input-bordered input-primary max-w-xs"
        />
        <button type="submit" className="btn btn-primary max-w-xs">
          Register
        </button>
      </form>
      <p>
        Already have an account?{" "}
        <Link to="/login">
          <span className="text-primary">Login</span>
        </Link>
      </p>
    </div>
  );
};

export default Register;
