import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Layout from "../components/layout/Layout";
import { PageHeader, Empty, Button } from "antd";
import { Link } from "react-router-dom";
import { List, Avatar, Space } from "antd";
import { DeleteOutlined, ShoppingOutlined } from "@ant-design/icons";
import { Card } from "antd";
import { InputNumber } from "antd";

import CheckOutSteps from "../components/checkoutsteps/CheckOutSteps";
import {
  addItemToCart,
  removeItemFromCart,
  userCart,
} from "../actions/cartActions";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
const style = {
  border: "1px solid rgb(235, 237, 240)",
};

var str =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

const CartPage = () => {
  const { cartItems, success } = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);
  const history = useHistory();
  const dispatch = useDispatch();
  function onChange(value) {
    console.log("changed", value);
  }

  const removeCartItemHandler = (id) => {
    dispatch(removeItemFromCart(id));
  };

  const handleQuantityChange = (slug, qty) => {
    dispatch(addItemToCart(slug, qty));
  };
  const getCartSubTotal = () => {
    return cartItems
      .reduce((acc, item) => acc + item.quantity * item.price, 0)
      .toFixed(2);
  };
  const getCartCount = () => {
    return cartItems.reduce((qty, item) => Number(item.quantity) + qty, 0);
  };

  const saveOrderToDb = () => {
    dispatch(userCart(cartItems, auth.token));

    history.push("/checkout");
    // if (success) {

    // }
  };

  return (
    <Layout>
      <Link to="/products">
        <PageHeader
          style={style}
          onBack={() => null}
          title="Your Cart"
          subTitle="products in cart"
        />
      </Link>

      {/* When there is no product in the cart */}

      <div>
        <Card
          title={<h4 style={{ textAlign: "center", margin: 0 }}>Cart Info</h4>}
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

          {auth.token ? (
            <>
              <Button
                onClick={saveOrderToDb}
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
                // href="/checkout"
                disabled={!cartItems.length}
              >
                Proceed To Checkout
              </Button>
              <Button
                style={{
                  background: "rgb(34, 34, 34)",
                  color: "#fff",
                  width: "100%",
                  fontSize: 17,
                  height: 40,
                  lineHeight: "37px",
                }}
                shape="round"
                href="/checkout"
              >
                Pay Cash On Delivery
              </Button>
            </>
          ) : (
            <Button
              style={{
                background: "rgb(34, 34, 34)",
                color: "#fff",
                width: "100%",
                fontSize: 17,
                height: 40,
                lineHeight: "37px",
              }}
              shape="round"
              href="/checkout"
            >
              Login To Checkout
            </Button>
          )}
        </Card>

        {cartItems.length === 0 ? (
          <Empty
            image="https://images.pexels.com/photos/5632398/pexels-photo-5632398.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
            imageStyle={{
              height: 230,
            }}
            className="mt-2"
            description={
              <>
                <span style={{ fontSize: 25, padding: 10 }}>
                  Your cart is Empty
                </span>
                <a href="/products">shop now</a>
                <p style={{ padding: 10 }}>
                  Before proceed to checkout, you must add some products to your
                  cart. You will find a lot of interesting products on your
                  "Shop" page
                </p>
              </>
            }
          >
            <Link to="/products">
              {" "}
              <Button
                type="primary"
                icon={<ShoppingOutlined style={{ fontSize: 17 }} />}
              >
                Shop Now
              </Button>
            </Link>
          </Empty>
        ) : (
          <List
            itemLayout="horizontal"
            dataSource={cartItems}
            style={{ maxWidth: 800 }}
            renderItem={(item) => (
              <List.Item
                key={item.product}
                style={{ maxWidth: 800, marginTop: 10 }}
                actions={[
                  <>
                    {" "}
                    <input
                      type="number"
                      min={1}
                      // max={10}
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(item.slug, e.target.value)
                      }
                      style={{
                        width: 60,
                        marginRight: 14,
                        border: "1px solid rgba(34, 34, 34, 0.15)",
                        color: "#222",
                        textAlign: "center",
                        padding: 4,
                      }}
                    />
                    <Button
                      key="list-loadmore-edit"
                      icon={<DeleteOutlined />}
                      onClick={() => removeCartItemHandler(item.product)}
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
                    <Link to={`/product/${item.slug}`}>
                      <h6>
                        {item.title.length > 100 ? (
                          <>{item.title.substring(0, 60)} ...</>
                        ) : (
                          <>{item.title}</>
                        )}
                      </h6>
                    </Link>
                  }
                  description={
                    <>
                   

                      <p>
                        {item.description.length > 100 ? (
                          <>{item.description.substring(0, 65)} ...</>
                        ) : (
                          <>{item.description}</>
                        )}
                      </p>
                      <h6 style={{ fontSize: 15 }}>{item.price} $</h6>
                    </>
                  }
                />
              </List.Item>
            )}
          />
        )}
      </div>
    </Layout>
  );
};

export default CartPage;
