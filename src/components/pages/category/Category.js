import React, { useEffect, useState } from 'react'
import { Container, InputGroup, DropdownButton, Dropdown, Form, Button, Row, Image, Col } from "react-bootstrap"
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import axios from "axios";
import { incrementCart, setStateUpdate, setCookieArr } from '../../../redux/reducers/reducer';
import Star from '../landing/product/Star';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Category = (props) => {
    const cookieArr = useSelector((state)=> state.addProduct.cookieArr)
    // =========================== scroll To Top default =========================
    useEffect(() => {
        props.demo('root')
    }, [])
    // =========================== scroll To Top default =========================
    const stateUpdate = useSelector((state) => state.addProduct.stateUpdate)
    const stars = useSelector((state) => state.addProduct.stars)
    // console.log("stars", stars)

    const { slug } = useParams();
    const location = useLocation()
    const [getCategory, setGetCategory] = useState([])
    const [productBuy, setProductBuy] = useState(true)
    const [loader, setLoader] = useState(false)



    const categoryData = async () => {
        try {
            const categoryApi = await axios.get(`${process.env.REACT_APP_BASE_URL}/get-product/product-category/${location.pathname.split("/")[2]}`)
            setGetCategory(categoryApi.data.response)
        } catch (error) {
            console.log("error", error);
        }
    }
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const [token, setToken] = useState("")

    let sassionAccess = sessionStorage.getItem("accessToken");
    let sassionRefresh = sessionStorage.getItem("refreshToken");

    let sassionAccessR = sessionStorage.getItem("accessTokenr");
    let sassionRefreshR = sessionStorage.getItem("refreshTokenr");

    useEffect(() => {
        if (sassionRefresh) {
            setToken(sassionRefresh)
        } else {
            setToken(sassionRefreshR)
        }
    }, [location])

    // ================================================= add to cart ===============================
    const [CartProductData, setCartProductData] = useState([])
    const [c, setC] = useState(cookieArr)
// console.log(" category cookie----", c)
    function handleChange(e, event) {
        e.stopPropagation();

        setCartProductData(a => [...a, event])
        dispatch(incrementCart(1));
        if(c.length === 0 || c.length !== 0){
            setC(a => [...a, event])
            toast.success('Product added to cart', {
              position: "top-right",
              autoClose: 1800,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
          }
        document.getElementById(event.product_slug).innerText = "View Cart";
        var btn = document.getElementById(event.product_slug)
        btn.addEventListener("click", function () {
            navigate(`/cart_product`);
        })
    }

    const [sendProduct, setSendProduct] = useState("")

    function myfunc() {
        try {
            if (token) {
                if (CartProductData.length !== 0) {
                    for (let i = 0; i < CartProductData.length; i++) {
                        const element = CartProductData[i];
                        setSendProduct(element.id)
                    }
                    var data = new FormData();
                    data.append('product_id', sendProduct.toString());
                    data.append('type', 'create');

                    axios.post(`${process.env.REACT_APP_BASE_URL}/get-order/add-cart-post/`, data, {
                        headers: {
                            "content-type": "application/json",
                            "Authorization": `Bearer ${token}`
                        }
                    })
                        .then(function (response) {
                            // console.log(response);
                            if (response) {
                                dispatch(setStateUpdate(!stateUpdate))
                            }
                            if (response.data.status === 201) {
                            
                            }

                        })
                        .catch(function (err) {
                            console.log(err);
                            // if (err.response.data.response === "You have already added this product on your cart") {
                            //     toast.error('You have already added this product on your cart', {
                            //         position: "top-right",
                            //         autoClose: 2000,
                            //         hideProgressBar: true,
                            //         closeOnClick: true,
                            //         pauseOnHover: true,
                            //         draggable: true,
                            //         progress: undefined,
                            //         theme: "colored",
                            //     });
                            // }
                        });
                }

            } else {
                if (c.length !== 0) {
                    Cookies.set("myData", JSON.stringify(c), { expires: 7, path: '/' });
                    dispatch(setStateUpdate(!stateUpdate))
                    dispatch(setCookieArr(c))
                }

            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        myfunc()
    }, [CartProductData, sendProduct, token])




    const handleRedirect = (id) => {
        navigate(`/view_product/${id}`)
    }
    const handlePreview = (event) => {
        event.stopPropagation();
        window.open("https://infograins.com/");
    }
    const handleBuy = (event) => {
        event.stopPropagation();
        navigate(`/cart_product`)
    }


    useEffect(() => {
        categoryData()
        setLoader(true)
        setTimeout(() => {
            setLoader(false)
        }, 1000)
    }, [location])

    // ******* search filter ********
    const handleFilter = async () => {
        let search = document.getElementById("searchId");
        const filterData = await axios.get(`${process.env.REACT_APP_BASE_URL}/get-product/product-category/${location.pathname.split("/")[2]}?search=${search.value}`)
        setGetCategory(filterData.data.response);
    }
    const handleClickFilter = async () => {
        let search = document.getElementById("searchId");
        const filterData = await axios.get(`${process.env.REACT_APP_BASE_URL}/get-product/product-category/${location.pathname.split("/")[2]}?search=${search.value}`)
        setGetCategory(filterData.data.response);
    }
    // ******* search filter ********


    // ******* low to high and high to low filter ********
    const [filterState, setFilterState] = useState("All Filters")
    const handleLowtoHigh = () => {
        const filterData = getCategory.sort((a, b) => a.product_price - b.product_price)
        setGetCategory([...filterData])
        setFilterState("Low To High")
    }
    const handleHightoLow = () => {
        const filterData = getCategory.sort((a, b) => b.product_price - a.product_price)
        setGetCategory([...filterData])
        setFilterState("High To Low")
    }

    const handleAllFilters = () => {
        categoryData()
        setFilterState("All Filters")
    }
    // ******* low to high and high to low filter ********

  

    return (
        <>
            {
                loader ? <div className="loader_wrap"><div className="loader"></div></div> : <div></div>
            }
            <section className='category_wrap'>
                <Container>
                    <div className='category_search_area'>
                        <InputGroup>
                            <DropdownButton
                                variant="outline-secondary"
                                title={filterState}
                                id="input-group-dropdown-3"
                            >
                                <Dropdown.Item onClick={handleAllFilters}>All Filters</Dropdown.Item>
                                <Dropdown.Item onClick={handleLowtoHigh}>Low To High</Dropdown.Item>
                                <Dropdown.Item onClick={handleHightoLow}>High To Low</Dropdown.Item>
                            </DropdownButton>

                            <Form.Control id="searchId" aria-label="Text input with 2 dropdown buttons" placeholder='Search...' className='input_field' onChange={handleFilter} />
                            <Button className='btn secondary_btn' onClick={handleClickFilter}>
                                Search
                            </Button>
                        </InputGroup>
                    </div>
                    <div className="category_card_wrap">
                        <Row>
                            {
                                getCategory.map((event, i) => {
                                    console.log("event", event.product_name, event.product_name.length)
                                    return (
                                        <Col sm={6} md={6} lg={6} xl={3} xxl={3} key={event.id}>
                                            <div className='product_card' onClick={() => handleRedirect(event.product_slug)}>
                                                <figure className='product_img'>
                                                    <Image src={`${process.env.REACT_APP_BASE_URL}${event.thumbnail}`} alt="Product Img" fluid />
                                                </figure>
                                                <div className='product_details'>
                                                    <div className="product_details_title">
                                                        <h4 className='h4_title'>{event.product_name && event.product_name.length>36 ? `${event.product_name.slice(0,36)}..` : event.product_name }</h4>
                                                        <p>{event.published_by}</p>
                                                        <h3 className='h3_title'>${event.product_price}</h3>
                                                    </div>
                                                    <div className='product_about'>
                                                        <p>{event.product_category}</p>
                                                        {/* <p>{stars.length !== 0 ? (stars[i].product_id === event.id) ? <Star ratings={stars[i].average_rating} /> : "" : ""}</p> */}

                                                    </div>
                                                    <div className='product_live_btn'>
                                                        <button className='btn secondary_btn' id={event.product_slug} onClick={(e) => handleChange(e, event)}>Add To Cart</button>
                                                        <button className='btn primary_btn' onClick={handlePreview}>Live Preview</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </Col>
                                    )
                                })
                            }
                        </Row>
                    </div>
                </Container>

            </section>

            <ToastContainer
                position="top-right"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </>
    )
}

export default Category