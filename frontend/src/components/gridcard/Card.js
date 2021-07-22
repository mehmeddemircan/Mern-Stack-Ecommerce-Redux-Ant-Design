import React, { Fragment } from "react";
import { Card, Rate } from "antd";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";



const { Meta } = Card;
const gridStyle = {
  width: "22%",
  height: 200,
  textAlign: "center",
  margin: "16px 16px",
  background: "#222",
};
// Products
const products = [
  {
    title: "Lorem ipsum",
    description: "www.instagram.com",
    image : "/images/airpods.jpg"
  },
  {
    title: "Lorem ipsum",
    description: "www.instagram.com",
    image : "/images/alexa.jpg"
  },
  {
    title: "Lorem ipsum",
    description: "www.instagram.com",
    image : "/images/phone.jpg",
    
  },
  {
    title: "Lorem ipsum",
    description: "www.instagram.com",
    image : "/images/camera.jpg"
  },
  {
    title: "Lorem ipsum",
    description: "www.instagram.com",
    image : "/images/playstation.jpg"
  
  },
  {
    title: "Lorem ipsum",
    description: "www.instagram.com",
    image : "/images/mouse.jpg"
  },
];


const CardComponent = () => {
  const { t } = useTranslation();
  return (
    // Burda map fonksiyonu kullanilacak
    <Fragment>
    <Card title="Card Title"  >
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {products.map((product) => (
          <Link to="/products">
            <Card
              hoverable
              style={{ width: 240, margin: "18px" }}
              cover={
                <img
                  alt="example"
                  src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                />
              }
            >
              <Meta title={product.title} description={product.description} />
            </Card>
          </Link>
        ))}
      </div>

     

    
     

    </Card>
    
     </Fragment>
  );
};

export default CardComponent;
