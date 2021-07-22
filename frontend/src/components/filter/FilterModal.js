import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  ArrowRightOutlined,
  ArrowLeftOutlined,
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
  SearchOutlined,
  MenuFoldOutlined,
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
  DollarCircleOutlined,
  StarOutlined,
  HeartOutlined,
  HeartFilled,
  DownSquareOutlined,
} from "@ant-design/icons";
import {
  Select,
  Card,
  Breadcrumb,
  Pagination,
  Layout,
  Button,
  Form,
  Col,
  Row,
  DatePicker,
  Drawer,
  Input,
  Menu,
  Checkbox,
  Slider,
  Rate,
  Tag,
  
} from "antd";
import { fetchProductsByFilter } from "../../actions/productActions";
import { SEARCH_QUERY } from "../../constants/searchConstants";
import { useHistory } from "react-router";
import { PRODUCT_POST_FILTER_RESET } from "../../constants/productConstants";
import { AllSubCategories } from "../../actions/subActions";
import { getCategorySubs } from "../../actions/categoryActions";

const { SubMenu } = Menu;
const checkbox = {
  display: "block",
  padding: "0 0 0 24px",
  margin: "13px 0",
};
const { Option } = Select;
const FilterModal = ({ visible, onClose, setVisible }) => {
  const [showCategories, setShowCategories] = useState(false);
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.getAllCategories);
  const { success } = useSelector((state) => state.productPostFilter);
  const [price, setPrice] = useState([0, 0]);
  const { text } = useSelector((state) => state.search);
  const [ok, setOk] = useState(false);
  const [categoryIds, setCategoryIds] = useState([]);
  const { subs } = useSelector((state) => state.getAllSubCategories);
  const getSubsByCategory = useSelector(state => state.getSubsByCategory)
  const [sub, setSub] = useState("");

  const history = useHistory();
 
  function onChange(e) {
    console.log("checked", e.target.value);
  }

  useEffect(() => {
    dispatch(AllSubCategories());

    if (success) {
      setVisible(false);
      dispatch({
        type: PRODUCT_POST_FILTER_RESET,
      });
    }
  }, [dispatch, success]);

  // // // for price filter
  // useEffect(() => {

  //      if (price && price !== [0,0]) {
  //       dispatch(fetchProductsByFilter({price}))
  //      }

  // }, [dispatch,ok])
  const handleSlider = (value) => {
    dispatch({
      type: SEARCH_QUERY,
      payload: { text: "" },
    });

    setPrice(value);

    setTimeout(() => {
      setOk(!ok);
    }, 300);
  };

  // for category filter
  const handleCheck = (e) => {
    let inTheState = [...categoryIds];
    let justChecked = e.target.value;
    let foundInTheState = inTheState.indexOf(justChecked);

    if (foundInTheState === -1) {
      inTheState.push(justChecked);
    } else {
      inTheState.splice(foundInTheState, 1);
    }

    setCategoryIds(inTheState);
    console.log(inTheState);
   


    // dispatch(fetchProductsByFilter({ category: inTheState }));
  };

  const handleApply = (e) => {

    // how to implement query ??? for filters 
    if (price !== [0,0]) {
      dispatch(fetchProductsByFilter({ price }));
     
    }
    if (categoryIds.length !== 0 ) {
      dispatch(fetchProductsByFilter({category : [...categoryIds]}))
     ; 
    }

    // if (categoryIds !== []) {
    //   dispatch(fetchProductsByFilter({category : [...categoryIds]}))
      
    // }
  };

  const handleSub = (sub) => {

    setSub(sub);

    dispatch({
      type: SEARCH_QUERY,
      payload: { text: "" },
    });

    setPrice([0, 0]);
    setCategoryIds([]);
    dispatch(fetchProductsByFilter({ sub  : sub }));
  };


  const handleCategoryChange = (value) => {

    dispatch(getCategorySubs(value));
  };

  const renderShowCategories = () => {
    return (
      <>  

        
        {categories.map((category) => (
          <Checkbox
            onChange={handleCheck}
          
            style={checkbox}
            value={category._id}
            name="Category"
            checked={categoryIds.includes(category._id)}
          >
            {category.name}
          </Checkbox>
        ))}
      </>
    );
  };
  const renderNotShowCategories = () => {
    return (
      <>
        <Button
          key="sub1"
          title="Category"
          onClick={() => setShowCategories(true)}
          showCategories={showCategories}
          style={{ width: "100%", borderRadius: 10, textAlign: "left" }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h6>All Categories</h6>
            <ArrowRightOutlined style={{ marginTop: 2 }} />
          </div>
        </Button>

        <Menu
          mode="inline"
          style={{ height: "100%", borderRight: 0 }}
          defaultOpenKeys={["sub1","sub2", "sub3","sub4"]}
        >
          <SubMenu key="sub2" icon={<DollarCircleOutlined />} title="Price">
            <Slider
              className="ml-4 mr-4"
              tipFormatter={(v) => `$${v}`}
              range
              value={price}
              onChange={handleSlider}
              style={{ width: "85%", marginLeft: 30 }}
              max={10000}
            />
          </SubMenu>
          <Select 
            style={{ width: 240, marginLeft: 20,marginTop: 15}}
            placeholder="Select category"
           
          onChange={handleCategoryChange}
        >
          {categories.map((category) => (
            <Option key={category._id} value={category._id}>{category.name}</Option>
          ))}

        </Select>
          {/* <SubMenu key="sub3" icon={<NotificationOutlined />} title="subnav 3">
            <Checkbox onChange={onChange} style={checkbox}>
              Checkbox
            </Checkbox>
            <Checkbox onChange={onChange} style={checkbox}>
              Checkbox
            </Checkbox>
            <Checkbox onChange={onChange} style={checkbox}>
              Checkbox
            </Checkbox>
            <Checkbox onChange={onChange} style={checkbox}>
              Checkbox
            </Checkbox>
          </SubMenu> */}
          <SubMenu
            key="sub4"
            icon={<DownSquareOutlined />}
            title="Sub categories"
          >
            <div style={{ marginLeft: 20 }}>
              {getSubsByCategory.subs.map((s) => (
                <Tag
                  key={s._id}
                  color="rgba(60, 60, 60, 0.58)"
                  onClick={()=> handleSub(s)}
                  style={{ borderRadius: 10, marginBottom: 5 }}
                >
                  {s.name}
                </Tag>
              ))}
            </div>
          </SubMenu>
          <SubMenu key="sub5" icon={<StarOutlined />} title="rating">
            <div style={{ marginLeft: 20 }}>
              <Rate disabled defaultValue={5} style={{ display: "block" }} />
              <Rate disabled defaultValue={4} style={{ display: "block" }} />
              <Rate disabled defaultValue={3} style={{ display: "block" }} />
              <Rate disabled defaultValue={2} style={{ display: "block" }} />
              <Rate disabled defaultValue={1} style={{ display: "block" }} />
            </div>
          </SubMenu>

          <SubMenu key="sub6" title="Shipping">
            <Checkbox style={checkbox}>Yes</Checkbox>
            <Checkbox style={checkbox}>No</Checkbox>
          </SubMenu>
        </Menu>
      </>
    );
  };
  return (
    <Drawer
      placement="left"
      title="Filter Products"
      width={500}
      onClose={onClose}
      visible={visible}
      bodyStyle={{ paddingBottom: 80 }}
      footer={
        <div
          style={{
            display: "flex",
            textAlign: "left",
          }}
        >
          {showCategories ? (
            <Button
              onClick={() => setShowCategories(false)}
              icon={<ArrowLeftOutlined />}
              style={{
                marginRight: 8,
                width: "50%",
                height: 50,
                borderRadius: 40,
                fontSize: 21,
                border: "2px solid #222",
              }}
            >
              Back{" "}
            </Button>
          ) : (
            <Button
              onClick={onClose}
              style={{
                marginRight: 8,
                width: "50%",
                height: 50,
                borderRadius: 40,
                fontSize: 21,
                border: "2px solid #222",
              }}
            >
              Cancel{" "}
            </Button>
          )}
          <Button
            onClick={handleApply}
            // onClick={onClose}
            style={{
              width: "50%",
              height: 50,
              borderRadius: 40,
              fontSize: 21,
              background: "#222",
              color: "#fff",
            }}
          >
            Apply
          </Button>
        </div>
      }
    >
      {/* Cancel and back buttons */}
      {showCategories ? renderShowCategories() : renderNotShowCategories()}
    </Drawer>
  );
};

export default FilterModal;
