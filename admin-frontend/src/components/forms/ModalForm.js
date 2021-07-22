import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Input, Radio, } from 'antd';
import {useSelector, useDispatch} from 'react-redux'
import {
AllCategories,
  newCategory,
} from "../../actions/categoryActions";
import {
  CREATE_CATEGORY_RESET,
  DELETE_CATEGORY_RESET,
} from "../../constants/categoryConstants";
const CollectionCreateForm = ({ visible, onCancel , setVisible}) => {


  const [form] = Form.useForm();
    const {success} = useSelector(state => state.newCategory)
    const [name, setName] = useState('')
    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch()
  const handleSubmit = (e)=> {
     e.preventDefault()

     dispatch(newCategory({name},auth.token))

  }
    useEffect(() => {

        dispatch(AllCategories())

        if (success) {
            setVisible(false)
            dispatch({type: CREATE_CATEGORY_RESET})
          
        }
    }, [success])

  return (
    <Modal
      visible={visible}
      title="Create a new collection"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={handleSubmit}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          modifier: 'public',
        }}
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[
            {
              required: true,
              message: 'Please input the title of collection!',
            },
          ]}
        >
          <Input value={name} onChange={(e)=> setName(e.target.value)} />
        </Form.Item>
    
      </Form>
    </Modal>
  );
};

export default CollectionCreateForm