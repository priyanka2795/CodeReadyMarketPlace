import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Steppers from './Stepper'
import {Link , useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux';

function WhatToSellItemInfo({handlePrev}) {
    const sellCategory = useSelector((state) => state.addProduct.sellerCategory);
   
    const navigate = useNavigate()
    const goToDashboard = ()=>{
        navigate("/author_dashboard")
    }
  return (
    <>
        {/* <Steppers activeStep={4} /> */}
       <div className="whatToSell_item_section">
       <Container>
            <Row className='justify-content-center'>
                <Col lg={10}>
                    <div className="whatToSell_item_content">
                        <Row>
                            <Col lg={6} md={12}>
                                <div className="head">Lorem Ipsum dollar sit amet.</div>
                                <div className="text">Here’s a few things you need to know about selling <span>{sellCategory}</span> with MarketPlace.</div>

                                <div className="subhead">Quality over quantity</div>
                                <div className="text">Remember, we want your best content.</div>

                                <div className="subhead">Your items, your prices</div>
                                <div className="text">Pricing your items appropriately will help them sell. <a href='#'>Check out our article on best practices and things to avoid.</a></div>

                                <div className="subhead">Model and property releases</div>
                                <div className="text">If you have recognizable buildings or people in your item, you need to include releases with your submission.</div>

                                <div className="subhead">Documentation</div>
                                <div className="text">We expect you to provide clear documentation for your After Effects templates.</div>

                                <div className="whatToSell_btn">
                                    <button className='primary_btn' onClick={goToDashboard}>Take me to my dashboard</button>
                                </div>

                                <div className="bottom_text">Not your bag? <span onClick={handlePrev}>Go back and change your choice</span></div>
                            </Col>
                            <Col lg={6} md={12}>
                                <div className="whatTosell_img">
                                    <img src="https://author.envato.com/assets/sign_up/code.jpg?37b922fca30fecd7692dcfe40a498700" className='img-fluid w-75 d-block m-auto' alt="img" />
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
        </Container>
       </div>
    </>
  )
}

export default WhatToSellItemInfo