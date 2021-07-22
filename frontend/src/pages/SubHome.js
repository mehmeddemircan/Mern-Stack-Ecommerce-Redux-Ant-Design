import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import LayoutMain from "../components/layout/Layout";
import ProductCards from "../components/product/ProductCards";
import {
  Select,
  Card,
  Breadcrumb,
  Pagination,
  Layout,
  Button,
  Menu,
} from "antd";
import LoadingCard from "../components/product/LoadingCard";

import { getSingleSubCategory } from "../actions/subActions";
import FilterModal from "../components/filter/FilterModal";
// pagination will be here
// filter icon and filters and contact form modal as drawer

const { Content } = Layout;


const SubHome = ({ match }) => {
  const { loading, products } = useSelector((state) => state.getAllProducts);
  const getSubCategory = useSelector((state) => state.getSubCategory);
  const { subs } = useSelector((state) => state.getAllSubCategories);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSingleSubCategory(match.params.slug));
  }, [dispatch, match]);
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

        <FilterModal visible={visible} onClose={onClose} />
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
          {/* Content */}
          <h2>
            {getSubCategory.products.length} products found "
            {getSubCategory.sub.name}" category
          </h2>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Breadcrumb separator=">">
              <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
              <Breadcrumb.Item href="/categories">categories</Breadcrumb.Item>
              <Breadcrumb.Item>{match.params.slug}</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <Card
            style={{ marginTop: 10 }}
            title={
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                Card title {FilterOption()}{" "}
              </div>
            }
          >
            {loading ? (
              <LoadingCard count={getSubCategory.products.length} />
            ) : (
              <div className="row">
                {getSubCategory.products.map((product) => (
                  <div key={product._id} className="col-md-3">
                    <ProductCards product={product} />
                  </div>
                ))}
              </div>
            )}
          </Card>
          <Pagination defaultCurrent={1} total={50} />
        </Content>
      </Layout>
    </LayoutMain>
  );
};

export default SubHome;
