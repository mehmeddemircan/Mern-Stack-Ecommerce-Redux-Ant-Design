import axios from 'axios'
import { CREATE_COUPON_SUCCESS,CREATE_COUPON_FAIL, CREATE_COUPON_REQUEST, GET_ALL_COUPONS, DELETE_COUPON } from '../constants/couponConstants';
import {message} from 'antd'
export const createCoupon = (coupon,token) => async(dispatch) => {

    try {
        dispatch({type: CREATE_COUPON_REQUEST})
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const {data} = await axios.post('/api/coupon',coupon,config)

    dispatch({
        type : CREATE_COUPON_SUCCESS,
        payload : data.coupon

    })

    } catch (error) {
      dispatch({
        type : CREATE_COUPON_FAIL,
        payload : message.error(error.response.data.error)

    })
    }


}


export const getCoupons = (token) => async (dispatch) => {


  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const {data} = await axios.get('/api/coupons',config)

  dispatch ({
    type : GET_ALL_COUPONS,
    payload : data.coupons
  })
}


export const deleteCoupon = (couponId,token) => async (dispatch) => {


  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const {data} = await axios.delete(`/api/coupon/${couponId}`,config)

  dispatch ({
    type : DELETE_COUPON,
    payload : data.deleted
  })
}
