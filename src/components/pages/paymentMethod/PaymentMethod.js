import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Modal } from 'react-bootstrap'
import OrderSummary from '../PurchaseAccount/OrderSummary'
import { useDispatch, useSelector } from 'react-redux'
import { setEditBillingDetails, setBillingDetails } from '../../../redux/reducers/reducer'
import { useNavigate, useLocation } from 'react-router-dom'
import { BsCheckCircleFill } from 'react-icons/bs'
const PaymentMethod = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const orderDetails = useSelector((state) => state.addProduct.orderDetails)
    //  console.log("orderDetails---", orderDetails.cart_items_details.total_price_with_handling_fee)
    const [loader, setLoader] = useState(false)
    const [show, setShow] = useState(false);
    const [billingData, setBillingData] = useState([])

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

    var amount
    if (orderDetails) {
        const a = orderDetails.cart_items_details.total_price_with_handling_fee.toString()
        const val = a.split(".").pop()
        if (val > 5) {
            amount = Math.ceil(orderDetails.cart_items_details.total_price_with_handling_fee)
        } else {
            amount = Math.floor(orderDetails.cart_items_details.total_price_with_handling_fee)
        }

    }
  

    var arr = []
    if (orderDetails) {
        if (orderDetails.product_detail) {
            for (let i = 0; i < orderDetails.product_detail.length; i++) {
                arr.push(orderDetails.product_detail[i].product__id)
            }
        }
    }
    let product_ids = JSON.stringify(arr)


 const handleEdit = () => {
        dispatch(setEditBillingDetails(false))
        navigate("/billing_details")
    }

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
                dispatch(setBillingDetails(res.data.response[0]))
                localStorage.setItem("priyankaDetails", JSON.stringify(res.data.response[0]))

            })
            .catch((err) => {
                console.log("err", err)
            })
    }
    useEffect(() => {
        if (token) {
            getBillingData()
        }
        window.scrollTo(0, 0)
    }, [token])

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
            })
            .catch((err) => {
                console.log("err empty cart", err)
            })
    }
    //===== remove all cart product logged in user ====


    function loadRazorpayScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    }

    const handlePayment = async () => {
        const res = await loadRazorpayScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        );

        if (!res) {
            alert("Razorpay SDK failed to load. please check are you online?");
            return;
        }

        // var config = {
        //     method: 'post',
        //     url: 'https://fairbet.herokuapp.com/razorPay/',
        //     headers: {
        //         'Authorization': `Bearer ${token}`,

        //     },
        //     data: {
        //         amount: 100
        //     }

        // };

        // const result = await axios(config);

        // if (!result) {
        //     alert("Server error. please check are you onlin?");
        //     return;
        // }


        // const { merchantId = null, amount = null, currency = null, orderId = null } = result.data;
        // console.log("result", result)

        // const options = {

        //     key: merchantId,
        //     amount: amount,
        //     currency: currency,     
        //     name: "",
        //     description: "Test Transaction",
        //     order_id: orderId,
        //     handler: function (response) {
        //         console.log("response.razorpay_order_id", response);
        //         fetch("https://fairbet.herokuapp.com/callback/", {
        //             method: "POST",
        //             headers: { "Content-type": "application/json", 'Authorization': `Bearer ${token}` },
        //             body: JSON.stringify(response)
        //         }).then(data => data.json())
        //             .then(result => {
        //                console.log("result", result)
        //                 window.location.reload()
        //             })

        //     },
        //     prefill: {
        //         name: "Swapnil Pawar",
        //         email: "swapnil@example.com",
        //         contact: "9999999999",
        //         method: 'upi'
        //     },
        //     notes: {
        //         address: "None",
        //     },
        //     theme: {
        //         color: "#61dafb",
        //     },
        //     method: {
        //         netbanking: false,
        //         card: false,
        //         wallet: false,
        //         upi: true,
        //         paylater: false,
        //     },
        //     config: {
        //         display: {
        //             hide: [{ method: 'paylater' }]
        //         }
        //     }

        // };                              
        var options = {
            "key": "rzp_test_QWuUxvYOTVubGN",
            "amount": amount * 100,
            "currency": "INR",
            "name": "Codeready Software ",
            "description": "Product Purchase",
            "image": "http://localhost:3000/marketplace/static/media/logo2.d2b1e8b75259a081ddf4.png",

            "handler": function (response) {
                console.log(response.razorpay_payment_id);
                const config = {
                    headers: {
                        "Accept": "application/json, text/plain",
                        "Authorization": `Bearer ${token}`,
                    }    
                }
                var data = new FormData()

                data.append("buy_product", product_ids)
                data.append("payment_mode", "razorpay")
                data.append("payment_id", response.razorpay_payment_id)
                data.append("payment_status", 1)
                if (orderDetails) {
                    data.append("total_discount", orderDetails.cart_items_details.total_discount)
                }

                axios.post(`${process.env.REACT_APP_BASE_URL}/get-product/buy-product/`, data, config)
                    .then((res) => {
                        console.log("res payment====", res)
                        if (res) {
                            handleEmptyCart()
                            
                            setTimeout(() => {
                                setShow(true)
                            }, 1100)
                            setTimeout(() => {
                                setShow(false)
                                navigate("/downloads")
                            }, 2500)
                        }
                    })
                    .catch((err) => {
                        console.log("payment err====", err)
                        setLoader(false)
                    })

            },
            "prefill": {
                "name": "",
                "email": "",
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#00abb3"
            }
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    }

    return (
        <>
            {
                loader ? <div className="loader_wrap"><div className="loader"></div></div> : <div></div>
            }
            <div className="payment_section">
                <Container>
                    <Row className="justify-content-center">
                        <Col lg={9} md={12}>
                            <div className="payment_details">
                                <Row>
                                    <Col lg={8} md={8}>
                                        <div className="billing_details_div">
                                            <div className="header">
                                                <div className="title">Billing Details</div>
                                                <div className="edit_detail_btn">
                                                    <button className='secondary_btn' onClick={handleEdit}>Edit</button>
                                                </div>
                                            </div>

                                            <Row className='mt-4'>
                                                <Col lg={6} md={6}>
                                                    <p>{billingData === undefined ? "" : billingData.company_name !== "" ? billingData.company_name : <span style={{wordBreak: "break-word"}}>{billingData.first_name} {billingData.last_name}</span>}</p>
                                                    <p style={{wordBreak: "break-word"}}>{billingData === undefined ? "" : billingData.address_line}</p>
                                                    <p>{billingData === undefined ? "" : billingData.city}, {billingData === undefined ? "" : billingData.state}, {billingData === undefined ? "" : billingData.postal_code}</p>
                                                    <p>{billingData === undefined ? "" : billingData.country}</p>
                                                </Col>
                                                <Col lg={6} md={6}>
                                                    <p className='h6_title mb-2'>GSTIN:</p>
                                                    <p>{billingData === undefined ? "" : billingData.gstin === "" ? "Not provided" : billingData.gstin}</p>
                                                </Col>
                                            </Row>

                                        </div>

                                        <div className="payment_btn mb-3">
                                            <button className='primary_btn' onClick={handlePayment}>Make Payment</button>
                                        </div>
                                    </Col>

                                    <Col lg={4} md={4}>
                                        <OrderSummary />
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
            <Modal
                show={show}
                backdrop="static"
                keyboard={false}
                centered
                className='contact_us_modal'
            >
                <Modal.Body>
                    <div className='icon'><BsCheckCircleFill /></div>
                    <h5 className='h4_title'>Payment Successfully Done</h5>
                </Modal.Body>

            </Modal>

        </>
    )
}

export default PaymentMethod
                                                     



                                                         