import React, { useEffect, useState } from "react";
import Carousel from "../components/carousel/Carousel";
import CarouselBootStrap from "../components/carousel/CarouselBootStrap";
import Layout from "../components/layout/Layout";
import BestSellerSlider from "../components/slider/BestSellerSlider";
import NewArrivalSlider from "../components/slider/NewArrivalSlider";
import CategoryList from "../components/category/CategoryList";
import SubList from "../components/subcategory/SubList";
import BrandsSlider from "../components/slider/BrandsSlider";


const HomePage = () => {
  return (
    <Layout>
      {/* <CarouselBootStrap /> */}
      <Carousel />

      <NewArrivalSlider />
      <BestSellerSlider />
      <h3 className="text-center mt-4">Categories</h3>
      <CategoryList />

      {/* <h3 className="text-center mt-4">
        SubCategories
     </h3>
     <SubList /> */}

      <BrandsSlider />
    </Layout>
  );
};

export default HomePage;
