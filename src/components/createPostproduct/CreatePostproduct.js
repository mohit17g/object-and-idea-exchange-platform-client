import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "../avatar/Avatar";
import "./CreatePostproduct.scss";
import { BsCardImage } from "react-icons/bs";
import { axiosClient } from "../../utils/axiosClient";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../../redux/slices/postsSlice";
import { TOAST_SUCCESS } from "../../App";
import { showToast } from "../../redux/slices/appConfigSlice";

function CreatePostproduct() {
  const [postproductImg, setPostproductImg] = useState("");
  const [caption, setCaption] = useState("");
  const [phoneno, setPhoneno] = useState("");
  const [price, setPrice] = useState("");
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
        setPostproductImg(fileReader.result);
        console.log("img data", fileReader.result);
      }
    };
  };

  const hanldePostSubmit = async () => {
    let i = 0;
    try {
      const result = await axiosClient.post("/postsproducts", {
        caption,
        postproductImg,
        phoneno,
        price,
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
      setPostproductImg("");
      setPhoneno("");
      setPrice("");
    }
    if (i == 1) {
      dispatch(
        showToast({
          type: TOAST_SUCCESS,
          message: "Product Uploaded successfully",
        })
      );
      navigate(`/profile1/${myProfile?._id}`);
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
        <input
          value={phoneno}
          type="number"
          className="phonenoInput"
          placeholder="Write your phone no..."
          onChange={(e) => setPhoneno(e.target.value)}
        />
        <input
          value={price}
          type="number"
          className="priceInput"
          placeholder="Enter price..."
          onChange={(e) => setPrice(e.target.value)}
        />
        {postproductImg && (
          <div className="img-container">
            <img className="post-img" src={postproductImg} alt="post-img" />
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
            Upload Your Product
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreatePostproduct;
