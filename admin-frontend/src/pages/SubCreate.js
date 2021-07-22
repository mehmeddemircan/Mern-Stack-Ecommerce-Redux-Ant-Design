import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Button, Tooltip } from "antd";
import { Form, Input, Radio } from "antd";
import { List, Avatar } from "antd";
import LayoutMain from "../components/Layout/Layout";
import {
  AllCategories,
  deleteCategory,
  newCategory,
} from "../actions/categoryActions";
import {
  CREATE_CATEGORY_RESET,
  DELETE_CATEGORY_RESET,
} from "../constants/categoryConstants";
import { DeleteOutlined } from "@ant-design/icons";
import { Card } from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Popconfirm, message } from "antd";
import SearchBar from "../components/searchbar/SearchBar";
import {
  AllSubCategories,
  deleteSubCategory,
  newSubCategory,
} from "../actions/subActions";
import { Select } from "antd";
import {
  CREATE_SUBCATEGORY_RESET,
  DELETE_SUBCATEGORY_RESET,
} from "../constants/subConstants";
import { toast } from "react-toastify";
const { Option } = Select;
// pagination can be used if there would be a lot of category
const SubCreate = () => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [name, setName] = useState("");
  const { categories } = useSelector((state) => state.getAllCategories);
  const { subs } = useSelector((state) => state.getAllSubCategories);
  const dispatch = useDispatch();
  const { success } = useSelector((state) => state.newSubCategory);
  const { deleted } = useSelector((state) => state.subCategory);
  const auth = useSelector((state) => state.auth);
  const [category, setCategory] = useState("");

  // search keyword
  const [keyword, setKeyword] = useState("");

  // step3
  const handleSearchChange = (e) => {
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase());
  };

  // step4
  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name);

    dispatch(newSubCategory({ name, parent: category }, auth.token));
  };

  useEffect(() => {
    dispatch(AllCategories());
    dispatch(AllSubCategories());
    if (success) {
      setIsModalVisible(false);
      message.success(`Successfully created ${name}`);
      dispatch({ type: CREATE_SUBCATEGORY_RESET });
      form.resetFields();
    }

    if (deleted) {
      message.success("Subcategory deleted successfully");
      dispatch({ type: DELETE_SUBCATEGORY_RESET });
    }
  }, [dispatch, deleted, success]);

  // remove
  const handleRemove = (slug) => {
    if (window.confirm("Are you sure to delete this subcategory")) {
      dispatch(deleteSubCategory(slug, auth.token));
    }
  };

  const onChange = (val) => {
    console.log(`Selected  "${val}" `);
    setCategory(val);
  };

  return (
    <LayoutMain>
      <Button type="primary" onClick={showModal}>
        New SubCategory
      </Button>

      <Modal
        title="Create new subcategory"
        visible={isModalVisible}
        okText="Create"
        cancelText="Cancel"
        onCancel={handleCancel}
        onOk={handleSubmit}
      >
        <Form
          form={form}
          layout="vertical"
          name="form_in_modal"
          initialValues={{ modifier: "public" }}
        >
          <Form.Item
            name="subcategoryName"
            label="SubCategory Name"
            rules={[
              { required: true, message: "Please input name of category" },
            ]}
          >
            <Input
              placeholder="SubCategory name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
            />
          </Form.Item>
          <Form.Item
            name="select category"
            label="Select  Category"
            rules={[{ required: true, message: "Please select a category" }]}
          >
            <Select
              onChange={onChange}
              showSearch
              style={{ width: 200 }}
              placeholder="Search to Select"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              filterSort={(optionA, optionB) =>
                optionA.children
                  .toLowerCase()
                  .localeCompare(optionB.children.toLowerCase())
              }
            >
              {categories.length > 0 &&
                categories.map((c) => (
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
            rules={[{ required: true, message: "Please select a subcategory" }]}
          >
            <Select
              onChange={onChange}
              showSearch
              style={{ width: 200 }}
              placeholder="Search to Select"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              filterSort={(optionA, optionB) =>
                optionA.children
                  .toLowerCase()
                  .localeCompare(optionB.children.toLowerCase())
              }
            >
              {subs.length > 0 &&
                subs.map((s) => (
                  <>
                    <Option key={s._id} value={s._id}>
                      {s.name}
                    </Option>
                  </>
                ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
      {/* <div style={{display:'flex', marginTop: 15 , flexWrap: 'wrap'}}>
              {categories.map((category)=> (
                 <Card style={{ width: 300 }} key={category._id}>
                 <p>{category.name}</p>
                 <p>Card content</p>
                 <p>Card content</p>
               </Card>
              ))}
        </div> */}
      <Card
        title={
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            Sub Categories ({subs.length}){" "}
            <Input.Search
              placeholder="Search subcategories..."
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
        <div>
          {subs.filter(searched(keyword)).map((subcategory) => (
            <List.Item
              style={{
                margin: "12px 3px",
                background: "rgba(34, 34, 34, 0.15)",
                paddingLeft: 18,
                paddingRight: 10,
                borderRadius: 18,
              }}
              actions={[
                <Tooltip title="Edit subcategory">
                  <Link to={`/sub/${subcategory.slug}`}>
                    <EditOutlined key="edit" />
                  </Link>
                </Tooltip>,
                <Tooltip title={`Delete ${subcategory.name}`}>
                  {" "}
                  <DeleteOutlined
                    onClick={() => handleRemove(subcategory.slug)}
                    style={{ color: "#222" }}
                  />
                </Tooltip>,
              ]}
            >
              <List.Item.Meta
                title={
                  <h6>
                    {subcategory.name} (
                    {categories.map((category) => (
                      <>
                        {category._id === subcategory.parent
                          ? category.name
                          : null}
                      </>
                    ))}
                    )
                  </h6>
                }
              />
            </List.Item>
            // <Card
            //   hoverable
            //   size="small"
            //   cover={
            //     <img
            //       alt="example"
            //       src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"

            //     />
            //   }
            //   title={category.name}
            //   actions={[
            //     <Tooltip title="Settings">
            //       <SettingOutlined key="setting" />
            //     </Tooltip>,
            //     <Tooltip title="Edit category">
            //       <Link to={`/category/${category.slug}`}>
            //         <EditOutlined key="edit" />
            //       </Link>
            //     </Tooltip>,

            //     <Tooltip title="Delete category">
            //       <DeleteOutlined
            //         style={{ marginLeft: 10 }}
            //         onClick={() => handleRemove(category.slug)}
            //       />
            //     </Tooltip>,
            //   ]}
            //   style={{ width: 240, margin: 24 }}
            // >

            // </Card>
          ))}
        </div>
      </Card>
    </LayoutMain>
  );
};

export default SubCreate;
