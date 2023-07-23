import React, { useEffect, useState } from "react";
import Post from "../post/Postevent";
import { useNavigate, useParams } from "react-router";
import CreatePostevent from "../createPostevent/CreatePostevent";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../../redux/slices/postsSlice";
import { getFeedData2 } from "../../redux/slices/feedSlice";
// import Avatar from "../avatar/Avatar";
import "./Event.scss";
import userImg from "../../assets/audotorium.png";

function Event() {
  const navigate = useNavigate();
  const params = useParams();
  const userProfile = useSelector((state) => state.postsReducer.userProfile);
  const myProfile = useSelector((state) => state.appConfigReducer.myProfile);
  const dispatch = useDispatch();
  const [isMyProfile, setIsMyProfile] = useState(false);
  const feedData = useSelector((state) => state.feedDataReducer.feedData);

  useEffect(() => {
    dispatch(
      getUserProfile({
        userId: params.userId,
      })
    );
    setIsMyProfile(myProfile?._id === params.userId);
  }, [myProfile, params.userId]);

  useEffect(() => {
    dispatch(getFeedData2());
  }, [dispatch]);
  return (
    <div className="Buyandsell">
      <div className="img">{<img src={userImg} alt="showcase" />}</div>
      <div className="container">
        <div className="left-part1 break">
          {feedData?.posts?.map((post) => (
            <Post key={post._id} post={post} />
          ))}
        </div>
        <div className="right-part">
          <div className="sticky">{isMyProfile && <CreatePostevent />}</div>
          {/* {userProfile?.posts?.map((post) => (
            <Post key={post._id} post={post} />
          ))} */}
        </div>
      </div>
    </div>
  );
}

export default Event;
