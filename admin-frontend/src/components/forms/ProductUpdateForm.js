import React, { useState, useEffect, Fragment } from "react";
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
import { List, Avatar ,Card} from "antd";

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
const ProductUpdateForm = ({handleSubmit,handleChange,setValues,values,isModalVisible, setIsModalVisible,handleCancel}) => {
  const [form] = Form.useForm();
 
    
  const {product} = useSelector(state => state.getProduct)
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


  


  
 
  return (
        <Fragment>
  
      
      <Modal
        title="Create New Product"
        visible={isModalVisible}
        okText="Create"
        cancelText="Cancel"
        onCancel={handleCancel}
        onOk={handleSubmit }
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
              name="select category"
              label="Select  Category"
              rules={[{ required: true, message: "Please select a category" }]}
            >
              <Select
                style={{ width: 240 }}
                value={category}
                placeholder="Select category"
                // onChange={handleCategoryChange}
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
                    //   onClick={() => handleImageRemove(image.public_id)}
                      style={{ cursor: "pointer" }}
                    >
                      <Avatar src={image.url} size={64} shape="square" />
                    </Badge>
                  </span>
                ))}
            </div>
            <label>
              Choose file
              <input
                type="file"
                multiple
                accept="images/*"
                // onChange={FileUploadChange}
              />
            </label>
          </div>
        </Form>
      </Modal>

   
    </Fragment>
  );
};

export default ProductUpdateForm;
