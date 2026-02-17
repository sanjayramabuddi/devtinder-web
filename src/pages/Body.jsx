import { useEffect } from "react";
import NavBar from "../components/NavBar";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/store/userSlice";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const loggedUser = useSelector((store) => store.user);

  const fetchUser = async () => {
    // 1. Prevent loop: Don't fetch if we are already on login page
    if (location.pathname === "login") return;
    // 2. Optimization: Don't fetch if user is already in Redux store
    if (loggedUser) return;
    try {
      const user = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(user.data));
    } catch (err) {
      if (err.response?.status == 401) {
        navigate("/login");
      }
      console.log("Auth check failed", err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
};

export default Body;
