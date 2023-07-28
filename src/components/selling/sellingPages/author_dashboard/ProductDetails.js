import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Spinner } from 'react-bootstrap'
import { LeftDetails } from './SubComponent/LeftDetails'
import { RightDetails } from './SubComponent/RightDetails'
import { useParams, useLocation } from 'react-router-dom'
import axios from 'axios'
import { useSelector } from 'react-redux'
import Product from './SubComponent/Product'
import { Link } from 'react-router-dom'
import {HiArrowLeft} from 'react-icons/hi'


function ProductDetails() {
    const relatedData = useSelector((state) => state.addProduct.allUploadItems)
    const { id, slug } = useParams();
    const location = useLocation()
    const [token, setToken] = useState("")
    const [productData, setProductData] = useState()
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


    const getSingleProductDetail = () => {

        const config = {
            headers: {
                "Accept": "application/json, text/plain",
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`,
            }
        }
        axios.get(`${process.env.REACT_APP_BASE_URL}/get-product/user-created-product-detail/${id}/${slug}`, config)
            .then((res) => {
                setProductData(res.data.response)
                setLoader(false)
            })
            .catch((err) => {
                console.log("err", err);
            })
    }
    useEffect(() => {
        if (token) {
            getSingleProductDetail()
        }
        window.scrollTo(0, 0)
    }, [token, id, slug])
// console.log("productData", productData);

    return (
        <>
            <div className="viewProduct_wrap" style={{backgroundColor:"#fafafa"}}>
                <Container>
                <Row>
                        <Col lg={12}>
                            <div className='back_btn mb-3'>
                                <Link to="/author_dashboard"><HiArrowLeft style={{marginTop:"-2px"}} /> &nbsp;Back</Link>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={12} md={6} lg={6} xl={6}>
                            <LeftDetails productData={productData} />
                        </Col>
                        <Col sm={12} md={6} lg={6} xl={6}>
                            <RightDetails productData={productData} id={id} slug={slug} />
                        </Col>
                    </Row>
                    {/* <Row>
                        {
                             loader ?
                             <div className="loader_div text-center py-5">
                             <Spinner animation="border" />
                         </div>
                         :
                        relatedData.length > 1  &&
                            relatedData.map((e, i) => {
                                if (slug !== e.product_slug) {
                                    if(i < 5){
                                        return (
                                            <Col lg={3} md={6} key={i}>
                                                <Product img={`${process.env.REACT_APP_BASE_URL}${e.thumbnail}`} name={e.product_name} desc={e.product_description} id={e.user_uid} slug={e.product_slug} />
                                            </Col>
                                        )
                                    }
                                   
                                }
                            })
                        }
                    </Row> */}
                </Container>
            </div>
        </>
    )
}

export default ProductDetails








