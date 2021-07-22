import React, {useState,useEffect} from "react";
import Layout from "../components/layout/Layout";
import { Descriptions } from "antd";

import { Form, Input, Select, Result, Empty } from "antd";
import { Link } from "react-router-dom";
import { Table, Rate, Tag, Space, Col, Row, Tooltip } from "antd";
import { Card, Avatar } from "antd";
import { PageHeader, Button, Badge } from "antd";
import { useSelector, useDispatch } from "react-redux";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
  DownloadOutlined,
  UserOutlined,
  AntDesignOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  SmileOutlined,
  ShoppingOutlined
} from "@ant-design/icons";
import ProductCards from "../components/product/ProductCards";
import { getUserOrders } from "../actions/userActions";
import { productPostFilterReducer } from "../reducers/productReducers";



const { Meta } = Card;

const { Option } = Select;
const style = {
  border: "1px solid rgb(235, 237, 240)",
};


const DescItemStyle = {
  display: "block",
  paddingBottom: 10,
};

   const columns = [
      {
        title : 'Image',
        dataIndex : 'image',
        key :'image',
        render : (key) => (
          <img 
            width={100}
            height={70}
            style={{objectFit: 'cover'}}
            src={key}
          />
        )
      },
      {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
     
      },
     
      {
        title : "Price",
        dataIndex: 'price',
        key : 'price'
      },
      {
        title : "Count",
        dataIndex: 'count',
        key : 'count'
      },
   
   

     
    ];

//
const PurchaseHistory = () => {
  const { product } = useSelector((state) => state.getProduct);
  const auth = useSelector(state => state.auth)
  const { userOrders } = useSelector(state => state.userOrder)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUserOrders(auth.token))
  }, [dispatch,auth])


  return (
    <Layout>
      {userOrders.length > 0  ?  (
<>
<i><h5 style={{ textAlign: "center", marginBottom : 25 }}>User purchase orders</h5></i>
      <hr />


      {
            userOrders.map((order,i) => (
              <>
              <div
              key={i}
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          marginBottom: 5,
          flexWrap: "wrap",
        }}
      >
        <Avatar.Group
          maxCount={2}
          maxStyle={{
            color: "#f56a00",
            backgroundColor: "#fde3cf",
          }}
        > 

       
     
        

    
    
{/* {order.products[0].title} */}
  <div key={i} style={{ display: "inline-block" }}>
  <Card
    className="productCard"
    hoverable
    style={{ width: 240, margin: "16px" }}
    cover={
      <>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
       
        </div>
        <img
          className="product-card"
          style={{ height: 150, objectFit: "cover" }}
          alt="product name"
          src={
            order.products[0].image
          }
        />
      </>
    }
  >
    {/* <Link to={`/product/${product.slug}`}> */}
      <Meta
        title={order.products[0].title}
        description={
          <>
            <Rate
              style={{
                color: "#222",
                fontSize: 13,
                paddingBottom: 2,
              }}
              disabled
              allowHalf
              defaultValue={4}
            />{" "}
            {/* <span style={{marginRight: 20}}>No rating yet</span> */}
            <span style={{ color: "#222", marginLeft: 2 }}>
              (200)
            </span>
            <h6 style={{ marginTop: 2 }}>
              {order.products[0].price} $
              <span
                style={{
                  marginLeft: 7,
                  fontSize: 14,
                  textDecorationLine: "line-through",
                  color: "rgb(46,133,57)",
                }}
              >
                1600₺
              </span>{" "}
            </h6>
          </>
        }
      />
      
    {/* </Link> */}
  </Card>
  
</div>

{/* <table className="table">
      <thead  style={{background :'rgba(34,34,34,0.04)'}}>
        <tr>
        <th scope="col">Product</th>
          <th scope="col">Title</th>
          <th scope="col">Price</th>
          <th scope="col">Brand</th>
          <th scope="col">Color</th>
          <th scope="col">Count</th>
          <th scope="col">Shipping</th>
        </tr>
      </thead>

      <tbody>
        {order.products.map((p, i) => (
          <tr key={i}>
               <td>
              <img  
                width={100}
                height={70}
                style={{objectFit: 'cover'}}
              src={p.image}/>
            </td>
            <td>
              {p.product.title}
            </td>
            <td>{p.product.price}</td>
            <td>{p.product.brand}</td>
            <td>{p.color}</td>
            <td>{p.count}</td>
            <td>
              {p.product.shipping === "Yes" ? (
                <CheckCircleOutlined style={{ color: "green" }} />
              ) : (
                <CloseCircleOutlined style={{ color: "red" }} />
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table> */}
         {order.products.map(() => (
           <>
           <a></a>
           </>
         ))}
              <Table style={{marginTop: 25}} columns={columns} dataSource={order.products} />
         
            
        
        </Avatar.Group>

        <Card
          title={
            <h5 style={{textAlign: 'center', margin: 0 , }}>Purchase Order Summary</h5>
          }
          hoverable
          style={{
            width: 550,
            height: 340,
            margin: 13,
            // border: "1px solid #0082c8",
            fontSize: 16,
        
          }}
          actions={[
            <Button type="primary" style={{ width: "50%", margin: 0 }}>
              <DownloadOutlined style={{ fontSize: 17 }} />
              Download Pdf
            </Button>,
          ]}
        >
          <div>
            
            <h6 >Order_ID : {order.paymentIntent.id}</h6>
            <h6 >Amount : <b>{(order.paymentIntent.amount /= 100).toLocaleString("en-US",{style : "currency",currency : "USD"})}</b> </h6>
            <h6 >Currency : {order.paymentIntent.currency.toUpperCase()} </h6>
            <h6>Method : {order.paymentIntent.payment_method_types[0]}</h6>
            <h6>Payment : {order.paymentIntent.status.toUpperCase()}</h6>
            <h6>Ordered On : {new Date(order.paymentIntent.created * 1000).toLocaleString()}</h6>
            <h6><Tag color="rgba(34,34,34,0.15)" style={{fontSize: 15,color: '#222'}}>Status : {order.orderStatus}</Tag></h6>
          </div>
          {/* <h6 >Method : Card </h6>
            <h6>Payment : Succeeded </h6>
            <h6 >
              Ordered on : 26/03/2021, 9:28:11 pm
            </h6> */}
       
        </Card>
      </div>
      <hr />
              </>
            ))
          }

        </>
      )  : (
        <Empty
        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
        imageStyle={{
          height: 60,
        }}
        description={
          <>
          <span style={{fontSize: 25, padding: 10}}>
                      Your Puchases & Orders is Empty
                    </span>
                    <a href="/products">shop now</a>
                    <p style={{padding: 10}}>Before  create purchase ,Take look at shops products created by users and purchase . happy shopping</p>
                     
          </>
                  }
      >
  <Button type="primary" href="/products" icon={<ShoppingOutlined style={{fontSize: 17}} />}>Shop Now</Button>
      </Empty>
      )}
      

    </Layout>
  );
};

export default PurchaseHistory;
