import React from 'react'
import { Input, Space } from 'antd';
import { AudioOutlined } from '@ant-design/icons';

const { Search } = Input;

const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#1890ff',
    }}
  />
);

const onSearch = value => console.log(value);
const SearchBar = () => {
    return (
        <Space >
              <Search placeholder="Type to search..." onSearch={onSearch} enterButton  suffix={suffix} style={{marginTop: 10, width :400,}}/>
        </Space>
    )
}

export default SearchBar
