import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Image } from "react-bootstrap";
import { Link, useNavigate } from 'react-router-dom';
const Banner = () => {
    const navigate = useNavigate()
    const [bannerData, setBannerData] = useState({});
    const [btns, setBtns] = useState(false);
    const datas = async () => {
        const apiData = await axios.get(`${process.env.REACT_APP_BASE_URL}/api-superuser/homepagebanner/`);
        setBannerData(apiData.data.response);
    }
    useEffect(() => {
        datas();
    }, []);
    useEffect(() => {
        let getToken = sessionStorage.getItem("accessToken");
        if (getToken) {
            setBtns(true)
        } else {
            setBtns(false)
        }
    }, [])

const handleRedirect = ()=>{
   if(bannerData){
    navigate(`/view_product/${bannerData.url}`);
   }
}

    return (
        <>
            <section className='banner_wrap'>
                <Container>
                    <Row>
                        <Col sm={6} md={6} lg={6} xl={6}>
                            <div className='banner_text'>
                                <h1 className='h1_title'>{bannerData.heading}</h1>
                                <p>{bannerData.description}</p>
                                <button className='primary_btn ' onClick={handleRedirect} >Get Start</button>
                            </div>
                        </Col>
                        <Col sm={6} md={6} lg={6} xl={6}>
                            <figure className='banner_img'>
                                <Image src={`${process.env.REACT_APP_BASE_URL}/media/_banner/banner_img1.png`} alt='Banner Image' fluid />
                            </figure>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
}

export default Banner