import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "../avatar/Avatar";
import "./CreatePostevent.scss";
import { BsCardImage } from "react-icons/bs";
import { axiosClient } from "../../utils/axiosClient";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../../redux/slices/postsSlice";
import { TOAST_SUCCESS } from "../../App";
import { showToast } from "../../redux/slices/appConfigSlice";

function CreatePostevent() {
  const [posteventImg, setPosteventImg] = useState("");
  const [caption, setCaption] = useState("");
  const [caption1, setCaption1] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
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
        setPosteventImg(fileReader.result);
        console.log("img data", fileReader.result);
      }
    };
  };

  const hanldePostSubmit = async () => {
    let i = 0;
    try {
      const result = await axiosClient.post("/postsevents", {
        caption,
        posteventImg,
        caption1,
        date,
        time,
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
      setPosteventImg("");
      setCaption1("");
      setDate("");
      setTime("");
    }
    if (i == 1) {
      dispatch(
        showToast({
          type: TOAST_SUCCESS,
          message: "Event Created successfully",
        })
      );
      navigate(`/profile2/${myProfile?._id}`);
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
          // target="_blank"
          className="captionInput"
          placeholder="Registration Link..."
          onChange={(e) => setCaption(e.target.value)}
        />
        <input
          value={caption1}
          type="text"
          className="caption1Input"
          placeholder="Department Which Conduct Event..."
          onChange={(e) => setCaption1(e.target.value)}
        />
        <input
          value={date}
          type="date"
          className="dateInput"
          placeholder="Enter Event Date..."
          onChange={(e) => setDate(e.target.value)}
        />
        <label for="appt"></label>
        <input
          value={time}
          type="time"
          id="appt"
          name="appt"
          className="timeInput"
          placeholder="Enter Event Time..."
          onChange={(e) => setTime(e.target.value)}
        />
        {posteventImg && (
          <div className="img-container">
            <img className="post-img" src={posteventImg} alt="post-img" />
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
            Create Your Event
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreatePostevent;
