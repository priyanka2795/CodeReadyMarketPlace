import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Spinner } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'
import Product from './SubComponent/Product'
import { useDispatch } from 'react-redux'
import { setAllUploadItems } from '../../../../redux/reducers/reducer'
function MyProducts() {
    const dispatch = useDispatch()
    const location = useLocation()
    const [token, setToken] = useState("")
    const [allItems, setAllItems] = useState([])
    const [loader, setLoader] = useState(true)

    useEffect(() => {
        var getSession = sessionStorage.getItem("accessToken");
        var getRegisterSession = sessionStorage.getItem("accessTokenr");
        if (getSession) {
            setToken(getSession)
        } else {
            setToken(getRegisterSession)
        }
    }, [location])



    const getUploadedData = async () => {

        const config = {
            headers: {
                "Accept": "application/json, text/plain",
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`,
            }
        }
        await axios.get(`${process.env.REACT_APP_BASE_URL}/get-product/get-users-created-product/`, config)
            .then((res) => {
                
                const apiData = res.data.response.reverse();
                setAllItems(apiData)
                dispatch(setAllUploadItems(apiData))
                setLoader(false)
            })
            .catch((err) => {
                console.log("err", err);
            })


    }

    useEffect(() => {
        if (token) {
            getUploadedData()
        }
    }, [token])


    
    return (
        <>
            <div className="myproduct_section">
                <Container>
                    <Row className='justify-content-center'>

                        <Col lg={12}>
                            <div className="myproduct_content">
                                <Row>
                                    <Col lg={9} md={12}>
                                        <div className="item_info mb-5">
                                            <div className="recent_uploaded_item">
                                                <h3>Recent Uploaded Items</h3>
                                                {allItems.length > 3 ? <Link className='secondary_btn' to="/all_uploaded_items">View All</Link> : <div></div>}

                                            </div>

                                            <div className="item_info_content">
                                                <Row>
                                                    {
                                                        loader ?
                                                            <div className="loader_div text-center py-5">
                                                                <Spinner animation="border" />
                                                            </div>
                                                            :
                                                            allItems.length == 0 ?
                                                                <div className='no_item_found'>No Recent Uploaded Items</div>
                                                                :
                                                                allItems.slice(0, 3).map((e, i) => {
                                                                    return (
                                                                        <Col lg={4} md={6} key={i}>
                                                                            <Product img={`${process.env.REACT_APP_BASE_URL}${e.thumbnail}`} name={e.product_name} desc={e.product_description} id={e.user_uid} slug={e.product_slug} verified={e.verified} />
                                                                        </Col>
                                                                    )
                                                                })

                                                    }


                                                </Row>
                                            </div>
                                        </div>


                                        <div className="item_info">
                                            <h3>Selled Items</h3>
                                            <div className="item_info_content">
                                                <Row>
                                                    <Col lg={4} md={6} >
                                                        <Product img="https://cdn.dribbble.com/users/6082996/screenshots/15208151/media/926e479a2e375e683d96671d84fc2d27.jpg?compress=1&resize=400x300&vertical=top" name="Category Name Text1" desc="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odit quam enim dicta ipsum ullam blanditiis excepturi !" verified={false} />
                                                    </Col>
                                                    <Col lg={4} md={6}>
                                                        <Product img="https://cdn.dribbble.com/users/1592944/screenshots/14293996/media/6caf1b42f5e5a9aa31d9271318c3f5ee.png?compress=1&resize=400x300" name="Category Name Text2" desc="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odit quam enim dicta ipsum ullam blanditiis excepturi !" verified={false} />
                                                    </Col>
                                                    <Col lg={4} md={6}>
                                                        <Product img="https://img.freepik.com/free-vector/cartoon-web-design-background_52683-70879.jpg?w=2000" name="Category Name Text3" desc="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odit quam enim dicta ipsum ullam blanditiis excepturi !" verified={false} />
                                                    </Col>
                                                </Row>
                                            </div>
                                        </div>

                                    </Col>
                                    <Col lg={3} md={12}>
                                        <div className="item_uplaod_div">
                                            <h5>Lorem ipsum dolor sit amet consectetur adipisicing elit. lorem </h5>
                                            <p>Lorem ipsum dollar sit amet Lorem ipsum dollar sit amet Lorem ipsum dollar sit amet</p>

                                            <div className="upload_item_content">
                                                <h6 className="title">Upload your  item</h6>
                                                <div className="text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus odit modi maxime quo tenetur recusandae voluptas cumque </div>
                                                <div className="upload_btn">
                                                    <Link to="/content/upload" className='primary_btn'>Upload  item</Link>
                                                </div>
                                            </div>

                                            <div className="upload_item_content">
                                                <h6 className="title">Your Profile</h6>
                                                <div className="text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus odit modi maxime quo tenetur recusandae voluptas cumque Lorem ipsum dolor sit amet </div>
                                                <div className="upload_btn">
                                                    <button className='primary_btn'>Take me to my profile</button>
                                                </div>
                                            </div>

                                            <div className="upload_item_content">
                                                <h6 className="title">Tax Requirements</h6>
                                                <div className="text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque id vel, velit facilis iste veritatis iusto numquam sed culpa laborum temporibus sunt voluptates neque vitae, vero adipisci ad quae magnam?</div>

                                            </div>
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

export default MyProducts