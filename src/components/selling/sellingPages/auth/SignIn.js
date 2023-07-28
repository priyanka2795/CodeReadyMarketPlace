import React, { useState, useEffect } from 'react'
import { Row, Col, Image, Container, Form, FloatingLabel, Button } from "react-bootstrap";
import GoogleLogin from '@leecheuk/react-google-login';
import { useForm } from "react-hook-form";
import { Link, useNavigate, useLocation } from 'react-router-dom'
import axios from "axios";
import { loadGapiInsideDOM } from "gapi-script";
import { useDispatch, useSelector } from 'react-redux'
import { setStateUpdate } from '../../../../redux/reducers/reducer'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';


function SignIn({ setShow, handleNext }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [apiEmailErr, setApiEmailErr] = useState("");
  const [loader, setLoader] = useState(false)
  const [isSignIn, setIsSignIn] = useState(false);
  const [userName, setUserName] = useState("")

  // =================== session manage ===========================
  const location = useLocation()
  useEffect(() => {
    var getSession = sessionStorage.getItem("accessToken");
    var getLoggedUser = sessionStorage.getItem("loggedInUser")
    var getRegisteredData = JSON.parse(localStorage.getItem("registerdData"))

    if (!getSession) {
      if (getRegisteredData) {
        setIsSignIn(true)
        setUserName(getRegisteredData.username)
      } else {
        setIsSignIn(false)
      }

    } else {
      setUserName(getLoggedUser)
      setIsSignIn(true)
    }
  }, [location])

  // const handleNext = () => {
  //   navigate("/join/author_info")
  // }
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
                  navigate("/cart_product")
                  const body = document.body;
                  const scrollY = body.style.top;
                  body.style.position = 'relative';
                  setLoader(false)
                }, 1000)
              }
            })
            .catch(function (err) {
              console.log("add product err", err);
              navigate("/cart_product")
            });
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  //-------add cart end-------


  //google login start---------

  useEffect(() => {
    (async () => {
      await loadGapiInsideDOM();
    })();
  });

  const onSuccess = (res) => {
    if (res) {
      let random = Math.random().toString(36).slice(10)
      let name = res.profileObj.givenName
      let username = `${name}${random}`

      let formdata = new FormData()
      formdata.append("username", username)
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
              dispatch(setStateUpdate(true))
              handleNext()
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
  // google login end------

  // =================== // session manage =========================== 

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

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


      // ==================== sassion ==========================
      var accessToken = res.data.access
      var refreshToken = res.data.refresh;
      sessionStorage.setItem("accessToken", accessToken);
      sessionStorage.setItem("refreshToken", refreshToken);
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
      setTimeout(() => {
        //  navigate("/join/author_info")
        dispatch(setStateUpdate(true))
        handleNext()
        const body = document.body;
        const scrollY = body.style.top;
        body.style.position = 'relative';
        setLoader(false)
      }, 3000)
      // ==================== // navigate page ==================== 

      setApiEmailErr("")
    }).catch(err => {
      console.log("err", err);
      setLoader(false)
      var error = err.response.data.status;
      if (error === 401) {
        setApiEmailErr("Email or password is incorrect!")
      } else {
        setApiEmailErr("")
      }
    })
  }
  const onSubmitEmail = (data) => {

    console.log("dataCreate", data);
  }

  const goToSignUp = () => {
    setShow(false)
  }



  return (
    <>
      {
        loader ? <div className="loader_wrap"><div className="loader"></div></div> : <div></div>
      }

      <div className="sign_in_section">
        {
          isSignIn ?
            <div className='signin_successfully'>
              <div className="signin_username">You've signed in as {userName}</div>
              <button className='primary_btn' onClick={handleNext}>Keep going</button>
            </div>
            :
            <form className="form sign-in" key={1} onSubmit={handleSubmit(onSubmit)}>
              <div className='signin_head'>
                <h4>Sign in to your account</h4>
                <div className='d-flex align-items-center'>
                  <div>Don't have an account?</div><button className='secondary_btn ms-1' onClick={goToSignUp}>SignUp</button>
                </div>
              </div>
              <hr />
              <div className='google_btn'>
                {/* <GoogleLogin
                  clientId="951595366519-jecju6v3ju2l072eh4ogngouuuo12h6t.apps.googleusercontent.com"
                  buttonText="Sign in with Google"
                  onSuccess={onSuccess}
                  onFailure={onFailure}
                  cookiePolicy={'single_host_origin'}
                /> */}
              </div>
              <Row>
                <Col sm={12} md={12} lg={12} xl={12}>
                  <FloatingLabel controlId="floatingInput" label="Email address" >
                    <Form.Control type="email" placeholder='Email Id' className='input_field mt-3'  {...register("email", {
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        // value: /^[^\s].+[^\s]/,
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
                        message: "Minimum required Password is 6 digit"
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
              <div className='forgot_pass_div'>
                <Link to="/forgot" className="forgot-pass">Forgot password?</Link>
              </div>
              <small className='text-danger' style={{ display: "block", marginTop: "20px" }}>{apiEmailErr}</small>
              <button type="submit" className="secondary_btn">Sign In</button>
            </form>

        }

      </div>

      <ToastContainer
        position="top-center"
        autoClose={5000}
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


