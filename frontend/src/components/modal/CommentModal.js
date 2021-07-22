import React, { useState, useEffect, Children } from "react";
import { Modal, Button, Form } from "antd";
import { Input, Badge, Avatar } from "antd";
import { Rate } from "antd";
import { Collapse } from "antd";
import { SendOutlined, CameraFilled } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { Upload } from "antd";
import ImgCrop from "antd-img-crop";
import {
  createProductReview,
  getProductReviews,
  getSingleProduct,
} from "../../actions/productActions";
import { toast } from "react-toastify";
import { PRODUCT_CREATE_REVIEW_RESET } from "../../constants/productConstants";
import axios from "axios";
import Resizer from "react-image-file-resizer";
const { TextArea } = Input;

const { Panel } = Collapse;

const initialState = {
  rating: 0,
  comment: "",
  pictures: [],
};
const CommentModal = ({ children }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const [form] = Form.useForm();
  // const [comment, setComment] = useState("");
  // const [rating, setRating] = useState(0);
  // const [pictures, setPictures] = useState([])
  const [values, setValues] = useState(initialState);
  const { rating, comment, pictures } = values;
  const { success, loading, error } = useSelector(
    (state) => state.productCreateReview
  );
  const { product } = useSelector((state) => state.getProduct);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // file upload
  const FileUploadChange = (e) => {
    let files = e.target.files;
    let allUploadedFiles = pictures;
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
              .post("/api/uploadreviewpicture", { picture: uri })
              .then((res) => {
                console.log("IMAGE UPLOAD RES DATA", res);
                allUploadedFiles.push(res.data);

                setValues({ ...values, pictures: allUploadedFiles });
                // setPictures({pictures : allUploadedFiles})
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

  useEffect(() => {
    if (success) {
      setIsModalVisible(false);
      form.resetFields();
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
      toast.success("Succesfully added review");
      // setValues({pictures : []})
    }
    if (error) {
      setIsModalVisible(false);
      form.resetFields();
      setValues({ pictures: [] });
    }
  }, [success, error]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview(
        product._id,
        {
          rating,
          comment,
          pictures,
        },
        auth.token
      )
    );
  };

  const handleImageRemove = (public_id) => {
    console.log("remove img", public_id);

    axios
      .post("/api/removereviewpicture", { public_id })
      .then((res) => {
        const { pictures } = values;
        let filteredImages = pictures.filter((item) => {
          return item.public_id !== public_id;
        });
        setValues({ ...values, pictures: filteredImages });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Button
        type="primary"
        shape="round"
        onClick={showModal}
        style={{ marginRight: 20 }}
      >
        Create Comment
      </Button>
      <Modal
        title="Comment & Rating"
        visible={isModalVisible}
        onOk={submitHandler}
        onCancel={handleCancel}
        footer={[
          <Button
            key="submit"
            type="primary"
            onClick={submitHandler}
            disabled={!comment}
          >
            SEND
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical" name="form_in_modal">
          <Form.Item name="rating" style={{ margin: 0 }}>
            <Rate
              style={{ color: "#222", fontSize: 17, paddingBottom: 10 }}
              allowHalf
              value={rating}
              onChange={(value) => setValues({ ...values, rating: value })}
            />
          </Form.Item>
          <Form.Item
            name="comment"
            rules={[{ required: true, message: "Comment is required" }]}
          >
            <TextArea
              name="comment"
              rows={10}
              placeholder="Type your comment..."
              autoFocus
              style={{ marginBottom: 5 }}
              value={comment}
              onChange={(e) =>
                setValues({ ...values, comment: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item name="pictures" style={{ margin: 0 }}>
            <div className="row">
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                {pictures &&
                  pictures.map((picture) => (
                    <span className="avatar-item" style={{ margin: "0 7px" }}>
                      <Badge
                        count="X"
                        key={picture.public_id}
                        onClick={() => handleImageRemove(picture.public_id)}
                        style={{ cursor: "pointer" }}
                      >
                        <Avatar src={picture.url} size={64} shape="square" />
                      </Badge>
                    </span>
                  ))}
              </div>
              <label
                className="btn"
                style={{
                  width: "13%",
                  marginTop: 10,
                  marginLeft: 10,
                  background: "rgba(34, 34, 34, 0.2)",
                  borderRadius: 24,
                }}
              >
                <CameraFilled style={{ color: "#222", fontSize: 22 }} />
                <input
                  type="file"
                  multiple
                  hidden
                  accept="images/*"
                  onChange={FileUploadChange}
                />
              </label>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CommentModal;
