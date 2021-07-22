import React from "react";
import { Carousel } from "antd";

const contentStyle = {
  height: "550px",
  color: "#fff",
  lineHeight: "500px",
  textAlign: "center",
  background: "#364d79",
};

const CarouselComponent = () => {
  return (
   
    <Carousel autoplay style={{ height: 550 }} >
      <div>
        <img
          src="/images/banner.jpg"
          width={"100%"}
          style={{
            height: 570,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
   
      </div>
      <div>
        <img
          src="https://images.pexels.com/photos/5650043/pexels-photo-5650043.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
          width={"100%"}
          height={700}
        />
      </div>
      <div>
        <img
          src="https://images.pexels.com/photos/6214134/pexels-photo-6214134.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
          width={"100%"}
          height={700}
        />
      </div>
      <div>
        <img
          src="https://images.pexels.com/photos/4005033/pexels-photo-4005033.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
          width={"100%"}
          height={800}
        />
      </div>
      <div>
        <img
          src="https://images.pexels.com/photos/1050244/pexels-photo-1050244.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
          width={"100%"}
          height={700}
        />
      </div>
      <div>
        <img
          src="/images/shopcarousel.jpg"
          width={"100%"}
          height={700}
        />
      </div>
  
    </Carousel>

  );
};

export default CarouselComponent;
