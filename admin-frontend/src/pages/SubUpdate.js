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
  UPDATE_CATEGORY_RESET,
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
  getSingleSubCategory,
  newSubCategory,
  updateSubCategory,
} from "../actions/subActions";
import { Select } from "antd";
import {
  CREATE_SUBCATEGORY_RESET,
  DELETE_SUBCATEGORY_RESET,
  UPDATE_SUBCATEGORY_RESET,
} from "../constants/subConstants";
import { toast } from "react-toastify";
const { Option } = Select;
// pagination can be used if there would be a lot of category
const SubUpdate = ({history,match}) => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [name, setName] = useState("");
  const { categories } = useSelector((state) => state.getAllCategories);
  const { subs } = useSelector((state) => state.getAllSubCategories);
  const {sub} = useSelector(state => state.getSubCategory)
  const dispatch = useDispatch();

  const { updated,deleted } = useSelector((state) => state.subCategory);
  const auth = useSelector((state) => state.auth);
  const [parent, setParent] = useState("");

  const {slug} = match.params


 

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name);

    dispatch(updateSubCategory({ name, parent },slug, auth.token));
  };

  useEffect(() => {
    dispatch(AllCategories());
    
    if (sub &&  slug !== sub.slug) {
      dispatch(getSingleSubCategory(slug));
    }

    if (updated) {
      setIsModalVisible(false);
      message.success(`Successfully updated as ${name}`);
      dispatch({ type: UPDATE_SUBCATEGORY_RESET });
      history.push("/sub")
    }

    if (deleted) {
      message.success("Subcategory deleted successfully");
      dispatch({ type: DELETE_SUBCATEGORY_RESET });
      history.push("/sub")
    }
  }, [dispatch, deleted, updated,slug]);

 

  const onChange = (val) => {
    console.log(`Selected  "${val}" `);
    setParent(val);
  };

  // remove
  const handleRemove = (slug) => {
    if (window.confirm("Are you sure to delete this  subcategory")) {
      dispatch(deleteSubCategory(slug, auth.token));
    }
  };

  return (
    <LayoutMain>
      <Button type="primary" onClick={showModal}>
        Update SubCategory
      </Button>

      <Modal
        title="Update Subcategory"
        visible={isModalVisible}
        okText="Submit"
        cancelText="Cancel"
        onCancel={handleCancel}
        onOk={handleSubmit}
      >
        <Form
          form={form}
          layout="vertical"
          name="form_in_modal"
        
        >
          <Form.Item
            name="subcategoryName"
            label="SubCategory Name"
            rules={[
              { required: true, message: "Please input name of subcategory" },
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
            <Tooltip title={`Delete ${sub.name}`}>
              {" "}
              <DeleteOutlined
                onClick={() => handleRemove(sub.slug)}
                style={{ color: "#222" }}
              />
            </Tooltip>,
          ]}
        >
          <List.Item.Meta title={<h6>{sub.name}</h6>} />
        </List.Item>
      </Card>
    </LayoutMain>
  );
};

export default SubUpdate;
