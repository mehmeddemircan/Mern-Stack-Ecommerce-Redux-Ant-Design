import React from "react";
import { BackTop, Button } from "antd";

import { ArrowUpOutlined } from "@ant-design/icons";
const backtopStyle = {
  height: 40,
  width: 40,
  lineHeight: "30px",
  borderRadius: 10,
  backgroundColor: "#1088e9",
  color: "#fff",

  fontSize: 14,
};

const Backtop = () => {
  return (
    <div>
      <BackTop>
        <Button
          style={backtopStyle}
          icon={<ArrowUpOutlined style={{ fontSize: 23 }} />}
        />
      </BackTop>
    </div>
  );
};

export default Backtop;
