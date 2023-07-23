import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { registerUser } from "../app/slices/userApiSlice";
const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  const { loading, message } = useSelector((state) => state.userApi);
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
    dispatch(registerUser(formValues));
  };
  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo, navigate]);
  return (
    <div className="prose flex flex-col justify-center items-center mx-auto">
      <h2 className="text-start">Create New account</h2>
      <form className="form-control gap-2" onSubmit={handleSubmit}>
        <input
          required
          onChange={handleChanges}
          name="name"
          value={name}
          type="text"
          placeholder="Username"
          className="input input-bordered input-primary max-w-xs"
        />
        <input
          required
          onChange={handleChanges}
          name="email"
          value={email}
          type="email"
          placeholder="Email"
          className="input input-bordered input-primary max-w-xs"
        />
        <input
          required
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
      {loading && <p>Loading...</p>}
      {message && <p className="text-error">{message}</p>}
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
