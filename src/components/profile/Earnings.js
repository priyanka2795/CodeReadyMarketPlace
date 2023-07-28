import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import AuthorHeader from '../selling/sellingPages/author_dashboard/AuthorHeader';
import { useLocation } from 'react-router-dom'
const Earnings = () => {
    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const getDate = new Date();
    const monthName = month[getDate.getMonth()];

    const location = useLocation()
    const [token, setToken] = useState("")
    const [balance, setBalance] = useState("")

    useEffect(() => {
        var getSession = sessionStorage.getItem("accessToken");
        var getRegisterSession = sessionStorage.getItem("accessTokenr");
        if (getSession) {
            setToken(getSession)
        } else {
            setToken(getRegisterSession)
        }
    }, [location])



    const getTotalBalance = () => {
        const config = {
            headers: {
                "Accept": "application/json, text/plain",
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`,
            }
        }
        axios.get(`${process.env.REACT_APP_BASE_URL}/get-product/user-product-earning/`, config)
            .then((res) => {
                setBalance(res.data.response.total_earning)
            })
            .catch((err) => {
                console.log("err", err);
            })
    }

    useEffect(() => {
      if(token){
        getTotalBalance()
      }
    }, [token])

  

    return (
        <>
            <AuthorHeader />
            <div className="earning_section">
                <Container>
                    <Row className='justify-content-center'>
                        <Col lg={10}>
                            <Row>
                                <Col lg={4} md={4}>
                                    <div className="earning_div">
                                        <p>Sales earnings this month ({monthName}), after associated author fees, & before taxes:</p>
                                        <h2>$0.00</h2>
                                    </div>
                                </Col>
                                <Col lg={4} md={4}>
                                    <div className="earning_div">
                                        <p>Your balance:</p>
                                        <h2>${balance == null ? 0 : balance}</h2>
                                    </div>
                                </Col>
                                <Col lg={4} md={4}>
                                    <div className="earning_div">
                                        <p>Total value of your sales, before taxes:</p>
                                        <h2>$0.00</h2>
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

export default Earnings