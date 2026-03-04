import axios from "axios";
import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/store/connectionSlice";

const Connection = () => {
  const connections = useSelector((store) => store.connection);
  const dispatch = useDispatch();

  async function fetchConnections() {
    try {
      const response = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnection(response.data.data));
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchConnections();
  }, []);

  return (
    <div>
      <h2 className="text-center font-bold text-3xl mt-5">Connections</h2>
      {connections?.length > 0 ? (
        <ul className="list bg-base-100 rounded-box shadow-md max-w-lg mx-auto mt-5">
          <li className="list-row">
            <div>
              <img
                className="size-10 rounded-box"
                src={connections[0].imageURL}
              />
            </div>
            <div>
              <div>
                {connections[0].firstName + " " + connections[0].lastName}
              </div>
              <div className="text-xs uppercase font-semibold opacity-60">
                {connections[0].about}
              </div>
            </div>
          </li>
        </ul>
      ) : (
        <div className="flex justify-center mt-50">No connections found</div>
      )}
    </div>
  );
};

export default Connection;
