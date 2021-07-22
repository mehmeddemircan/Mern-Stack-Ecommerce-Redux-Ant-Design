import React, { useState, useEffect } from "react";
import { Carousel } from "antd";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { Card, Rate } from "antd";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";
import {
  getProductsByCount,
  getProductsSlider,
} from "../../actions/productActions";

const contentStyle = {
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

const settings = {
  dots: false,
  arrows: true,
  infinite: true,
  speed: 1000,
  slidesToShow: 5,
  slidesToScroll: 1,
};
const { Meta } = Card;

const NewArrivalSlider = () => {
  const { products } = useSelector((state) => state.getProductPost);
  const getProducts = useSelector((state) => state.getProducts);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductsSlider("createdAt", "desc", 7));
  }, [dispatch]);

  return (
    <>
      <Card
        title="New Arrivals"
        extra={<a href="/newarrivals">See All</a>}
        className="mt-3"
      >
        <Carousel autoplay {...settings}>
          {products.map((product) => (
            <Link to={`/product/${product.slug}`}>
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
      </Card>
    </>
  );
};

export default NewArrivalSlider;
