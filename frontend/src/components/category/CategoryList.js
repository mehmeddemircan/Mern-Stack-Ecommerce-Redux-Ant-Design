


import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "antd";
import { Link } from "react-router-dom";
import { AllCategories } from "../../actions/categoryActions";
import "./CategoryList.css";
import { useTranslation } from "react-i18next";
const CategoryList = () => {
  // const { categories, loading } = useSelector(
  //   (state) => state.getAllCategories
  // );

  // // const dispatch = useDispatch();
  // // useEffect(() => {
  // //   dispatch(AllCategories());
  // // }, [dispatch]);

  const {t} = useTranslation()


  // const showCategories = () => {};
  // we dont have cateogry pictures thats why we have to repeat ourselves
  return (
      <div className="container">
        <div className="row">
        
      
        <div className="col-md-3 col-sm-6" style={{ marginBottom: 18 }}>
        <Link to="/category/home-and-living">
            <div className="card" style={{borderRadius: 18}}>
              <img src="/images/home&living.jpg" />
              <div className="card-text">
                <h3>  {t("menuHeader.home&living")}</h3>
              </div>
            </div>
            </Link>
          </div>
    
        <div className="col-md-3 col-sm-6" style={{ marginBottom: 18 }}>
        <Link to="/category/electronic-and-technology">
          <div className="card" style={{borderRadius: 18}}>
            <img src="/images/electronic&technolohy1.jpg" />
            <div className="card-text">
              <h3> {t("menuHeader.electronic&technology")}</h3>
            </div>
          </div>
          </Link>
        </div>
        <div className="col-md-3 col-sm-6" style={{ marginBottom: 18 }}>
        <Link to="/category/beauty-and-cosmetics">
          <div className="card" style={{borderRadius: 18}}>
            <img src="/images/wedding&party2.jpg" />
            <div className="card-text">
              <h3> {t("menuHeader.beauty&cosmetics")}</h3>
            </div>
          </div>
          </Link>
        </div>
        <div className="col-md-3 col-sm-6" style={{ marginBottom: 18 }}>
        <Link to="/category/clothing-and-shoes">
          <div className="card" style={{borderRadius: 18}}>
            <img src="/images/clothing&shoes2.jpg" />
            <div className="card-text">
              <h3>   {t("menuHeader.clothing&shoes")}</h3>
            </div>
          </div>
          </Link>
        </div>
        <div className="col-md-3 col-sm-6" style={{ marginBottom: 18 }}>
        <Link to="/category/art-and-colletibles">
          <div className="card" style={{borderRadius: 18}}>
            <img src="/images/art&collectibles1.jpg" />
            <div className="card-text">
              <h3>   {t("menuHeader.art&collectibles")}</h3>
            </div>
          </div>
          </Link>
        </div>
        <div className="col-md-3 col-sm-6" style={{ marginBottom: 18 }}>
        <Link to="/category/jewelery-and-accessories">
          <div className="card" style={{borderRadius: 18}}>
            <img src="/images/jewelery&accessories2.jpg" />
            <div className="card-text">
              <h3>  {t("menuHeader.jewelery&accessories")}</h3>
            </div>
          </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CategoryList;
