import React, { useEffect, useState } from 'react'
import { Image, Col, Row } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { incrementCart, setPrevUrl, setStateUpdate, setCookieArr } from '../../../redux/reducers/reducer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import axios from "axios";

const RelatedProducts = (props) => {
    const cookieArr = useSelector((state) => state.addProduct.cookieArr)

    const setData = props.related;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation()
    const addCart = useSelector((state) => state.addProduct.addCart);
    const stateUpdate = useSelector((state) => state.addProduct.stateUpdate)
    const handleRedirect = (id) => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        props.setProductUpdate(!props.productUpdate)
        navigate(`/view_product/${id}`)
        dispatch(setPrevUrl(""))
    }

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

        setCartProductData(a => [...a, event])
        dispatch(incrementCart(1));
        if(c.length === 0 || c.length !== 0){
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
                            // console.log(response);
                            if (response) {
                                dispatch(setStateUpdate(!stateUpdate))
                            }
                            if (response.data.status === 201) {
                            }
                        })
                        .catch(function (err) {
                            console.log("err", err.response.data);
                            // if(err.response.data.response === "You have already added this product on your cart"){
                            //     toast.error('You have already added this product on your cart', {
                            //         position: "top-right",
                            //         autoClose: 2000,
                            //         hideProgressBar: true,
                            //         closeOnClick: true,
                            //         pauseOnHover: true,
                            //         draggable: true,
                            //         progress: undefined,
                            //         theme: "colored",
                            //     });
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

    const handlePreview = (event) => {
        event.stopPropagation();
        window.open("https://infograins.com/");
    }
    return (
        <>
            <section className='relatedProducts_wrap'>
                <Row>
                    {
                        setData.map((event, key) => {
                            if (key < 4) {
                                return (
                                    <Col sm={6} md={6} lg={6} xl={3} xxl={3} key={key}>
                                        <div className='product_card' onClick={() => handleRedirect(event.product_slug)}>
                                            <figure className='product_img'>
                                                <Image src={`${process.env.REACT_APP_BASE_URL}${event.thumbnail}`} alt="Product Img" fluid />
                                            </figure>
                                            <div className='product_details'>
                                                <div className="product_details_title">
                                                    <h4 className='h4_title'>{event.product_name && event.product_name.length>36 ? `${event.product_name.slice(0,36)}..` : event.product_name }</h4>
                                                    <p>{event.published_by}</p>
                                                    <h3 className='h3_title'>{event.product_price}</h3>
                                                </div>
                                                <div className='product_about'>
                                                    <p>{event.product_category}</p>
                                                    <button className='btn secondary_btn' id={event.product_slug} onClick={(e) => handleChange(e, event)}>Add To Cart</button>
                                                </div>
                                                <div className='product_live_btn'>
                                                    <button className='btn primary_btn' onClick={handlePreview}>Live Preview</button>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                )
                            }

                        })
                    }
                </Row>
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

export default RelatedProducts