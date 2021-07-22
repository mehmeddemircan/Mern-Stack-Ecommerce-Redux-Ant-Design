import React, { useState, useEffect } from "react";
import { Card, Pagination, PageHeader } from "antd";
import { useSelector, useDispatch } from "react-redux";
import {
  getProducts,
  getProductsByCount,
  getProductsCount,
} from "../actions/productActions";
import ProductCards from "../components/product/ProductCards";
import Layout from "../components/layout/Layout";
const BestSellersPage = () => {
  // const {products} = useSelector(state => state.getAllProducts)
  const { products } = useSelector((state) => state.getProductPost);
  const [page, setPage] = useState(1);
  const getTotalProduct = useSelector((state) => state.getTotalProduct);
  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(getProductsByCount(10))
    dispatch(getProducts("sold", "desc", page));
    dispatch(getProductsCount());
  }, [dispatch, page]);

  return (
    <Layout>
      {/* {getTotalProduct.total} */}

      <Card
        title={
          <PageHeader
            className="site-page-header"
            style={{ padding: 0 }}
            onBack={() => null}
            title="Best Sellers"
            subTitle="This is a subtitle"
          />
        }
      >
        <div className="row">
          {products.map((product) => (
            <div key={product._id} className="col-md-3">
              <ProductCards product={product} />
            </div>
          ))}
        </div>
        <Pagination
          current={page}
          total={(getTotalProduct.total / 10) * 10}
          onChange={(value) => setPage(value)}
          style={{ textAlign: "center", paddingTop: 15 }}
        />
      </Card>
    </Layout>
  );
};

export default BestSellersPage;
