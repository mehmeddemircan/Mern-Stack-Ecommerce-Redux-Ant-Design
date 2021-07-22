import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Button, Tooltip } from "antd";
import { Form, Input, Radio } from "antd";
import { List, Avatar } from "antd";
import LayoutMain from "../../components/Layout/Layout";
import {
  deleteCategory,
  getSingleCategory,
  updateCategory,
} from "../../actions/categoryActions";
import {
  DELETE_CATEGORY_RESET,

  GET_SINGLE_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_RESET,
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

const CategoryUpdate = ({ history, match }) => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [name, setName] = useState("");
  const { category } = useSelector((state) => state.getCategory);
  const { updated, deleted } = useSelector((state) => state.category);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const showModal = () => {
    setIsModalVisible(true);
  };

  const categorySlug = match.params.slug;

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(updateCategory({ name }, categorySlug, auth.token));
  };

  useEffect(() => {

 if (category && categorySlug !== category.slug ) {
  dispatch(getSingleCategory(categorySlug));

 }
    if (updated) {
      message.success("Successfully updated category");
      setIsModalVisible(false);
      dispatch({ type: UPDATE_CATEGORY_RESET });
      form.resetFields()
      history.push("/category");
   
    }

    if (deleted) {
      message.success("Category deleted successfully");
      dispatch({ type: DELETE_CATEGORY_RESET });
      history.push("/category");
    }
  }, [dispatch, updated,deleted]);

  // remove
  const handleRemove = (slug) => {
    if (window.confirm("Are you sure to delete this category")) {
      dispatch(deleteCategory(slug, auth.token));
    }
  };

  return (
    <LayoutMain>
      <Button type="primary" onClick={showModal}>
        Update category
      </Button>
      <Modal
        title="Update category "
        visible={isModalVisible}
        okText="Submit"
        cancelText="Cancel"
        onCancel={handleCancel}
        onOk={handleSubmit}
      >
        <Form form={form} layout="vertical" name="form_in_modal">
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

      <Card title={`Category update`} style={{ marginTop: 10 }}>
        {/* can be listed over here  */}
        <List.Item
          style={{
            margin: "12px 3px",
            background: "rgba(34, 34, 34, 0.15)",
            paddingLeft: 18,
            paddingRight: 10,
            borderRadius: 18,
          }}
          actions={[
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
      </Card>
    </LayoutMain>
  );
};

export default CategoryUpdate;
