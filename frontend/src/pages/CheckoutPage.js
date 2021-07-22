import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import { useSelector, useDispatch } from "react-redux";
import { Form, Input, message, Select } from "antd";
import { Link } from "react-router-dom";

import { PageHeader, Button, List, Tag } from "antd";

import { Card } from "antd";
import { useTranslation } from "react-i18next";
import MetaData from "../components/layout/MetaData";
import { emptyUserCart, getUserCart } from "../actions/cartActions";
import { saveUserAdress, applyCoupon } from "../actions/userActions";
import { toast } from "react-toastify";
import { APPLY_COUPON_RESET } from "../constants/couponConstants";
import { RESET_CART } from "../constants/cartConstants";

const { Option } = Select;
const style = {
  border: "1px solid rgb(235, 237, 240)",
};

const CheckoutPage = ({ history }) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { cartItems, cartTotal, products } = useSelector((state) => state.cart);
  const [address, setAddress] = useState("");
  const [addressSaved, setAddressSaved] = useState(false);
  const userCoupon = useSelector((state) => state.userCoupon);
  const [coupon, setCoupon] = useState("");
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [discountError, setDiscountError] = useState("");
  const getCartCount = () => {
    return cartItems.reduce((qty, item) => Number(item.quantity) + qty, 0);
  };
  const getCartSubTotal = () => {
    return cartItems
      .reduce((acc, item) => acc + item.quantity * item.price, 0)
      .toFixed(2);
  };

  useEffect(() => {
    dispatch(getUserCart(auth.token));

    if (userCoupon.success) {
      // toast.success('Coupon applied successfully')
      // message.success('Coupon applied successfully')
      setTotalAfterDiscount(userCoupon.totalAfterDiscount);

      dispatch({
        type: APPLY_COUPON_RESET,
      });
    }
  }, [dispatch, auth, userCoupon]);
  const saveAddressToDb = () => {
    // saveUserAdress(address,auth.token).then((res) => {
    //     if (res.data.ok) {
    //       setAddressSaved(true)
    //       toast.success('Address saved')
    //     }
    // }).catch((err) => {
    //   toast.error(err.message)
    // });
    dispatch(saveUserAdress(address, auth.token));

    if (address) {
      setAddressSaved(true);
      toast(<a style={{ color: "#222" }}>Successfully saved address</a>);
    }

    // dispatch(userCart(cartItems,auth.token))

    // history.push('/checkout')
    // // if (success) {

    // // }
  };

  const applyDiscountCoupon = () => {
    dispatch(applyCoupon(coupon, auth.token));

    if (userCoupon.success) {
      // toast.success('Coupon applied successfully')
      message.success("Coupon applied successfully");
      setTotalAfterDiscount(userCoupon.totalAfterDiscount);
    }

    // if (userCoupon.error) {
    //   message.error('Invalid Coupon !')
    // }
  };

  const handleEmptyCart = () => {
    localStorage.removeItem("cartItems");

    dispatch({
      type: RESET_CART,
    });

    dispatch(emptyUserCart(auth.token));

    history.push("/cart");
    history.push("/cart");
  };
  const { t } = useTranslation();

  return (
    <Layout>
      <MetaData title={t("mainTitle.checkout")} />

      <Link to="/cart">
        <PageHeader
          style={style}
          onBack={() => null}
          title="Checkout"
          subTitle="checkout input adress"
        />
      </Link>

      <Card
        title={
          <h4 style={{ textAlign: "center", margin: 0 }}>Order Summary</h4>
        }
        hoverable
        style={{
          width: 300,
          float: "right",
          margin: 10,
          border: "1px solid #0082c8",
          fontSize: 16,
        }}
      >
        <p>Subtotal ({getCartCount()}) items</p>
        <p>Shipping Price : 1200 $</p>
        <p>Tax Price : 60 $</p>
        <hr />
        <p style={{ fontWeight: 550 }}>Total Price : {getCartSubTotal()} $</p>
        {totalAfterDiscount > 0 && (
          // <Tag color="#87d068" style={{fontSize: 15,height: 35, line}}>Total payable : {totalAfterDiscount}</Tag>
          <p
            style={{
              background: "#87d068",
              height: 35,
              lineHeight: "35px",
              fontWeight: "bold",
            }}
          >
            Total payable : {totalAfterDiscount} $
          </p>
        )}
        <Button
          style={{
            background: "rgb(34, 34, 34)",
            color: "#fff",
            width: "100%",
            fontSize: 17,
            height: 40,
            marginBottom: 10,
            lineHeight: "31px",
          }}
          shape="round"
          disabled={!addressSaved || !products}
          onClick={() => history.push("/payment")}
        >
          Place Order
        </Button>
        <Button
          style={{
            background: "rgb(34, 34, 34)",
            color: "#fff",
            width: "100%",
            fontSize: 17,
            height: 40,
          }}
          shape="round"
          onClick={handleEmptyCart}
        >
          Empty Cart
        </Button>
      </Card>

      <Card
        hoverable
        style={{
          display: "flex",
          alignItems: "center",
          minHeight: 480,
          flexDirection: "column",

          marginTop: 10,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            marginBottom: 5,
          }}
        >
          <h5 style={{ marginBottom: 20 }}>Checkout Details</h5>
          <p style={{ width: 800, marginBottom: 15, textAlign: "center" }}></p>
        </div>

        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          style={{ width: 800 }}
        >
          <Form.Item label="Address" style={{ maxWidth: 800, marginTop: 15 }}>
            <Input.Group compact>
              <Form.Item
                name={["address", "street"]}
                noStyle
                rules={[{ required: true, message: "Street is required" }]}
              >
                <Input
                  style={{ width: "80%", marginLeft: 0 }}
                  placeholder="Input street"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </Form.Item>
            </Input.Group>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              shape="round"
              style={{
                marginTop: 6,
                marginBottom: 10,
                letterSpacing: 1.2,
                lineHeight: 1.3,
                background: "#1890FF",
              }}
              onClick={saveAddressToDb}
            >
              Save Adress
            </Button>
          </Form.Item>
          <Link style={{ color: "#222", fontSize: 15 }}>Got Coupon? </Link>
          <Form.Item
            name="email"
            style={{ width: "50%", marginBottom: 10, marginTop: 5 }}
          >
            <Input
              type="text"
              placeholder="Coupon Code"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              className="form-control"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              className="login-form-button"
              shape="round"
              style={{
                marginTop: 10,
                letterSpacing: 1.2,
                lineHeight: 1.3,
                background: "#1890FF",
              }}
              onClick={applyDiscountCoupon}
            >
              Apply Coupon
            </Button>
          </Form.Item>
        </Form>
        <hr />
        <h5 style={{ marginTop: 24 }}>Checkout products</h5>
        <List
          itemLayout="horizontal"
          dataSource={products}
          style={{ maxWidth: 800 }}
          renderItem={(item) => (
            <List.Item
              key={item.product}
              style={{ maxWidth: 800 }}
              actions={[
                <>
                  {/* <a style={{color: '#222'}}>Qty :</a> */}
                  <input
                    type="number"
                    min={1}
                    // max={10}
                    value={item.count}
                    style={{
                      width: 60,
                      marginRight: 14,
                      border: "1px solid rgba(34, 34, 34, 0.15)",
                      color: "#222",
                      textAlign: "center",
                      padding: 4,
                    }}
                  />
                </>,
              ]}
            >
              <List.Item.Meta
                avatar={
                  <img
                    width={120}
                    style={{ objectFit: "cover", height: 80 }}
                    alt="logo"
                    src={item.image}
                  />
                }
                title={
                  <Link to={`/cart`}>
                    <h6 style={{ marginTop: 10 }}>
                      {item.title && item.title.length > 100 ? (
                        <>{item.title.substring(0, 60)} ...</>
                      ) : (
                        <>{item.title}</>
                      )}
                    </h6>
                    <h6 style={{ fontSize: 15 }}>{item.price} $ </h6>
                  </Link>
                }
              />
            </List.Item>
          )}
        />
      </Card>
    </Layout>
  );
};

export default CheckoutPage;
