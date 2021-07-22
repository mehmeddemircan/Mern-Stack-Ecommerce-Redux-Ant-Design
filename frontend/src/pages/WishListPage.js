import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import { Dropdown, Input, Space } from "antd";
import { Card, PageHeader, Rate, Image, Button, Skeleton } from "antd";
import { Link } from "react-router-dom";
import Layout from "../components/layout/Layout";
import MetaData from "../components/layout/MetaData";
import { useTranslation } from "react-i18next";
import { Menu } from "antd";
import { Checkbox } from "antd";
import { Select } from "antd";
import { getAllWishlist, removeFromWishlist } from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import "./ProductsPage.css";
import { RESET_WISHLIST } from "../constants/authConstants";
import ProductCards from "../components/product/ProductCards";
// skeleton card will be implemented when loading for all cards , product cards ,comments , ....
// map function will be used here
// wishlist search bar and filter products
const { Search } = Input;
const { Option } = Select;
const username = "Brent";

const { Meta } = Card;
const OPTIONS = ["Apples", "Nails", "Bananas", "Helicopters"];
const WishListPage = () => {
  const [loading, setLoading] = useState(true);
  const onSearch = (value) => console.log(value);
  const dispatch = useDispatch();
  const [selectedItems, setSelectedItems] = useState([]);
  const { user, token, wishlist } = useSelector((state) => state.auth);

  const filteredOptions = OPTIONS.filter((o) => !selectedItems.includes(o));

  const handleChange = (selectedItems) => {
    setSelectedItems({ selectedItems });
  };

  const [ok, setOk] = useState(false)

  useEffect(() => {

    loadWishlist()
      if (ok) {
        loadWishlist()
        
        setOk(false)
      }
  }, [dispatch,ok]);

  const loadWishlist = () => {
    dispatch(getAllWishlist(token));
  };

  const handleRemove = (productId) => {
    dispatch(removeFromWishlist(productId, token));
    
    setOk(true) ; 
   
  };

 // search keyword
 const [keyword, setKeyword] = useState("");

 // step3
 const handleSearchChange = (e) => {
   e.preventDefault();
   setKeyword(e.target.value.toLowerCase());
 };

 // step4
 const searched = (keyword) => (c) => c.title.toLowerCase().includes(keyword);

  const { t } = useTranslation();
  return (
    <Fragment>
      <Layout>
        <MetaData title={t("mainTitle.wishlist", { username })} />
        {/* <Link to="/products"> */}
        <PageHeader
          //   style={style}
          onBack={() => null}
          title="Your Wishlist"
          subTitle="lorem ipsum set dolor"
        />
        {/* </Link> */}

        <Space style={{ width: 440 }}>
          <Search
            placeholder="Search your favourites "

           
            enterButton="Search"
            value={keyword}
            onChange={handleSearchChange}
            allowClear
     
            style={{ width: 300, marginTop: 9, marginLeft: 24 }}
          />
          <Dropdown
            overlay={
              <Menu style={{ minWidth: 220 }}>
                <Menu.ItemGroup
                  title={
                    <h6 style={{ marginBottom: 0, color: "rgb(34, 34, 34)" }}>
                      Item availability
                    </h6>
                  }
                >
                  <Menu.Item>
                    <Checkbox>Only show available items</Checkbox>
                  </Menu.Item>
                </Menu.ItemGroup>
                <Menu.Divider />
                <Menu.ItemGroup
                  title={
                    <h6 style={{ marginTop: 6, marginBottom: 0 }}>
                      Special offers
                    </h6>
                  }
                >
                  <Menu.Item>
                    <Checkbox>On sale</Checkbox>
                  </Menu.Item>
                </Menu.ItemGroup>
              </Menu>
            }
            trigger={["click"]}
          >
            <Button
              icon={<i class="fas fa-sliders-h"></i>}
              style={{ marginTop: 10 }}
            >
              <a style={{ paddingLeft: 3 }}>Filters</a>
            </Button>
          </Dropdown>
        </Space>

        <Select
          showSearch
          style={{ width: 200, position: "relative", top: 15 }}
          placeholder="Select a category"
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          <Option value="jack">Jack</Option>
          <Option value="lucy">Lucy</Option>
          <Option value="tom">Tom</Option>
        </Select>

        <div style={{ display: "flex", flexWrap: "wrap", marginTop: 10 }}>
          {wishlist.filter(searched(keyword)).map((p) => (
  <div key={p._id}>
             
                <Card
                  className="productCardWishlisted"
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
                        <HeartFilled
                          onClick={() => handleRemove(p._id)}
                          className="productHeart wishlisted"
                        />
                      </div>
                      <img
                        alt="product name"
                        style={{ height: 150, objectFit: "cover" }}
                        src={p.images[0].url}
                      />
                    </>
                  }
                >
                   <Link to={`/product/${p.slug}`}>
                  <Meta
                    title={p.title}
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
                        <h6 style={{ marginTop: 2 }}>{p.price} $<span
                          style={{
                            marginLeft: 7,
                            textDecorationLine: "line-through",
                            color: "rgb(46,133,57)",
                          }}
                        >
                          1600₺
                        </span>  </h6>
                        
                      </>
                    }
                  />
                   </Link>
                </Card>
             
            </div>
          ))} 
        </div>
      </Layout>
    </Fragment>
  );
};

export default WishListPage;
