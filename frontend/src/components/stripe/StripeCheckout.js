import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useSelector, useDispatch } from "react-redux";
import { createPaymentIntent } from "../../actions/stripeActions";
import { Alert, Result, Button } from "antd";
import { STRIPE_APPLY_RESET } from "../../constants/stripeConstants";
import {
  CreditCardOutlined,
  DollarOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { createOrder } from "../../actions/userActions";
import { RESET_CART } from "../../constants/cartConstants";
import { emptyUserCart } from "../../actions/cartActions";
import { toast } from "react-toastify";
import { APPLY_COUPON_RESET } from "../../constants/couponConstants";

const StripeCheckout = ({ history }) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { validCoupon } = useSelector((state) => state.userCoupon);
  const { clientSecret, totalAfterDiscount, cartTotal, success } = useSelector(
    (state) => state.userStripe
  );
  const { giveOrdered } = useSelector((state) => state.newOrder);
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    // createPaymentIntent(auth.token).then((res) => {
    //   console.log("create payment intent", res.data);
    //   setClientSecret(res.data.clientSecret);
    // });

    dispatch(createPaymentIntent(validCoupon, auth.token));

    if (success) {
      dispatch({
        type: STRIPE_APPLY_RESET,
      });
    }
  }, [dispatch, success]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: e.target.name.value,
        },
      },
    });

    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      // here you get result after successful payment
      // create order and save in database for admin to process
      // empty user card from redux and localstorage

      dispatch(createOrder(payload, auth.token));
      // empty cart from local storage
      // empty cart from redux
      // empty cart from database

      // emtpy cart operations
      localStorage.removeItem("cartItems");

      dispatch({
        type: RESET_CART,
      });

      // reset coupon to false
      dispatch({
        type: APPLY_COUPON_RESET,
      });

      dispatch(emptyUserCart(auth.token));

      console.log(JSON.stringify(payload, null, 4));

      setError(null);
      setProcessing(false);
      setSucceeded(true);
    }
  };

  const handleChange = async (e) => {
    //
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
  };

  const cartStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  return (
    <>
      {succeeded ? (
        <Result
          status="success"
          title="Successfully Purchased"
          subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
          extra={[
            <Button type="primary" key="console" href="/user/history">
              Go Purchase History
            </Button>,
            <Button key="buy">Buy Again</Button>,
          ]}
        />
      ) : (
        <>
          <h4 style={{ marginBottom: 10 }}>Complete your purchase</h4>
          <p style={{ width: 280, margin: "0 auto", marginBottom: 15 }}>
            {" "}
            for testing purpose , you can enter credit number as 4242 4242 4242
            4242
          </p>
          {!succeeded && (
            <div>
              {validCoupon && totalAfterDiscount !== 0 ? (
                <Alert
                  message={
                    <a style={{ color: "#222" }}>
                      Coupon applied successfully Total after Discount :{" "}
                      <span style={{ fontWeight: "bold" }}>
                        $ {totalAfterDiscount}{" "}
                      </span>
                    </a>
                  }
                  type="success"
                  style={{ marginBottom: 10 }}
                  closable
                />
              ) : (
                <Alert
                  closable
                  style={{ marginBottom: 10 }}
                  type="error"
                  message={<a style={{ color: "#222" }}>No coupon applied</a>}
                />
              )}
            </div>
          )}
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <p
              style={{
                background: "rgba(34, 34, 34, 0.15)",
                width: "30%",
                height: 30,
                lineHeight: "30px",
              }}
            >
              <DollarOutlined />
              Total : $ {cartTotal}
            </p>
            <p
              style={{
                background: "rgba(34, 34, 34, 0.15)",
                width: "30%",
                height: 30,
                lineHeight: "30px",
              }}
            >
              <CheckOutlined />
              Total Payable : ${totalAfterDiscount}
            </p>
          </div>
          <form
            id="payment-form"
            className="stripe-form"
            onSubmit={handleSubmit}
          >
            <CardElement
              id="card-element"
              options={cartStyle}
              onChange={handleChange}
            />

            <button
              className="stripe-button"
              disabled={processing || disabled || succeeded}
            >
              <span id="button-text">
                {processing ? (
                  <div className="spinner" id="spinner"></div>
                ) : (
                  "Pay"
                )}
              </span>
            </button>

            {error && (
              <Alert
                style={{ marginTop: 14, color: "#222" }}
                closable
                message={error}
                type="error"
              />
            )}
          </form>
        </>
      )}
      {/* {succeeded && <Alert  style={{marginTop:4,marginBottom: 10,color: '#222'}} closable message={<h6>Payment Successful <Link to="/user/history">See it in your purchase history</Link></h6>} type="success"></Alert>} */}
    </>
  );
};

export default StripeCheckout;
