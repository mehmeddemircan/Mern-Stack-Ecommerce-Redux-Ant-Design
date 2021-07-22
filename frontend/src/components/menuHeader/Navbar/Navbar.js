import "./Navbar.css";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {useSelector , useDispatch} from 'react-redux'
import { AllCategories } from "../../../actions/categoryActions";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const {t} = useTranslation()

  const {categories } = useSelector(state => state.getAllCategories)
  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(AllCategories())
  }, [dispatch])
  return (
    <header className="header">
      <div className="container">
        <div className="row v-center">
          <div className="menu-overlay"></div>
          <nav className="menu" style={{padding:0}}>
            <ul className="menu-main">
            <li className="menu-item-has-children">
                <Link to="/new">
                  {t("menuHeader.newProducts")}
                </Link>
                <div className="sub-menu mega-menu mega-menu-column-4">
                  <div className="list-item text-center">
                    <a href="#">
                      <img src="/images/p1.jpg" alt="new Product" />
                      <h4 className="title">Product 1</h4>
                    </a>
                  </div>
                  <div className="list-item text-center">
                    <a href="#">
                      <img src="/images/p2.jpg" alt="new Product" />
                      <h4 className="title">Product 2</h4>
                    </a>
                  </div>
                  <div className="list-item text-center">
                    <a href="#">
                      <img src="/images/p3.jpg" alt="new Product" />
                      <h4 className="title">Product 3</h4>
                    </a>
                  </div>
                  <div class="list-item text-center">
                    <a href="#">
                      <img src="/images/p4.jpg" alt="new Product" />
                      <h4 class="title">Product 4</h4>
                    </a>
                  </div>
                </div>
              </li>
            <li className="menu-item-has-children">
                <Link to="/category/home-and-living">
                {t("menuHeader.home&living")}
                </Link>
                <div className="sub-menu mega-menu mega-menu-column-4">
                  <div className="list-item">
                    <h4 className="title">Men's Fashion</h4>
                    <ul>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                    </ul>
                    <h4 className="title">Beauty</h4>
                    <ul>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                    </ul>
                  </div>
                  <div className="list-item">
                    <h4 className="title">Women's Fashion</h4>
                    <ul>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                    </ul>
                    <h4 className="title">Furniture</h4>
                    <ul>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                    </ul>
                  </div>
                  <div className="list-item">
                    <h4 className="title">Home, Kitchen</h4>
                    <ul>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                    </ul>
                  </div>
                  <div className="list-item">
                    <img src="/images/shop1.jpg" alt="shop" />
                  </div>
                </div>
              </li>
              <li className="menu-item-has-children" >
                <Link to="/products">
                      {t("menuHeader.electronic&technology")}
                </Link>
                <div className="sub-menu mega-menu mega-menu-column-4">
                  <div className="list-item">
                    <h4 className="title">Laptop & Desktop</h4>
                    <ul>
                        {categories.map((category)=> (
                          <li>
                            <Link to={`/category/${category.slug}`}>{category.name}</Link>
                          </li>
                        ))}
                    </ul>
                   
                  </div>
                  <div className="list-item">
                    <h4 className="title">Women's Fashion</h4>
                    <ul>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                    
                   
                    </ul>
                    <h4 className="title">Furniture</h4>
                    <ul>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                    </ul>
                  </div>
                  <div className="list-item">
                    <h4 className="title">Home, Kitchen</h4>
                    <ul>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                    </ul>
                  </div>
                  <div className="list-item">
                    <img src="/images/shop1.jpg" alt="shop" />
                  </div>
                </div>
              </li>
            
              <li className="menu-item-has-children">
                <Link to="/category/beauty-and-cosmetics">
                {t("menuHeader.beauty&cosmetics")}
                </Link>
                <div className="sub-menu mega-menu mega-menu-column-4">
                  <div className="list-item">
                    <h4 className="title">Men's Fashion</h4>
                    <ul>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                    </ul>
                    <h4 className="title">Beauty</h4>
                    <ul>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                    </ul>
                  </div>
                  <div className="list-item">
                    <h4 className="title">Women's Fashion</h4>
                    <ul>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                    </ul>
                    <h4 className="title">Furniture</h4>
                    <ul>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                    </ul>
                  </div>
                  <div className="list-item">
                    <h4 className="title">Home, Kitchen</h4>
                    <ul>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                    </ul>
                  </div>
                  <div className="list-item">
                    <img src="/images/shop1.jpg" alt="shop" />
                  </div>
                </div>
              </li>
            
              <li className="menu-item-has-children">
                <Link to="/category/clothing-and-shoes">
                  {t("menuHeader.clothing&shoes")}
                </Link>
                <div className="sub-menu mega-menu mega-menu-column-4">
                  <div className="list-item">
                    <h4 className="title">Men's Fashion</h4>
                    <ul>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                    </ul>
                    <h4 className="title">Beauty</h4>
                    <ul>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                    </ul>
                  </div>
                  <div className="list-item">
                    <h4 className="title">Women's Fashion</h4>
                    <ul>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                    </ul>
                    <h4 className="title">Furniture</h4>
                    <ul>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                    </ul>
                  </div>
                  <div className="list-item">
                    <h4 className="title">Home, Kitchen</h4>
                    <ul>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                    </ul>
                  </div>
                  <div className="list-item">
                    <img src="/images/shop1.jpg" alt="shop" />
                  </div>
                </div>
              </li>
            
              <li className="menu-item-has-children">
                <Link to="/products">
                  {t("menuHeader.art&collectibles")}
                </Link>
                <div className="sub-menu mega-menu mega-menu-column-4">
                  <div className="list-item">
                    <h4 className="title">Men's Fashion</h4>
                    <ul>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                    </ul>
                    <h4 className="title">Beauty</h4>
                    <ul>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                    </ul>
                  </div>
                  <div className="list-item">
                    <h4 className="title">Women's Fashion</h4>
                    <ul>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                    </ul>
                    <h4 className="title">Furniture</h4>
                    <ul>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                    </ul>
                  </div>
                  <div className="list-item">
                    <h4 className="title">Home, Kitchen</h4>
                    <ul>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                    </ul>
                  </div>
                  <div className="list-item">
                    <img src="/images/shop1.jpg" alt="shop" />
                  </div>
                </div>
              </li>
            
            <li className="menu-item-has-children">
                <Link to="/products">
                  {t("menuHeader.jewelery&accessories")}
                </Link>
                <div className="sub-menu mega-menu mega-menu-column-4">
                  <div className="list-item">
                    <h4 className="title">Men's Fashion</h4>
                    <ul>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                    </ul>
                    <h4 className="title">Beauty</h4>
                    <ul>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                    </ul>
                  </div>
                  <div className="list-item">
                    <h4 className="title">Women's Fashion</h4>
                    <ul>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                    </ul>
                    <h4 className="title">Furniture</h4>
                    <ul>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                    </ul>
                  </div>
                  <div className="list-item">
                    <h4 className="title">Home, Kitchen</h4>
                    <ul>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                    </ul>
                  </div>
                  <div className="list-item">
                    <img src="/images/shop1.jpg" alt="shop" />
                  </div>
                </div>
              </li>
            
            
              <li className="menu-item-has-children">
                <Link to="/shop">
                    {t("menuHeader.vintage")}
                </Link>
                <div className="sub-menu mega-menu mega-menu-column-4">
                  <div className="list-item">
                    <h4 className="title">Men's Fashion</h4>
                    <ul>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                    </ul>
                    <h4 className="title">Beauty</h4>
                    <ul>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                    </ul>
                  </div>
                  <div className="list-item">
                    <h4 className="title">Women's Fashion</h4>
                    <ul>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                    </ul>
                    <h4 className="title">Furniture</h4>
                    <ul>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                    </ul>
                  </div>
                  <div className="list-item">
                    <h4 className="title">Home, Kitchen</h4>
                    <ul>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                      <li>
                        <a href="#">Product List</a>
                      </li>
                    </ul>
                  </div>
                  <div className="list-item">
                    <img src="/images/shop1.jpg" alt="shop" />
                  </div>
                </div>
              </li>
             
           
             
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
