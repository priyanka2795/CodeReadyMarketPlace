import React, {useEffect} from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import AuthorHeader from '../selling/sellingPages/author_dashboard/AuthorHeader'

export const Payouts = () => {
   

  return (
    <>
        <AuthorHeader/>
       <div className="payouts_section">
       <Container>
            <Row className="justify-content-center">
                <Col lg={9}>
                    <div className="payouts_container">
                        <Row>
                            <Col lg={8} md={7} className="">
                                <div className="next_payout">
                                    <div className="head">Next payout</div>
                                    <div className="text">You currently have $0.00 in earnings. To be paid your earnings in next months payout, set your account now.</div>
                                </div>
                            </Col>
                            <Col lg={4} md={5} className="">
                                <div className="payout_account">
                                    <div className="head">Payout account</div>
                                    <div className="text">No account set up</div>
                                    <div className="set_account_btn">
                                        <Link to="/accounts/payouts_accounts" className='primary_btn'>Set account</Link>
                                    </div>
                                </div>
                            </Col>
                        </Row>

                        <Row>
                            <Col lg={12}>
                                <div className="payout_history">
                                <div className="head">Payout History</div>
                                    <div className="text">You have had no payouts</div>
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
