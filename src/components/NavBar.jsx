import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/store/userSlice";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { removeFeed } from "../utils/store/feedSlice";

const NavBar = () => {
  const loggedUser = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      dispatch(removeFeed());
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-violet-900/40 border-3 shadow-md">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/">
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center text-xs font-bold">
              &lt;/&gt;
            </div>
            <span className="font-display text-xl font-bold tracking-tight">
              DevMatch
            </span>
          </div>
        </Link>

        {!loggedUser ? (
          <div className="flex items-center gap-3">
            <Link to="/login">
              <button className="text-sm text-white/60 hover:text-white transition-colors px-4 py-2 cursor-pointer">
                Log in
              </button>
            </Link>
            <Link to="/signup">
              <button className="btn-glow text-sm font-medium px-5 py-2 rounded-lg bg-gradient-to-r from-violet-600 to-violet-500 hover:from-violet-500 hover:to-violet-400 transition-all cursor-pointer">
                Join Free
              </button>
            </Link>
          </div>
        ) : (
          <div className="flex gap-2 items-center">
            <p className="text-sm text-white/70">
              Welcome, {loggedUser.firstName}!
            </p>
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img alt="user profile picture" src={loggedUser.imageURL} />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link to="/profile" className="justify-between">
                    Profile
                  </Link>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li onClick={handleLogout}>
                  <a>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
