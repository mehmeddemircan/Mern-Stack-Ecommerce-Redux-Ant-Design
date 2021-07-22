import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Card,
  Layout,
  Avatar,
  Button,
  Tooltip,
  Row,
  Col,
  Slider,
  Select,
  Menu,
  Breadcrumb,
  Rate,
} from "antd";
import { Pagination } from "antd";

import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
  SearchOutlined,
  MenuFoldOutlined,
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
  HeartOutlined,
  HeartFilled,
  DollarCircleOutlined,
  StarOutlined
} from "@ant-design/icons";

import LayoutMain from "../components/layout/Layout";
import { Checkbox } from "antd";
import { Link } from "react-router-dom";
import "./ProductsPage.css";
import {
  fetchProductsByFilter,
  getProducts,
  getProductsByCount,
  getProductsCount,
} from "../actions/productActions";
import ProductCards from "../components/product/ProductCards";
import LoadingCard from "../components/product/LoadingCard";
import { SEARCH_QUERY } from "../constants/searchConstants";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const { Option } = Select;

const { Meta } = Card;

const checkbox = {
  display: "block",
  padding: "0 0 0 16px",
  margin: "13px 0",
};

const ProductsPage = () => {
  function onChange(e) {
    console.log(`checked = ${e.target.checked}`);
  }

  const dispatch = useDispatch();
  // const {products,  loading } = useSelector((state) => state.getAllProducts);
  const { products, loading } = useSelector((state) => state.getProductPost);
  const productPostFilter = useSelector((state) => state.productPostFilter);
  const getTotalProduct = useSelector((state) => state.getTotalProduct);
  const { categories } = useSelector((state) => state.getAllCategories);
  const { success } = useSelector((state) => state.productPostFilter);
  const [price, setPrice] = useState([0, 0]);

  const [ok, setOk] = useState(false);
  const [categoryIds, setCategoryIds] = useState([]);
  const { subs } = useSelector((state) => state.getAllSubCategories);
  const getSubsByCategory = useSelector(state => state.getSubsByCategory)
  const [sub, setSub] = useState("");
  // const getTotalProduct = useSelector(state => state.getTotalProduct)
  const auth = useSelector(state => state.auth)
  const [page, setPage] = useState(1);
  const { text } = useSelector((state) => state.search);
  // products by count
  useEffect(() => {
    // dispatch(getProductsByCount(100));
    dispatch(getProducts("createdAt", "desc", page));
    // dispatch(getProducts("createdAt","desc",3))
    dispatch(getProductsCount());
  }, [dispatch, page]);

  // useEffect(() => {
    
  //   dispatch(fetchProductsByFilter({price}))
  // }, [dispatch])

  // const handleSlider = (value) => {
  //   dispatch({
  //     type: SEARCH_QUERY,
  //     payload: { text: "" },
  //   });

  //   setPrice(value);

  //   setTimeout(() => {
  //     setOk(!ok);
  //   }, 300);
  // };








  return (
    <LayoutMain>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu mode="inline" style={{ height: "100%", borderRight: 0 }}>
         
          <SubMenu key="sub2" icon={<DollarCircleOutlined />} title="Price">
            <Slider
              className="ml-4 mr-4"
              tipFormatter={(v) => `$${v}`}
              range
              value={price}
              // onChange={handleSlider}
              style={{ width: "85%", marginLeft: 30 }}
              max={10000}
            />
          </SubMenu>
         
            <SubMenu key="sub1" icon={<UserOutlined />} title="Category">
            {categories.map((category) => (
             
          <Checkbox
            
          
            style={checkbox}
            value={category._id}
            name="Category"
            // checked={categoryIds.includes(category._id)}
          >
            {category.name}
          </Checkbox>
            ))}
            </SubMenu>
            <SubMenu key="sub5" icon={<StarOutlined />} title="rating">
            <div style={{ marginLeft: 25 }}>
              <Rate disabled defaultValue={5} style={{ display: "block" }} />
              <Rate disabled defaultValue={4} style={{ display: "block" }} />
              <Rate disabled defaultValue={3} style={{ display: "block" }} />
              <Rate disabled defaultValue={2} style={{ display: "block" }} />
              <Rate disabled defaultValue={1} style={{ display: "block" }} />
            </div>
          </SubMenu>
          <SubMenu key="sub6" title="Shipping">
            <Checkbox style={checkbox}>Yes</Checkbox>
            <Checkbox style={checkbox}>No</Checkbox>
          </SubMenu>
          </Menu>
        </Sider>

        <Layout style={{ padding: "0 24px 24px" }}>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            {/* Content */}
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Breadcrumb separator=">">
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item href="">Application Center</Breadcrumb.Item>
                <Breadcrumb.Item href="">Application List</Breadcrumb.Item>
                <Breadcrumb.Item>An Application</Breadcrumb.Item>
              </Breadcrumb>

              <Select
                showSearch
                style={{ width: 140, marginBottom: 10, color: "#222" }}
                placeholder="Sort Products"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                filterSort={(optionA, optionB) =>
                  optionA.children
                    .toLowerCase()
                    .localeCompare(optionB.children.toLowerCase())
                }
              >
                <Option value="1">Not Identified</Option>
                <Option value="2">Closed</Option>
                <Option value="3">Communicated</Option>
                <Option value="4">Identified</Option>
                <Option value="5">Resolved</Option>
                <Option value="6">Cancelled</Option>
              </Select>
            </div>
            {products.length < 1 && <p>No products found </p>}
            <Card title="Card Title">
              {loading ? (
                <LoadingCard count={products.length} />
              ) : (
                <div className="row">
                   

                  {products.map((product) => (
                    <div key={product._id} className="col-md-3">
                      
                      <ProductCards product={product} />
                    </div>
                  ))}
                </div>
              )}
            </Card>

            <Pagination
              current={page}
              total={(getTotalProduct.total / 10) * 10}
              onChange={(value) => setPage(value)}
              style={{ textAlign: "center", marginTop: 10 }}
            />
          </Content>
        </Layout>
      </Layout>
    </LayoutMain>
  );
};

export default ProductsPage;
