import axios from 'axios'
import { STRIPE_APPLY_FAIL, STRIPE_APPLY_REQUEST, STRIPE_APPLY_SUCCESS } from '../constants/stripeConstants';


export const createPaymentIntent =  (coupon,token) => async(dispatch) => {

        try {

            dispatch({type: STRIPE_APPLY_REQUEST})

            const config = {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
              };
    
            
            const {data }=  await axios.post('/api/create-payment-intent', {couponApplied : coupon},config)
              const {clientSecret, totalAfterDiscount, payable, cartTotal} = data 
            //   dispatch success
              dispatch({
                  type: STRIPE_APPLY_SUCCESS,
                  payload : {clientSecret, cartTotal,totalAfterDiscount}
              })

        } catch (error) {
            dispatch({
                type: STRIPE_APPLY_FAIL,
                payload : error.response.data.error
            })
        }

        

}

