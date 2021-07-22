import React, { useState, useEffect } from "react";
import { Card, Rate, Skeleton } from "antd";
import { Link } from "react-router-dom";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import {
  addToWishlist,
  getAllWishlist,
  removeFromWishlist,
} from "../../actions/userActions";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

const { Meta } = Card;
const ProductCards = ({ product }) => {
  const [wishlisted, setWishlisted] = useState(false);
  const auth = useSelector((state) => state.auth);
  const { products } = useSelector((state) => state.getProductPost);
  const { t } = useTranslation();
  const history = useHistory();

  const dispatch = useDispatch();
  const handleWishlist = (e) => {
    e.preventDefault();
    dispatch(addToWishlist(product._id, auth.token));
  

    setWishlisted(true);
    toast(<h6 style={{ color: "#222" }}>Added to wishlist</h6>, {
      position: toast.POSITION.BOTTOM_CENTER,
    });
  };



  const handleRemoveWishlist = (e) => {
    e.preventDefault();

    dispatch(removeFromWishlist(product._id, auth.token));
    setWishlisted(false);
  };

  return (
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
            {wishlisted ? (
              <HeartFilled
                onClick={handleRemoveWishlist}
                className="productHeart wishlisted"
              />
            ) : (
              <HeartOutlined
                onClick={handleWishlist}
                className="productHeart"
              />
            )}
          </div>
          <img
            className="product-card"
            style={{ height: 150, objectFit: "cover" }}
            alt="product name"
            src={
              product.images && product.images.length
                ? product.images[0].url
                : "https://www.myvilla.me/tumber.php?src=&w=800&h=420"
            }
          />
        </>
      }
    >
      <Link to={`/product/${product.slug}`}>
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
                value={product.rating}
              />{" "}
              {/* <span style={{marginRight: 20}}>No rating yet</span> */}
              <span style={{ color: "#222", marginLeft: 2 }}>
                ({product.numReviews})
              </span>
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
      </Link>
    </Card>
  );
};

export default ProductCards;
