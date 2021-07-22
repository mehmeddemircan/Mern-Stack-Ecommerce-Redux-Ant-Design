import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isUserLoggedIn } from "./actions/userActions";
import { useState, useEffect } from "react";

import "./App.css";
import GlobalStyle from "./global-styles";
import HomePage from "./pages/HomePage";

import NotFound from "./pages/NotFound";
import ProductDetail from "./pages/ProductDetail";
import ProductsPage from "./pages/ProductsPage";


import CartPage from "./pages/CartPage";
import ForgotPasswordPage from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

import ProfilePage from "./pages/ProfilePage";
import CheckoutPage from "./pages/CheckoutPage";
import PaymentPage from "./pages/PaymentPage";
import PurchaseHistory from "./pages/PurchaseHistory";
import WishListPage from "./pages/WishListPage";

import VideosPage from "./pages/VideosPage";
import FAQ from "./pages/FAQ";

import GiftCardsPage from "./pages/GiftCardsPage";
import ContactUs from "./pages/ContactUs";
import ProtectedRoute from "./components/route/ProtectedRoute";
import FavouritesPage from "./pages/FavouritesPage";
import SkeletonCard from "./pages/SkeletonCard";
import BestSellersPage from "./pages/BestSellersPage";
import NewArrivalPage from "./pages/NewArrivalPage";
import CategoryHome from "./pages/CategoryHome";
import SubHome from "./pages/SubHome";
import SearchPage from "./pages/SearchPage";

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  // When we fresh the page if you are in logged in  stay logged in
  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
  }, [auth.authenticate]);

  return (
    <Router>
      <GlobalStyle />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/products" component={ProductsPage} />
        <Route exact path="/product/:slug" component={ProductDetail} />

        <Route exact path="/cart" component={CartPage} />
        <Route exact path="/password/forgot" component={ForgotPasswordPage} />
        <Route exact path="/user/history" component={PurchaseHistory} />
        <Route exact path="/FAQ" component={FAQ} />

        {/* Protected routes */}
     
        <Route exact path="/password/reset/:token" component={ResetPassword} />
        <ProtectedRoute exact path="/profile/me" component={ProfilePage} />
        <ProtectedRoute exact path="/checkout" component={CheckoutPage} />
        <ProtectedRoute exact path="/payment" component={PaymentPage} />
        <ProtectedRoute
          exact
          path="/user/:id/wishlist"
          component={WishListPage}
        />
        <Route exact path="/ourvideos" component={VideosPage} />
        <Route exact path="/contactus" component={ContactUs} />
        <Route exact path="/gift/cards" component={GiftCardsPage} />
        <Route exact path="/favourites" component={FavouritesPage} />
        <Route exact path="/loading" component={SkeletonCard} />
        <Route exact path="/gift/cards" component={GiftCardsPage} />
        <Route exact path="/bestsellers" component={BestSellersPage} />
        <Route exact path="/newarrivals" component={NewArrivalPage} />
        <Route exact path="/category/:slug" component={CategoryHome} />
        <Route exact path="/subs/:slug" component={SubHome} />
        <Route exact path="/search" component={SearchPage} />
        

        {/* IF THERE IS NOT FOUND IT WİLL BE WORKING not found page */}
        <NotFound />
      </Switch>
    </Router>
  );
}

export default App;
