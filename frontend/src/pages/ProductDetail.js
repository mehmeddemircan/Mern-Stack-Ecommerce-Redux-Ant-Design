import React, { useState, useEffect, createElement } from "react";
import { Image, Card, Carousel, Descriptions, Form, Tabs } from "antd";
import Layout from "../components/layout/Layout";
import { useSelector, useDispatch } from "react-redux";
import { Comment, Tooltip, Avatar, Tag, Badge } from "antd";
import moment from "moment";

import {
  LikeOutlined,
  HeartOutlined,
  ShareAltOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { Rate } from "antd";
import CommentModal from "../components/modal/CommentModal";
import { Modal, Button } from "antd";
import { Input } from "antd";
import { Pagination } from "antd";
import { Collapse } from "antd";
import { InputNumber } from "antd";

import { Link } from "react-router-dom";

import "./ProductDetail.css";
import { Select } from "antd";
import { Menu, Dropdown } from "antd";
import {
  deleteReview,
  getProductReviews,
  getRelatedProducts,
  getSingleProduct,
} from "../actions/productActions";
import RelatedSlider from "../components/slider/RelatedSlider";
import CommentComponent from "../components/comment/Comment";
import { DELETE_REVIEW_RESET } from "../constants/productConstants";
import { addItemToCart } from "../actions/cartActions";
import ChatOutlined from "@material-ui/icons/ChatOutlined";
import ProductDetailCollapes from "../components/product/ProductDetailCollapes";

const { TabPane } = Tabs;
const { Option } = Select;
const { TextArea } = Input;
const { SubMenu } = Menu;
const settings = {
  dots: false,
  arrows: true,
  infinite: true,
  speed: 1000,
  slidesToShow: 5,
  slidesToScroll: 1,
};
const { Meta } = Card;

const ProductDetail = ({ match }) => {
  const [page, setPage] = useState(1);
  function onChange(value) {
    console.log("changed", value);
  }

  const iconStyle = {
    // padding: '9px 7px',
    margin: "5px 10px",
  };
  const imageStyle = {
    objectFit: "cover",
  };
  const [currentFilter, setCurrentFilter] = useState("Recommended");
  const { user } = useSelector((state) => state.auth);
  const [tooltip, setTooltip] = useState("Click to add to basket ");
  const { product, success } = useSelector((state) => state.getProduct);
  const [qty, setQty] = useState(1);
  const { related } = useSelector((state) => state.getRelated);
  const { cartItems } = useSelector((state) => state.cart);
  const [expand, setExpand] = useState(true);
  const [expand2, setExpand2] = useState(false);
  const [expand3, setExpand3] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSingleProduct(match.params.slug));

    dispatch(getRelatedProducts(product._id));
  }, [dispatch, match, product]);

  const handleAddToCart = (qty) => {
    dispatch(addItemToCart(match.params.slug, qty));

    setTooltip("Added to basket");
  };

  return (
    <Layout>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          minHeight: 550,
        }}
      >
        <ul
          style={{
            listStyle: "none",
            marginBottom: 2,
            overflowY: "auto",
            height: 520,

            width: 100,
          }}
          className="scrollbar"
        >
          <Image.PreviewGroup>
            {product.images &&
              product.images.map((i) => (
                <li style={{ margin: "3px 3px", width: 90, height: 80 }}>
                  <Image
                    style={imageStyle}
                    width={80}
                    height={75}
                    src={i.url}
                  />
                </li>
              ))}
          </Image.PreviewGroup>
        </ul>

        <div className="col-md-6" style={{ marginLeft: 24 }}>
          {product.images && product.images.length ? (
            <Carousel autoplay style={{ height: 510 }}>
              {product.images &&
                product.images.map((i) => (
                  <Image
                    height={510}
                    width={700}
                    style={{
                      objectFit: "cover",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                    key={i.public_id}
                    src={i.url}
                  />
                ))}
            </Carousel>
          ) : (
            <Carousel>
              <img
                height={500}
                style={{ objectFit: "cover" }}
                src="https://www.myvilla.me/tumber.php?src=&w=800&h=420"
              />
            </Carousel>
          )}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: 15,
            }}
          >
            {/* Actions like favorites share */}
            <Tooltip key="product-like" title="Like" placement="bottom">
              <Button
                type="default"
                shape="round"
                icon={<LikeOutlined />}
                style={iconStyle}
              />
            </Tooltip>
            <Tooltip
              key="add-to-favorites"
              title="Add to Wishlist"
              placement="bottom"
            >
              <Link to="/user/wishlist">
                <Button
                  type="default"
                  shape="round"
                  icon={<HeartOutlined />}
                  style={iconStyle}
                />
              </Link>
            </Tooltip>
            <Tooltip key="share-product" title="Share" placement="bottom">
              <Button
                type="default"
                shape="round"
                icon={<ShareAltOutlined />}
                style={iconStyle}
              />
            </Tooltip>
          </div>
        </div>

        {/* Description */}
        <div
          style={{
            padding: "6px 36px",
            marginLeft: 20,
            width: 650,
            minHeight: 280,
          }}
        >
          <h3>
            {product.title}
            {/* Lorem Ipsum since the 1500s, when anpe specimen book. It has
            survived not only five centuries */}
          </h3>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Rate
              style={{
                color: "#222",
                paddingBottom: 12,
                fontSize: 15,
                display: "block",
              }}
              disabled
              value={product.rating}
              allowHalf
            />
            <a
              style={{
                fontSize: 18,
                marginLeft: 14,
                paddingBottom: 12,
                color: "#222",
              }}
            >
              ({product.numReviews} Reviews)
            </a>
            <a
              style={{
                fontSize: 18,
                marginLeft: 14,
                paddingBottom: 12,
                color: "#222",
              }}
            ></a>
          </div>
          <Tag
            style={{
              borderRadius: 10,
              background: "rgb(253, 235, 210)",
              color: "#222",
              fontSize: 13,
              marginBottom: 5,
            }}
          >
            Best seller
          </Tag>
          <Tag
            style={{
              borderRadius: 10,
              background: "rgb(212, 233, 215)",
              color: "#222",
              fontSize: 13,
            }}
          >
            Free Delivery
          </Tag>

          <p>
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum is that it has a more-or-less normal
            distribution of letters, as opposed to using 'Content here, content
            here', making it look like readable English. Many desktop publishing
            packages It is a long established fact that a reader will be
            distracted by the readable content of a page when looking at its
            layout. The point of using Lorem Ipsum is that it has a more-or-less
            normal distribution of letters, as opposed to using 'Content here,
            content here', making it look like readable English. Many desktop
            publishing packages
          </p>

          <div style={{ margin: "10px 0" }}>
            <h4 style={{ display: "inline-block" }}>{product.price} $</h4>{" "}
            <a
              style={{
                padding: "20px 10px",
                fontSize: 15,
                textDecorationLine: "line-through",
              }}
            >
              314.99 $
            </a>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h5 style={{ display: "inline-block", marginRight: 10 }}>
              Quantity
              <input
                type="number"
                min={1}
                // max={10}
                value={qty}
                onChange={(e) => setQty(e.target.value)}
                style={{
                  width: 60,
                  marginRight: 14,
                  marginLeft: 10,
                  border: "1px solid rgba(34, 34, 34, 0.15)",
                  color: "#222",
                  textAlign: "center",
                  padding: 2,
                }}
              />
            </h5>

            <a style={{ fontSize: 20 }}>
              {product.quantity && product.quantity > 10 ? (
                <a>In Stock</a>
              ) : (
                <a style={{ color: "#ea4636" }}>
                  {product.quantity !== 0 ? (
                    <a>Only {product.quantity} left</a>
                  ) : (
                    <a>Out of Stock</a>
                  )}
                </a>
              )}
            </a>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Button
              style={{
                color: "#222",

                border: "2px solid #222",
                fontSize: 15,
                width: "66%",
                height: 40,
                margin: 10,
                textTransform: "uppercase",
              }}
              shape="round"
            >
              Buy it now
            </Button>
            <Tooltip title={tooltip} placement="bottom">
              <Button
                style={{
                  background: "black",
                  color: "#fff",

                  fontSize: 15,
                  width: "66%",
                  height: 40,
                  margin: 10,
                  textTransform: "uppercase",
                }}
                shape="round"
                onClick={() => handleAddToCart(qty)}
              >
                Add to basket
              </Button>
            </Tooltip>
          </div>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {/* Comment section */}
        <div className="col-md-7" style={{ marginTop: 50 }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <Rate
                style={{ color: "#222", padding: "10px 0 " }}
                disabled
                value={product.rating}
                allowHalf
              />
              <h3>{product.numReviews} Reviews </h3>
            </div>

            <CommentModal />
          </div>
          <Tabs defaultActiveKey="1">
            <TabPane
              tab={
                <h6>
                  Reviews for this item{" "}
                  <Badge
                    count={product.numReviews}
                    overflowCount={20000}
                    style={{
                      background: "rgb(234, 234, 234)",
                      color: "#222",
                      fontSize: 14,
                    }}
                  />
                </h6>
              }
              key="1"
            >
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                {/* Dropdown sort by comments */}
                <Dropdown
                  overlay={
                    <Menu>
                      <Menu.Item
                        key="Recommended"
                        onClick={(e) => setCurrentFilter(e.key)}
                      >
                        <a>Recommended</a>
                      </Menu.Item>
                      <Menu.Item
                        key="Newest"
                        onClick={(e) => setCurrentFilter(e.key)}
                      >
                        <a>Newest</a>
                      </Menu.Item>
                      <Menu.Divider />
                    </Menu>
                  }
                  trigger={["click"]}
                >
                  <Button style={{ borderRadius: 10, marginRight: 20 }}>
                    <a style={{ paddingLeft: 3, color: "#222222" }}>
                      Sort by {currentFilter}
                    </a>{" "}
                    <DownOutlined />
                  </Button>
                </Dropdown>
              </div>

              {/* Comment section */}
              {product.reviews &&
                product.reviews.map((review) => (
                  <CommentComponent key={review._id} review={review} />
                ))}

              {product.reviews && product.reviews.length > 3 ? (
                <Pagination
                  defaultCurrent={1}
                  total={(product.numReviews / 3) * 10}
                  style={{ marginTop: 15 }}
                />
              ) : null}
            </TabPane>
            <TabPane
              tab={
                <h6>
                  Reviews for this shop{" "}
                  <Badge
                    count={124}
                    overflowCount={20000}
                    style={{
                      background: "rgb(234, 234, 234)",
                      color: "#222",
                      fontSize: 14,
                    }}
                  />
                </h6>
              }
              key="2"
            >
              <h2>hello world</h2>
            </TabPane>
          </Tabs>
        </div>

        {/* description buttons expanded */}

        <ProductDetailCollapes
          product={product}
          expand={expand}
          expand2={expand2}
          expand3={expand3}
          setExpand={setExpand}
          setExpand2={setExpand2}
          setExpand3={setExpand3}
        />
      </div>

      {/* Slider */}

      <RelatedSlider />
    </Layout>
  );
};

export default ProductDetail;
