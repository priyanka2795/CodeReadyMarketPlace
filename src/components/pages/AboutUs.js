import axios from 'axios'
import React, { useEffect, useState, useRef } from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const AboutUs = () => {
    const [aboutData, setAboutData] = useState([])

    useEffect(() => {
        window.scrollTo(0, 0)
    })
    const getData = async () => {
        await axios.get(`${process.env.REACT_APP_BASE_URL}/api-superuser/About-us/`)
            .then((res) => {
                setAboutData(res.data.response)
            })
            .catch((err) => {
                console.log("err", err)
            })
    }

    useEffect(() => {
        getData()
    }, [])

    const aboutContent = useRef(null);
    useEffect(() => {
        aboutContent.current.innerHTML = `${aboutData.content}`;
    }, [aboutData]);

   
   
    return (
        <>
            <div className="main_sec">
                <div className="mb-5 privacy-child-div">
                    <Container>
                        <Row className="justify-content-center">
                            <Col lg={10} md={10}>
                                <h2 className="text-center privacy-head">{aboutData.title}</h2>
                                <p className='text-center text-white py-2'>{aboutData.description}</p>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <Container>
                    <Row className="justify-content-center">
                        <Col lg={10} md={10}>
                            <div style={{ minHeight: "500px" }}>
                                <div ref={aboutContent} className="my-4" ></div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}

export default AboutUs

