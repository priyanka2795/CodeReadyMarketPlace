import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Image } from 'react-bootstrap'
import axios from 'axios';
import { Link } from 'react-router-dom';

const AllBlogs = () => {
    const [blog, setBlog] = useState([]);
    const blogApi = async () => {
        const api = await axios.get(`${process.env.REACT_APP_BASE_URL}/api-superuser/blog-data/`);
        setBlog(api.data.response)
    }
    useEffect(() => {
        blogApi()
        window.scrollTo(0, 0)
    }, [])
    return (
        <>
            <div className='all_blog_section'>
                <div className='single_blog_banner'>
                    <h2 className='h2_title'>Blogs</h2>
                </div>

                <Container>
                    <Row className='my-5'>
                        {
                            blog.map((event, key) => {
                                return (
                                    <Col sm={12} md={6} lg={3} xl={3} key={key}>
                                        <div className='card_main_wrap'>
                                            <figure className='card_img'>
                                                <Image src={`${process.env.REACT_APP_BASE_URL}${event.image}`} alt="card_img" fluid />
                                            </figure>
                                            <article className='card_content'>
                                                <h4 className='h4_title'>{event.heading && event.heading.length > 48 ? `${event.heading.slice(0,48)}...` : event.heading}</h4>
                                                {/* <p>{event.description}</p> */}
                                                <p className='py-2'></p>
                                                <Link to={`/single_blog/${event.blog_slug}`} className='card_btn'>Read More</Link>
                                            </article>
                                        </div>
                                    </Col>
                                )
                            })
                        }
                    </Row>
                </Container>
            </div>
        </>
    )
}

export default AllBlogs
