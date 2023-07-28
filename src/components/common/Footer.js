import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from "react-router-dom"
import { FaAngleRight } from 'react-icons/fa'
import logo from "../../assets/images/logo/logo2.png"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Footer = () => {
  const [footerData, setFooterData] = useState([]);
  const [email, setEmail] = useState("")
  const [emailErr, setEmailErr] = useState("")
  const footerApi = async () => {
    const api = await axios.get(`${process.env.REACT_APP_BASE_URL}/get-product/footer/`)
    setFooterData(api.data.response)
    // console.log("api.data.footer", api.data.response);
  }
  useEffect(() => {
    footerApi()
  }, [])

  const handleSubscribe = () => {
    if (email === "") {
      setEmailErr("Email is required")
    }
    else if (!(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i).test(email)) {
      setEmailErr("Enter valid email")
    }
    else {
      axios.post(`${process.env.REACT_APP_BASE_URL}/api-superuser/subscriberdata/`, { subuser: email })
        .then((res) => {
          console.log("res subscriobe", res)
          if (res) {
            toast.success('You have been subscribed successfully', {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
            setEmailErr("")
            setEmail("")
          }
        })
        .catch((err) => {
          console.log("err", err)
        })

    }

  }
  return (
    <>
      <footer className='footer_section_wrapper'>
        <Container fluid style={{ padding: "20px" }}>
          <Row className='justify-content-center'>
            <Col lg={11} md={12} sm={12}>
              <Row className='justify-content-center'>
                <Col lg={12}>
                  <div className='subscribe_wrapper'>
                    <h2>Subscribe Our NewsLetter For Company Updated!</h2>

                    <div className='user_input_field_div'>
                      <input type="email" placeholder='Enter Your Email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                      <button onClick={handleSubscribe}>Subscribe</button>
                    </div>
                    <p className='text-danger' style={{ marginLeft: "-27%" }}>{emailErr}</p>
                  </div>


                </Col>
              </Row>
              <Row className='footer_link_row_wrapper'>
                <Col lg={3} md={6}>
                  <div className='footer_colum'>
                    <img src={logo} className="img-fluid" alt="footer-logo" />
                    <p>We design and develop mobile apps that delight your users and grow your business. Enterprise-grade development combined with outstanding design.</p>
                  </div>
                </Col>
                {/* {
              footerData.map((event, key) => {
                return (
                  <Col lg={3} key={key}>
                    <div className='footer_colum'>
                      <h6>{event.heading}</h6>
                      {
                        event.items_list.map((e, index) => {
                          return (
                            <ul key={index}>
                              <li><a to='/'>{e}</a></li>
                            </ul>
                          )
                        })
                      }
                    </div>
                  </Col>
                )
              })
            } */}

                <Col lg={3} md={6}>
                  <div className='footer_colum'>
                    <h5 style={{ fontWeight: "normal" }}>Quick Links</h5>
                    <ul className='mt-3'>
                      <li><Link to='/all_blogs'><FaAngleRight /> Blogs</Link></li>
                      <li><Link to='/about_us'><FaAngleRight /> About Us</Link></li>
                      <li><Link to='/privacy_policy'><FaAngleRight /> Privacy Policy</Link></li>
                      <li><Link to='/terms_conditions'><FaAngleRight /> Terms & Conditions</Link></li>
                      <li><Link to='/contact_us'><FaAngleRight /> Contact Us</Link></li>
                      <li><Link to='/'><FaAngleRight /> Sitemap</Link></li>
                    </ul>
                  </div>
                </Col>
                <Col lg={3} md={6}>
                  <div className='footer_colum'>
                    <h5>India</h5>
                    <p className='mt-3'>407, Atulya IT Park, Bhawarkua Main Rd, Indore, Madhya Pradesh 452010</p>
                    <p className='mt-2'>Phone: +91 9770477239</p>
                    <p className='mt-2' style={{ wordBreak: "break-word" }}>E-Mail:info@codereadysoftware.com</p>

                    <h5 className='mt-3'>UAE</h5>
                    <p className='mt-3'>FDRK3822 Compass Building, Al Shohada Road, AL Hamra Industrial Zone-FZ, Ras Al Khaimah, United Arab Emirates</p>
                    <p className='mt-2'>Phone: +971585596272</p>

                  </div>
                </Col>
                <Col lg={3} md={6}>
                  <div className='footer_colum'>
                    <h5>UK</h5>
                    <p className='mt-3'>Apartment 4105, 25 Arena Tower Crossharbour Plaza, London E14 9YF</p>
                    <p className='mt-2'>Phone: +447401232155</p>


                    <h5 className='mt-3'>USA</h5>
                    <p className='mt-3'>135, 447 Broadway, 2nd Floor, New York, NY 10013, USA</p>
                    <p className='mt-2'>Phone: +12025196167</p>

                    <h5 className='mt-3'>Australia</h5>
                    <p className='mt-3'>264 George Street, Sydney 2000</p>
                    <p className='mt-2'>Phone: +61480043472</p>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
        <div className='copyright_wrapper text-center'>
          <p>copyright@2022 | All Right Reserved</p>
        </div>
      </footer>

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

export default Footer