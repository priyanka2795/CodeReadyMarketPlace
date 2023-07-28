import React, { useEffect, useState, useRef } from "react"
import { Container, Row, Col } from "react-bootstrap"
import axios from 'axios'

function TermsConditions() {
    const [termsData, setTermsData] = useState([])

    useEffect(() => {
        window.scrollTo(0, 0)
    })

    const getData = async () => {
        await axios.get(`${process.env.REACT_APP_BASE_URL}/api-superuser/term-condition/`)
            .then((res) => {
                setTermsData(res.data.response)
            })
            .catch((err) => {
                console.log("err", err)
            })
    }
    useEffect(() => {
        getData()
    }, [])

    const termsContent = useRef(null);
    useEffect(() => {
        termsContent.current.innerHTML = `${termsData.content}`;
    }, [termsData]);
    return (
        <section className="main-sec">
            <div className="mb-5 privacy-child-div">
                <Container>
                    <Row className="justify-content-center">
                        <Col lg={10} md={10}>
                            <h2 className="text-center privacy-head">{termsData.title}</h2>
                            <p className="text-center text-white py-2">{termsData.description}</p>
                        </Col>
                    </Row>
                </Container>
            </div>
            <Container>
                <Row className="justify-content-center">
                    <Col lg={10} md={10}>
                        <div style={{ minHeight: "500px" }}>
                            <div ref={termsContent} className="my-4" ></div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>

    )
}
export default TermsConditions





