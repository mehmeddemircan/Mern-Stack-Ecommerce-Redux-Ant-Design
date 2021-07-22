import React from 'react'
import Layout from '../components/layout/Layout'
import { Form, Input, Button,Result} from "antd";
import { DatePicker, Space } from 'antd';
import moment from 'moment';
import {
    CreditCardOutlined
  } from "@ant-design/icons";
import MetaData from '../components/layout/MetaData';
import { useTranslation } from 'react-i18next';

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripeCheckout from "../components/stripe/StripeCheckout";
import "../stripe.css";

const monthFormat = 'MM/YY';

const promise  = loadStripe("pk_test_51IdHCZFwSfzmyUz5iWrQmI7WR28Orao82Hqa2BDsxKGIaJfis5FGRerrPZRCfEu5yEAOIazjxvOKENYVcE8YTSVF00lrtxkroI")

const PaymentPage = () => {

    const {t} = useTranslation()


   

    return (
        <Layout>

<div className="container p-5 text-center">
  
  
     
      {/* <div style={{display:'flex', justifyContent:'center',flexWrap: 'nowrap',flexDirection: 'column'}}>
      <p style={{  marginBottom: 15, textAlign: "center" }}>
         for testing purpose , you can enter credit number as 4242 4242 4242 4242
        </p>
        <div style={{display:'flex',flexWrap:'nowrap',}}>
                <h5 style={{padding: '2px 16px',  width:240, height: 50,textAlign:'center',marginRight:8,lineHeight:'45px'}}>Total: $7500</h5>
                <h5 style={{padding: '2px 16px', width:240, height: 50,textAlign:'center',lineHeight:'45px'}} >Total payable : $750 </h5>
            </div>
      </div> */}
      <Elements stripe={promise}>
        <div className="col-md-8 offset-md-2">
          <StripeCheckout />
        </div>
      </Elements>
    </div>


  


  


           {/* <MetaData title={t("mainTitle.payment")}/>
           <div
        style={{
          display: "flex",
          alignItems: "center",
     
          flexDirection: "column",
          height: 480
        }}
      >
         
        
        <h3 style={{ marginBottom: 20 }}>Complete your purchase
              <CreditCardOutlined  style={{marginLeft: 10}}/></h3>
        <p style={{ width: 280, marginBottom: 15, textAlign: "center" }}>
         for testing purpose , you can enter credit number as 4242 4242 4242 4242
        </p>
        <div style={{display:'flex',flexWrap:'nowrap',}}>
                <h5 style={{padding: '2px 16px',  width:240, height: 50,textAlign:'center',marginRight:8,lineHeight:'45px'}}>Total: $7500</h5>
                <h5 style={{padding: '2px 16px', width:240, height: 50,textAlign:'center',lineHeight:'45px'}} >Total payable : $750 </h5>
            </div>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          style={{ width: 340 }}
        >
          <Form.Item
          
            name="email"
            rules={[{ required: true, message: "Please provide credit card !" }]}
            style={{ width: "100%", marginBottom: 10,marginTop:10,  }}
            
          >
            <Input type="text" placeholder="Credit number" />
          
          </Form.Item>
          <Space direction="vertical" size={12}>

<DatePicker format={monthFormat} placeholder="MM/YY" picker="month"  />

</Space>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              shape="round"
              style={{
               
                marginTop: 18,
                letterSpacing: 1.2,
                lineHeight: 1.3,
                width: "100%",
                fontSize: 18
              }}
         
            >
             Pay
            </Button>
          </Form.Item>
        </Form>
      </div> */}

        </Layout>
    )
}

export default PaymentPage
