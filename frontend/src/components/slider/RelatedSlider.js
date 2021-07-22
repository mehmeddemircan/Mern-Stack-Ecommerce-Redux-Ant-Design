import React, { useState, useEffect } from "react";
import { Carousel } from "antd";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { Card, Rate } from "antd";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";
import {
  getProductsByCount,
  getRelatedProducts,
} from "../../actions/productActions";
import { useTranslation } from "react-i18next";

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

const RelatedSlider = () => {
  const { products } = useSelector((state) => state.getAllProducts);
  const { related, success } = useSelector((state) => state.getRelated);
  const { product } = useSelector((state) => state.getProduct);

  const { t } = useTranslation();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductsByCount(10));
  }, [dispatch]);

  return (
    <>
      {related.length !== 0 ? (
        <Card
          title="Related Products"
          extra={<a href={`/product/related/${product._id}`}>See All</a>}
          className="mt-3"
        >
          {related.length > 4 ? (
            <Carousel autoplay {...settings}>
              {related.map((product) => (
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
          ) : (
            <div className="row">
              {related.map((r) => (
                <div className="col-md-3" key={r._id}>
                  <Link to={`/product/${r.slug}`}>
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
                        title={r.title}
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
                              {r.price} $
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
                </div>
              ))}
            </div>
          )}
        </Card>
      ) : null}
    </>
  );
};

export default RelatedSlider;
