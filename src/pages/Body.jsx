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
    if (location.pathname === "/login") return;
    if (loggedUser) return;
    try {
      const user = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(user.data));
    } catch (err) {
      if (err.response?.status == 401) {
        navigate("/");
      }
      console.log("Auth check failed", err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="min-h-screen bg-[#09090f] text-white">
      <NavBar />
      <main className="pt-16">
        <Outlet />
      </main>
    </div>
  );
};

export default Body;
