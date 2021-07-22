import React from "react";
import { Collapse, Button, Descriptions } from "antd";
import {
  UpOutlined,
  DownOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
const { Panel } = Collapse;

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
const ProductDetailCollapes = ({
  expand,
  expand2,
  expand3,
  setExpand,
  setExpand2,
  setExpand3,
  product,
}) => {
  return (
    <div style={{ width: "40%" }}>
      <Button
        className="detailButtons"
        onClick={() => {
          setExpand(!expand);
        }}
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "95%",
          marginLeft: 10,
          height: 40,
          borderRadius: 30,
          lineHeight: "30px",
        }}
      >
        <h6 style={{ lineHeight: "30px", fontWeight: 550 }}>
          And More Details
        </h6>
        <a style={{ fontSize: 12 }}>
          {expand ? <UpOutlined /> : <DownOutlined />}
        </a>
      </Button>
      <div style={{ padding: "0 10px", paddingRight: 20, maxWidth: 570 }}>
        {expand ? (
          <div style={{ padding: "0px 9px 5px 9px" }}>
            <li className="list-group-item">
              <Descriptions.Item label="Price">
                Category{" "}
                <span style={{ float: "right" }}>
                  {product.category && product.category.name
                    ? product.category.name
                    : null}
                </span>
              </Descriptions.Item>
            </li>
            <li className="list-group-item">
              <Descriptions.Item label="UserName">
                Shipping{" "}
                <span style={{ float: "right" }}>
                  {product.shipping ? (
                    <span>
                      <CheckCircleOutlined style={{ color: "green" }} />
                      Yes
                    </span>
                  ) : (
                    <span>
                      <CloseCircleOutlined style={{ color: "red" }} />
                      No
                    </span>
                  )}
                </span>
              </Descriptions.Item>
            </li>
            <li className="list-group-item">
              <Descriptions.Item label="UserName">
                Sold <span style={{ float: "right" }}>{product.sold}</span>
              </Descriptions.Item>
            </li>{" "}
            <li className="list-group-item">
              <Descriptions.Item label="UserName">
                Count In Stock{" "}
                <span style={{ float: "right" }}>{product.quantity}</span>
              </Descriptions.Item>
            </li>
          </div>
        ) : null}
      </div>
      <Button
        className="detailButtons"
        onClick={() => {
          setExpand2(!expand2);
        }}
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "95%",
          marginLeft: 10,
          height: 40,
          borderRadius: 30,
          lineHeight: "30px",
        }}
      >
        <h6 style={{ lineHeight: "30px", fontWeight: 550 }}>FAQ</h6>
        <a style={{ fontSize: 12 }}>
          {expand2 ? <UpOutlined /> : <DownOutlined />}
        </a>
      </Button>
      <div
        style={{
          padding: "0 10px",
          paddingRight: 20,
          maxWidth: 520,
          paddingLeft: 10,
        }}
      >
        {expand2 ? (
          <>
            <Collapse defaultActiveKey={["1"]} ghost>
              <Panel header="This is panel header 1" key="1">
                <p>{text}</p>
              </Panel>
              <Panel header="This is panel header 2" key="2">
                <p>{text}</p>
              </Panel>
              <Panel header="This is panel header 3" key="3">
                <p>{text}</p>
              </Panel>
            </Collapse>
          </>
        ) : null}
      </div>

      <Button
        className="detailButtons"
        onClick={() => {
          setExpand3(!expand3);
        }}
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "95%",
          marginLeft: 10,
          height: 40,
          borderRadius: 30,
          lineHeight: "30px",
        }}
      >
        <h6 style={{ lineHeight: "30px", fontWeight: 550 }}>
          Meet Seller Shop
        </h6>
        <a style={{ fontSize: 12 }}>
          {expand3 ? <UpOutlined /> : <DownOutlined />}
        </a>
      </Button>
      <div
        style={{
          padding: "0 10px",
          paddingRight: 20,
          maxWidth: 520,
          paddingLeft: 10,
        }}
      >
        {expand3 ? (
          <>
            <p style={{ marginTop: 10, marginLeft: 10 }}>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is that it has a more-or-less normal
              distribution of letters, as opposed to using 'Content here,
              content here', making it look like readable English. Many desktop
              publishing packages and web page editors now use Lorem Ipsum as
              their default model text, and a search for 'lorem ipsum' will
              uncover many web sites still in their infancy. Various versions
              have evolved over the years, sometimes by accident, sometimes on
              purpose (injected humour and the like).
            </p>
            <Button
              style={{
                color: "#222",
                borderRadius: 20,
                border: "2px solid #222",
                fontSize: 17,
                width: "100%",
                height: 45,
                marginLeft: 10,
              }}
            >
              Message Seller
            </Button>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default ProductDetailCollapes;
