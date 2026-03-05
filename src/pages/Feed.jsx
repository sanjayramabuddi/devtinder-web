import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { addFeed, removeUserFromFeed } from "../utils/store/feedSlice";
import UserCard from "../components/UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  async function handleSendRequests(status, id) {
    try {
      await axios.post(
        BASE_URL + "/request/send/" + status + "/" + id,
        {},
        {
          withCredentials: true,
        },
      );
      dispatch(removeUserFromFeed(id));
    } catch (error) {
      console.log(error);
    }
  }

  const fetchFeed = async () => {
    if (feed) return;
    try {
      const response = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(response.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  return (
    <div className="flex justify-center my-15">
      {feed?.length > 0 ? (
        <UserCard user={feed[0]} handleSendRequests={handleSendRequests} />
      ) : (
        <div>No developers found</div>
      )}
    </div>
  );
};

export default Feed;
