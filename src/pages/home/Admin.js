// import React from 'react'

// function Admin() {
//   return (
//     <div>Admin</div>
//   )
// }

// export default Admin

import React, { useEffect } from "react";
import { getAllUsers } from "../../redux/slices/feedSlice";
import { useSelector, useDispatch } from "react-redux";
import Post from "../../components/post/Postadmin";
import Buyandsel from "../../components/buyandsell/Buyandsel";
import "./Admin.scss";
import Follower from "../../components/follower/Follower";

import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { FaUserAlt } from "react-icons/fa";
// import React from "react";
const { Header, Content, Footer, Sider } = Layout;
const items1 = ["1", "2", "3"].map((key) => ({
  key,
  label: `nav ${key}`,
}));
const items2 = [UserOutlined].map((icon, index) => {
  const key = String(index + 1);
  return {
    // key: `sub${key}`,
    icon: React.createElement(icon),
    label: `All Users`,
    // children: new Array(0).fill(null).map((_, j) => {
    //   const subKey = index * 4 + j + 1;
    //   return {
    //     key: subKey,
    //     label: `option${subKey}`,
    //     // <Post key={post._id} post={post} />
    //   };
    // }),
  };
});

function Admin() {
  const dispatch = useDispatch();
  const feedData = useSelector((state) => state.feedDataReducer.feedData);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  // return (
  //   <div className="container admin">
  {
    /* // <div>Admin</div> */
  }
  {
    /* <div className="left-part">
        <Buyandsel />
      </div> */
  }
  {
    /* <div className="right-part">
        {feedData?.posts?.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </div> */
  }
  // </div>
  // );

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <div className="container">
      <Layout>
        {/* <Header
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          items={items1}
        />
      </Header> */}
        <Content
          style={{
            padding: "0 50px",
          }}
        >
          {/* <Breadcrumb
            style={{
              margin: "16px 0",
            }}
          >
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb> */}
          <Layout
            style={{
              padding: "24px 0",
              background: colorBgContainer,
            }}
          >
            {/* <Sider
              style={{
                background: colorBgContainer,
              }}
              width={200}
            >
              <Menu
                mode="inline"
                defaultSelectedKeys={["1"]}
                defaultOpenKeys={["sub1"]}
                style={{
                  height: "100%",
                }}
                items={""}
              />
              <div className="left-part2">
                <div className="iconss">
                  <FaUserAlt className="col"/>
                  <h3>All Users</h3>
                </div>
                {feedData?.allUser?.map((post) => (
                  <Post key={post._id} post={post} />
                ))}
              </div>
            </Sider> */}
            <Content
              style={{
                padding: "0 24px",
                minHeight: 280,
              }}
            >
              <div className="right-part1">
              <div className="iconss">
                  <FaUserAlt className="col"/>
                  <h3>All Users</h3>
                </div>
                {feedData?.allUser?.map((post) => (
                  <Post key={post._id} post={post} />
                ))}
              </div>
            </Content>
          </Layout>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          {/* Ant Design ©2023 Created by Ant UED */}
        </Footer>
      </Layout>
    </div>
  );
}

export default Admin;
