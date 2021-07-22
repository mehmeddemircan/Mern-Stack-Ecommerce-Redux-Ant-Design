import React, { useState, useEffect } from "react";
import ReactCardFlip from "react-card-flip";

import {
  Card,

} from "antd";
import Layout from "../components/layout/Layout";

const { Meta } = Card;
const CardStyle = {
  border: "1px solid black",
  padding: "20px",
  margin: "20px",
  width: "200px",
  height: "300px",
};
const GiftCardsData = [
    {
        title: "Lorem ipsum",
        description: "www.instagram.com",
        image : "/images/alexa.jpg",
        price : "1600₺",
        discount: "%40 off",
        discountPrice : "1200₺"
      },
      {
        title: "Lorem ipsum",
        description: "www.instagram.com",
        image : "/images/phone.jpg",
        price : "1600₺",
        discount: "%40 off",
        discountPrice : "1200₺"
        
      },
      {
        title: "Lorem ipsum",
        description: "www.instagram.com",
        image : "/images/camera.jpg",
        price : "1600₺",
        discount: "%40 off",
        discountPrice : "1200₺"
      },
      {
        title: "Lorem ipsum",
        description: "www.instagram.com",
        image : "/images/playstation.jpg",
        price : "1600₺",
        discount: "%40 off",
        discountPrice : "1200₺"
      
      },
      {
        title: "Lorem ipsum",
        description: "www.instagram.com",
        image : "/images/mouse.jpg",
        price : "1600₺",
        discount: "%40 off",
        discountPrice : "1200₺"
      },
      {
        title: "Lorem ipsum",
        description: "www.instagram.com",
        image : "/images/mouse.jpg",
        price : "1600₺",
        discount: "%40 off",
        discountPrice : "1200₺"
      },
]

const GiftCardsComp = ({ project }) => {
  const [isFlipped, setIsFlipped] = React.useState(false);
  // console.log(project);

  const handleClick = () => {

    setIsFlipped(true);
  };
  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
      {/* Frontend segment of card */}
      <Card
        onClick={handleClick}
        hoverable
        style={{
          width: 240,
          margin: "16px",
          background: "#222",
          height: 300,
        }}
        cover={
          <h4 style={{ color: "#fff", textAlign: "center" }}>Fortune Card</h4>
        }
      ></Card>

    

      {/* Back segment of card */}
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <Card
          hoverable
          style={{ width: 240, margin: "16px" }}
          cover={<img alt="product name" src={project.image} />}
        >
          <Meta
            title={project.title}
            description={
              <>
                <h6 style={{ display: "inline-block" }}>1299.98 ₺ </h6>
                <span
                  style={{
                    marginLeft: 7,
                    textDecorationLine: "line-through",
                    color: "rgb(46,133,57)",
                  }}
                >
                  1600₺
                </span>
              </>
            }
          />
        </Card>
      </div>
    </ReactCardFlip>
  );
};

const GiftCardsPage = () => {
  return (
    <Layout>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {GiftCardsData.map((item, index) => (
          <GiftCardsComp project={item} key={`card-${index}`} />
        ))}
      </div>
  
    </Layout>
  );
};

export default GiftCardsPage;
