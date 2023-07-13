import React from "react";
import Avatar from "../avatar/Avatar";
import "./Post.scss";
// import "./Postrecruitment.scss";
import { AiFillDelete, AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { likeAndUnlikePost1, deletePost } from "../../redux/slices/postsSlice";
import { useNavigate } from "react-router";
import { useParams } from "react-router";
import { FaRupeeSign } from "react-icons/fa";
import { TOAST_SUCCESS } from "../../App";
import { showToast } from "../../redux/slices/appConfigSlice";

function Postrecruitment({ post }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  async function handlePostLiked() {
    dispatch(
      likeAndUnlikePost1({
        postId: post._id,
      })
    );
  }

  async function handleDeletePost() {
    dispatch(
      deletePost({
        postId: post._id,
      }),
      showToast({
        type: TOAST_SUCCESS,
        message: "Post Deleted successfully",
      })
    );
    navigate(`/`);
    // dispatch(
    //   showToast({
    //     type: TOAST_SUCCESS,
    //     message: "Profile Updated successfully",
    //   })
    // );
  }
  return (
    <div className="Post Postrecruitment">
      <div
        className="heading"
        onClick={() => navigate(`/profile3/${post.owner._id}`)}
      >
        <Avatar src={post.owner?.avatar?.url} />
        <h4>{post.owner?.name}</h4>
      </div>
      <div className="content">
        <img src={post?.image?.url} alt="" />
      </div>
      <div className="footer">
        {/* <div className="like" onClick={handlePostLiked}>
          {post.isLiked ? (
            <AiFillHeart style={{ color: "red" }} className="icon" />
          ) : (
            <AiOutlineHeart className="icon" />
          )}
          <h4>{`${post.likesCount} likes`}</h4>
        </div> */}
        <p className="caption">{post.caption}</p>
        <h6 className="time-ago">{post?.timeAgo}</h6>
        <div className="like likes" onClick={handleDeletePost}>
          {<AiFillDelete style={{ color: "teal" }} />}
        </div>
      </div>
    </div>
  );
}

export default Postrecruitment;
