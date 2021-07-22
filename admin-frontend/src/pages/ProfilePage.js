import React from "react";
import Layout from '../components/Layout/Layout'
import { Descriptions, Image, InputNumber } from "antd";
import { PageHeader } from "antd";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import { Radio, Upload } from "antd";
import { CameraFilled } from "@ant-design/icons";
import ImgCrop from "antd-img-crop";
import { toast } from "react-toastify";
import {
  Drawer,
  Form,
  Button,
  Col,
  Row,
  Input,
  Select,
  DatePicker,
} from "antd";
import { useTranslation } from "react-i18next";
import TextArea from "antd/lib/input/TextArea";

const DescItemStyle = {
  display: "block",
  paddingBottom: 10,
};
const PageHeaderstyle = {
  border: " 1px solid rgb(235, 237, 240)",
};

const ProfilePage = ({ history }) => {
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState("horizontal");

  const onFormLayoutChange = ({ layout }) => {
    setFormLayout(layout);
  };

  const style = {
    margin: "8px 10px",
  };

  const [fileList, setFileList] = useState([]);

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };

  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);
  const { user } = auth;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [avatar, setAvatar] = useState("");

  const { success, error } = useSelector((state) => state.updateUserProfile);

  const {t}= useTranslation()

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
    if (success) {
      toast.success("Updated profile successfully")
      dispatch(getUserDetails());
      history.push('/')

      // refresh page automaticly
      // window.location.reload(true);

      // dispatch({
      //     type: UPDATE_PROFILE_RESET
      // })
    }
  }, [dispatch, success, history, user]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setPassword("");
      setConfirmPassword("");
      toast.error("Passwords do not match !");
    } else {
      // Dispatch update profile
      dispatch(updateUserProfile({ name, email, password }));
      setPassword("");
      setConfirmPassword("");
    }
  };


  return (
    <Layout>
      <Link to="/">
        <PageHeader
          style={PageHeaderstyle}
          onBack={() => null}
          title={t('updateProfile.pageHeadertitle')}
          subTitle={t('updateProfile.pageHeadersubtitle')}
        />
      </Link>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: 500,

            marginTop: 10,
          }}
        >
          <Form
            layout={formLayout}
            form={form}
            initialValues={{
              layout: formLayout,
            }}
            style={{ width: 350 }}
            onValuesChange={onFormLayoutChange}
          >
            <h2>{t('updateProfile.title')}</h2>
            <Input
              placeholder={t('updateProfile.name')}
              style={style}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <Input
              placeholder={t('updateProfile.email')}
              style={style}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input.Password
              placeholder={t('updateProfile.password')}
              style={style}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Input.Password
              placeholder={t('updateProfile.confirmPassword')}
              style={style}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <ImgCrop rotate>
              <Upload
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture-card"
                fileList={fileList}
                className="avatar-uploader"
                onChange={onChange}
                onPreview={onPreview}
              >
                {fileList.length < 1 && (
                  <CameraFilled style={{ fontSize: 30 }} />
                )}
              </Upload>
            </ImgCrop>
                 
                  {/* <Input.TextArea rows={4} placeholder="please enter url description" /> */}
                
            <Form.Item>
              <Button
                onClick={submitHandler}
                type="primary"
                style={style}
                shape="round"
                style={{ width: "40%", fontSize: 15 }}
              >
                {t('updateProfile.submit')}
              </Button>
            </Form.Item>
          </Form>
        </div>

  

        <Descriptions style={{ padding: 12, width: 500 }}>
          <div style={{ display: "flex", width: 240 }}>
            <Image
              width={240}
              src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            />
          </div>

          <Descriptions.Item label={t('desclabels.name')} style={DescItemStyle}>
            {user.name}
          </Descriptions.Item>
          <Descriptions.Item label={t('desclabels.email')} style={DescItemStyle}>
            {user.email}
          </Descriptions.Item>
          <Descriptions.Item label={t('desclabels.live')} style={DescItemStyle}>
            Hangzhou, Zhejiang
          </Descriptions.Item>
          <Descriptions.Item label={t('desclabels.description')} style={DescItemStyle}>
            sdjasdas sald askdas dsald sadj asdk asdl asd asd askdsa kdaskas dsa
            das kdaskd as
            d asdkas asdkas
          </Descriptions.Item>
          <Descriptions.Item label={t('desclabels.address')} style={DescItemStyle}>
            No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
            dsajdsa jdsajdsaj dsjads ajd jasdj ajdaj dajd jad jadj ajd ajda jdja
            djaj ajd jadj ajd ajdj aj
          </Descriptions.Item>
        </Descriptions>
        {/* <div
              style={{
                padding: 20,
                width: 300,
                margin: 3,
                borderRadius: 20,
                marginRight: 30,
                marginTop: 20,
              }}
            >
              <h6 style={{ border: "1px solid #3498db" }}>
                Purchases & Reviews
              </h6>
              <h6 style={{ border: "1px solid #3498db" }}>Public Profile</h6>
              <h6 style={{ border: "1px solid #3498db" }}>Settings</h6>
              <h6 style={{ border: "1px solid #3498db" }}>Apps</h6>
              <h6 style={{ border: "1px solid #3498db" }}>Prototypes</h6>
              <h6 style={{ border: "1px solid #3498db" }}> Sign Out</h6>
            </div> */}
        
      </div>
    </Layout>
  );
};

export default ProfilePage;

