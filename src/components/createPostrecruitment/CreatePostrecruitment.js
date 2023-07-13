import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "../avatar/Avatar";
import "./CreatePostrecruitment.scss";
import { BsCardImage } from "react-icons/bs";
import { axiosClient } from "../../utils/axiosClient";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../../redux/slices/postsSlice";
import { TOAST_SUCCESS } from "../../App";
import { showToast } from "../../redux/slices/appConfigSlice";

function CreatePostrecruitment() {
  const [postrecruitmentImg, setPostrecruitmentImg] = useState("");
  const [caption, setCaption] = useState("");
  const dispatch = useDispatch();
  const myProfile = useSelector((state) => state.appConfigReducer.myProfile);
  const userProfile = useSelector((state) => state.postsReducer.userProfile);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      if (fileReader.readyState === fileReader.DONE) {
        setPostrecruitmentImg(fileReader.result);
        console.log("img data", fileReader.result);
      }
    };
  };

  const hanldePostSubmit = async () => {
    let i = 0;
    try {
      const result = await axiosClient.post("/postsrecruitments", {
        caption,
        postrecruitmentImg,
      });
      console.log("post done", result);
      i = 1;
      dispatch(
        getUserProfile({
          userId: myProfile?._id,
        })
      );
    } catch (error) {
      console.log("what is th error", error);
    } finally {
      setCaption("");
      setPostrecruitmentImg("");
    }
    if (i == 1) {
      dispatch(
        showToast({
          type: TOAST_SUCCESS,
          message: "Recruitment Created successfully",
        })
      );
      navigate(`/profile3/${myProfile?._id}`);
    }
  };
  return (
    <div className="CreatePostproduct">
      <div className="left-part">
        <Avatar src={myProfile?.avatar?.url} />
        <h4 className="user-name">{userProfile?.name}</h4>
      </div>
      <div className="right-part">
        <input
          value={caption}
          type="text"
          className="captionInput"
          placeholder="Write your caption..."
          onChange={(e) => setCaption(e.target.value)}
        />
        {postrecruitmentImg && (
          <div className="img-container">
            <img className="post-img" src={postrecruitmentImg} alt="post-img" />
          </div>
        )}
        <div className="bottom-part">
          <div className="input-post-img">
            <label htmlFor="inputImg" className="labelImg">
              <BsCardImage />
            </label>
            <input
              className="inputImg"
              id="inputImg"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>

          <button className="post-btn btn-primary" onClick={hanldePostSubmit}>
            Your Recruitment
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreatePostrecruitment;
