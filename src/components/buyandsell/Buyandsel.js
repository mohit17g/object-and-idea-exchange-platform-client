import React, { useEffect, useState } from "react";
import Post from "../post/Postproduct";
import { useNavigate, useParams } from "react-router";
import CreatePostproduct from "../createPostproduct/CreatePostproduct";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../../redux/slices/postsSlice";
import { getFeedData1 } from "../../redux/slices/feedSlice";
// import Avatar from "../avatar/Avatar";
import "./Buyandsel.scss";
import userImg from "../../assets/buyandsell.jpg";

function Buyandsel() {
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
    dispatch(getFeedData1());
  }, [dispatch]);

  return (
    <div className="Buyandsell">
      <div className="img">{<img src={userImg} alt="showcase" />}</div>
      <div className="container">
        <div className="left-part1">
          {feedData?.posts?.map((post) => (
            <Post key={post._id} post={post} />
          ))}
        </div>
        <div className="right-part">
          <div className="sticky">{isMyProfile && <CreatePostproduct />}</div>
          {/* {userProfile?.posts?.map((post) => (
            <Post key={post._id} post={post} />
          ))} */}
        </div>
      </div>
    </div>
  );
}

export default Buyandsel;
