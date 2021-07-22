import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Button, Tooltip, InputNumber, Table } from "antd";
import { Form, Input, Radio, DatePicker, Space } from "antd";
import { List, Avatar,Tag } from "antd";
import LayoutMain from "../components/Layout/Layout";
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

import { toast } from "react-toastify";
import {
  createCoupon,
  deleteCoupon,
  getCoupons,
} from "../actions/couponActions";
import { CREATE_COUPON_RESET, DELETE_COUPON_RESET } from "../constants/couponConstants";
const { Option } = Select;


// pagination can be used if there would be a lot of category
const CouponCreate = () => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [discount, setDiscount] = useState("");

  const { success } = useSelector((state) => state.userCoupon);
  const {coupons} = useSelector(state => state.getAllCoupons)
  const {deleted} = useSelector(state => state.coupon)
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleCoupon = (e) => {
    e.preventDefault();

    dispatch(createCoupon({ name ,expiry,discount}, auth.token));
  };

  useEffect(() => {
    // dispatch all coupons
    dispatch(getCoupons(auth.token))
    if (success) {
      setIsModalVisible(false);
      dispatch({
        type: CREATE_COUPON_RESET,
      });
      form.resetFields();
    }

    if (deleted) {
      message.success("Coupon deleted successfully");
      dispatch({ type:DELETE_COUPON_RESET });
    }
  }, [dispatch, success,auth,deleted]);

    // remove
    const handleRemove = (couponId) => {
      if (window.confirm("Are you sure to delete this coupon")) {
        dispatch(deleteCoupon(couponId, auth.token));
      }
    };
    
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
     
      },
      {
        title: 'Expiry',
       
        key: 'expiry',
        render : (coupon) => (

          <a>{  new Date(coupon.expiry).toLocaleDateString() }</a>
        )
      },
      {
        title: 'Discount',
        dataIndex: 'discount',
        key: 'discount',
      },
     
      {
        title: 'Action',
        key: 'action',
        render: (coupon) => (
          <Space size="middle">
            <Tooltip title="Edit Coupon">
            <EditOutlined  style={{color : '#1890ff'}} />
            </Tooltip>
           <Tooltip title="Delete">
           <DeleteOutlined style={{color: 'red'}} onClick={() => handleRemove(coupon._id)} />
           </Tooltip>
          
          </Space>
        ),
      },
    ];

  return (
    <LayoutMain>
      <Button type="primary" onClick={showModal}>
        New coupon
      </Button>
  
      <Modal
        title="Create new coupon"
        visible={isModalVisible}
        okText="Create"
        cancelText="Cancel"
        onCancel={handleCancel}
        onOk={handleCoupon}
      >
        <Form
          form={form}
          layout="vertical"
          name="form_in_modal"
          initialValues={{ modifier: "public" }}
        >
          <Form.Item
            name="couponname"
            label="Coupon Code"
            rules={[{ required: true, message: "Please provide coupon code" }]}
          >
            <Input
              placeholder="Coupon code"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
            />
          </Form.Item>
          <Form.Item
            name="discount"
            label="Discount %"
            rules={[{ required: true, message: "Please provide discount" }]}
          >
            <input
              type="text"
              className="form-control"
              onChange={(e) => setDiscount(e.target.value)}
              value={discount}
            />
          </Form.Item>
          {/* date , and discount  */}
          <Form.Item
            name="expirydate"
            label="Expiry Date"
            rules={[{ required: true, message: "Please provide expiry date" }]}
          >
            <Space direction="vertical">
              <DatePicker
                allowClear
                value={expiry}
                onChange={(date) => setExpiry(date)}
              />
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* data shows all coupons */}
      
        
          {/* <table className="table table-bordered">
            <thead className="thead-light">
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Expiry</th>
              <th scope="col">Discount</th>
              <th scope="col">Action</th>
            </tr>

            </thead>
            <tbody>
              {coupons.map((coupon) => (
                <tr key={coupon._id}>
                  <td>{coupon.name}</td>
                  <td>{new Date(coupon.expiry).toLocaleDateString()}</td>
                  <td>{coupon.discount}</td>
                  <td><DeleteOutlined onClick={() => handleRemove(coupon._id)} /></td>

                </tr>
              ))}
            </tbody>
          </table> */}

            <h6 style={{marginTop: 35,marginLeft: 2, fontWeight: "bold"}}> {coupons.length} Coupons</h6>
          <Table style={{marginTop: 25}} columns={columns} dataSource={coupons} />

   
    </LayoutMain>
  );
};

export default CouponCreate;
