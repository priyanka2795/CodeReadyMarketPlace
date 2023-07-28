import React, { useEffect, useState } from 'react';
import { Row, Container, Col } from "react-bootstrap";
import ProductDetails from './ProductDetails';
import PaymentDetails from './PaymentDetails';
import Html from "../landing/product/Html"
import { useParams, useLocation } from 'react-router-dom';
import RelatedProducts from './RelatedProducts';
import axios from "axios"
const ViewProduct = (props) => {
    const { id } = useParams();
    const [relatedProducts, setRelatedProducts] = useState([])
    const [products, setProducts] = useState()
    const [productUpdate, setProductUpdate] = useState(false)
    const location = useLocation()
    var datas = location.pathname;
    // console.log("props.product_url", datas.split("/")[2]);
    const poroductDetails = async () => {
        try {
            const apiData = await axios.get(`${process.env.REACT_APP_BASE_URL}/get-product/product-detail/${datas.split("/")[2]}`)
            setProducts(apiData.data.response)
            // console.log("apiData", apiData.data.response);
            setRelatedProducts(apiData.data.response.related_products);
        } catch (error) {
            console.log("error", error);
        }
    }
    useEffect(() => {
        poroductDetails()
    }, [productUpdate])
    // =========================== scroll To Top default =========================
    useEffect(() => {
        props.demo('root')
        window.scrollTo(0, 0)
    }, [])
    
    return (
        <>
            <section className='viewProduct_wrap'>
                <Container>
                    <Row>
                        <Col sm={12} md={6} lg={6} xl={6}>
                            <ProductDetails productDetail={products}/>
                        </Col>
                        <Col sm={12} md={6} lg={6} xl={6}>
                            <PaymentDetails productDetail={products}/>
                        </Col>
                    <RelatedProducts related={relatedProducts} productUpdate={productUpdate} setProductUpdate={setProductUpdate} />
                    </Row>
                </Container>
            </section>
        </>
    )
}

export default ViewProduct