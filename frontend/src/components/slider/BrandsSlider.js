import React, {useState,useEffect} from 'react'
import { Carousel } from 'antd';
import { Link } from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'

import {
  Card,

  Rate,
} from "antd";


import { getProductsByCount, getProductsSlider } from '../../actions/productActions';





const settings = {
    dots:false,
    arrows: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 5,
    slidesToScroll: 1,


  };
  const { Meta } = Card;

 

const brands = [
    {   
        id : 1 ,
        image : '/images/youtube.png'
    },
    {   
        id : 2 ,
        image : '/images/twitter.png'
    },
    {   
        id : 3 ,
        image : '/images/instagram.png'
    },
    {   
        id : 4 ,
        image : '/images/uber.png'
    },
    {   
        id : 5 ,
        image : '/images/nike.png'
    },
    {   
        id : 6 ,
        image : '/images/google.png'
    }

]


const BrandsSlider = () => {  
  const {products} = useSelector(state => state.getProductPost)
  const getProducts = useSelector(state => state.getProducts)
  const dispatch = useDispatch()
    useEffect(() => {
 
      dispatch(getProductsSlider("createdAt","desc",7))
    }, [dispatch,])

    return (
      <>
         <Card title="Our partners" extra={<a href="/newarrivals">See All</a>} className="mt-3">
      <Carousel autoplay {...settings}>
    
      
                {brands.map((brand)=> (
                  <Link to="/product/id">
                  <Card
                    hoverable
                    style={{ width: 240, margin: "12px" ,height: 100,borderRadius: 15}}
                    cover={
                      <img
                        alt="product name"
                        style={{textAlign:'center',position:'relative', top: -60}}
                        src={brand.image}
                      />
                    }
                  >
                    {/* <Meta
                      title={product.title}
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
                          <span style={{ color: "#222" }}>(200)</span>
                          <h6 style={{ display: "inline-block" }}>
                            1299.98 ₺{" "}
                          </h6>
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
                    /> */}
                  </Card>
                </Link>
                ))}

          
         
    </Carousel>
    </Card>
</>
    )
}

export default BrandsSlider