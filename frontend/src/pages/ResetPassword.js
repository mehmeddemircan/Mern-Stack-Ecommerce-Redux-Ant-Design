import React from "react";
import Layout from "../components/layout/Layout";
import { useState, useEffect } from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { Form, Input, Button, Checkbox } from "antd";
import {resetPassword} from '../actions/userActions'
import { toast } from "react-toastify";
const ResetPassword = ({match,history}) => {

    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')


    const dispatch = useDispatch();

    const { error, success } = useSelector(state => state.forgotPassword)

    useEffect(() => {

        if (success) {
            toast.success('Password Reset Success')
            setPassword("")
            setConfirmPassword("")
            history.push('/')
        }


    }, [dispatch, error, success, history])

    const submitHandler = (e) => {
        e.preventDefault();

        if (password.length < 6  || confirmPassword.length < 6) {
          setPassword("")
          setConfirmPassword("")
          toast.error("Password must be longer than 6 characters")
      }
      
      if (password !== confirmPassword) {
          toast.error("Passwords do not match"); 
          setConfirmPassword("")
      }

        // const formData = new FormData();
        // formData.set('password', password);
        // formData.set('confirmPassword', confirmPassword);

        dispatch(resetPassword(match.params.token, {password,confirmPassword}))
    }

  return (
    <Layout>
      <img
        src="https://images.pexels.com/photos/6214126/pexels-photo-6214126.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
        height={380}
        className="float-end"
        style={{borderRadius: 15}}

      />  <img
        src="https://images.pexels.com/photos/6214471/pexels-photo-6214471.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
        height={380}
        className="float-start"
        style={{borderRadius: 15, marginRight: 20}}
        
      />
      <div
        style={{
          display: "flex",
          alignItems: "center",
         
          flexDirection: "column",
          height: 480
        }}
      >
        <h5 style={{ marginBottom: 20 }}>Reset Password</h5>
        <p style={{ width: 280, marginBottom: 15, textAlign: "center" }}>
          Last step to see you back in our website. You can create new password{" "}
        </p>
        <Form name="normal_login" className="login-form" style={{ width: 300 }} >
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input.Password type="password" placeholder="Password"  autoFocus value={password} onChange={(e)=> setPassword(e.target.value)}/>
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            rules={[
              {
                required: true,
                message: "Please input your Confirm Password!",
              },
            ]}
          >
            <Input.Password type="password" placeholder="Confirm Password"  value={confirmPassword} onChange={(e)=> setConfirmPassword(e.target.value)} />
          </Form.Item>

          <Form.Item>
            <Button
             onClick={submitHandler}
              type="primary"
              htmlType="submit"
              className="login-form-button"
              shape="round"
            >
              Submit
         
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Layout>
  );
};

export default ResetPassword;
