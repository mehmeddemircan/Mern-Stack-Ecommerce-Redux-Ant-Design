import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Layout, Menu, Breadcrumb, Button, Dropdown } from "antd";
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
import "./Layout.css";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  GlobalOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Input, Avatar, Drawer, Tooltip, Badge } from "antd";
import {
  MenuOutlined,
  SettingOutlined,
  HeartOutlined,
  ShoppingCartOutlined,
  BellOutlined,
  ShopOutlined,
  ReconciliationOutlined,
  LogoutOutlined,
  ShoppingOutlined,
  QuestionOutlined,
  GiftOutlined,
} from "@ant-design/icons";
import languages from "../languages/Languages";
import classNames from "classnames";
import i18next from "i18next";
import cookies from "js-cookie";
import { useTranslation } from "react-i18next";
import { MailOutlined, AppstoreOutlined } from "@ant-design/icons";
import ModalForm from "../modal/Login";
import { isUserLoggedIn, logout } from "../../actions/userActions";
import SearchBar from "../searchbar/SearchBar";
import { toast } from "react-toastify";
const { SubMenu, Item } = Menu;

const { Header, Content, Sider } = Layout;

const brandName = "Company";

const userMenuItem = {
  margin: "5px 0px",
};

const LayoutMain = (props) => {
  const [current, setCurrent] = useState("");
  const [collapsed, setCollapsed] = useState(false);

  const toggle = () => {
    setCollapsed((prev) => !prev);
  };

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  // Modal operations
  const [showModal, setShowModal] = useState(false);

  const handleOpen = () => {
    console.log("hello");
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  // language tools
  const currentLanguageCode = cookies.get("i18next") || "en";
  const currentLanguage = languages.find((l) => l.code === currentLanguageCode);

  const { t } = useTranslation();
  const auth = useSelector((state) => state.auth);
  const { user } = auth;
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.authenticate) {
      setShowModal(false);
    }
  }, [auth.authenticate]);

  // logout
  const logoutHandler = () => {
    dispatch(logout());
    history.push("/");
  };

  const renderLoggedInMenu = () => {
    return (
      <>
        <Dropdown
          overlay={
            <Menu key="1" style={{ width: 240 }}>
              <Menu.Item key="setting:0" style={userMenuItem}>
                <Link to="/profile/me">
                  {/* <Avatar
                  icon={
                    <UserOutlined className="fs-5" style={{ paddingLeft: 1 }} />
                  }
                /> */}
                  <Avatar
                    style={{
                      backgroundColor: "#3498db",
                      verticalAlign: "middle",
                    }}
                  >
                    {/* {user.name.charAt(0).toUpperCase() + user.name.substring(1,2)} */}
                    {user.name.substring(0, 2).toUpperCase()}
                  </Avatar>

                  <span style={{ paddingLeft: 8 }}>
                    {user.name.charAt(0).toUpperCase() + user.name.slice(1)}{" "}
                  </span>
                </Link>
              </Menu.Item>

              <Menu.Divider />
              <Menu.Item key="setting:1" style={userMenuItem}>
                <a style={{ paddingLeft: 8 }}>{t("accountMenu.messages")}</a>
              </Menu.Item>
              <Menu.Item
                key="setting:2"
                icon={<ReconciliationOutlined className="fs-5" />}
                style={userMenuItem}
              >
                {t("accountMenu.purchasesHistory")}
              </Menu.Item>
              <Menu.Item
                key="setting:3"
                icon={<SettingOutlined className="fs-5" />}
                style={userMenuItem}
              >
                {t("accountMenu.accountSettings")}
              </Menu.Item>
              <Menu.Item
                key="setting:4"
                icon={<ShopOutlined className="fs-5" />}
                style={userMenuItem}
              >
                {t("accountMenu.sellOn", { brandName })}
              </Menu.Item>

              <Menu.Item
                key="setting:5"
                icon={<GiftOutlined className="fs-5" />}
                style={userMenuItem}
              >
                <Link to="/gift/cards">Gift Cards</Link>
              </Menu.Item>
      

              <Menu.Divider />
              <Menu.Item
                key="setting:5"
                icon={<LogoutOutlined className="fs-5" />}
                onClick={logoutHandler}
              >
                {t("accountMenu.logout")}
              </Menu.Item>
            </Menu>
          }
          className="float-end"
          trigger={["click"]}
        >
          <Tooltip
            key="your-account"
            title={t("toolTip.yourAccount")}
            placement="bottom"
          >
            {" "}
            <Avatar
              style={{
                backgroundColor: "#3498db",
                verticalAlign: "middle",
                margin: "8px 10px 0 10px",
                // letterSpacing: 1,
                // fontSize: 15
              }}
            >
              {/* {user.name.charAt(0).toUpperCase() + user.name.substring(1,2)} */}
              {user.name.substring(0, 2).toUpperCase()}
            </Avatar>
          </Tooltip>
        </Dropdown>
      </>
    );
  };
  const renderNotLoggedInMenu = () => {
    return (
      <Button
        onClick={handleOpen}
        className="float-end"
        shape="round"
        style={{ margin: "10px 10px 0 10px" }}
      >
        {t('header.signinBtn')}
      </Button>
    );
  };

  const notify = () => {
    toast.success("hello whatssappp");
    console.log("hello");
  };

  return (
    <Layout>
      <Menu
        onClick={handleClick}
        selectedKeys={[current]}
        mode="horizontal"
        style={{ height: 55 }}
      >
        <Link style={{ fontSize: 20, marginLeft: 15, marginRight: 15 }} to="/">
          Company Dashboard
        </Link>
        <Menu.Item key="mail" icon={<MailOutlined />} onClick={notify}>
          Chartz
        </Menu.Item>
        <Menu.Item key="app" icon={<AppstoreOutlined />}>
          <Link to="/coupon"> Create coupon</Link>
        </Menu.Item>
        <SubMenu key="SubMenu" icon={<SettingOutlined />} title="Pages">
          <Menu.Item key="setting:1">
            <Link to="/category/create"> Categories</Link>
          </Menu.Item>
          <Menu.Item key="setting:1">
            <Link to="/subcategory/create"> Sub Categories</Link>
          </Menu.Item>
          <Menu.Item key="setting:2">
            <Link to="/products/create"> Products</Link>
          </Menu.Item>
          <Menu.Item key="setting:3">
            <Link to="/sellers/all">Sellers</Link>
          </Menu.Item>
          <Menu.Item key="setting:4">
            <Link to="/shops/all">Shops</Link>
          </Menu.Item>
          <Menu.Item key="setting:4">
            <Link to="/coupon">Coupon</Link>
          </Menu.Item>
          <Menu.Item key="setting:5">
            <Link to="/users/all">Users</Link>
          </Menu.Item>
        </SubMenu>
        <SearchBar />
        {/* Multiple language segment & icon */}
        <Dropdown
          overlay={
            <Menu style={{ width: 170, padding: 12, borderRadius: 13 }}>
              {languages.map(({ code, name, country_code }) => (
                <Menu.Item
                  style={{ fontSize: 16, margin: "6px 0px" }}
                  className={classNames("dropdown-item", {
                    disabled: currentLanguageCode === code,
                  })}
                  onClick={() => {
                    i18next.changeLanguage(code);
                  }}
                >
                  <span
                    className={`flag-icon flag-icon-${country_code} mx-2`}
                    style={{
                      opacity: currentLanguageCode === code ? 0.5 : 1,
                    }}
                  ></span>
                  {name}
                </Menu.Item>
              ))}
            </Menu>
          }
          trigger={["click"]}
          className="float-end fs-5"
        >
          <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
            <GlobalOutlined style={{ padding: "0 10px", margin: "0 6px" }} />
          </a>
        </Dropdown>
        {/* Render logged in or not  */}
        {auth.authenticate ? renderLoggedInMenu() : renderNotLoggedInMenu()}

        <ModalForm
          visible={showModal}
          showModal={showModal}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          handleClose={handleClose}
        />
      </Menu>

      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1", "sub2"]}
            style={{ height: "100%", borderRight: 0 }}
          >
            <SubMenu key="sub1" icon={<LaptopOutlined />} title="Pages">
              <Menu.Item key="dashboard"><Link to="/">Dashboard</Link></Menu.Item>
              <Menu.Item key="products"><Link to="/products">Products</Link></Menu.Item>
              <Menu.Item key="product"><Link to="/product">Product</Link></Menu.Item>
              <Menu.Item key="category"><Link to="/category">Category</Link></Menu.Item>
              <Menu.Item key="subcategory"><Link to="/sub">Sub Category</Link></Menu.Item>
              <Menu.Item key="coupon"><Link>Coupon</Link></Menu.Item>
              <Menu.Item key="updateProfile"><Link to="/profile/me">Update profile</Link></Menu.Item>
              </SubMenu>
            <SubMenu key="sub2" icon={<LaptopOutlined />} title="subnav 2">
              <Menu.Item key="5">
                <Link to="/product/create">Create product</Link>
              </Menu.Item>
              <Menu.Item key="6">option6</Menu.Item>
              <Menu.Item key="7">option7</Menu.Item>
              <Menu.Item key="8">option8</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub3"
              icon={<NotificationOutlined />}
              title="subnav 3"
            >
              <Menu.Item key="9">option9</Menu.Item>
              <Menu.Item key="10">option10</Menu.Item>
              <Menu.Item key="11">option11</Menu.Item>
              <Menu.Item key="12">option12</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: "#fff",
            }}
          >
            {props.children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default LayoutMain;
