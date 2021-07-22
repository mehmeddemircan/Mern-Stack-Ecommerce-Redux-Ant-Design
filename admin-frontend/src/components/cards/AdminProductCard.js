
import React, { useState, useEffect } from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { Link } from 'react-router-dom'
import {Tooltip,Card, Rate, Skeleton} from 'antd'
import {
    EditOutlined,
    EllipsisOutlined,
    SettingOutlined,
    DeleteOutlined
  } from "@ant-design/icons";

  import './AdminProductCard.css'


const {Meta} = Card
const AdminProductCard = ({product, handleRemove}) => {


    const {images} = product

  

    return (
        <>
          
          
              <Card
           
                hoverable
                style={{ width: 240, margin: "16px" ,}}
                cover={
                  <Link to={`/product/${product.slug}`}>
                   <img
                //   objectFit : 'cover'
                    style={{height:150,width:'100%', backgroundImage:'cover',backgroundSize:'cover',backgroundPosition:'center',}}
                    alt="product name"
                    src={images && images.length ? images[0].url : "https://www.myvilla.me/tumber.php?src=&w=800&h=420"}
                  /></Link>
                }
                actions={[

                  <Tooltip title="Edit">
                    <Link to={`/product/${product.slug}`}>
                    <EditOutlined key="edit" className="text-info"/>
                    </Link>
                  </Tooltip>,
                  <Tooltip title="Delete">
                    {" "}
                    <DeleteOutlined key="delete" className="text-danger" onClick={() => handleRemove(product.slug)} />
                  </Tooltip>,
                ]}
              >
                <Meta
                  
                  title={product.title}
                  description={
                    <>
                        {product.description.length > 20  ? (
                             <p >{product.description.substring(0, 20)}...</p>
                        ): <p>{product.description}</p>}
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
                      <span style={{ color: "#222" }}>(200)</span>
                      <h6 style={{ display: "inline-block" }}>1299.98 ₺ </h6>
                      <span
                        style={{
                          marginLeft: 7,
                          textDecorationLine: "line-through",
                          color: "rgb(46,133,57)",
                        }}
                      >
                        1600₺
                      </span>
                    </>
                  }
                />
              </Card>
  
    
        </>
    )
}

export default AdminProductCard
