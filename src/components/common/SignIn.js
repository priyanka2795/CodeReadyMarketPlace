import React, { useState, useEffect } from 'react'
import Cookies from 'js-cookie';
import { Row, Col, Image, Container, Form, FloatingLabel, Button } from "react-bootstrap";
import GoogleLogin from '@leecheuk/react-google-login';
import { useForm } from "react-hook-form";
import axios from "axios";
import signins from "../../assets/images/background/signin.png"
import { useNavigate, useLocation } from 'react-router-dom';
import { Link } from "react-router-dom"
import { loadGapiInsideDOM } from "gapi-script";
import { useSelector, useDispatch } from 'react-redux';
import { setStateUpdate } from '../../redux/reducers/reducer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignIn = () => {
    const naviget = useNavigate()
    const location = useLocation()
    const [loader, setLoader] = useState(false)
    const dispatch = useDispatch()
    const stateUpdate = useSelector((state) => state.addProduct.stateUpdate)
    const cookieArr = useSelector((state) => state.addProduct.cookieArr)

    // add cart start-----
    const [c, setC] = useState(cookieArr)
    const [sendProduct, setSendProduct] = useState([])
    useEffect(() => {
        if (c.length !== 0) {
            for (let i = 0; i < c.length; i++) {
                const element = c[i];
                setSendProduct(a => [...a, element.id])
            }
        }
    }, [])

    function myfunc(token) {
        try {
            if (token) {
                for (let i = 0; i < sendProduct.length; i++) {
                    var data = new FormData();
                    data.append('product_id', sendProduct[i].toString());
                    data.append('type', 'create');

                    axios.post(`${process.env.REACT_APP_BASE_URL}/get-order/add-cart-post/`, data, {
                        headers: {
                            "content-type": "application/json",
                            "Authorization": `Bearer ${token}`
                        }
                    })
                        .then(function (response) {
                            console.log("add product res---", response);
                            if (response.data.status === 201) {
                                const emptyArr = []
                                Cookies.set("myData", JSON.stringify(emptyArr));
                                dispatch(setStateUpdate(!stateUpdate))
                                setTimeout(() => {
                                    naviget("/cart_product")
                                    const body = document.body;
                                    const scrollY = body.style.top;
                                    body.style.position = 'relative';
                                    setLoader(false)
                                }, 1000)
                            }
                        })
                        .catch(function (err) {
                            console.log("add product err", err);
                            naviget("/cart_product")
                        });
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
    //-------add cart end-------

    const [emailErr, setEmailErr] = useState("");
    const [apiEmailErr, setApiEmailErr] = useState("");

    useEffect(() => {
        (async () => {
            await loadGapiInsideDOM();
        })();
    });

    const onSuccess = (res) => {
        if (res) {
            // let random = Math.random().toString(36).slice(10)
            // let name = res.profileObj.givenName
            // let username = `${name}${random}`

            let formdata = new FormData()
            formdata.append("username", res.profileObj.givenName)
            formdata.append("email", res.profileObj.email)
            formdata.append("first_name", res.profileObj.givenName)
            formdata.append("last_name", res.profileObj.familyName)
            formdata.append("google_id", res.profileObj.googleId)
            axios.post(`${process.env.REACT_APP_BASE_URL}/api-auth/google_register_login/`, formdata,
                {
                    headers: {
                        "Accept": "application/json, text/plain",
                        'Content-Type': 'application/json'
                    },
                }).then(res => {

                    // ==================== sassion ==========================
                    var accessToken = res.data.response.access;
                    var refreshToken = res.data.response.refresh;
                    sessionStorage.setItem("accessToken", accessToken);
                    sessionStorage.setItem("refreshToken", refreshToken);

                    // ==================== // sassion ========================== 
                    // ==================== sassion ==========================
                    var accessToken = res.data.response.access
                    sessionStorage.setItem("loggedInUser", res.data.response.username);
                    localStorage.setItem("name", res.data.response.first_name);
                    localStorage.setItem("sirname", res.data.response.last_name)
                    // ==================== // sassion ========================== 

                    // ====================  scroll stop popup ====================
                    const body = document.body;
                    const scrollY = body.style.top;
                    body.style.position = 'fixed';
                    setLoader(true)
                    // ==================== // scroll stop popup ====================

                    if (c.length !== 0) {
                        myfunc(refreshToken)
                    } else {
                        setTimeout(() => {
                            naviget("/")
                            const body = document.body;
                            const scrollY = body.style.top;
                            body.style.position = 'relative';
                            setLoader(false)
                        }, 1000)
                    }

                }).catch(err => {
                    console.log(err)
                })
        }

    };
    const onFailure = (err) => {
        console.log('failed:', err);
    };
    const handleSwitch = () => {
        document.querySelector('.cont').classList.toggle('s--signup');
    }
    // const [checkBox, setCheckbox] = useState(false)
    //  ================================== form validation ==================================
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { register: register2, reset: reset2, formState: { errors: errors2 }, handleSubmit: handleSubmit2, } = useForm();
    const onSubmit = (data) => {
        setLoader(true)
        axios.post(`${process.env.REACT_APP_BASE_URL}/api-auth/login/`, {
            email: data.email,
            password: data.password,
            headers: {
                "Accept": "application/json, text/plain",
                'Content-Type': 'application/json'
            },
        }).then(res => {
            console.log("res login", res)
            // ==================== sassion ==========================
            var accessToken = res.data.access;
            var refreshToken = res.data.refresh;
            sessionStorage.setItem("accessToken", accessToken);
            sessionStorage.setItem("refreshToken", refreshToken);

            // ==================== // sassion ========================== 
            // ==================== sassion ==========================
            var accessToken = res.data.access
            sessionStorage.setItem("loggedInUser", res.data.username);
            localStorage.setItem("name", res.data.first_name);
            localStorage.setItem("sirname", res.data.last_name)
            // ==================== // sassion ========================== 

            // ====================  scroll stop popup ====================
            const body = document.body;
            const scrollY = body.style.top;
            body.style.position = 'fixed';
            setLoader(false)
            toast.success('You have login successfully', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            reset();
            // ====================  // scroll stop popup ====================

            // ====================  navigate page ==================== 
            if (c.length !== 0) {
                myfunc(refreshToken)
            } else {
                setTimeout(() => {
                    naviget("/")
                    const body = document.body;
                    const scrollY = body.style.top;
                    body.style.position = 'relative';
                    setLoader(false)
                }, 3000)
            }

            // ==================== // navigate page ==================== 
            setApiEmailErr("")
        }).catch(err => {
            console.log("err", err);
            setLoader(false)
            var error = err.response.data.status;
            if (error === 401) {
                setApiEmailErr("Email or password is incorrect!")
            } else {
                console.log("false");
                setApiEmailErr("")
            }
        })

    }
    const onSubmitEmail = (data) => {
        setLoader(true)
        axios.post(`${process.env.REACT_APP_BASE_URL}/api-auth/register/`, {
            username: data.uname1,
            password: data.password1,
            email: data.email1,
            first_name: data.name1,
            last_name: data.lname1,
            headers: {
                "Accept": "application/json, text/plain",
                'Content-Type': 'application/json'
            },
        }).then(res => {
            reset2();
            console.log("register res", res)
            // ==================== sassion ==========================
            var accessToken = res.data.token.access;
            var refreshToken = res.data.token.refresh;
            sessionStorage.setItem("accessToken", accessToken);
            sessionStorage.setItem("refreshToken", refreshToken);

            localStorage.setItem("registerdData", JSON.stringify(res.data))
            localStorage.setItem("name", res.data.first_name);
            localStorage.setItem("sirname", res.data.last_name)
            sessionStorage.setItem("loggedInUser", res.data.username);
            // ==================== // sassion ========================== 

            // ====================  scroll stop popup ====================
            const body = document.body;
            const scrollY = body.style.top;
            body.style.position = 'fixed';
            setLoader(false)
            toast.success('You have register successfully', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            // ==================== // scroll stop popup ====================

            // ==================== navigate page ====================
            if (c.length !== 0) {
                myfunc(refreshToken)
            } else {
                setTimeout(() => {
                    naviget("/")
                    const body = document.body;
                    const scrollY = body.style.top;
                    body.style.position = 'relative';
                    setLoader(false)
                }, 3000)
            }
            // ==================== // navigate page ==================== 

            setEmailErr("")
        }).catch(err => {
            console.log(err)
            setLoader(false)
            var apiError = err.response.status
            if (apiError === 400) {
                setEmailErr(err.response.data.email[0])

            } else {
                setEmailErr("")
            }
        })
    }


    //  ================================== // form validation ==================================

    //--------------login signup state--------------
    const [showLogin, setShowLogin] = useState(true)
    const gotoSignUp = ()=>{
        setShowLogin(false)
    }
    const gotoSignIn = ()=>{
        setShowLogin(true)
    }
    //--------------login signup state--------------

    return (
        <>
            {
                loader ? <div className="loader_wrap"><div className="loader"></div></div> : <div></div>
            }
            <section className='signIn_wrap'>
                <Container fluid>
                    <Row>
                        <Col lg={5}>
                            <figure className='signIn_img'>
                                <Image src={signins} atl="sign in Img" fluid />
                            </figure>
                        </Col>
                        <Col lg={7}>

                            <Row className='justify-content-center'>
                                <Col lg={8}>
                                    <div className='sign_up_new'>
                                        {
                                            showLogin ? 
                                    
                                        <form className="form sign-in sign-up" key={1} onSubmit={handleSubmit(onSubmit)}>
                                            <h2>Welcome</h2>
                                            <div className='google_btn'>
                                                <GoogleLogin
                                                    clientId="951595366519-jecju6v3ju2l072eh4ogngouuuo12h6t.apps.googleusercontent.com"
                                                    buttonText="Sign in with Google"
                                                    onSuccess={onSuccess}
                                                    onFailure={onFailure}
                                                    cookiePolicy={'single_host_origin'}
                                                />
                                            </div>
                                            <Row>
                                                <Col sm={12} md={12} lg={12} xl={12}>
                                                    <FloatingLabel controlId="floatingInput" label="Email address" >
                                                        <Form.Control type="email" placeholder='Email Id' className='input_field mt-3'  {...register("email", {
                                                            required: 'Email is required',
                                                            pattern: {
                                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                                message: "Invalid email address"
                                                            }
                                                        })} />
                                                    </FloatingLabel>
                                                    {errors.email && (<small className='text-danger'>{errors.email.message}</small>)}
                                                </Col>
                                                <Col sm={12} md={12} lg={12} xl={12}>
                                                    <FloatingLabel controlId="floatingPassword1" label="Password">
                                                        <Form.Control type="password" placeholder='Password' className='input_field mt-3' {...register("password", {
                                                            required: 'Password is required', minLength: {
                                                                value: 6,
                                                                message: "Minimum required password is 6 digit"
                                                            },
                                                            maxLength: {
                                                                value: 15,
                                                                message: "Maximum required password is 15 digit"
                                                            },
                                                            validate: (value) => {
                                                                return (
                                                                    [/[a-z]/, /[A-Z]/, /[0-9]/, /[^a-zA-Z0-9]/].every((pattern) =>
                                                                        pattern.test(value)
                                                                    ) || "Must include lower, upper, number, and special chars"
                                                                );
                                                            },
                                                        })} />
                                                    </FloatingLabel>
                                                    {errors.password && (<small className='text-danger'>{errors.password.message}</small>)}
                                                </Col>
                                            </Row>
                                            <div className='forgot_div_signup mt-3'>
                                                <h6>Don't have an account? Please <span onClick={gotoSignUp}>Sign up!</span></h6>
                                                <Link to='/forgot' className="forgot-pass">Forgot password?</Link>
                                            </div>

                                            <small className='text-danger' style={{ display: "block", marginTop: "20px" }}>{apiEmailErr}</small>
                                            <button type="submit" className="secondary_btn">Sign In</button>
                                        </form>
                                   :
                                        <Form className='form sign-up' key={2} onSubmit={handleSubmit2(onSubmitEmail)}>
                                            <h2>Create your Account</h2>
                                            <div className='google_btn'>
                                                <GoogleLogin
                                                    clientId="951595366519-jecju6v3ju2l072eh4ogngouuuo12h6t.apps.googleusercontent.com"
                                                    buttonText="Sign in with Google"
                                                    onSuccess={onSuccess}
                                                    onFailure={onFailure}
                                                    cookiePolicy={'single_host_origin'}

                                                />
                                            </div>
                                            <Row>
                                                <Col sm={12} md={12} lg={12} xl={12}>
                                                    <FloatingLabel controlId="floatingInput1" label="Email address" >
                                                        <Form.Control type="email" placeholder='Email Id' className='input_field mt-3'  {...register2("email1", {
                                                            required: 'Email is required',
                                                            pattern: {
                                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                                message: "Invalid email address"
                                                            }
                                                        })} />
                                                    </FloatingLabel>
                                                    {
                                                        emailErr ?
                                                            <small className='text-danger'>{emailErr}</small> :
                                                            (errors2.email1 && (<small className='text-danger'>{errors2.email1.message}</small>))
                                                    }


                                                </Col>
                                                <Col sm={6} md={6} lg={6} xl={6}>
                                                    <FloatingLabel controlId="floatingName" label="First Name" >
                                                        <Form.Control type="text" placeholder='First Name' className='input_field mt-3'
                                                            {...register2("name1", {
                                                                required: 'First name is required',
                                                                minLength: {
                                                                    value: 3,
                                                                    message: "The minimum length for this field is 3 characters"
                                                                },
                                                                maxLength: {
                                                                    value: 15,
                                                                    message: "The Maximum length for this field is 15 characters"

                                                                },
                                                            })} />
                                                    </FloatingLabel>
                                                    {errors2.name1 && (<small className='text-danger'>{errors2.name1.message}</small>)}
                                                </Col>
                                                <Col sm={6} md={6} lg={6} xl={6}>
                                                    <FloatingLabel controlId="floatingLname" label="Last Name" >
                                                        <Form.Control type="text" placeholder='Last Name' className='input_field mt-3'
                                                            {...register2("lname1", {
                                                                required: 'Last name is required',
                                                                minLength: {
                                                                    value: 3,
                                                                    message: "The minimum length for this field is 3 characters"
                                                                },
                                                                maxLength: {
                                                                    value: 12,
                                                                    message: "The maximum length for this field is 12 characters"

                                                                },
                                                            })} />
                                                    </FloatingLabel>
                                                    {errors2.lname1 && (<small className='text-danger'>{errors2.lname1.message}</small>)}
                                                </Col>
                                                <Col sm={6} md={6} lg={6} xl={6}>
                                                    <FloatingLabel controlId="floatingUname" label="User Name" >
                                                        <Form.Control type="text" placeholder='User Name' className='input_field mt-3'
                                                            {...register2("uname1", {
                                                                required: 'User name is required',
                                                                minLength: {
                                                                    value: 3,
                                                                    message: "The minimum length for this field is 3 characters"
                                                                },
                                                                maxLength: {
                                                                    value: 12,
                                                                    message: "The maximum length for this field is 12 characters"

                                                                },
                                                            })} />
                                                    </FloatingLabel>
                                                    {errors2.uname1 && (<small className='text-danger'>{errors2.uname1.message}</small>)}
                                                </Col>
                                                <Col sm={6} md={6} lg={6} xl={6}>
                                                    <FloatingLabel controlId="floatingPassword" label="Password">
                                                        <Form.Control type="password" placeholder='Password' className='input_field mt-3' {...register2("password1", {
                                                            required: 'Password is required', minLength: {
                                                                value: 6,
                                                                message: "Minimum required password is 6 digit"
                                                            },
                                                            maxLength: {
                                                                value: 12,
                                                                message: "Maximum required password is 12 digit"
                                                            },
                                                            validate: (value) => {
                                                                return (
                                                                    [/[a-z]/, /[A-Z]/, /[0-9]/, /[^a-zA-Z0-9]/].every((pattern) =>
                                                                        pattern.test(value)
                                                                    ) || "Must include lower, upper, number, and special chars"
                                                                );
                                                            },
                                                        })} />
                                                    </FloatingLabel>
                                                    {errors2.password1 && (<small className='text-danger'>{errors2.password1.message}</small>)}
                                                </Col>
                                            </Row>
                                            {/* <Form.Group className="my-3" controlId="formBasicCheckbox">
                                            <Form.Check type="checkbox" label="Send me tips, trends, freebies, updates & offers." id="checkBoxId" />
                                        </Form.Group> */}
                                            <div className='goto_signin mb-3 mt-3'>
                                                <h6>If you already has an account, just <span onClick={gotoSignIn}>sign in</span>.</h6>
                                            </div>
                                            <div className='tnc'>
                                                <p>Lorem ipsum dolor <a href="#">Privacy Policy.</a> sit amet consectetur <a href="#">Terms & Conditions.</a> adipisicing elit. Sapiente, accusantium!</p>
                                            </div>
                                            <Button variant="primary" type="submit" className="secondary_btn">
                                                Create Account
                                            </Button>
                                        </Form>
                                            }
                                    </div>
                                </Col>
                            </Row>

                        </Col>
                    </Row>
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
export default SignIn


