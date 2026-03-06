import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/store/userSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [signUpData, setSignUpData] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    gender: "",
    password: "",
  });

  const [errors, setErrors] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setSignUpData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  async function handleSubmit() {
    try {
      const response = await axios.post(BASE_URL + "/signup", signUpData, {
        withCredentials: true,
      });

      dispatch(addUser(response.data.data));
      navigate("/feed");
    } catch (error) {
      setErrors(error?.response?.data?.message || "Something went wrong");
    }
  }

  return (
    <div className="flex min-h-screen flex-col justify-center bg-[#09090f]">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="text-center text-2xl font-bold text-white">
          Signup to Devmatch
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm space-y-5">
        <div>
          <label className="text-gray-100 text-sm">First Name</label>
          <input
            type="text"
            name="firstName"
            value={signUpData.firstName}
            onChange={handleChange}
            className="input input-bordered w-full mt-1 bg-white/5 text-white"
          />
        </div>

        <div>
          <label className="text-gray-100 text-sm">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={signUpData.lastName}
            onChange={handleChange}
            className="input input-bordered w-full mt-1 bg-white/5 text-white"
          />
        </div>

        <div>
          <label className="text-gray-100 text-sm">Email</label>
          <input
            type="email"
            name="emailId"
            value={signUpData.emailId}
            onChange={handleChange}
            className="input input-bordered w-full mt-1 bg-white/5 text-white"
          />
        </div>

        <div>
          <label className="text-gray-100 text-sm">Gender</label>
          <select
            name="gender"
            value={signUpData.gender}
            onChange={handleChange}
            className="select select-bordered w-full mt-1 bg-white/5 text-white"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div>
          <label className="text-gray-100 text-sm">Password</label>
          <input
            type="password"
            name="password"
            value={signUpData.password}
            onChange={handleChange}
            className="input input-bordered w-full mt-1 bg-white/5 text-white"
          />
        </div>

        {errors && <p className="text-red-500 text-center">{errors}</p>}

        <button onClick={handleSubmit} className="btn btn-primary w-full">
          Sign Up
        </button>
        <p>
          Already a user? <Link to="/login" className="border-b-2">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
