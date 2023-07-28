import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Banner from './Banner';
import KeyFeatures from './KeyFeatures';
import Owl from './Owl';
import Html from './product/Html';
import Slider from './Slider';
import Blog from '../blog/Blog';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { incrementCart, setAddToCartArray, setStateUpdate, setCookieArr } from '../../../redux/reducers/reducer';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = (props) => {
  // =========================== scroll To Top default =========================
  const stateUpdate = useSelector((state) => state.addProduct.stateUpdate)
  const cookieArr = useSelector((state) => state.addProduct.cookieArr)


  useEffect(() => {
    props.demo('root')
  }, []);
  // =========================== scroll To Top default =========================
  const [response, setResponse] = useState([])
  const [element, setElement] = useState()
  const navigate = useNavigate();
  const location = useLocation()
  const dispatch = useDispatch();
  const topProduct = async () => {
    try {
      const api = await axios.get(`${process.env.REACT_APP_BASE_URL}/get-product/top-product/`)
      setResponse(api.data.response);

    } catch (error) {
      console.log("error", error);
    }
  }

  useEffect(() => {
    topProduct()
  }, [])

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


  function getProductData(e, event) {
    e.stopPropagation();
    setCartProductData(a => [...a, event])
    dispatch(incrementCart(1));

    if (c.length === 0 || c.length !== 0) {
      setC(a => [...a, event])
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
  }, [CartProductData, sendProduct, token])


  // ================================================= add to cart ===============================
  //==== get cart products =====
  const [addToCartsss, setAddToCart] = useState([])
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
      } catch (error) {
        // console.log(error);
      }
    }
  }

  useEffect(() => {
    myData()
  }, [stateUpdate, location, token, c]);

  useEffect(() => {
    response.map((e) => {
      return (
        e.products.filter((f) => {
          return (
            addToCartsss.filter((cart) => {
              if (cart.product.id === f.id) {
                return (
                  setShow(true)
                )
              }
              else {
                return (
                  setShow(false)
                )
              }
            })
          )
        })
      )
    })

  }, [demo, response])

  //==== get cart products =====

  

  return (
    <>
      <Banner />
      <section className='top_product' style={{ background: "#fff" }}>
        <h3 className='h3_title head'>Top Category</h3>
        {
          response.map((event, index) => {
            return (
              <Html key={index} data={event} getFunc={getProductData} show={show} />
            )
          })
        }
      </section>
      {/* <Slider /> */}
      <Blog />
      <Owl />
      <KeyFeatures />

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

export default Home

