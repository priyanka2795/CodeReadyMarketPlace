import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Image } from "react-bootstrap";
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import Star from './Star';
import { setStars } from '../../../../redux/reducers/reducer';

const Product = (props) => {
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const addCart = useSelector((state) => state.addProduct.addCart);
    const [starRating, setStarRating] = useState([])
    // console.log("starRating===", starRating)
    // console.log("products", props.data)
    // const handleChange = async (e, productSlug, id) => {
    // e.stopPropagation();
    // document.getElementById(productSlug).innerText = "Buy now";
    // var btn = document.getElementById(productSlug);
    // dispatch(incrementCart(1));
    // btn.addEventListener("click", function () {
    //     navigate(`/view_product/${productSlug}`);
    // })
    // var x = btn.classList[1]

    // var cartPrice = document.getElementById(`cartPrice${id}`).innerHTML;
    // let cartHeading = document.getElementById(`cartHeading${id}`).innerHTML;
    // let cartDiss = document.getElementById(`cartDiss${id}`).innerHTML;
    // let cartCategory = document.getElementById(`cartCategory${id}`).innerHTML;
    // var nweArr = {
    //     "cartPrice": cartPrice,
    //     "cartHeading": cartHeading,
    //     "cartDiss": cartDiss,
    //     "cartCategory": cartCategory
    // }
    // setAddToCart([...addToCart, nweArr]);
    // Cookies.set("addToCart", JSON.stringify(addToCart), { expires: 7, path: '/' });
    // console.log("addToCart", addToCart);
    // var myId = id;
    // if (cartId) {
    //     setCartId([...cartId, myId])
    // }
    // const api = await axios.get(`${process.env.REACT_APP_BASE_URL}/get-product/cart-product/?product_id=[${cartId}]`);
    // }
    if (addCart !== 0) {
        sessionStorage.setItem("addCart", addCart);
    }
    const handleRedirect = (id) => {
        navigate(`/view_product/${id}`);
    }
    const handlePreview = (event) => {
        event.stopPropagation();
        window.open("https://infograins.com/");
    }

    const getRatings = () => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/get-product/all-product-userrating`)
            .then((res) => {
                if (res) {
                    setStarRating(res.data.response)
                    dispatch(setStars(res.data.response))
                }
            })
            .catch((err) => {
                console.log("star err", err)
            })
    }
    useEffect(() => {
        getRatings()
    }, [])

    // console.log("show", props.show)

    return (
        <>
            <section className='product_wrap'>
                <Container>
                    <div className='product_title'>
                        <h3 className='h3_title'>{props.title}</h3>
                    </div>
                    <Row>
                        {
                            props.data.map((event, i) => {

                                return (
                                    <Col sm={6} md={6} lg={6} xl={3} xxl={3} key={event.id}>
                                        <div className='product_card' onClick={() => handleRedirect(event.product_slug)}>
                                            <figure className='product_img'>
                                                <Image src={`${process.env.REACT_APP_BASE_URL}${event.thumbnail}`} alt="Product Img" fluid />
                                            </figure>
                                            <div className='product_details'>
                                                <div className="product_details_title">
                                                    <h4 className='h4_title' id={`cartHeading${event.id}`}>{event.product_name && event.product_name.length>36 ? `${event.product_name.slice(0,36)}..` : event.product_name }</h4>
                                                    <p id={`cartDiss${event.id}`}>{event.published_by}</p>
                                                    <h3 className='h3_title' id={`cartPrice${event.id}`}>${event.product_price}</h3>
                                                </div>
                                                <div className='product_about'>
                                                    <p id={`cartCategory${event.id}`}>{event.product_category}</p>

                                                    <p>
                                                        {/* {starRating.length !== 0 ? (starRating[i].product_id === event.id) ? <Star ratings={starRating[i].average_rating} /> : "" : ""} */}
                                                        {/* <Star ratings={starRating[i].average_rating} /> */}
                                                    </p>
                                                </div>
                                                <div className='product_live_btn'>
                                                    {
                                                        props.show ?
                                                            <button className='disabled_btn'>Add To Cart</button>
                                                            :
                                                            <button className='btn secondary_btn' id={event.product_slug} onClick={(e) => props.productDetail(e, event)} >Add To Cart</button>

                                                    }

                                                    <button className='btn primary_btn' onClick={handlePreview}>Live Preview</button>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                )


                            })
                        }
                    </Row>
                    <div className='all_products_btn'>
                        <Link to={`/category/${props.categoryId}`} className='secondary_btn' style={{minWidth:"200px"}}>View All</Link>
                    </div>
                </Container>
            </section>

        </>
    )
}

export default Product;

