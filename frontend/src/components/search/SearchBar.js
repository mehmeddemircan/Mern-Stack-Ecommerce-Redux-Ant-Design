import React, { Fragment } from "react";

import { Input, Space } from "antd";
import { AudioOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

const { Search } = Input;

const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: "#1890ff",
    }}
  />
);

const SearchBar = () => {
  const onSearch = (value) => console.log(value);

  const { t } = useTranslation();

  return (
    <Fragment>
      <Space style={{ width: 520 }}>
        <Search
          placeholder={t("header.searchInput")}
          onSearch={onSearch}
          enterButton
          suffix={suffix}
          allowClear
          onSearch={onSearch}
          style={{ width: 520, marginTop: 9, marginLeft: 24 }}
        />
      </Space>
    </Fragment>
  );
};

export default SearchBar;
