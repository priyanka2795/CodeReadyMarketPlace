import React, { useEffect, useState, useRef } from "react"
import { Container, Row, Col } from "react-bootstrap"
import axios from 'axios'

function Privacypolicy() {
    const [privacyData, setPrivacyData] = useState([])

    useEffect(() => {
        window.scrollTo(0, 0)
    })

    const getData = async () => {
        await axios.get(`${process.env.REACT_APP_BASE_URL}/api-superuser/privacy-policy/`)
            .then((res) => {
                setPrivacyData(res.data.response)
            })
            .catch((err) => {
                console.log("err", err)
            })
    }
    useEffect(() => {
        getData()
    }, [])

    const privacyContent = useRef(null);
    useEffect(() => {
        privacyContent.current.innerHTML = `${privacyData.content}`;
    }, [privacyData]);
    return (
        <section className="main-sec">
            <div className="mb-5 privacy-child-div">
                <Container>
                    <Row className="justify-content-center">
                        <Col lg={10} md={10}>
                            <h2 className="text-center privacy-head">{privacyData.title}</h2>
                            <p className="text-center text-white py-2">{privacyData.description}</p>
                        </Col>
                    </Row>
                </Container>
            </div>
            <Container>
                <Row className="justify-content-center">
                    <Col lg={10} md={10}>
                        <div style={{ minHeight: "500px" }}>
                            <div ref={privacyContent} className="my-4" ></div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>

    )
}
export default Privacypolicy









