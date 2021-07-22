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
} from "@ant-design/icons";
import FilterModal from "../components/filter/FilterModal";
import LayoutMain from "../components/layout/Layout";
import { Checkbox } from "antd";
import { Link } from "react-router-dom";
import "./ProductsPage.css";
import {
  fetchProductsByFilter,
  getProducts,
  getProductsByCount,
} from "../actions/productActions";
import ProductCards from "../components/product/ProductCards";
import LoadingCard from "../components/product/LoadingCard";
import { toast } from "react-toastify";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const { Option } = Select;

const { Meta } = Card;

const checkbox = {
  display: "block",
  padding: "0 0 0 16px",
  margin: "13px 0",
};
// loading must be here because we dont want to see no products found when loading products
const SearchPage = ({ match }) => {
  function onChange(e) {
    console.log(`checked = ${e.target.checked}`);
  }
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.getAllProducts);
  //   const getProductsPost = useSelector((state) => state.getProductsPost);
  const productPostFilter = useSelector((state) => state.productPostFilter);
  const getCategory = useSelector((state) => state.getCategory);
  const [page, setPage] = useState(1)
  // const [price, setPrice] = useState([0, 0]);
  // const [ok, setOk] = useState(false);
  const { text } = useSelector((state) => state.search);



  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  const FilterOption = () => {
    return (
      <>
        <Button
          onClick={showDrawer}
          icon={<i class="fas fa-sliders-h"></i>}
          shape="round"
          style={{ border: "1px solid #222" }}
        >
          <a style={{ paddingLeft: 6, fontSize: 16 }}>Filters</a>
        </Button>
        <FilterModal
          showDrawer={showDrawer}
          visible={visible}
          onClose={onClose}
          setVisible={setVisible}
        />
      </>
    );
  };

  return (
    <LayoutMain>
      <Layout style={{ padding: "0 24px 24px" }}>
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        >
           {loading ? (
    
                  <LoadingCard count={productPostFilter.products.length} />
                ) : (
                  <>
          {productPostFilter.products.length > 0 ? (
            <>
              <h2>{productPostFilter.products.length} products found</h2>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Breadcrumb separator=">">
                  <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                  <Breadcrumb.Item href="/categories">
                    categories
                  </Breadcrumb.Item>
                  {/* <Breadcrumb.Item></Breadcrumb.Item> */}
                </Breadcrumb>
              </div>
              <Card
                style={{ marginTop: 10 }}
                title={
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    Products {FilterOption()}{" "}
                  </div>
                }
              >
               
                  <div className="row">
                    {productPostFilter.products.map((product) => (
                      <div key={product._id} className="col-md-3">
                        <ProductCards product={product} />
                      </div>
                    ))}
                  </div>
        
              </Card>
              <Pagination defaultCurrent={1} total={50} />
            </>
          ) 
          : (
         
        
              <>
              <h2>No products found</h2>
              <h5>Try adjusting your search. Here are some ideas:</h5>
              <ul style={{ listStyleType: "inherit", marginTop: 20 }}>
                <li>
                  <h6>Make sure all words are spelled correctly</h6>
                </li>
                <li>
                  <h6>Try different search terms</h6>
                </li>
                <li>
                  <h6>Try more general search terms</h6>
                </li>
              </ul>{" "}
            </>
       
          )
          }
    </>
                )}
          {/* Content */}
        </Content>
      </Layout>
    </LayoutMain>
  );
};

export default SearchPage;
