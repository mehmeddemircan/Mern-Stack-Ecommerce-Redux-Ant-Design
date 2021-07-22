import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import { Input } from 'antd';
import { Rate } from 'antd';
import { Collapse } from 'antd';
import { SendOutlined ,CameraFilled} from '@ant-design/icons';

import { Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
const { TextArea } = Input;


const { Panel } = Collapse;


const CommentModal = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };


  const [fileList, setFileList] = useState([
    
  ]);

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async file => {
    let src = file.url;
    if (!src) {
      src = await new Promise(resolve => {
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
  return (
    <>
      <Button type="primary" onClick={showModal}>
       Create Comment
      </Button>
      <Modal title="Comment & Rating" visible={isModalVisible}  onOk={handleOk} onCancel={handleCancel}  footer={[
          
            <Button key="submit" type="primary" onClick={handleOk}   >
             SEND
            </Button>,
         
          ]} >
        {/* <h6 style={{margin: 0}}>Rate </h6> */}
      <Rate style={{color: '#222', fontSize: 17, paddingBottom : 10, }} allowHalf defaultValue={0}  />
      <TextArea rows={10} placeholder="Type your comment..." autoFocus style={{marginBottom: 5}}/>
      <ImgCrop rotate>
      <Upload
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        listType="picture-card"
        fileList={fileList}
        onChange={onChange}
        onPreview={onPreview}
      >
      {fileList.length < 1 && <CameraFilled style={{ fontSize: 30 }} />}
      </Upload>
    </ImgCrop>
      </Modal>

    </>
  );
};

export default CommentModal



