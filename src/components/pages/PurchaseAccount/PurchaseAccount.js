import React, { useState } from 'react'
import OrderSummary from './OrderSummary'
import { Container, Row, Col, Form, Button, FloatingLabel } from "react-bootstrap"
import ReCAPTCHA from "react-google-recaptcha";
import GoogleLogin from '@leecheuk/react-google-login';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom"
const PurchaseAccount = () => {
  let captcha = "6Lf3IIghAAAAAI6aMGCoCyq360MYicArZ03BGNPL"
  function onChange(value) {
    console.log("Captcha value:", value);
  }
  const responseGoogle = (responses) => {
    console.log(responses);
  }
  const [checkBox, setCheckbox] = useState(false)
  const navigate = useNavigate()
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const onSubmit = (data) => {

    console.log("data", data);
    setCheckbox(true)
    var check = document.getElementById("formBasicCheckbox").checked;
    if (check === true) {
      setCheckbox(false)
      reset();
      navigate("/payment_method")
    }
  }
  return (
    <>
      <section className='purchaseAccount_wrap'>
        <Container>
          <Row>
            <Col sm={8} md={8} lg={8} xl={8}>
              <div className='purchaseAccount_top'>
                <div className='purchaseAccount_title'>
                  <h3 className='h3_title'>Create Account</h3>
                  <div className='purchaseAccount_sign_btn'>
                    <span>Already have an account</span>
                    <Link to="/sign_in" className='secondary_btn'>Sign In</Link>
                  </div>
                </div>
                <div className='google_btn'>
                  <GoogleLogin
                    clientId="739419291518-3h49qffm6uupv177gkiq0235sbrfgdt3.apps.googleusercontent.com"
                    buttonText="Continue with Google"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                  />
                </div>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Row>
                    <Col sm={12} md={12} lg={12} xl={12}>
                      <FloatingLabel controlId="floatingInput" label="Email address" >
                        <Form.Control type="email" placeholder='Email Id' className='input_field mt-3'  {...register("email", {
                          required: 'Email is Required',
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "invalid email address"
                          }
                        })} />
                      </FloatingLabel>
                      {errors.email && (<small className='text-danger'>{errors.email.message}</small>)}
                    </Col>
                    <Col sm={6} md={6} lg={6} xl={6}>
                      <FloatingLabel controlId="floatingName" label="First Name" >
                        <Form.Control type="text" placeholder='First Name' className='input_field mt-3'
                          {...register("name", {
                            required: 'Name is Required',
                            minLength: {
                              value: 3,
                              message: "The minimum length for this field is 3 characters"
                            },
                            maxLength: {
                              value: 12,
                              message: "The Maximum length for this field is 12 characters"

                            },
                          })} />
                      </FloatingLabel>
                      {errors.name && (<small className='text-danger'>{errors.name.message}</small>)}
                    </Col>
                    <Col sm={6} md={6} lg={6} xl={6}>
                      <FloatingLabel controlId="floatingLname" label="Last Name" >
                        <Form.Control type="text" placeholder='Last Name' className='input_field mt-3'
                          {...register("lname", {
                            required: 'Last Name is Required',
                            minLength: {
                              value: 3,
                              message: "The minimum length for this field is 3 characters"
                            },
                            maxLength: {
                              value: 12,
                              message: "The Maximum length for this field is 12 characters"

                            },
                          })} />
                      </FloatingLabel>
                      {errors.lname && (<small className='text-danger'>{errors.lname.message}</small>)}
                    </Col>
                    <Col sm={6} md={6} lg={6} xl={6}>
                      <FloatingLabel controlId="floatingUname" label="User Name" >
                        <Form.Control type="text" placeholder='User Name' className='input_field mt-3'
                          {...register("uname", {
                            required: 'User  Name is Required',
                            minLength: {
                              value: 3,
                              message: "The minimum length for this field is 3 characters"
                            },
                            maxLength: {
                              value: 12,
                              message: "The Maximum length for this field is 12 characters"

                            },
                          })} />
                      </FloatingLabel>
                      {errors.uname && (<small className='text-danger'>{errors.uname.message}</small>)}
                    </Col>
                    <Col sm={6} md={6} lg={6} xl={6}>
                      <FloatingLabel controlId="floatingPassword" label="Password">
                        <Form.Control type="password" placeholder='Password' className='input_field mt-3' {...register("password", {
                          required: 'Password is Required', minLength: {
                            value: 6,
                            message: "Minimum Required Password is 6 digit"
                          },
                          maxLength: {
                            value: 12,
                            message: "Maximum Required password is 12 digit"
                          },
                          validate: (value) => {
                            return (
                              [/[a-z]/, /[A-Z]/, /[0-9]/, /[^a-zA-Z0-9]/].every((pattern) =>
                                pattern.test(value)
                              ) || "Must Include Lower, Upper, Number, and Special Chars"
                            );
                          },
                        })} />
                      </FloatingLabel>
                      {errors.password && (<small className='text-danger'>{errors.password.message}</small>)}
                    </Col>
                  </Row>
                  {/* <div className='captcha_wrap'>
                    <ReCAPTCHA
                      sitekey={captcha}
                      onChange={onChange}
                      className="captcha mt-3"
                      required={true}
                    />
                  </div> */}
                  <Form.Group className="my-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Send me tips, trends, freebies, updates & offers." className={`${checkBox ? "text-danger" : "text-dark"}`} />
                  </Form.Group>
                  <div className='tnc'>
                    <p>Lorem ipsum dolor <a href="#">Privacy Policy.</a> sit amet consectetur <a href="#">Terms & Conditions.</a> adipisicing elit. Sapiente, accusantium!</p>
                  </div>
                  <Button variant="primary" type="submit" className="primary_btn">
                    Create Account & Continue
                  </Button>
                </Form>
              </div>
            </Col>
            <Col sm={4} md={4} lg={4} xl={4}>
              <OrderSummary />
            </Col>
          </Row>
        </Container>
      </section>
    </>
  )
}

export default PurchaseAccount