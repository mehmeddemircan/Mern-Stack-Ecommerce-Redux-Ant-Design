import React from "react";
import Layout from "../components/layout/Layout";
import axios from 'axios'
import Resizer from "react-image-file-resizer";
import { Descriptions, Image, InputNumber, Avatar,Badge } from "antd";
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
import { USER_UPDATE_PROFILE_RESET } from "../constants/authConstants";




const DescItemStyle = {
  display: "block",
  paddingBottom: 10,
};
const PageHeaderstyle = {
  border: " 1px solid rgb(235, 237, 240)",
};

  
const initialState = {

  pictures : [] 
  
}


const ProfilePage = ({ history }) => {
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState("horizontal");


  const onFormLayoutChange = ({ layout }) => {
    setFormLayout(layout);
  };

  const style = {
    margin: "8px 10px",
  };

  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);
  const { user } = auth;

  const [values, setValues] = useState(initialState)

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


  const { success, error } = useSelector((state) => state.updateUserProfile);
  const { pictures } = values
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
      window.location.reload(true);

      dispatch({
          type: USER_UPDATE_PROFILE_RESET
      })
    }
  }, [dispatch, success, history, user]);


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
              .post("/api/uploadavatar", { picture: uri })
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
  
  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setPassword("");
      setConfirmPassword("");
      toast.error("Passwords do not match !");
    } else {
      // Dispatch update profile
      dispatch(updateUserProfile({ name, email, password, pictures }));
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


                 
                  {/* <Input.TextArea rows={4} placeholder="please enter url description" /> */}
                
         
            <Form.Item name="pictures" style={{ margin: 0 }}>
          <div className="row" style={{marginTop : 10}}>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {pictures &&
                pictures.map((picture) => (
                  <span className="avatar-item" style={{ margin: "0 7px" }}>
                    <Badge
                      count="X"
                      key={picture.public_id}
                      // onClick={() => handleImageRemove(picture.public_id)}
                      style={{ cursor: "pointer" }}
                    >
                      <Avatar src={picture.url} size={64} shape="square" />
                    </Badge>
                  </span>
                ))}
            </div>
            <label className="btn" style={{width: '13%' ,marginTop: 10,marginLeft: 20,marginBottom : 10, background: 'rgba(34, 34, 34, 0.2)', borderRadius: 24}}>
                  <CameraFilled  style={{color: '#222',fontSize: 22,}}/>
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
              src={user.pictures && user.pictures.length ? user.pictures[0].url : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAM1BMVEXk5ueutLfn6eqrsbTp6+zg4uOwtrnJzc/j5earsbW0uby4vcDQ09XGyszU19jd3+G/xMamCvwDAAAFLklEQVR4nO2d2bLbIAxAbYE3sDH//7WFbPfexG4MiCAcnWmnrzkjIRaD2jQMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMw5wQkHJczewxZh2lhNK/CBOQo1n0JIT74/H/qMV0Z7GU3aCcVPuEE1XDCtVLAhgtpme7H0s1N1U7QjO0L8F7llzGeh1hEG/8Lo7TUmmuSrOfns9xnGXpXxsONPpA/B6OqqstjC6Ax/0ujkNdYQQbKNi2k64qiiEZ+ohi35X+2YcZw/WujmslYewiAliVYrxgJYrdwUmwXsU+RdApUi83oNIE27YvrfB/ZPg8+BJETXnqh9CVzBbTQHgojgiCvtqU9thFJg/CKz3VIMKMEkIXxIWqIpIg2SkjYj+xC816mrJae2aiWGykxRNsW0UwiJghJDljYI5CD8GRiCtIsJxizYUPQ2pzItZy5pcisTRdk/a9m4amtNNfBuQkdVhSaYqfpNTSFGfb9GRIakrE2Pm+GFLaCQPqiu0OpWP+HMPQQcgQMiQprWXNmsVwIjQjYi/ZrhAqNTCgr2gu0Jnz85RSSjso0HkMFZ0YZjKkc26a/jlmh9JiDyDxi9oeorTYAzZkwwoMz19pzj9bnH/GP/+qbchjSGflneWYhtTuKdMOmNKZcJ5TjInQKcYXnESd/jQxy0ENpULTNGOGgxpap/oyw9pbUAqhfx2Dbkhovvfgz4iUzoM9+GlK6/Mh4q29hyC1mwro30hpVVLPF9wYQr71RazOeM5/cw81iBRD+A03aM9/C/obbrKjbYSpCmIVG3qT/Q8oeUo3Rz0IL7vI1tEbCB9pSiu8I/aV8x3Kg/BGWrWp4ZVs0nZfmAoEG4h/61yHYIJiFSl6Q0Vk6tTW1N8kYp8hdOkfHYYMXd2Qft+8CYwqYDSKvqIh+MCF8Wgca2u/cwdgeW3TtuVn6+1oBs3yLo5C2JpK6CvQzGpfUkz9UG/87gCsi5o2LIXolxN0FbwAsjOLEr+YJmXn7iR6N0BCt5p5cMxm7eAsfS+/CACQf4CTpKjzgkvr2cVarVTf96372yut7XLJ1sa7lv6VcfgYrWaxqr3Wlo1S6pvStr22sxOtTNPLzdY3nj20bPP+ejFdJYkLsjGLdtPBEbe/mr2bQKiXWJDroA+vtzc0p9aahuwqHMDYrQEXHEw9jwQl3drMpts9JBU1SdktPe5FBRdJQ6bwXBpa57ib2A8kukQDzMjh++Uo7Fo6Wd02Pkf4fknqoo4HtvAIjsqUcjx6DIPgWCaOML9rKI/oqD9/lgNrn+eF+p7j8tnzHBiR7+kdUGw/+V1Kzkc75mMy6U+FMaxjPibiM1U1uGM+puInHpmALZCgP4pt7i840MV8+0R1zPsRB6UTcqpizncYwZ89syDydfyWCwXB1l8/zRNGWbTG/GHKUm9AkxHMc/EGSk3z2+ArEhPEV5TUBLEvUGFcjEUH80J/jveTGOAJEljJbILWGQT3zRYiwuKsUXN1EEJAzBhRJFll7mBUG7KD8EqPkKekBREaL8hMDZLQSG6AQjtHPYmvTQnX0TtpC1SYCe2YdkkyLP3jj5BSbKiuR585eQhTgoje6yIb0Yb0C+mV6EYvebqw5SDy2WmubogZiF2AVxPC2FpDf8H2Q9QWo6IkjUxTWVEI3WY/wrCeSuqJ+eRWzXR/JXwgVjUMozbCOfoEZiSiKVGepqv5CJ8RyR4D7xBeamqa7z3BJ/z17JxuBPdv93d/a2Ki878MMAzDMAzDMAzDMAzDMF/KP09VUmxBAiI3AAAAAElFTkSuQmCC" }
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
