import React from "react";
import Layout from "../components/layout/Layout";
import { Form, Input, Button, Checkbox } from "antd";

import { LockOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import MetaData from "../components/layout/MetaData";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { forgotPassword } from "../actions/userActions";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");

  const { error, loading, message } = useSelector(
    (state) => state.forgotPassword
  );
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const submitHandler = (e) => {
    e.preventDefault();

    // const formData = new FormData();
    //     formData.set('email', email);

    dispatch(forgotPassword({email}));
  };

  return (
    <Layout>
      <MetaData title={t("mainTitle.forgotPassword")} />

      <img
        src="https://images.pexels.com/photos/3769747/pexels-photo-3769747.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
        height={250}
        className="float-end"
        style={{ borderRadius: 15 }}
      />
      <img
        src="https://images.pexels.com/photos/919436/pexels-photo-919436.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
        height={250}
        className="float-start"
        style={{ borderRadius: 15 }}
      />
      <div
        style={{
          display: "flex",
          alignItems: "center",

          flexDirection: "column",
          height: 480,
        }}
      >
        <h5 style={{ marginBottom: 20 }}>{t("forgotPassword.title")}</h5>
        <p style={{ maxWidth: 360, marginBottom: 15, textAlign: "center" }}>
          {t("forgotPassword.paragraph")}
        </p>

        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          style={{ width: 340 }}
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your Email!" }]}
            style={{ width: "100%", marginBottom: 10 }}
          >
            <Input
              type="text"
              placeholder={t("forgotPassword.email")}
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Item>

          <Form.Item>
            <Button
              onClick={submitHandler}
              type="primary"
              htmlType="submit"
              className="login-form-button"
              shape="round"
              style={{
                marginTop: 10,
                letterSpacing: 1.2,
                lineHeight: 1.3,
              }}
            >
              {t("forgotPassword.submit")}
             
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Layout>
  );
};

export default ForgotPasswordPage;
