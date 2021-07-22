import React, { useState, useEffect } from "react";
import { Carousel } from "antd";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { Card, Rate } from "antd";

import { getProductsByCount } from "../../actions/productActions";



const settings = {
  dots: false,
  arrows: true,
  infinite: true,
  speed: 1000,
  slidesToShow: 5,
  slidesToScroll: 1,
};
const { Meta } = Card;

const SlickSlider = () => {
  const { products } = useSelector((state) => state.getAllProducts);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductsByCount(10));
  }, [dispatch]);

  return (
    <>
      <Carousel autoplay {...settings}>
        {products.map((product) => (
          <Link to="/product/id">
            <Card
              hoverable
              style={{ width: 240, margin: "12px" }}
              cover={
                <img
                  style={{ height: 150, objectFit: "cover" }}
                  alt="product name"
                  src={
                    product.images && product.images.length
                      ? product.images[0].url
                      : "https://www.myvilla.me/tumber.php?src=&w=800&h=420"
                  }
                />
              }
            >
              <Meta
                title="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy"
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
                    <h6 style={{ marginTop: 2 }}>
                      {product.price} $
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
            </Card>
          </Link>
        ))}
      </Carousel>
    </>
  );
};

export default SlickSlider;
