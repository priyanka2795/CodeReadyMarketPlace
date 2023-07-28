import Cookies from 'js-cookie';
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, OverlayTrigger, Tooltip, Modal } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { GrClose } from 'react-icons/gr'
import { BsExclamationCircle } from 'react-icons/bs'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { incrementCart, setStateUpdate, setCookieArr, setDeleteState } from '../../../redux/reducers/reducer';

const CartProduct = () => {
    const dispatch = useDispatch()
    const location = useLocation()
    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            remove
        </Tooltip>
    );
    const stateUpdate = useSelector((state) => state.addProduct.stateUpdate)
    const deleteState = useSelector((state) => state.addProduct.deleteState)
   
    const [token, setToken] = useState("")

    const cartData = useSelector((state) => state.addProduct.addToCartArray)
    const addCart = useSelector((state) => state.addProduct.addCart)
    // console.log("addCart==========", addCart)
    const [stateUpdateR, setStateUpdateR] = useState(false)
    const [manageAc, setManageAc] = useState(false);
    const [addToCartsss, setAddToCart] = useState([])
    const [dataNo, setDataNo] = useState(false);
    const [show, setShow] = useState(false);
    const [cookieProduct, setCookieProduct] = useState([])

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


    // ====== get billing details of loggedin user===
    const [billingData, setBillingData] = useState(undefined)
    const getBillingData = () => {
        const config = {
            headers: {
                "Accept": "application/json, text/plain",
                "Authorization": `Bearer ${token}`,
            }
        }
        axios.get(`${process.env.REACT_APP_BASE_URL}/api-superuser/single-billing-details/`, config)
            .then((res) => {
                setBillingData(res.data.response[0])
            })
            .catch((err) => {
                console.log("err", err)
            })
    }
    useEffect(() => {
        if (token) {
            getBillingData()
        }
    }, [token])
    // ====== get billing details of loggedin user===


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
        if (token) {
            setManageAc(true)
        } else {
            setManageAc(false)
        }
    }, [token]);
    useEffect(() => {
        myData()
    }, [stateUpdateR, location, token]);


    const handleClose = () => setShow(false);
    const handleConfirm = () => setShow(true)

    // ===== remove single cart products of logged in user ====
    var cookiesData = Cookies.get('productCount')
    const removeCartProduct = (id) => {

        if (cookiesData > 0) {
            Cookies.set('productCount', cookiesData - 1, { expires: 7, path: '/' })
        }
        const config = {
            headers: {
                "Accept": "application/json, text/plain",
                "Authorization": `Bearer ${token}`,
            }
        }

        var data = new FormData();
        data.append('product_id', id.toString());
        data.append('type', 'delete');

        axios.post(`${process.env.REACT_APP_BASE_URL}/get-order/add-cart-post/`, data, config)
            .then((response) => {
                if (response) {
                    setStateUpdateR(!stateUpdateR)
                    dispatch(setStateUpdate(!stateUpdate))
                }
            })
            .catch((err) => {
                console.log("errr", err);
            });
    }


    //===== remove all cart product logged in user ====
    const handleEmptyCart = () => {

        const config = {
            headers: {
                "Accept": "application/json, text/plain",
                "Authorization": `Bearer ${token}`,
            }
        }
        axios.delete(`${process.env.REACT_APP_BASE_URL}/get-order/emptycartproduct/`, config)
            .then((res) => {
                console.log("res empty cart", res)
                if (res) {
                    setShow(false)
                    setTimeout(() => {
                        setStateUpdateR(!stateUpdateR)
                    }, 500)

                    Cookies.set('productCount', 0, { expires: 7, path: '/' })
                    dispatch(setStateUpdate(!stateUpdate))
                }
            })
            .catch((err) => {
                console.log("err empty cart", err)
            })
    }

    // ===== remove cart products widthout logged in user ====
    const deleteCartProduct = (i) => {
        var cookiesData = Cookies.get('productCount')
        if (cookiesData > 0) {
            Cookies.set('productCount', cookiesData - 1, { expires: 7, path: '/' })
        }

        const deletedArr = [...cookieProduct]
        deletedArr.splice(i, 1)
        setCookieProduct(deletedArr)
        Cookies.set("myData", JSON.stringify(deletedArr));
        dispatch(setStateUpdate(!stateUpdate))
        dispatch(setCookieArr(deletedArr))
    }

    // ===== remove all cart products without logged in user
    const deleteEmptyCart = () => {
        const emptyArr = []
        setShow(false)
        setTimeout(() => {
            setCookieProduct([])
            Cookies.set("myData", JSON.stringify(emptyArr));
        }, 500)
        setCookieProduct([])
        dispatch(setStateUpdate(!stateUpdate))
        Cookies.set('productCount', 0, { expires: 7, path: '/' })
        dispatch(setCookieArr(emptyArr))
        dispatch(setDeleteState(!deleteState))
    }

  
    return (
        <>
            {
                token ?
                    <>
                        {
                            addToCartsss.length !== 0 ?
                                <div className="cartProduct_section my-5 py-5">
                                    <Container>
                                        <Row className='justify-content-center'>
                                            <Col lg={7} md={9}>
                                                <div className="cart_product_title mb-3 mt-5">
                                                    <h3 className='h3_title'>My Products</h3>
                                                </div>
                                                <div className="cart_top">
                                                    <div className="continue_shopping_btn">
                                                        <Link to="/" className='btn1'> Continue Shopping</Link>
                                                        <button className='btn2' onClick={handleConfirm}>Empty Cart</button>
                                                    </div>
                                                </div>
                                                {
                                                    addToCartsss.map((event, index) => {

                                                        return (
                                                            <div className="cart_details" key={index}>
                                                                <Link to={`/view_product/${event.product.product_slug}`}>
                                                                    <div className="product_img">
                                                                        <img src={`${process.env.REACT_APP_BASE_URL}${event.product.thumbnail}`} alt="product_img" className='img-fluid' />
                                                                    </div>
                                                                </Link>

                                                                <div className="product_details">
                                                                    <Link to={`/view_product/${event.product.product_slug}`}> <div className="product_name">{event.product.product_name}</div> </Link>
                                                                    <div className="owner_name">by {event.product.owner}</div>
                                                                    <div className="product_category">{event.product_category_name}</div>
                                                                </div>
                                                                <div className="product_price">
                                                                    <div className="remove_product">
                                                                        <OverlayTrigger
                                                                            placement="left"
                                                                            overlay={renderTooltip}
                                                                        >
                                                                            <div className='remove_cart' onClick={() => removeCartProduct(event.id)}>
                                                                                <GrClose />
                                                                            </div>
                                                                        </OverlayTrigger>
                                                                    </div>
                                                                    <div className="item_price">${event.product.product_price}</div>
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                }

                                                <div className='product_about'>
                                                    <Link to={manageAc ? (billingData === undefined ? "/billing_details" : "/payment_method") : "/sign_in"} className='secondary_btn' >Checkout</Link>
                                                </div>

                                            </Col>
                                        </Row>
                                    </Container>
                                </div>
                                :
                                <div className='no_product_wrap'>
                                    <h3 className='h3_title'>No Product in Your Cart</h3>
                                </div>
                        }
                    </>

                    :
                    <>
                        {
                            cookieProduct.length !== 0 ?
                                <div className="cartProduct_section my-5 py-5">
                                    <Container>
                                        <Row className='justify-content-center'>
                                            <Col lg={7} md={9}>
                                                <div className="cart_product_title mb-3">
                                                    <h3 className='h3_title'>My Products</h3>
                                                </div>
                                                <div className="cart_top">
                                                    <div className="continue_shopping_btn">
                                                        <Link to="/" className='btn1'> Continue Shopping</Link>
                                                        <button className='btn2' onClick={handleConfirm}>Empty Cart</button>
                                                    </div>
                                                </div>
                                                {
                                                    cookieProduct.map((event, index) => {
                                                        return (
                                                            <div className="cart_details" key={index}>
                                                                <Link to={`/view_product/${event.product_slug}`}>
                                                                    <div className="product_img">
                                                                        <img src={`${process.env.REACT_APP_BASE_URL}${event.thumbnail}`} alt="product_img" className='img-fluid' />
                                                                    </div>
                                                                </Link>
                                                                <div className="product_details">
                                                                    <Link to={`/view_product/${event.product_slug}`}><div className="product_name">{event.product_name}</div></Link>
                                                                    <div className="owner_name"> {event.published_by}</div>
                                                                    <div className="product_category">{event.product_category}</div>
                                                                </div>
                                                                <div className="product_price">
                                                                    <div className="remove_product">
                                                                        <OverlayTrigger
                                                                            placement="left"
                                                                            overlay={renderTooltip}
                                                                        >
                                                                            <div className='remove_cart' onClick={() => deleteCartProduct(index)}>
                                                                                <GrClose />
                                                                            </div>
                                                                        </OverlayTrigger>
                                                                    </div>
                                                                    <div className="item_price">${event.product_price}</div>
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                }

                                                <div className='product_about'>
                                                    <Link to={manageAc ? "/billing_details" : "/sign_in"} className='secondary_btn' >Checkout</Link>
                                                </div>

                                            </Col>
                                        </Row>
                                    </Container>
                                </div>
                                :
                                <div className='no_product_wrap'>
                                    <h3 className='h3_title'>No Product in Your Cart</h3>
                                </div>
                        }
                    </>
            }



            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                centered
            >

                <Modal.Body>
                    <div className='confirm_msg_box'>
                        <div className='icon'><BsExclamationCircle /></div>
                        <h1>Are you sure?</h1>
                        <p>You want to remove all items from your cart?</p>

                        <div className="btns">
                            <button className='btn btn-danger' onClick={handleClose}>No, cancel!</button>
                            <button className='primary_btn' onClick={sassionRefresh ? handleEmptyCart : deleteEmptyCart}>Yes, delete it!</button>
                        </div>
                    </div>
                </Modal.Body>

            </Modal>
            <ToastContainer
                position="top-center"
                autoClose={5000}
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

export default CartProduct
