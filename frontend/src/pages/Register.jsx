import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useRegisterUserMutation } from "../app/slices/userApiSlice";
import { setCredentials } from "../app/slices/authSlice";

const Register = () => {
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errMsg, setErrMsg] = useState("");
  const { userInfo } = useSelector((state) => state.auth);

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
  const handleSubmit =async (e) => {
    e.preventDefault();
    console.log(formValues);
    try {
      let res =await registerUser(formValues).unwrap();
      console.log(res);
      dispatch(setCredentials(res));
      navigate("/");
    } catch (err) {
      setErrMsg(err.data.message);
    }
  };
 
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
          className="input input-bordered  max-w-xs"
        />
        <input
          required
          onChange={handleChanges}
          name="email"
          value={email}
          type="email"
          placeholder="Email"
          className="input input-bordered  max-w-xs"
        />
        <input
          required
          onChange={handleChanges}
          name="password"
          value={password}
          type="password"
          placeholder="Password"
          className="input input-bordered  max-w-xs"
        />
        <button type="submit" className="btn  max-w-xs">
          Register
        </button>
      </form>
      {isLoading && <p>Loading...</p>}
      {errMsg && <p className="text-error">{errMsg}</p>}
      <p>
        Already have an account?{" "}
        <Link to="/login">
          <span className="">Login</span>
        </Link>
      </p>
    </div>
  );
};

export default Register;
