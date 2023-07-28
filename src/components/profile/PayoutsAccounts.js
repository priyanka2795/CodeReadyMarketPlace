import React, { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import AuthorHeader from '../selling/sellingPages/author_dashboard/AuthorHeader'


export const PayoutsAccounts = () => {
    const [showPaypalService, setShowPaypalService] = useState(false)
    const [showRazorpayService, setShowRazorpayService] = useState(false)

    const handlePaypal = () => {
        setShowPaypalService(true)
        setShowRazorpayService(false)
        document.getElementById("paypal_head").style.backgroundColor = "#00abb3";
        document.getElementById("razorpay_head").style.backgroundColor = "#494949";
    }
    const handleRazorpay = () => {
        setShowRazorpayService(true)
        setShowPaypalService(false)
        document.getElementById("razorpay_head").style.backgroundColor = "#00abb3";
        document.getElementById("paypal_head").style.backgroundColor = "#494949";

    }
    return (
        <>
            <AuthorHeader />
            <div className="payout_account_section">
                <Container>
                    <Row className='justify-content-center'>
                        <Col lg={9}>
                            <div className="payout_account_header">Payout account <span>* (required fields)	</span></div>
                            <hr />

                            <Row>
                                <Col lg={12}>
                                    <div className="select_account_head">Select a payment method*</div>
                                    <div className="payout_account_service" >
                                        <div className="paypal_service" onClick={handlePaypal}>
                                            <div className="paypal_head" id='paypal_head'>PayPal</div>
                                            <div className="paypal_amount">Minimum $50.00</div>
                                        </div>
                                        <div className="razorpay_service" onClick={handleRazorpay}>
                                            <div className="razorpay_head" id="razorpay_head">RazorPay</div>
                                            <div className="razorpay_amount">Minimum $50.00</div>
                                        </div>
                                    </div>

                                    <div className="account_services mt-5">
                                        {
                                            showPaypalService ?
                                                <div className="paypal_service">
                                                    <div className="head">Your PayPal Account</div>
                                                    <div className="text">Get paid by credit or debit card, PayPal transfer or even via bank account in just a few clicks.<br></br>
                                                        All you need is your email address or mobile number.<a href='#'>More about PayPal</a> | <a href='#'>Create an account</a>
                                                    </div>
                                                    <div className="form_fields p-4">
                                                        <Row>
                                                            <Col lg={6}>
                                                                <Row className='mt-3'>
                                                                    <Col lg={4} className="text-center">
                                                                        <label>Email address:</label>
                                                                    </Col>
                                                                    <Col lg={8}>
                                                                        <input type="email" className='form-control' />
                                                                    </Col>
                                                                </Row>
                                                                <Row className='mt-4'>
                                                                    <Col lg={4}>
                                                                        <label>Confirm email address:</label>
                                                                    </Col>
                                                                    <Col lg={8}>
                                                                        <input type="email" className='form-control' />
                                                                    </Col>
                                                                </Row>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                </div>
                                                :
                                                <div></div>
                                        }
                                        {
                                            showRazorpayService ?
                                                <div className="paypal_service">
                                                    <div className="head">Your Razor pay Account</div>
                                                </div>
                                                :
                                                <div></div>
                                        }

                                    </div>

                                    <div className="set_payout_account_btn mt-3">
                                        <button className='primary_btn'>Set payout account</button>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}
