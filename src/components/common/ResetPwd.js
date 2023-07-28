import React, { useState } from 'react';
import { AiFillLock } from "react-icons/ai";
import { useForm } from "react-hook-form";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router-dom';
import { Spinner, Form, FloatingLabel } from "react-bootstrap"
const ResetPwd = () => {
    const { register, handleSubmit, reset, watch, getValues, formState: { errors } } = useForm();
    const naviget = useNavigate()
    const [loader, setLoader] = useState(false);
    const [spinners, setSpinners] = useState(false);
    const path = useParams()

    const onSubmit = (data) => {
        setLoader(true)
        // setTimeout(() => {
        //     setSpinners(false)
        // }, 4000)
        // setSpinners(true)
        var formData = new FormData();
        formData.append("password", data.password)

        axios.put(`${process.env.REACT_APP_BASE_URL}/api-auth/password-reset/${path.slug1}/${path.slug2}/`, formData)
            .then(res => {
                console.log("reset res", res)
                const body = document.body;
                const scrollY = body.style.top;
                body.style.position = 'fixed';
                setLoader(false)
                reset();
                toast.success("Password reset successfully");

                setTimeout(() => {
                    naviget("/sign_in")
                    const body = document.body;
                    const scrollY = body.style.top;
                    body.style.position = 'relative';
                    
                }, 3000)

            }).catch(err => {
                console.log(err);
                setLoader(false)
            })
    }
    return (
        <>
            {
                loader ? <div className="loader_wrap"><div className="loader"></div></div> : <div></div>
            }
            <section className='forgot_wrap'>
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 col-md-offset-4">
                            <div className="panel panel-default">
                                <div className="panel-body">
                                    <div className="">
                                        <h3 className='text-center'><AiFillLock /></h3>
                                        <h2 className="text-center h3_title mb-3" >Reset Password?</h2>

                                        <div className="panel-body">
                                            <form id="register-form" role="form" autoComplete="off" className="form" onSubmit={handleSubmit(onSubmit)}>
                                                <div className="form-group">
                                                    <div className="">
                                                        <FloatingLabel controlId="floatingPassword1" label="Password">
                                                            <Form.Control type="password" placeholder='New Password' className='input_field mt-3' {...register("password", {
                                                                required: 'New password is required', minLength: {
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
                                                    </div>
                                                    <div className="">
                                                        <FloatingLabel controlId="floatingPassword1" label="Confirm Password">
                                                            <Form.Control type="password" placeholder='Confirm Password' className='input_field mt-3' {...register("confirmpassword", {
                                                                required: 'Confirm password is required',
                                                            })} />
                                                        </FloatingLabel>
                                                        {errors.confirmpassword && (<small className='text-danger'>{errors.confirmpassword.message}</small>)}
                                                        {watch("confirmpassword") !== watch("password") && getValues("confirmpassword") ? (<small className='text-danger'>Password not match</small>) : null}
                                                    </div>
                                                </div>
                                                <div className="forgot_btn text-center">
                                                    <button className='btn secondary_btn mt-3' type='submit'>
                                                        {/* {
                                                            spinners ?
                                                                <Spinner animation="border" role="status">
                                                                    <span className="visually-hidden">Loading...</span>
                                                                </Spinner> : "Reset Password"
                                                        } */}
                                                        Reset Password
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <ToastContainer position="top-center" />
        </>
    )
}

export default ResetPwd