import React from "react";

import ReactPlayer from "react-player";
import Layout from "../components/layout/Layout";

const videoStyle = {
  padding: 24,
};

const VideosPage = () => {
  return (
    <Layout>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          padding: 16,
          justifyContent: "center",
        }}
      >
        <ReactPlayer
          url="https://www.youtube.com/watch?v=ysz5S6PUM-U"
          style={videoStyle}
          width={"30%"}
        />
        <ReactPlayer
          url="https://www.youtube.com/watch?v=ysz5S6PUM-U"
          style={videoStyle}
          width={"30%"}
        />
        <ReactPlayer
          url="https://www.youtube.com/watch?v=ysz5S6PUM-U"
          style={videoStyle}
          width={"30%"}
        />
        <ReactPlayer
          url="https://www.youtube.com/watch?v=ysz5S6PUM-U"
          style={videoStyle}
          width={"30%"}
        />
        <ReactPlayer
          url="https://www.youtube.com/watch?v=ysz5S6PUM-U"
          style={videoStyle}
          width={"30%"}
        />
        <ReactPlayer
          url="https://www.youtube.com/watch?v=ysz5S6PUM-U"
          style={videoStyle}
          width={"30%"}
        />
      </div>
    </Layout>
  );
};

export default VideosPage;
