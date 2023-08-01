import  { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginUserMutation } from "../app/slices/userApiSlice";
import { setCredentials } from "../app/slices/authSlice";

const Login = () => {
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

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
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formValues);
    try {
      console.log('loggingin')
      console.log(formValues)
      let res =await loginUser(formValues).unwrap();
      console.log('got response')
      dispatch(setCredentials(res));
      navigate("/");
    } catch (err) {
      
      setErrMsg(err.data.message);
    }
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
          className="input input-bordered  max-w-xs"
        />{" "}
        <input
          value={password}
          name="password"
          onChange={handleChanges}
          type="password"
          placeholder="Password"
          className="input input-bordered  max-w-xs"
        />
        <button type="submit" className="btn  max-w-xs">
          Log In
        </button>
      </form>
      {isLoading && <p>Loading...</p>}
      {errMsg && <p className="text-error">{errMsg}</p>}
      <p>
        Don't have an account?{" "}
        <Link to="/register">
          <span className="">Register</span>
        </Link>
      </p>
    </div>
  );
};

export default Login;
