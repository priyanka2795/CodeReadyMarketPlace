import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom"
import { FcCheckmark } from 'react-icons/fc'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { incrementCart, setStateUpdate, setCookieArr } from '../../../redux/reducers/reducer';
import Cookies from 'js-cookie';
import axios from "axios";
const PaymentDetails = (props) => {
  const cookieArr = useSelector((state) => state.addProduct.cookieArr)

  var datas = props.productDetail
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const cartData = useSelector((state) => state.addProduct.addToCartArray)
  const addCart = useSelector((state) => state.addProduct.addCart)
  const stateUpdate = useSelector((state) => state.addProduct.stateUpdate)
  const [stateUpdateR, setStateUpdateR] = useState(false)

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

  // ================================================= add to cart ===============================
  const [CartProductData, setCartProductData] = useState([])
  const [c, setC] = useState(cookieArr)

  function handleChange(e, event) {
    e.stopPropagation();
    let obj = {}
    obj.id = event.id
    obj.main_file = event.main_file
    obj.owner = event.owner
    obj.product_category = event.product_category
    obj.product_name = event.product_name
    obj.product_price = event.product_price
    obj.product_slug = event.product_slug
    obj.product_url = event.product_url
    obj.published_by = event.published_by
    obj.thumbnail = event.thumbnail


    setCartProductData(a => [...a, event])
    dispatch(incrementCart(1));
    if (c.length === 0 || c.length !== 0) {
      setC(a => [...a, obj])
      toast.success('Product added to cart', {
        position: "top-right",
        autoClose: 1800,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }


    document.getElementById(event.product_slug).innerText = "View Cart";
    var btn = document.getElementById(event.product_slug)
    btn.addEventListener("click", function () {
      navigate(`/cart_product`);
    })


  }

  const [sendProduct, setSendProduct] = useState("")

  function myfunc() {
    try {
      if (token) {
        if (CartProductData.length !== 0) {
          for (let i = 0; i < CartProductData.length; i++) {
            const element = CartProductData[i];
            setSendProduct(element.id)
          }
          var data = new FormData();
          data.append('product_id', sendProduct.toString());
          data.append('type', 'create');

          axios.post(`${process.env.REACT_APP_BASE_URL}/get-order/add-cart-post/`, data, {
            headers: {
              "content-type": "application/json",
              "Authorization": `Bearer ${token}`
            }
          })
            .then(function (response) {
              console.log(response);
              if (response) {
                dispatch(setStateUpdate(!stateUpdate))
              }
              if (response.data.status === 201) {
              }

            })
            .catch(function (err) {
              console.log(err);
              // if (err.response.data.response === "You have already added this product on your cart") {
              //   toast.error('You have already added this product on your cart', {
              //     position: "top-right",
              //     autoClose: 2000,
              //     hideProgressBar: true,
              //     closeOnClick: true,
              //     pauseOnHover: true,
              //     draggable: true,
              //     progress: undefined,
              //     theme: "colored",
              //   });
              // }
            });
        }

      } else {
        if (c.length !== 0) {
          Cookies.set("myData", JSON.stringify(c), { expires: 7, path: '/' });
          dispatch(setStateUpdate(!stateUpdate))
          dispatch(setCookieArr(c))
        }

      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    myfunc()
  }, [CartProductData, sendProduct, token, c])


  // ======get cart products=====
  const [addToCartsss, setAddToCart] = useState([])
  const [dataNo, setDataNo] = useState(false);
  const [cookieProduct, setCookieProduct] = useState([])
  const [demo, setDemo] = useState()
  const [show, setShow] = useState(false)
  const myData = async () => {

    if (token) {
      try {
        const api = await axios.get(`${process.env.REACT_APP_BASE_URL}/get-order/getcartproduct/`, {
          headers: {
            "content-type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        });
        setAddToCart(api.data.response)
        setDemo(true)
      } catch (error) {
        // console.log("error", error);
      }
    } else {
      try {
        const addToCart = JSON.parse(Cookies.get("myData"));
        setCookieProduct(addToCart);
        if (addToCart.length === 0) {
          setDataNo(false)
        } else {
          setDataNo(true)
        }
      } catch (error) {
        // console.log(error);
      }
    }
  }

  useEffect(() => {
    myData()
  }, [stateUpdateR, location, token]);

  //==== get cart products =====

  useEffect(() => {
    addToCartsss.filter((e) => {
      // console.log("e-----", e.product.id)
      if (e.product.id === (datas === undefined ? "" : datas.id)) {
        return (
          setShow(true)
        )
      }
    })
    return () => {
      setShow(false)
    }
  }, [demo, datas, location])

  return (
    <>
      {
        addToCartsss ?
          addToCartsss.length > 0 ?
            addToCartsss.map((e, i) => {
              // console.log("e---", e.product.id, "d-----", datas.id)
              if (e.product.id === (datas === undefined ? "" : datas.id)) {
                return (
                  <div className="added_cart_msg">
                    <span><FcCheckmark /></span>
                    <span>You have added this item to your cart.</span>&nbsp;
                    <Link to="/cart_product">Go to checkout</Link>
                  </div>
                )
              }

            })
            : ""
          : ""}


      <section className='paymentDetails_wrap'>
        <div className='paymentDetails_title'>
          <h2>{datas === undefined ? "" : datas.product_name}</h2>
        </div>
        <div className='payment_details'>
          <ul className='payment_details_list'>
            <li>Quality checked by Code ready</li>
            <li>Included:Future updates</li>
            <li>Included:6 months support from gavias </li>
          </ul>
          <div className='product_price'>
            <div className='product_price_cover'>
              <p>Price:</p>
              <h4 className='h4_title'>${datas === undefined ? "" : datas.product_price}</h4>
            </div>
            <div className="cart_btn">
              {
                show ?
                  <><button className='disabled_btn'>Add to cart</button></>
                  :
                  <><button className='secondary_btn' id={datas === undefined ? "" : datas.product_slug} onClick={(e) => handleChange(e, datas)}>Add to cart</button></>
              }


            </div>
          </div>
          <div className='product_all_details_wrap'>
            <div className="product_all_details">
              <p>Last Update</p>
              <span>{datas === undefined ? "" : datas.last_update.slice(0,10)}</span>
            </div>
            <div className="product_all_details">
              <p>Published</p>
              <span>{datas === undefined ? "" : datas.published.slice(0,10)}</span>
            </div>

            <div className="product_all_details">
              <p>Compatible Browsers</p>
              <span>{datas === undefined ? "" : datas.competible_browser}</span>
            </div>
            <div className="product_all_details">
              <p>Compatible With</p>
              <span>{datas === undefined ? "" : datas.competible_With}</span>
            </div>
            <div className="product_all_details">
              <p>ThemeForest Files Included</p>
              <span>{datas === undefined ? "" : datas.themeforest_files_included}</span>
            </div>

            <div className="product_all_details">
              <p>Framework</p>
              <span>{datas === undefined ? "" : datas.framework === null ? "-" : datas.framework}</span>
            </div>
            <div className="product_all_details">
              <p>Layout</p>
              <span>{datas === undefined ? "" : datas.layout}</span>
            </div>
            <div className="product_all_details">
              <p>Tags</p>
              <span>{datas === undefined ? "" : datas.tag}</span>
            </div>
          </div>
        </div>
      </section>

      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  )
}

export default PaymentDetails
