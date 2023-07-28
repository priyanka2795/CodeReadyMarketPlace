import React, { useState, useEffect } from 'react'
import { Container, Row, Col, FloatingLabel, Form, Modal } from 'react-bootstrap'
import img1 from '../../../assets/images/background/img1.webp'
import { useForm } from "react-hook-form";
import axios from 'axios';
import { BsCheckCircleFill } from 'react-icons/bs'

const ContactUs = () => {
    const [loader, setLoader] = useState(false)
    const [show, setShow] = useState(false);
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = (data) => {
      
        setLoader(true)
        var formDetail = new FormData()
        formDetail.append("fullName", data.name)
        formDetail.append("email", data.email)
        formDetail.append("contactNumber", data.phone)
        formDetail.append("subject", data.subject)
        formDetail.append("message", data.message)

        axios.post(`${process.env.REACT_APP_BASE_URL}/contact-us/`, formDetail)
            .then((res) => {
                console.log("res", res)
                if (res) {
                    setLoader(false)
                    setShow(true)
                    setTimeout(()=>{
                        setShow(false)
                    },2000)
                }
                reset()
            })
            .catch((err) => {
                console.log("err", err)
                setLoader(false)
            })
    }
    return (
        <>
            {
                loader ? <div className="loader_wrap"><div className="loader"></div></div> : <div></div>
            }
            <div className="contact_us_section">
                <div className='contact_banner'>
                    <h2 className='h2_title'>Contact Us</h2>
                </div>

                <Container className='my-5'>
                    <Row className='form_row'>
                        <Col lg={6} md={6} className="px-0">
                            <img src={img1} style={{ height: "500px" }} alt="img" className='img-fluid' />
                        </Col>
                        <Col lg={6} md={6}>
                            <form className='form p-3' key={1} onSubmit={handleSubmit(onSubmit)}>
                                <Row>
                                    <Col sm={6} md={6} lg={6} xl={6} >
                                        <FloatingLabel controlId="floatingInput" label="Name" >
                                            <Form.Control type="text" placeholder='Name' className='input_field mt-3'  {...register("name", {
                                                required: 'Name is Required',
                                                pattern : {
                                                    value: /^[^\s].+[^\s]/,
                                                    message:"Space not allowed"
                                                }
                                            })} />
                                        </FloatingLabel>
                                        {errors.name && (<small className='text-danger'>{errors.name.message}</small>)}
                                    </Col>
                                    <Col sm={6} md={6} lg={6} xl={6}>
                                        <FloatingLabel controlId="floatingInput" label="Email address" >
                                            <Form.Control type="email" placeholder='Email Id' className='input_field mt-3'  {...register("email", {
                                                required: 'Email is Required',
                                                pattern: {
                                                    value: /(^\w.*@\w+\.\w)/,
                                                    message: "Invalid Email Address"
                                                }
                                            })} />
                                        </FloatingLabel>
                                        {errors.email && (<small className='text-danger'>{errors.email.message}</small>)}
                                    </Col>
                                    <Col sm={6} md={6} lg={6} xl={6}>
                                        <FloatingLabel controlId="floatingInput" label="Phone" >
                                            <Form.Control type="number" placeholder='Phone' className='input_field mt-5'  {...register("phone", {
                                                minLength: {
                                                    value: 10,
                                                    message: "Phone number must be atleast 10 digit"
                                                },
                                                maxLength: {
                                                    value: 10,
                                                    message: "Phone number must be atleast 10 digit"
                                                }
                                            })} />
                                        </FloatingLabel>
                                        {errors.phone && (<small className='text-danger'>{errors.phone.message}</small>)}
                                    </Col>
                                    <Col sm={6} md={6} lg={6} xl={6}>
                                        <FloatingLabel controlId="floatingInput" label="Subject" >
                                            <Form.Control type="text" placeholder='Subject' className='input_field mt-5'
                                                {...register("subject",{
                                                    pattern : {
                                                        value: /^[^\s].+[^\s]/,
                                                        message:"Space not allowed"
                                                    }
                                                })}  
                                            />
                                        </FloatingLabel>
                                        {errors.subject && (<small className='text-danger'>{errors.subject.message}</small>)}
                                    </Col>
                                    <Col sm={12} md={12} lg={12} xl={12}>
                                        <FloatingLabel controlId="floatingTextarea2" label="Message">
                                            <Form.Control as="textarea" placeholder='Message' style={{ height: '100px' }} className='input_field mt-5'  {...register("message", {
                                                required: 'Message is Required',
                                                pattern : {
                                                    value: /^[^\s].+[^\s]/,
                                                    message:"Space not allowed"
                                                }
                                               
                                            })} />
                                        </FloatingLabel>
                                        {errors.message && (<small className='text-danger'>{errors.message.message}</small>)}
                                    </Col>
                                    <Col sm={12} md={12} lg={12} xl={12}>
                                        <button type="submit" className="primary_btn mt-4">Send</button>
                                    </Col>
                                    
                                </Row>
                            </form>
                        </Col>
                    </Row>
                </Container>
            </div>

            <Modal
                show={show}
                backdrop="static"
                keyboard={false}
                centered
                className='contact_us_modal'
            >
                <Modal.Body>
                    <div className='icon'><BsCheckCircleFill /></div>
                    <p>Thankyou for contacting us. We will contact you shortly.</p>
                </Modal.Body>

            </Modal>

        </>
    )
}

export default ContactUs  