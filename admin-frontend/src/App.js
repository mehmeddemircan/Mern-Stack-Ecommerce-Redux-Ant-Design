import { BrowserRouter as Router, Switch,Route } from 'react-router-dom'
import ProtectedRoute from './components/route/ProtectedRoute';

import ProductCreate from './pages/ProductCreate';
import DashboardPage from './pages/DashboardPage';
import NotFoundPage from './pages/NotFoundPage';
import {useSelector,useDispatch} from 'react-redux'
import {isUserLoggedIn} from './actions/userActions'
import React, { useState, useEffect } from 'react'
import ProfilePage from './pages/ProfilePage';
import {ToastContainer, toast} from 'react-toastify'

import CategoryCreate from './pages/Category/CategoryCreate';
import ForgotPasswordPage from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import GlobalStyle from './global-styles';
import CategoryUpdate from './pages/Category/CategoryUpdate';
import SubCreate from './pages/SubCreate';
import SubUpdate from './pages/SubUpdate';

import CouponCreate from './pages/CouponCreate';

function App() {

     
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)
  
  // When we fresh the page if you are in logged in  stay logged in
  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
  }, [auth.authenticate]);

  return (
    <Router>
         <GlobalStyle />
          <ToastContainer/>
      <Switch>
       
        <Route exact path="/" isAdmin={true} component={DashboardPage}/>
          {/* <Route exact path = "/create/new" isAdmin={true} component={CreateProduct}/> */}
          <ProtectedRoute exact path = "/category" isAdmin={true} component={CategoryCreate} />
          <Route exact path = "/product" isAdmin={true} component={ProductCreate} />

          <Route exact path = "/profile/me" isAdmin={true} component={ProfilePage} />
          <Route exact path = "/password/forgot" isAdmin={true} component={ForgotPasswordPage} />
          <Route exact path = "/password/reset/:token" isAdmin={true} component={ResetPassword} />
          <Route exact path = "/category/:slug" isAdmin={true} component={CategoryUpdate} />
          <Route exact path = "/sub" isAdmin={true} component={SubCreate} />
          <Route exact path = "/sub/:slug" isAdmin={true} component={SubUpdate} />

          <Route exact path = "/coupon" isAdmin={true} component={CouponCreate} />
       
        <NotFoundPage />

      </Switch>
    </Router>
  );
}

export default App;
