import React, { useState, useEffect, useRef } from 'react';
import { Container, Image, Row, Col } from "react-bootstrap";
import { useLocation, useParams } from 'react-router-dom';
import blogImg from "../../../assets/images/blog/blogImg.png";
import axios from 'axios';
const SingleBlog = () => {
    const [singleBlog, setSingleBlog] = useState([]);
    const location = useLocation();
    const { slugs } = useParams();
   
    
    const singleBlogApi = async () => {
        const api = await axios.get(`${process.env.REACT_APP_BASE_URL}/api-superuser/blog-details/${slugs}`);
        setSingleBlog(api.data.response[0])
    }
    useEffect(() => {
        singleBlogApi()
        window.scrollTo(0,0)
    }, [])

    
    const single = useRef(null);

    useEffect(() => {
      single.current.innerHTML = `${singleBlog.content}`;
    }, [singleBlog]);

    return (
        <>
            <section className='single_blog_wrap'>
                {/* <div className='single_blog_banner'>
                    <h2 className='h2_title'>Blog</h2>
                </div> */}
                <Container>
                    <Row className='justify-content-center'>
                        <Col lg={10}>
                        <div className="single_blog_details">
                        <article className='single_blog_article mb-4'>
                            <h1 className='h3_title mb-2'>{singleBlog.heading}</h1>
                            <p>{singleBlog.description}</p>
                        </article>
                        <figure className='single_blog_img'>
                            <Image src={`${process.env.REACT_APP_BASE_URL}${singleBlog.image}`} alt="blog Img" fluid />
                        </figure>
                       
                        
                        <div ref={single} className="my-4" ></div>
                        
                    </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
}

export default SingleBlog