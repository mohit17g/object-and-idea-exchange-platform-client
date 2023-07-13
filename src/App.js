import { Routes, Route } from "react-router-dom";
import OnlyIfNotLoggedIn from "./components/OnlyIfNotLoggedIn";
import Signup from "./pages/signup/Signup";
import Login from "./pages/login/Login";
import NotFound from "./pages/notfound/NotFound";
import RequireUser from "./components/RequireUser";
import Home from "./pages/home/Home";
import Admin from "./pages/home/Admin";
import Feed from "./components/feed/Feed";
import BuyandSell from "./components/buyandsell/Buyandsel";
import Event from "./components/event/Event";
import Recruitment from "./components/recruitment/Recruitment";
import Profile from "./components/profile/Profile";
import Profile1 from "./components/profile/Profile1";
import Profile2 from "./components/profile/Profile2";
import Profile3 from "./components/profile/Profile3";
import UpdateProfile from "./components/updateProfile/UpdateProfile";
import { useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import LoadingBar from "react-top-loading-bar";
import toast, { Toaster } from "react-hot-toast";
// import Expen from "./components/Ess";
// import NewsApp from "./components/news/NewsApp";

export const TOAST_SUCCESS = "toast_success";
export const TOAST_FAILURE = "toast_failure";

function App() {
  const isLoading = useSelector((state) => state.appConfigReducer.isLoading);
  const toastData = useSelector((state) => state.appConfigReducer.toastData);
  const loadingRef = useRef(null);

  useEffect(() => {
    if (isLoading) {
      loadingRef.current?.continuousStart();
    } else {
      loadingRef.current?.complete();
    }
  }, [isLoading]);

  useEffect(() => {
    switch (toastData.type) {
      case TOAST_SUCCESS:
        toast.success(toastData.message);
        break;
      case TOAST_FAILURE:
        toast.error(toastData.message);
        break;
    }
  }, [toastData]);

  return (
    <div className="App">
      <LoadingBar color="#000" ref={loadingRef} />
      <div>
        <Toaster />
      </div>
      <Routes>
        <Route element={<RequireUser />}>
          <Route element={<Home />}>
            <Route path="/" element={<Feed />} />
            <Route path="/profile/:userId" element={<Profile />} />
            <Route path="/updateProfile" element={<UpdateProfile />} />
            <Route path="/buyandsell/:userId" element={<BuyandSell />} />
            <Route path="/event/:userId" element={<Event />} />
            <Route path="/recruitment/:userId" element={<Recruitment />} />
            <Route path="/profile1/:userId" element={<Profile1 />} />
            <Route path="/profile2/:userId" element={<Profile2 />} />
            <Route path="/profile3/:userId" element={<Profile3 />} />
            <Route path="/admin/:userId" element={<Admin />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
        <Route element={<OnlyIfNotLoggedIn />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
