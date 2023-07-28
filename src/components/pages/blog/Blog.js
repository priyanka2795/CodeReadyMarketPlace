import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Image } from "react-bootstrap"
import { Link } from 'react-router-dom';
import axios from 'axios';

const Blog = () => {
    const [blog, setBlog] = useState([]);
    const blogApi = async () => {
        const api = await axios.get(`${process.env.REACT_APP_BASE_URL}/api-superuser/blog-data/`);
        setBlog(api.data.response)
    }
    useEffect(() => {
        blogApi()
    }, [])
    return (
        <>
            <section className='blog_wrap'>
                <Container>
                    <div className='blog_title'>
                        <h2 className='h2_title'>Our Blogs</h2>
                        <p>Explore Our Blogs on Latest Trends and Technologies</p>
                    </div>
                    <Row className='justify-content-center'>
                        {
                            blog.map((event, key) => {
                                
                                return (
                                    <Col sm={12} md={6} lg={3} xl={3} key={key}>
                                        <div className='card_main_wrap'>
                                            <figure className='card_img'>
                                            <Link to={`/single_blog/${event.blog_slug}`}><Image src={`${process.env.REACT_APP_BASE_URL}${event.image}`} alt="card_img" fluid /></Link>
                                            </figure>
                                            <article className='card_content'>
                                                <h4 className='h4_title'>{event.heading && event.heading.length>48 ? `${event.heading.slice(0,48)}...` : event.heading }</h4>
                                                {/* <p>{event.description}</p> */}
                                                <p className='py-2'></p>
                                                <Link to={`/single_blog/${event.blog_slug}`} className='card_btn'>Read More</Link>
                                            </article>
                                        </div>
                                    </Col>
                                )
                            })
                        }








                        {/* <Col sm={12} md={3} lg={3} xl={3}>
                            <div className='card_main_wrap'>
                                <figure className='card_img'>
                                    <Image src="https://blog-frontend.envato.com/cdn-cgi/image/width=770,quality=80,format=auto/uploads/2022/10/app-design-trends.png" alt="card_img" fluid />
                                </figure>
                                <article className='card_content'>
                                    <h4 className='h4_title'>Heading</h4>
                                    <p>15 App Design Trends For 2023: From a Flat Design to Personalization</p>
                                    <Link to="/" className='card_btn'>Read More</Link>
                                </article>
                            </div>
                        </Col>
                        <Col sm={12} md={3} lg={3} xl={3}>
                            <div className='card_main_wrap'>
                                <figure className='card_img'>
                                    <Image src="https://blog-frontend.envato.com/cdn-cgi/image/width=770,quality=80,format=auto/uploads/2022/10/app-design-trends.png" alt="card_img" fluid />
                                </figure>
                                <article className='card_content'>
                                    <h4 className='h4_title'>Heading</h4>
                                    <p>15 App Design Trends For 2023: From a Flat Design to Personalization</p>
                                    <Link to="/" className='card_btn'>Read More</Link>
                                </article>
                            </div>
                        </Col>
                        <Col sm={12} md={3} lg={3} xl={3}>
                            <div className='card_main_wrap'>
                                <figure className='card_img'>
                                    <Image src="https://blog-frontend.envato.com/cdn-cgi/image/width=770,quality=80,format=auto/uploads/2022/10/app-design-trends.png" alt="card_img" fluid />
                                </figure>
                                <article className='card_content'>
                                    <h4 className='h4_title'>Heading</h4>
                                    <p>15 App Design Trends For 2023: From a Flat Design to Personalization</p>
                                    <Link to="/" className='card_btn'>Read More</Link>
                                </article>
                            </div>
                        </Col> */}
                    </Row>
                </Container>
            </section>
        </>
    )
}

export default Blog