import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Button, Tooltip } from "antd";
import { Form, Input, Radio } from "antd";
import { List, Avatar } from "antd";
import LayoutMain from "../../components/Layout/Layout";
import {
  AllCategories,
  deleteCategory,
  newCategory,
} from "../../actions/categoryActions";
import {
  CREATE_CATEGORY_RESET,
  DELETE_CATEGORY_RESET,

} from "../../constants/categoryConstants";
import { DeleteOutlined } from "@ant-design/icons";
import { Card } from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Popconfirm, message } from "antd";
import SearchBar from "../../components/searchbar/SearchBar";
// pagination can be used if there would be a lot of category
const CreateCategory3 = () => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [name, setName] = useState("");
  const { categories } = useSelector((state) => state.getAllCategories);
  const dispatch = useDispatch();
  const { success } = useSelector((state) => state.newCategory);
  const { deleted } = useSelector((state) => state.category);
  const auth = useSelector((state) => state.auth);
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

    dispatch(newCategory({ name }, auth.token));
  };

  useEffect(() => {
    dispatch(AllCategories());

    if (success) {
      setIsModalVisible(false);
      dispatch({ type: CREATE_CATEGORY_RESET });
      form.resetFields()
    }

    if (deleted) {
      message.success("Category deleted successfully");
      dispatch({ type: DELETE_CATEGORY_RESET });
    }
  }, [dispatch, deleted, success]);

  // remove
  const handleRemove = (slug) => {
    if (window.confirm("Are you sure to delete this category")) {
      dispatch(deleteCategory(slug, auth.token));
    }
  };

  return (
    <LayoutMain>
      <Button type="primary" onClick={showModal}>
        New category
      </Button>

      <Modal
        title="Create new category"
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
            name="categoryName"
            label="Category Name"
            rules={[
              { required: true, message: "Please input name of category" },
            ]}
          >
            <Input
              placeholder="Category name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
            />
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
            Categories ({categories.length}){" "}
            <Input.Search
              placeholder="Search categories..."
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
        {/* <List
          itemLayout="horizontal"
          dataSource={categories}
          renderItem={(category) => (
            <List.Item
              style={{
                margin: 6,
                background: "rgba(34, 34, 34, 0.15)",
                paddingLeft: 18,
                paddingRight: 10,
                borderRadius: 18,
              }}
              actions={[
                <Tooltip title="Edit category">
                  <Link to={`/category/${category.slug}`}>
                    <EditOutlined key="edit" />
                  </Link>
                </Tooltip>,
                <Tooltip title={`Delete ${category.name}`}>
                  {" "}
                  <DeleteOutlined
                    onClick={() => handleRemove(category.slug)}
                    style={{ color: "#222" }}
                  />
                </Tooltip>,
              ]}
            >
              <List.Item.Meta title={<h6>{category.name}</h6>} />
            </List.Item>
          )}
        /> */}

        <div>
          {categories.filter(searched(keyword)).map((category) => (
            <List.Item
              style={{
                margin: "12px 3px",
                background: "rgba(34, 34, 34, 0.15)",
                paddingLeft: 18,
                paddingRight: 10,
                borderRadius: 18,
              }}
              actions={[
                <Tooltip title="Edit category">
                  <Link to={`/category/${category.slug}`}>
                    <EditOutlined key="edit" />
                  </Link>
                </Tooltip>,
                <Tooltip title={`Delete ${category.name}`}>
                  {" "}
                  <DeleteOutlined
                    onClick={() => handleRemove(category.slug)}
                    style={{ color: "#222" }}
                  />
                </Tooltip>,
              ]}
            >
              <List.Item.Meta title={<h6>{category.name}</h6>} />
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

export default CreateCategory3;
