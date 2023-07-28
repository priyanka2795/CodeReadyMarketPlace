import React, {useEffect} from 'react'
import { Container, Row, Col, Spinner } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import Product from './SubComponent/Product'
import { Link } from 'react-router-dom'
import {HiArrowLeft} from 'react-icons/hi'
const AllUploadedProduct = () => {
    const allUploadedItems = useSelector((state) => state.addProduct.allUploadItems)
 
    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])
     
    return (
        <>
            <div className='' style={{backgroundColor:"#fafafa"}}>
            <Container>
                <div className="allUploaded_items_div py-5">
                    <Row>
                        <Col lg={12}>
                            <div className='back_btn'>
                                <Link to="/author_dashboard"><HiArrowLeft style={{marginTop:"-2px"}} /> &nbsp;Back</Link>
                            </div>
                        </Col>
                    </Row>
                <Row>
                    {allUploadedItems.length === 0 ?
                        <div className="loader_div text-center py-5">
                            <Spinner animation="border" />
                        </div>
                        :
                        allUploadedItems.map((e, i) => {
                            return (
                                <Col lg={3} md={6} key={i}>
                                    <Product img={`${process.env.REACT_APP_BASE_URL}${e.thumbnail}`} name={e.product_name} desc={e.product_description} id={e.user_uid} slug= {e.product_slug} verified={e.verified} />
                                </Col>
                            )
                        })
                    }

                </Row>
                </div>
               
            </Container>
            </div>
        </>
    )
}

export default AllUploadedProduct