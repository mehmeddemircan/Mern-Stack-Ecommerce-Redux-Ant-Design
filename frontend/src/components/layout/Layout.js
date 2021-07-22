import React, { useState, useEffect } from "react";
import "./Layout.css";

import {
  Layout,
  Menu,
  Button,
  Avatar,
  Drawer,
  Dropdown,
  Tooltip,
  Badge,
} from "antd";
import {
  MenuOutlined,
  UserOutlined,
  SettingOutlined,
  LaptopOutlined,
  NotificationOutlined,
  HeartOutlined,
  ShoppingCartOutlined,
  BellOutlined,
  ShopOutlined,
  ReconciliationOutlined,
  LogoutOutlined,
  ShoppingOutlined,
  GlobalOutlined,
  QuestionOutlined,
  GiftOutlined,
} from "@ant-design/icons";
import ChatOutlinedIcon from "@material-ui/icons/ChatOutlined";
import ModalForm from "../modal/Login";
import { Link, useHistory } from "react-router-dom";

import SearchBar from "../search/SearchBar";
import FooterComponent from "../footer";
import MenuHeader from "../menuHeader/Navbar/Navbar";
import Backtop from "../backtop/Backtop";
import { useTranslation } from "react-i18next";
import classNames from "classnames";
import i18next from "i18next";
import cookies from "js-cookie";
import languages from "../languages/Languages";
import { useSelector, useDispatch } from "react-redux";

import { logout } from "../../actions/userActions";

import SearchBar3 from "../search/SearchBar3";
const { Content } = Layout;

const { SubMenu } = Menu;

const userMenuItem = {
  margin: "5px 0px",
};

const Layout2 = (props) => {
  const [current, setCurrent] = useState("");

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
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

  useEffect(() => {
    console.log("Setting page stuff");
    document.body.dir = currentLanguage.dir || "ltr";
    document.title = t("app_title");
  }, [currentLanguage, t]);

  const brandName = "Amazon";

  const auth = useSelector((state) => state.auth);
  const { user } = auth;
  const dispatch = useDispatch();
  const history = useHistory();
  const { cartItems } = useSelector((state) => state.cart);
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

  // Avatar profile 2 character
  const getCartCount = () => {
    return cartItems.reduce((qty, item) => Number(item.quantity) + qty, 0);
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
                  {/* <Avatar
                    style={{
                      backgroundColor: "#3498db",
                      verticalAlign: "middle",
                    }}
                  >
                   
                    {user.name.substring(0, 2).toUpperCase()}
                  </Avatar> */}

                  <Avatar
                    style={{
                      backgroundColor: "#3498db",
                      verticalAlign: "middle",

                      // letterSpacing: 1,
                      // fontSize: 15
                    }}
                    src={
                      user.pictures && user.pictures.length > 0
                        ? user.pictures[0].url
                        : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAM1BMVEXk5ueutLfn6eqrsbTp6+zg4uOwtrnJzc/j5earsbW0uby4vcDQ09XGyszU19jd3+G/xMamCvwDAAAFLklEQVR4nO2d2bLbIAxAbYE3sDH//7WFbPfexG4MiCAcnWmnrzkjIRaD2jQMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMw5wQkHJczewxZh2lhNK/CBOQo1n0JIT74/H/qMV0Z7GU3aCcVPuEE1XDCtVLAhgtpme7H0s1N1U7QjO0L8F7llzGeh1hEG/8Lo7TUmmuSrOfns9xnGXpXxsONPpA/B6OqqstjC6Ax/0ujkNdYQQbKNi2k64qiiEZ+ohi35X+2YcZw/WujmslYewiAliVYrxgJYrdwUmwXsU+RdApUi83oNIE27YvrfB/ZPg8+BJETXnqh9CVzBbTQHgojgiCvtqU9thFJg/CKz3VIMKMEkIXxIWqIpIg2SkjYj+xC816mrJae2aiWGykxRNsW0UwiJghJDljYI5CD8GRiCtIsJxizYUPQ2pzItZy5pcisTRdk/a9m4amtNNfBuQkdVhSaYqfpNTSFGfb9GRIakrE2Pm+GFLaCQPqiu0OpWP+HMPQQcgQMiQprWXNmsVwIjQjYi/ZrhAqNTCgr2gu0Jnz85RSSjso0HkMFZ0YZjKkc26a/jlmh9JiDyDxi9oeorTYAzZkwwoMz19pzj9bnH/GP/+qbchjSGflneWYhtTuKdMOmNKZcJ5TjInQKcYXnESd/jQxy0ENpULTNGOGgxpap/oyw9pbUAqhfx2Dbkhovvfgz4iUzoM9+GlK6/Mh4q29hyC1mwro30hpVVLPF9wYQr71RazOeM5/cw81iBRD+A03aM9/C/obbrKjbYSpCmIVG3qT/Q8oeUo3Rz0IL7vI1tEbCB9pSiu8I/aV8x3Kg/BGWrWp4ZVs0nZfmAoEG4h/61yHYIJiFSl6Q0Vk6tTW1N8kYp8hdOkfHYYMXd2Qft+8CYwqYDSKvqIh+MCF8Wgca2u/cwdgeW3TtuVn6+1oBs3yLo5C2JpK6CvQzGpfUkz9UG/87gCsi5o2LIXolxN0FbwAsjOLEr+YJmXn7iR6N0BCt5p5cMxm7eAsfS+/CACQf4CTpKjzgkvr2cVarVTf96372yut7XLJ1sa7lv6VcfgYrWaxqr3Wlo1S6pvStr22sxOtTNPLzdY3nj20bPP+ejFdJYkLsjGLdtPBEbe/mr2bQKiXWJDroA+vtzc0p9aahuwqHMDYrQEXHEw9jwQl3drMpts9JBU1SdktPe5FBRdJQ6bwXBpa57ib2A8kukQDzMjh++Uo7Fo6Wd02Pkf4fknqoo4HtvAIjsqUcjx6DIPgWCaOML9rKI/oqD9/lgNrn+eF+p7j8tnzHBiR7+kdUGw/+V1Kzkc75mMy6U+FMaxjPibiM1U1uGM+puInHpmALZCgP4pt7i840MV8+0R1zPsRB6UTcqpizncYwZ89syDydfyWCwXB1l8/zRNGWbTG/GHKUm9AkxHMc/EGSk3z2+ArEhPEV5TUBLEvUGFcjEUH80J/jveTGOAJEljJbILWGQT3zRYiwuKsUXN1EEJAzBhRJFll7mBUG7KD8EqPkKekBREaL8hMDZLQSG6AQjtHPYmvTQnX0TtpC1SYCe2YdkkyLP3jj5BSbKiuR585eQhTgoje6yIb0Yb0C+mV6EYvebqw5SDy2WmubogZiF2AVxPC2FpDf8H2Q9QWo6IkjUxTWVEI3WY/wrCeSuqJ+eRWzXR/JXwgVjUMozbCOfoEZiSiKVGepqv5CJ8RyR4D7xBeamqa7z3BJ/z17JxuBPdv93d/a2Ki878MMAzDMAzDMAzDMAzDMF/KP09VUmxBAiI3AAAAAElFTkSuQmCC"
                    }
                  />
                  <span style={{ paddingLeft: 8 }}>
                    {user.name.charAt(0).toUpperCase() + user.name.slice(1)}{" "}
                  </span>
                </Link>
              </Menu.Item>

              <Menu.Divider />
              <Menu.Item
                key="setting:1"
                icon={<ChatOutlinedIcon className="fs-5" />}
                style={userMenuItem}
              >
                <a style={{ paddingLeft: 8 }}>{t("accountMenu.messages")}</a>
              </Menu.Item>
              <Menu.Item
                key="setting:2"
                icon={<ReconciliationOutlined className="fs-5" />}
                style={userMenuItem}
              >
                <Link to="/user/history">
                  {" "}
                  {t("accountMenu.purchasesHistory")}
                </Link>
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
                // objectFit: 'cover'
                // letterSpacing: 1,
                // fontSize: 15
              }}
              src={
                user.pictures && user.pictures.length > 0
                  ? user.pictures[0].url
                  : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAM1BMVEXk5ueutLfn6eqrsbTp6+zg4uOwtrnJzc/j5earsbW0uby4vcDQ09XGyszU19jd3+G/xMamCvwDAAAFLklEQVR4nO2d2bLbIAxAbYE3sDH//7WFbPfexG4MiCAcnWmnrzkjIRaD2jQMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMw5wQkHJczewxZh2lhNK/CBOQo1n0JIT74/H/qMV0Z7GU3aCcVPuEE1XDCtVLAhgtpme7H0s1N1U7QjO0L8F7llzGeh1hEG/8Lo7TUmmuSrOfns9xnGXpXxsONPpA/B6OqqstjC6Ax/0ujkNdYQQbKNi2k64qiiEZ+ohi35X+2YcZw/WujmslYewiAliVYrxgJYrdwUmwXsU+RdApUi83oNIE27YvrfB/ZPg8+BJETXnqh9CVzBbTQHgojgiCvtqU9thFJg/CKz3VIMKMEkIXxIWqIpIg2SkjYj+xC816mrJae2aiWGykxRNsW0UwiJghJDljYI5CD8GRiCtIsJxizYUPQ2pzItZy5pcisTRdk/a9m4amtNNfBuQkdVhSaYqfpNTSFGfb9GRIakrE2Pm+GFLaCQPqiu0OpWP+HMPQQcgQMiQprWXNmsVwIjQjYi/ZrhAqNTCgr2gu0Jnz85RSSjso0HkMFZ0YZjKkc26a/jlmh9JiDyDxi9oeorTYAzZkwwoMz19pzj9bnH/GP/+qbchjSGflneWYhtTuKdMOmNKZcJ5TjInQKcYXnESd/jQxy0ENpULTNGOGgxpap/oyw9pbUAqhfx2Dbkhovvfgz4iUzoM9+GlK6/Mh4q29hyC1mwro30hpVVLPF9wYQr71RazOeM5/cw81iBRD+A03aM9/C/obbrKjbYSpCmIVG3qT/Q8oeUo3Rz0IL7vI1tEbCB9pSiu8I/aV8x3Kg/BGWrWp4ZVs0nZfmAoEG4h/61yHYIJiFSl6Q0Vk6tTW1N8kYp8hdOkfHYYMXd2Qft+8CYwqYDSKvqIh+MCF8Wgca2u/cwdgeW3TtuVn6+1oBs3yLo5C2JpK6CvQzGpfUkz9UG/87gCsi5o2LIXolxN0FbwAsjOLEr+YJmXn7iR6N0BCt5p5cMxm7eAsfS+/CACQf4CTpKjzgkvr2cVarVTf96372yut7XLJ1sa7lv6VcfgYrWaxqr3Wlo1S6pvStr22sxOtTNPLzdY3nj20bPP+ejFdJYkLsjGLdtPBEbe/mr2bQKiXWJDroA+vtzc0p9aahuwqHMDYrQEXHEw9jwQl3drMpts9JBU1SdktPe5FBRdJQ6bwXBpa57ib2A8kukQDzMjh++Uo7Fo6Wd02Pkf4fknqoo4HtvAIjsqUcjx6DIPgWCaOML9rKI/oqD9/lgNrn+eF+p7j8tnzHBiR7+kdUGw/+V1Kzkc75mMy6U+FMaxjPibiM1U1uGM+puInHpmALZCgP4pt7i840MV8+0R1zPsRB6UTcqpizncYwZ89syDydfyWCwXB1l8/zRNGWbTG/GHKUm9AkxHMc/EGSk3z2+ArEhPEV5TUBLEvUGFcjEUH80J/jveTGOAJEljJbILWGQT3zRYiwuKsUXN1EEJAzBhRJFll7mBUG7KD8EqPkKekBREaL8hMDZLQSG6AQjtHPYmvTQnX0TtpC1SYCe2YdkkyLP3jj5BSbKiuR585eQhTgoje6yIb0Yb0C+mV6EYvebqw5SDy2WmubogZiF2AVxPC2FpDf8H2Q9QWo6IkjUxTWVEI3WY/wrCeSuqJ+eRWzXR/JXwgVjUMozbCOfoEZiSiKVGepqv5CJ8RyR4D7xBeamqa7z3BJ/z17JxuBPdv93d/a2Ki878MMAzDMAzDMAzDMAzDMF/KP09VUmxBAiI3AAAAAElFTkSuQmCC"
              }
            />
          </Tooltip>
        </Dropdown>

        {/* Bell notification  */}
        <Dropdown
          overlay={
            <Menu
              style={{ height: 540, overflowY: "auto", borderRadius: 17 }}
              mode="vertical"
              className="scrollbar-notifications"
            >
              <h5
                style={{ textAlign: "center", marginBottom: 12, marginTop: 10 }}
              >
                Updates <Badge count={5} />
              </h5>
              <Menu.Item>
                <div style={{ width: 300, padding: 8 }}>
                  <p>
                    An item you favourited is <strong>now on sale</strong>
                  </p>
                  <img src="/images/p1.jpg" height="100" />
                </div>
              </Menu.Item>
              <Menu.Item>
                <div style={{ width: 300, padding: 8 }}>
                  <p>
                    An item you favourited is <strong>now on sale</strong>
                  </p>
                  <img src="/images/p1.jpg" height="100" />
                </div>
              </Menu.Item>
              <Menu.Item>
                <div style={{ width: 300, padding: 8 }}>
                  <p>
                    An item you favourited is <strong>now on sale</strong>
                  </p>
                  <img src="/images/p1.jpg" height="100" />
                </div>
              </Menu.Item>
              <Menu.Item>
                <div style={{ width: 300, padding: 8 }}>
                  <p>
                    An item you favourited is <strong>now on sale</strong>
                  </p>
                  <img src="/images/p1.jpg" height="100" />
                </div>
              </Menu.Item>
              {/* <Menu.Item>
                <div style={{ width: 300,padding: 8 }}>
                  <p>
                    An item you favourited is <strong>now on sale</strong>
                  </p>
                  <img src="/images/p1.jpg" height="100" />
                </div>
              </Menu.Item>
    */}
            </Menu>
          }
          trigger={["click"]}
        >
          <Tooltip
            key="your-notifications"
            title={t("toolTip.yourNotifications")}
            placement="bottom"
          >
            <BellOutlined
              className="fs-5 float-end  p-3"
              style={{ color: "#222" }}
            />
          </Tooltip>
        </Dropdown>

        {/* Wishlist */}
        <Link to={`/user/${user._id}/wishlist`}>
          <Tooltip
            key="your-favorites"
            title={t("toolTip.yourWishlist")}
            placement="bottom"
          >
            <HeartOutlined
              className="fs-5 float-end  p-3"
              style={{ color: "#222" }}
            />
          </Tooltip>
        </Link>
      </>
    );
  };

  const renderNotLoggedInMenu = () => {
    return (
      <Button
        key="signin"
        onClick={handleOpen}
        className="float-end "
        shape="round"
        style={{ margin: "10px 5px 0px 5px" }}
      >
        {t("header.signinBtn")}
      </Button>
    );
  };

  return (
    <Layout>
      {/* Drawer sidebar */}
      <Drawer
        title={<h3>Company</h3>}
        placement="left"
        closable={false}
        onClose={onClose}
        visible={visible}
      >
        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          style={{ height: "100%" }}
        >
          <SubMenu
            key="sub1"
            icon={<UserOutlined />}
            title={t("drawer.subscriptions")}
          >
            <Menu.Item key="1">{t("drawer.option")}</Menu.Item>
            <Menu.Item key="2">{t("drawer.option")}</Menu.Item>
            <Menu.Item key="3">{t("drawer.option")}</Menu.Item>
            <Menu.Item key="4">{t("drawer.option")}</Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<ShopOutlined />} title="Favourite Shops">
            <Menu.Item key="1">{t("drawer.option")}</Menu.Item>
            <Menu.Item key="2">{t("drawer.option")}</Menu.Item>
            <Menu.Item key="3">{t("drawer.option")}</Menu.Item>
            <Menu.Item key="4">{t("drawer.option")}</Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub3"
            icon={<LaptopOutlined />}
            title={t("drawer.followers")}
          >
            <Menu.Item key="5">{t("drawer.option")}</Menu.Item>
            <Menu.Item key="6">{t("drawer.option")}</Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub4"
            icon={<LaptopOutlined />}
            title={t("drawer.yourProducts")}
          >
            <Menu.Item key="9">{t("drawer.option")}</Menu.Item>
            <Menu.Item key="10">{t("drawer.option")}</Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub5"
            icon={<LaptopOutlined />}
            title={t("drawer.markets")}
          >
            <Menu.Item key="13">{t("drawer.option")}</Menu.Item>
            <Menu.Item key="14">{t("drawer.option")}</Menu.Item>
          </SubMenu>

          <SubMenu
            key="sub6"
            icon={<NotificationOutlined />}
            title={t("drawer.explore")}
          >
            <Menu.Item key="17">{t("drawer.option")}</Menu.Item>
            <Menu.Item key="18">{t("drawer.option")}</Menu.Item>
            <Menu.Item key="19">{t("drawer.option")}</Menu.Item>
          </SubMenu>
          <Menu.Divider />
          <h6 style={{ padding: "5px 3px", fontSize: 17 }}>
            {t("drawer.morefrom")}
          </h6>

          <Menu.Item key="21" icon={<QuestionOutlined />}>
            {t("drawer.faq")}
          </Menu.Item>
          <Menu.Item key="22" icon={<ShopOutlined />}>
            {t("drawer.createMarket")}
          </Menu.Item>
        </Menu>
      </Drawer>

      {/* Header */}

      <Layout className="site-layout">
        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
          {React.createElement(MenuOutlined, {
            className: "trigger",
            onClick: showDrawer,
            style: { fontSize: 20, marginLeft: 10, padding: "0 10px" },
          })}

          {/* Brand */}
          <Link to="/" style={{ marginLeft: 24, paddingTop: 10, fontSize: 20 }}>
            Company
          </Link>

          <SearchBar3 />

          {/* Multiple language segment & icon */}
          <Dropdown
            overlay={
              <Menu
                style={{
                  width: 170,
                  padding: 12,
                  borderRadius: 15,
                  marginRight: 4,
                }}
              >
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
            <a
              className="ant-dropdown-link"
              onClick={(e) => e.preventDefault()}
            >
              <GlobalOutlined
                style={{
                  padding: "0 10px",
                  margin: "0 10px",
                  color: "#1890ff",
                }}
              />
            </a>
          </Dropdown>

          <Link to="/cart">
            <Tooltip
              key="your-cart"
              title={t("toolTip.yourCart")}
              placement="bottom"
            >
              <Badge
                count={getCartCount()}
                className=" float-end mt-3"
                style={{ marginRight: 4 }}
              >
                <ShoppingCartOutlined
                  className="fs-5 float-end p-2"
                  style={{
                    color: "#222",
                    position: "relative",
                    top: -7,
                    marginLeft: 4,
                  }}
                />
              </Badge>
            </Tooltip>
          </Link>

          {/* Render logged in , not logged in   */}
          {auth.authenticate ? renderLoggedInMenu() : renderNotLoggedInMenu()}

          <Link
            to="/products"
            className="float-end p-1"
            style={{ margin: "0 7px 0 7px" }}
          >
            <ShoppingOutlined />
            {t("header.shop")}
          </Link>

          <ModalForm
            visible={showModal}
            showModal={showModal}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            handleClose={handleClose}
          />
        </Menu>

        {/* Menu header */}
        <MenuHeader />

        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          {props.children}
        </Content>
        {/* Backtop component */}
        <Backtop />
        {/* Footer */}
        <FooterComponent />
      </Layout>
    </Layout>
  );
};

export default Layout2;
