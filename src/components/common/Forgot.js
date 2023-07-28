import React, { useState } from 'react';
import { AiFillLock } from "react-icons/ai";
import { useForm } from "react-hook-form";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { Spinner } from "react-bootstrap"
const Forgot = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const naviget = useNavigate()
    const [loader, setLoader] = useState(false);
    const [spinners, setSpinners] = useState(false);
    const onSubmit = (data) => {
        setTimeout(() => {
            setSpinners(false)
        }, 2000)
        setSpinners(true)
        setLoader(true)
        axios.post(`${process.env.REACT_APP_BASE_URL}/api-auth/password-reset-link/`, {
            email: data.email,
            headers: {
                "Accept": "application/json, text/plain",
                'Content-Type': 'application/json'
            },
        }).then(res => {
            console.log("forgot res", res)
            const body = document.body;
            const scrollY = body.style.top;
            body.style.position = 'fixed';
            setLoader(false)
            reset();
            toast.success("Forgot password link has been send to your registered email address.");

            // ====================  // scroll stop popup ====================

            // ====================  navigate page ==================== 
            setTimeout(() => {
                naviget("/sign_in")
                const body = document.body;
                const scrollY = body.style.top;
                body.style.position = 'relative';
                
            }, 3000)
            // ==================== // navigate page ==================== 
        }).catch(err => {
            toast.error("please check your email address");
            setTimeout(() => {
                setSpinners(false)
            }, 2000)
            setSpinners(true)
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
                                        <h2 className="text-center h3_title mb-3" >Forgot Password?</h2>
                                        <p className="text-center">Enter your email address to reset your password.</p>
                                        <div className="panel-body">
                                            <form id="register-form" role="form" autoComplete="off" className="form" onSubmit={handleSubmit(onSubmit)}>
                                                <div className="form-group">
                                                    <div className="">
                                                        <span className="input-group-addon"><i className="glyphicon glyphicon-envelope color-blue"></i></span>
                                                        <input id="email" placeholder="Email address" className="form-control input_field mt-3" type="email"  {...register("email", {
                                                            required: 'Email is Required',
                                                            pattern: {
                                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                                message: "Invalid email address"
                                                            }
                                                        })} />
                                                        {errors.email && (<small className='text-danger'>{errors.email.message}</small>)}
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

export default Forgot