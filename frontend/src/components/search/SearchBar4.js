import React, { useState, useEffect } from "react";
import { Input, Space, AutoComplete } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { getProductsByCount } from "../../actions/productActions";
import { useHistory } from "react-router-dom";

import { SearchOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { SEARCH_QUERY } from "../../constants/searchConstants";

const { Search } = Input;

const SearchBar4 = () => {
  const { products } = useSelector((state) => state.getAllProducts);
  const { text } = useSelector((state) => state.search);
  const dispatch = useDispatch();

  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getProductsByCount(100));
  }, [dispatch]);

  const history = useHistory();
  const handleChange = (e) => {
    dispatch({
      type: SEARCH_QUERY,
      payload: { text: e.target.value },
    });
  };

  const handleSubmit = (e) => {
    console.log("hello");
    history.push("/hello");
  };

  return (
    <>
      <AutoComplete
        style={{
          width: 400,
          marginLeft: 20,
          position: "relative",
          top: -4,
        }}
        options={products.map((product) => ({
          value: product.title,
        }))}
        filterOption={(inputValue, option) =>
          option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
        }
      >
        <Search
          placeholder={t("header.searchInput")}
          enterButton
          allowClear
          onChange={handleChange}
          value={text}
          onSearch={handleSubmit}
        />
      </AutoComplete>
    </>
  );
};

export default SearchBar4;
