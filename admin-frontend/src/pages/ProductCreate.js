import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Modal,
  Button,
  Tooltip,
  Select,
  Rate,
  Badge,
  Spin,
  Skeleton,
} from "antd";
import { Form, Input, Radio, InputNumber } from "antd";
import { List, Avatar } from "antd";
import LayoutMain from "../components/Layout/Layout";
import {
  AllProducts,
  deleteProduct,
  getSingleProduct,
  newProduct,
  uploadProductImage,
} from "../actions/productActions";

import {
  CREATE_CATEGORY_RESET,
  DELETE_CATEGORY_RESET,
  GET_SUBS_BY_CATEGORY_RESET,
} from "../constants/categoryConstants";
import { DeleteOutlined } from "@ant-design/icons";
import { Card } from "antd";

import { Link } from "react-router-dom";
import { Popconfirm, message } from "antd";
import SearchBar from "../components/searchbar/SearchBar";
import {
  CREATE_PRODUCT_RESET,
  DELETE_PRODUCT_RESET,
} from "../constants/productConstants";
import { AllCategories, getCategorySubs } from "../actions/categoryActions";

import { Upload } from "antd";
import ImgCrop from "antd-img-crop";
import axios from "axios";
import Resizer from "react-image-file-resizer";
import AdminProductCard from "../components/cards/AdminProductCard";
import { AllSubCategories } from "../actions/subActions";
const { Meta } = Card;
const { Option } = Select;

const initialState = {
  title: "",
  description: "",
  price: "",
  categories: [],
  category: "",
  subs: [],
  shipping: "No",
  quantity: "",
  images: [],
  colors: ["Black", "Brown", "Silver", "White", "Blue"],
  brands: ["Apple", "Samsung", "Microsoft", "Lenovo", "Asus"],
  color: "",
  brand: "",
};

// pagination can be used if there would be a lot of category
const ProductCreate = () => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [values, setValues] = useState(initialState);
  const { products, loading } = useSelector((state) => state.getAllProducts);
  const { success } = useSelector((state) => state.newProduct);
  const getAllCategories = useSelector((state) => state.getAllCategories);
  const getSubsByCategory = useSelector((state) => state.getSubsByCategory);
  const { deleted } = useSelector((state) => state.product);

  const dispatch = useDispatch();

  const [showSub, setShowSub] = useState(false);
  const {
    title,
    description,
    price,
    categories,
    category,
    subs,
    shipping,
    quantity,
    images,
    colors,
    brands,
    color,
    brand,
  } = values;

  const auth = useSelector((state) => state.auth);
  // search keyword
  const [keyword, setKeyword] = useState("");

  // step3
  const handleSearchChange = (e) => {
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase());
  };

  // step4
  const searched = (keyword) => (c) => c.title.toLowerCase().includes(keyword);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(name);

    dispatch(newProduct(values));
  };

  useEffect(() => {
    dispatch(AllProducts(100));
    dispatch(AllCategories())
 
    if (success) {
      // setValues(initialState)
      setIsModalVisible(false);
     
      dispatch({ type: CREATE_PRODUCT_RESET });
      form.resetFields()
      
    }

    if (deleted) {
      message.success("Product deleted successfully");
      dispatch({ type: DELETE_PRODUCT_RESET });
    }
  }, [dispatch, success, initialState, deleted]);

  // remove
  const handleRemove = (slug) => {
    if (window.confirm("Are you sure to delete this product")) {
      dispatch(deleteProduct(slug));
    }
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (value) => {
    setValues({ ...values, subs: [], category: value });
    dispatch(getCategorySubs(value));
  };

  const FileUploadChange = (e) => {
    let files = e.target.files;
    let allUploadedFiles = values.images;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        Resizer.imageFileResizer(
          files[i],
          300,
          300,
          "JPEG",
          100,
          0,
          (uri) => {
            console.log(uri);

            axios
              .post("/api/uploadimages", { image: uri })
              .then((res) => {
                console.log("IMAGE UPLOAD RES DATA", res);
                allUploadedFiles.push(res.data);

                setValues({ ...values, images: allUploadedFiles });
              })
              .catch((err) => {
                console.log("Cloudinary upload err ", err);
              });
          },
          "base64"
        );
      }
    }
  };

  const handleImageRemove = (public_id) => {
    console.log("remove img", public_id);

    axios
      .post("/api/removeimage", { public_id })
      .then((res) => {
        const { images } = values;

        let filteredImages = images.filter((item) => {
          return item.public_id !== public_id;
        });
        setValues({ ...values, images: filteredImages });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <LayoutMain>
      <Button type="primary" onClick={showModal}>
        New Product
      </Button>

      <Modal
        title="Create New Product"
        visible={isModalVisible}
        okText="Create"
        cancelText="Cancel"
        onCancel={handleCancel}
        onOk={handleSubmit}
      >
        <Form form={form} layout="vertical" name="form_in_modal">
          <Form.Item
            name="title"
            label="Title"
            rules={[
              { required: true, message: "Please input title of product" },
            ]}
          >
            <Input
              name="title"
              placeholder="Title"
              values={title}
              onChange={handleChange}
              autoFocus
            />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[
              {
                required: true,
                message: "Please input description of product",
              },
            ]}
          >
            <Input.TextArea
              name="description"
              style={{ height: 100 }}
              placeholder="Type product description..."
              values={title}
              onChange={handleChange}
            />
          </Form.Item>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            <Form.Item
              name="productPrice"
              label="Price"
              rules={[
                { required: true, message: "Please input price of product" },
              ]}
            >
              <Input
                name="price"
                style={{ width: 200 }}
                type="number"
                placeholder="Price"
                values={price}
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item
              name="shipping"
              label="Shipping"
              rules={[
                { required: true, message: "Please select a shipping type" },
              ]}
            >
              <Select
                style={{ width: 240 }}
                placeholder="Select type"
                value={shipping}
                onChange={(value) => setValues({ ...values, shipping: value })}
              >
                <Option value="No">No</Option>
                <Option value="Yes">Yes</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="productQuantity"
              label="Quantity"
              rules={[{ required: true, message: "Please input quantity " }]}
            >
              <Input
                name="quantity"
                style={{ width: 200 }}
                type="number"
                placeholder="Quantity"
                values={quantity}
                onChange={handleChange}
              />
            </Form.Item>

            <Form.Item
              name="productColor"
              label="Color"
              rules={[
                { required: true, message: "Please select product color" },
              ]}
            >
              <Select
                className="form-control"
                style={{ width: 240 }}
                placeholder="Select color"
                value={color}
                onChange={(value) => setValues({ ...values, color: value })}
              >
                {colors.map((c) => (
                  <Option key={c} value={c}>
                    {c}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="productBrand"
              label="Brand"
              rules={[{ required: true, message: "Please select brand" }]}
            >
              <Select
                style={{ width: 200 }}
                placeholder="Select brand"
                values={brand}
                onChange={(value) => setValues({ ...values, brand: value })}
              >
                {brands.map((b) => (
                  <Option key={b} value={b}>
                    {b}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="category"
              label="Select  Category"
              rules={[{ required: true, message: "Please select a category" }]}
            >
              <Select
                style={{ width: 240 }}
                value={category}
                placeholder="Select category"
                onChange={handleCategoryChange}
              >
                {getAllCategories.categories.length > 0 &&
                  getAllCategories.categories.map((c) => (
                    <>
                      <Option key={c._id} value={c._id}>
                        {c.name}
                      </Option>
                    </>
                  ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="select subcategory"
              label="Select  SubCategory"
              rules={[
                { required: true, message: "Please select a subcategory" },
              ]}
            >
              <Select
                mode="multiple"
                allowClear
                style={{ width: "100%" }}
                placeholder="Please select"
                value={subs}
                onChange={(value) => setValues({ ...values, subs: value })}
              >
                {getSubsByCategory.subs.length > 0 &&
                  getSubsByCategory.subs.map((sub) => (
                    <Option key={sub._id} value={sub._id}>
                      {sub.name}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
          </div>

          <div className="row">
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {values.images &&
                values.images.map((image) => (
                  <span className="avatar-item" style={{ margin: "0 7px" }}>
                    <Badge
                      count="X"
                      key={image.public_id}
                      onClick={() => handleImageRemove(image.public_id)}
                      style={{ cursor: "pointer" }}
                    >
                      <Avatar src={image.url} size={64} shape="square" />
                    </Badge>
                  </span>
                ))}
            </div>
            <label className="btn btn-primary" style={{width: '30%',marginTop: 10}}>
              Choose file
              <input
                type="file"
                multiple
                hidden
                accept="images/*"
                onChange={FileUploadChange}
              />
            </label>
          </div>
        </Form>
      </Modal>

      {/* list products */}

      <Card
        title={
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            Products ({products.length}){" "}
            <Input.Search
              placeholder="Search products..."
              enterButton="Search"
              value={keyword}
              onChange={handleSearchChange}
              allowClear
              style={{ width: 300 }}
            />{" "}
          </div>
        }
        style={{ marginTop: 10 }}
      >
        {/* list */}
        {loading ? (
          // <Spin style={{position:'relative', top: '50%', left:'50%', transform:'translation(-50%,-50%)'}} />

          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {products.map((product) => (
              <Card style={{ width: 240, margin: 16 }} loading={loading}>
                <Meta
                  avatar={
                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                  }
                  title="Card title"
                  description="This is the description"
                />
              </Card>
            ))}
          </div>
        ) : (
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {products.filter(searched(keyword)).map((product) => (
              <AdminProductCard
                key={product._id}
                product={product}
                handleRemove={handleRemove}
              />
            ))}
          </div>
        )}
      </Card>
    </LayoutMain>
  );
};

export default ProductCreate;
