import { useState, useEffect } from "react";
import UserCard from "./UserCard";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/store/userSlice";
import { Link } from "react-router-dom";

const EditProfile = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const [toast, setToast] = useState(false);
  const [errors, setErrors] = useState("");

  const getProfileFromUser = (user) => ({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    imageURL: user?.imageURL || "",
    gender: user?.gender || "",
    skills: user?.skills?.join(", ") || [],
    age: user?.age || "",
    about: user?.about || "",
  });

  const [profile, setProfile] = useState(() => getProfileFromUser(user));

  useEffect(() => {
    if (user) setProfile(getProfileFromUser(user));
  }, [user]);

  function handleProfileData(name, value) {
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function saveProfile() {
    try {
      const response = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName: profile.firstName,
          lastName: profile.lastName,
          age: profile.age,
          gender: profile.gender,
          imageURL: profile.imageURL,
          about: profile.about,
          skills: profile.skills
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean),
        },
        { withCredentials: true },
      );
      dispatch(addUser(response.data.data));
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 3000);
    } catch (error) {
      setErrors(error?.response?.data?.message);
      console.log(error);
    }
  }

  return (
    <div className="flex justify-center mt-3 gap-5">
      {user && (
        <div>
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
            <label className="label">Firstname</label>
            <input
              type="text"
              className="input"
              value={profile.firstName}
              onChange={(e) => handleProfileData("firstName", e.target.value)}
            />

            <label className="label">Lastname</label>
            <input
              type="text"
              className="input"
              value={profile.lastName}
              onChange={(e) => handleProfileData("lastName", e.target.value)}
            />

            <label className="label">ImageURL</label>
            <input
              type="text"
              className="input"
              value={profile.imageURL}
              onChange={(e) => handleProfileData("imageURL", e.target.value)}
            />

            <label className="label">Gender</label>
            <select
              className="select"
              value={profile.gender}
              onChange={(e) => handleProfileData("gender", e.target.value)}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>

            <label className="label">Skills</label>
            <input
              type="text"
              className="input"
              value={profile.skills}
              onChange={(e) => handleProfileData("skills", e.target.value)}
            />

            <label className="label">Age</label>
            <input
              type="text"
              className="input"
              value={profile.age}
              onChange={(e) => handleProfileData("age", e.target.value)}
            />

            <fieldset className="fieldset">
              <legend className="fieldset-legend">About</legend>
              <textarea
                className="textarea h-24"
                value={profile.about}
                onChange={(e) => handleProfileData("about", e.target.value)}
              ></textarea>
            </fieldset>
          </fieldset>
        </div>
      )}
      <div className="h-md">
        <UserCard
          user={{
            firstName: profile.firstName,
            lastName: profile.lastName,
            about: profile.about,
            gender: profile.gender,
            age: profile.age,
            imageURL: profile.imageURL,
            skills: profile.skills,
          }}
        />
        <p className="text-red-500 mt-3">{errors}</p>
        <div>
          <button className="btn btn-secondary mt-3" onClick={saveProfile}>
            Save Profile
          </button>
          <Link to="/feed">
            <button className="btn btn-info mt-3 ml-3" onClick={saveProfile}>
              Cancel
            </button>
          </Link>
        </div>
      </div>
      {toast && (
        <div className="toast toast-end">
          <div className="alert alert-success">
            <span>Profile updated successfully.</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
