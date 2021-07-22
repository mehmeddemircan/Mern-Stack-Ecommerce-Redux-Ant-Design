import React from "react";
import { Menu } from "antd";
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "antd";
import { List, Card } from "antd";
import Navbar from "./Navbar/Navbar";

const data = [
  {
    title: "Title 1",
  },
  {
    title: "Title 2",
  },
  {
    title: "Title 3",
  },
  {
    title: "Title 4",
  },
];


const { SubMenu } = Menu;

const submenuStyle ={
  padding: '0px 24px',


}

const MenuHeader = () => {
  const [current, setCurrent] = useState("");

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  return (
    <div>
     
      <Navbar />
    </div>
  );
};

export default MenuHeader;
