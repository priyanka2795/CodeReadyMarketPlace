import React, { useState, useEffect, useRef } from 'react';
import { Container, Navbar, Image, Tabs, Tab, Form, Dropdown } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { HiShoppingCart } from "react-icons/hi";
import logo from "../../assets/images/logo/logo2.png"
import { useSelector, useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import SidebarMenu from 'react-bootstrap-sidebar-menu';
import { AiFillCaretDown } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa"
import axios from "axios";
import { setAllMainCategory, setStateUpdate, setCookieArr, setDeleteState } from '../../redux/reducers/reducer';

const Header = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [showDropdown, setShowDropdown] = useState(false);
    const [userName, setUserName] = useState("")
    const deleteState = useSelector((state) => state.addProduct.deleteState)

    // =========================== Add to card Cookis Data Manage =========================

    const stateUpdate = useSelector((state) => state.addProduct.stateUpdate)
    const addCart = useSelector((state) => state.addProduct.addCart);
    const count = useRef(null);
    let sassionAccess = sessionStorage.getItem("accessToken");
    let sassionRefresh = sessionStorage.getItem("refreshToken");
    // useEffect(() => {
    //     if (addCart !== 0) {
    //         const getProductCount = Cookies.get("productCount")

    //         if (getProductCount !== null || getProductCount !== undefined) {
    //             const updateCart = Number(getProductCount) + 1

    //             Cookies.set("productCount", updateCart, { expires: 7, path: '/' })
    //             count.current.innerHTML = updateCart
    //         }
    //         if (getProductCount === undefined) {
    //             Cookies.set("productCount", addCart, { expires: 7, path: '/' })
    //             count.current.innerHTML = addCart
    //         }
    //     }
    //     const getProductCount = Cookies.get("productCount");
    //     if (getProductCount !== null) {
    //         const updateCart = Number(getProductCount);
    //         if (isNaN(updateCart) === true) {
    //              count.current.innerHTML = 0;
    //         } else {
    //              count.current.innerHTML = updateCart;
    //         }
    //     }

    // }, [addCart])

    // =========================== // Add to card Cookis Data Manage =========================
    // =================== session manage ===========================
    const [sessioncheck, setSessioncheck] = useState(true);
    const location = useLocation()
    useEffect(() => {
        var getLoggedUser = sessionStorage.getItem("loggedInUser")
        var getSession = sessionStorage.getItem("accessToken");
        var getRegisteredData = JSON.parse(localStorage.getItem("registerdData"))

        if (!getSession) {
            setSessioncheck(true)
            if (getRegisteredData) {
                setSessioncheck(false)
                setUserName(getRegisteredData.username)
            } else {
                setSessioncheck(true)
            }

        } else {
            setSessioncheck(false)
            setUserName(getLoggedUser)
        }


    }, [location, stateUpdate])


    const heandleOut = () => {
        const emptyArr = []
        setSessioncheck(true)
        sessionStorage.clear("accessToken")
        sessionStorage.clear("refreshToken")
        localStorage.clear("registerdData")
        Cookies.set("myData", JSON.stringify(emptyArr));
        dispatch(setStateUpdate(!stateUpdate))
        dispatch(setCookieArr(emptyArr))
        Cookies.set('productCount', 0, { expires: 7, path: '/' })
        navigate("/")
    }


    // =================== // session manage =========================== 

    function handleShow() {
        document.getElementById("mySidenav").style.width = "250px";
    }

    function handleHide() {
        document.getElementById("mySidenav").style.width = "0";
    }
    // ============================= main header api =============================

    const [mainheader, setMainheader] = useState([])
    const mainHeaderData = async () => {
        try {
            const api = await axios.get(`${process.env.REACT_APP_BASE_URL}/get-product`)
            const apiData = api.data.response;
            const reverceData = apiData.reverse();

            setMainheader(reverceData)
            dispatch(setAllMainCategory(apiData.reverse()))
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        mainHeaderData()
    }, [])


    const getPath = location.pathname.split("/").pop()

    // ******* get cart product ******** 
    const [token, setToken] = useState("")
    let sassionAccessR = sessionStorage.getItem("accessTokenr");
    let sassionRefreshR = sessionStorage.getItem("refreshTokenr");
    const [addToCartsss, setAddToCart] = useState([])
    const [cookieProduct, setCookieProduct] = useState([])

    useEffect(() => {
        if (sassionRefresh) {
            setToken(sassionRefresh)
        } else {
            setToken(sassionRefreshR)
        }
    }, [location])
    const myData = async () => {

        if (token) {
            try {
                const api = await axios.get(`${process.env.REACT_APP_BASE_URL}/get-order/getcartproduct/`, {
                    headers: {
                        "content-type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });
                setAddToCart(api.data.response)
            } catch (error) {

            }
        } else {
            try {
                const addToCart = JSON.parse(Cookies.get("myData"));
                setCookieProduct(addToCart);

            } catch (error) {

            }
        }
    }
    useEffect(() => {
        myData()
    }, [location, token, stateUpdate]);

    // ******* get cart product ******** 

    useEffect(() => {
        if (deleteState == true || deleteState == false) {
            setCookieProduct([])
        }
    }, [deleteState])

  // ============================= // main header api =============================
    return (
        <>
            <header className='app_header' id="top">
                <Navbar expand="lg">
                    <Container fluid>
                        {/* mobile nav bar */}
                        <div className='mobile_header'>
                            <div id="mySidenav" className="sidenav">
                                <a href="#" className="closebtn" onClick={handleHide}>&times;</a>
                                <div className='mobile_navbar'>
                                    <SidebarMenu>
                                        <SidebarMenu.Body>
                                            {
                                                mainheader.map((e, i) => {
                                                    return (
                                                        <SidebarMenu.Sub key={i}>
                                                            <SidebarMenu.Sub.Toggle>
                                                                <SidebarMenu.Nav.Icon />
                                                                <SidebarMenu.Nav.Title>
                                                                    {e.category}<AiFillCaretDown />
                                                                </SidebarMenu.Nav.Title>
                                                            </SidebarMenu.Sub.Toggle>
                                                            {e.category_list.map((event, index) => {
                                                                const subCategory = encodeURI(event.subcategory)
                                                                return (
                                                                    <SidebarMenu.Sub.Collapse key={index}>
                                                                        <SidebarMenu.Nav>
                                                                            <SidebarMenu.Nav.Link>
                                                                                <SidebarMenu.Nav.Title>
                                                                                <Link to={`/category/${event.subcategory}`} className={getPath === subCategory ? "dropbtn active" : "dropbtn"} onClick={handleHide} style={{padding: "7px 5px 0px 5px"}}>{event.subcategory}</Link>
                                                                                </SidebarMenu.Nav.Title>
                                                                            </SidebarMenu.Nav.Link>
                                                                        </SidebarMenu.Nav>
                                                                    </SidebarMenu.Sub.Collapse>
                                                                )
                                                            })}
                                                        </SidebarMenu.Sub>
                                                    )
                                                })
                                            }
                                        </SidebarMenu.Body >
                                    </SidebarMenu>
                                </div>
                            </div>
                            <span style={{ fontSize: "30px", cursor: "pointer", color: "#000" }} onClick={handleShow}>&#9776;</span>
                        </div>
                        {/* // mobile nav bar */}
                        <Link to="/">
                            <Image className="hero_logo" src={logo} alt="logo" fluid />
                        </Link>
                        <Navbar.Toggle aria-controls="navbarScroll" />
                        <Navbar id="navbarScroll">
                            <div className='right_header'>
                                <Link to="/join" className='header_link'>Start Selling</Link>
                                {sessioncheck ? <Link to="/sign_in" className='header_link userIcn'><FaUserCircle /></Link> : "" }
                                
                                {
                                    sessioncheck ? <Link to="/sign_in" className='header_link textHide'>Join Now</Link> :
                                        <div className='profile_btn_wrap'>
                                            <Dropdown onMouseLeave={() => setShowDropdown(false)} onMouseOver={() => setShowDropdown(true)}>
                                                <Dropdown.Toggle className="main-style" id="dropdown-basic">{userName}
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu show={showDropdown}>
                                                    <div className='logout_btn'><Link to="/author_dashboard">My Profile</Link></div>
                                                    <div className='logout_btn'><Link to="/earnings">Earnings</Link></div>
                                                    <div className='logout_btn'><Link to="/downloads">Downloads</Link></div>
                                                    <div className='logout_btn'><Link to="/accounts/payouts">Payouts</Link></div>
                                                    <div className='logout_btn' onClick={heandleOut}>Log Out</div>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </div>
                                }
                                {/* <Link to="/cart_product" className='cart_btn' ><HiShoppingCart /><span ref={count}>0</span></Link> */}
                                <Link to="/cart_product" className='cart_btn' ><HiShoppingCart /><span>{token ? addToCartsss.length : cookieProduct.length}</span></Link>
                            </div>
                        </Navbar>
                    </Container>
                </Navbar>
                <Container>
                    <div className='tab_header_wrap'>
                        <Tabs
                            defaultActiveKey="Web Themes and Templates"
                            transition={true}
                            id="noanim-tab-example"
                        >
                            {
                                mainheader.map((e) => {
                                    return (
                                        <Tab eventKey={e.category} key={e.id} title={e.category}>
                                            <div className="inner_nav">
                                                <ul>
                                                    {
                                                        e.category_list.map((event) => {
                                                            const subCategory = encodeURI(event.subcategory)
                                                            return (
                                                                <div className="dropdown" key={event.id}>
                                                                    <Link to={`/category/${event.subcategory}`} className={getPath === subCategory ? "dropbtn active" : "dropbtn"} >{event.subcategory}</Link>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </ul>
                                            </div>
                                        </Tab>
                                    )
                                })
                            }
                        </Tabs>
                    </div>
                </Container>
            </header>

        </>
    )
}


export default Header