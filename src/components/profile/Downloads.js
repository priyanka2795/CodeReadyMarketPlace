import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Image, Spinner } from 'react-bootstrap'
import AuthorHeader from '../selling/sellingPages/author_dashboard/AuthorHeader'
import { useLocation, Link } from 'react-router-dom'
export const Downloads = () => {
    const location = useLocation()
    const [token, setToken] = useState("")
    const [allOrders, setAllOrders] = useState([])
    const [loader, setLoader] = useState(true)

    useEffect(() => {
        var getSession = sessionStorage.getItem("accessToken");
        var getRegisterSession = sessionStorage.getItem("accessTokenr");
        if (getSession) {
            setToken(getSession)
        } else {
            setToken(getRegisterSession)
        }
    }, [location])


    const getAllOrders = () => {
        const config = {
            headers: {
                "Accept": "application/json, text/plain",
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`,
            }
        }

        axios.get(`${process.env.REACT_APP_BASE_URL}/get-product/user-orders/`, config)
            .then((res) => {
                console.log("order res", res.data.response);
                setAllOrders(res.data.response)
                setLoader(false)
            })
            .catch((err) => {
                console.log("order error ", err);
            })
    }
    useEffect(() => {
        if (token) {
            getAllOrders()
        }
    }, [token])



    return (
        <>

            <AuthorHeader />
            <div className="downloads_section">
                <Container>

                    {
                        loader ?
                            <div className="loader_div text-center py-5">
                                <Spinner animation="border" />
                            </div>
                            :
                            allOrders.length > 0 ?
                                <>
                                    <Row>
                                        <Col lg={12}>
                                            <h3 className='text-center mb-4'>My downloads</h3>
                                        </Col>
                                    </Row>
                                    <Row>
                                        {
                                            allOrders.map((e, i) => {
                                                return (
                                                    
                                                       <>
                                                        {
                                                            e.buy_product.map((event, index) => {
                                                                return (
                                                                    <Col sm={6} md={6} lg={3} xl={3} key={index} >
                                                                    <div className='product_card my-4'>
                                                                        <figure className='product_img'>
                                                                            <Image src={`${process.env.REACT_APP_BASE_URL}${event.thumbnail}`} alt="Product Img" fluid />
                                                                        </figure>
                                                                        <div className='product_details'>
                                                                            <div className="product_details_title">
                                                                                <h4 className='h4_title'>{event.product_name}</h4>
                                                                                <p>{event.published_by} </p>
                                                                                <h3 className='h3_title'>${event.product_price}</h3>
                                                                                <p style={{ fontSize: "17px" }}>{event.product_category}</p>
                                                                            </div>

                                                                            <div className='product_live_btn d-flex justify-content-end'>
                                                                                <a href={`${process.env.REACT_APP_BASE_URL}${event.main_file}`} className='btn primary_btn' >Download Source Code</a>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    </Col>
                                                                )
                                                            })
                                                        }
                                                      </>  
                                                    
                                                )
                                            })
                                        }

                                    </Row>
                                </>
                                :
                                <Row className='justify-content-center'>
                                    <Col lg={5}>
                                        <h4 className='text-center p-4 no_product_buy'>You haven't bought anything yet.</h4>
                                    </Col>
                                </Row>
                    }




                </Container>
            </div>
        </>
    )
}

