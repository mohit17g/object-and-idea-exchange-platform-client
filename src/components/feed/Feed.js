import React, { useEffect } from "react";
import Follower from "../follower/Follower";
import Post from "../post/Post";
import "./Feed.scss";
import { useSelector, useDispatch } from "react-redux";
import { getFeedData } from "../../redux/slices/feedSlice";
import { FaHandPointRight } from "react-icons/fa";

function Feed() {
  const dispatch = useDispatch();
  const feedData = useSelector((state) => state.feedDataReducer.feedData);

  useEffect(() => {
    dispatch(getFeedData());
  }, [dispatch]);

  return (
    <div className="Feed">
      <div className="container">
        <div className="left-part">
          <div className="sticky">
            <h2 className="heading-h2">Object and Idea Exchange Platform</h2>
            <div className="element">
              <h4>
                <FaHandPointRight style={{ color: "teal" }} />
                &nbsp;This website is specially for cuk students who are
                planning to buy and sell their gadgets, post there blogs and
                share there idea.
              </h4>
              <h4>
                <FaHandPointRight style={{ color: "teal" }} />
                &nbsp;This website makes it so easy to connect people to
                exchange used goods etc... while seated at work or home.
              </h4>
              <h4>
                <FaHandPointRight style={{ color: "teal" }} />
                &nbsp;This website allows people to get the reusable products
                like Mattress, Pillow, Bucket, Notes etc... at cheapest rate
                with less time.
              </h4>
              <h4>
                <FaHandPointRight style={{ color: "teal" }} />
                &nbsp;People who wish to sell any goods can upload their
                advertisements. Sellers need to upload pictures of their goods,
                along with a phone number and description and the expected sales
                price of the commodity.
              </h4>
              <h4>
                <FaHandPointRight style={{ color: "teal" }} />
                &nbsp;The buyers are allowed to browse through the several
                alternatives, contact the seller, negotiate with them one-to-one
                and then purchase the items.
              </h4>
            </div>
          </div>
        </div>
        <div className="right-part">
          {feedData?.posts?.map((post) => (
            <Post key={post._id} post={post} />
          ))}
        </div>
        {/* <div className="following">
          <h3 className="title">You Are Following</h3>
          {feedData?.followings?.map((user) => (
            <Follower key={user._id} user={user} />
          ))}
        </div> */}
        {/* <div className="suggestions">
          <h3 className="title">Suggested For You</h3>
          {feedData?.suggestions?.map((user) => (
            <Follower key={user._id} user={user} />
          ))}
        </div> */}
      </div>
    </div>
  );
}

export default Feed;
