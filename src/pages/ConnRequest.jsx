import { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../utils/store/requestSlice";

const ConnRequest = () => {
  const requests = useSelector((store) => store.request);
  const dispatch = useDispatch();

  async function reviewRequests(status, id) {
    await axios.post(
      BASE_URL + "/request/review/" + status + "/" + id,
      {},
      {
        withCredentials: true,
      },
    );
    dispatch(removeRequest(id));
  }

  async function fetchRequests() {
    try {
      const response = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequest(response.data.data));
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div>
      <h2 className="text-center font-bold text-3xl mt-5">Requests</h2>
      {requests?.length > 0 ? (
        <ul className="list bg-base-100 rounded-box shadow-md max-w-lg mx-auto mt-5">
          {requests.map((request) => {
            const { imageURL, firstName, lastName, about } = request.fromUserId;
            return (
              <li className="list-row" key={request._id}>
                <div>
                  <img className="size-10 rounded-box" src={imageURL} />
                </div>
                <div>
                  <div>{firstName + " " + lastName}</div>
                  <div className="text-xs uppercase font-semibold opacity-60">
                    {about}
                  </div>
                </div>
                <button
                  className="btn btn-ghost"
                  onClick={() => reviewRequests("rejected", request._id)}
                >
                  Reject
                </button>
                <button
                  className="btn btn-ghost"
                  onClick={() => reviewRequests("accepted", request._id)}
                >
                  Accept
                </button>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="flex justify-center mt-50">No requests found</div>
      )}
    </div>
  );
};

export default ConnRequest;
