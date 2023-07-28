import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { setOrderDetails } from '../../../redux/reducers/reducer';
import { useLocation } from 'react-router-dom';
import { HiExclamationCircle } from 'react-icons/hi'
import { Table, Button} from 'react-bootstrap'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

const OrderSummary = () => {
  const dispatch = useDispatch()
  const location = useLocation()

 

  const [token, setToken] = useState("")
  let sassionAccess = sessionStorage.getItem("accessToken");
  let sassionRefresh = sessionStorage.getItem("refreshToken");

  let sassionAccessR = sessionStorage.getItem("accessTokenr");
  let sassionRefreshR = sessionStorage.getItem("refreshTokenr");

  useEffect(() => {
    if (sassionRefresh) {
      setToken(sassionRefresh)
    } else {
      setToken(sassionRefreshR)
    }
  }, [location])
 

  const [orderData, setOrderData] = useState(null)

  const getOrderData = async () => {
    const config = {
      headers: {
        "Accept": "application/json, text/plain",
        "Authorization": `Bearer ${token}`,
      }
    }
    await axios.get(`${process.env.REACT_APP_BASE_URL}/get-order/order-summary/`, config)
      .then((res) => {
        setOrderData(res.data.response)
        dispatch(setOrderDetails(res.data.response))
      })
      .catch((err) => {
        console.log("err", err)
      })
  }
  useEffect(() => {
    if (token) {
      getOrderData()
    }
  }, [token])

  


const popover = (
  <Popover id="popover-basic">
    
    <Popover.Body>
    <div className="handling_div">
 
        <p>A handling fee is calculated per order (not per item).</p>
        <div className="handling_table">
          <Table striped bordered>
            <thead>
              <tr>
                <td>Your Order</td>
                <td>Handling Fee</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Less than $10</td>
                <td>$1</td>
              </tr>
              <tr>
                <td>$10 - $75</td>
                <td>$2</td>
              </tr>
              <tr>
                <td>Above $75</td>
                <td>Free</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    </Popover.Body>
  </Popover>
);
  return (
    <>
      <section className='orderSummary_wrap'>
        <div className='orderSummary_title'>
          <h3 className='h3_title'>Order Summary</h3>
        </div>
        <div className='orderSummary_details'>
          {
            orderData !== null ?
              orderData.product_detail.length > 0 ?
                orderData.product_detail.map((e, i) => {
                  return (
                    <div className='orderSummary_about' key={i}>
                      <p className='' style={{ fontSize: "15px", color: "#767676", fontWeight: "normal" }}>{e.product__product_name && e.product__product_name.length > 25 ? `${e.product__product_name.slice(0, 25)}...` : e.product__product_name}</p>
                      <p>${e.product__product_price}</p>
                    </div>
                  )
                })
                : ""
              :
              ""
          }

          <hr />

          <div className='orderSummary_about'>
            <h5 className='h6_title'>Total Discounts:</h5>
            <p className='h6_title'>${orderData !== null ? orderData.cart_items_details.total_discount : ""}</p>
          </div>
          <div className='orderSummary_about'>
            <h5 className='h6_title'>Handling Fee: 
            <OverlayTrigger trigger="click" placement="left" overlay={popover}>
            <Button className='pop_btn'><HiExclamationCircle  /></Button>
           </OverlayTrigger>
           </h5>
            <p>${orderData !== null ? orderData.cart_items_details.handing_fees : ""}</p>
          </div>
        </div>
        <div className='orderSummary_footer'>
          <h4 className='h4_title'>Total:</h4>
          <p className='h5_title'>$ {orderData !== null ? orderData.cart_items_details.total_price_with_handling_fee : ""}</p>
        </div>
      </section>


      
    </>
  )
}

export default OrderSummary