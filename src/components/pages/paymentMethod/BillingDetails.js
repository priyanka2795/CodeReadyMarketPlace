import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import OrderSummary from '../PurchaseAccount/OrderSummary'
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { useSelector } from 'react-redux';
import EditBillingDetails from './EditBillingDetails';


const BillingDetails = () => {
    const [loader, setLoader] = useState(false)
    const [firstName, setFirstName] = useState(localStorage.getItem("name"))
    const [lastName, setLastName] = useState(localStorage.getItem("sirname"))

    const { register, handleSubmit, reset, formState: { errors }, watch } = useForm({ defaultValues: { first_name: firstName, last_name: lastName } });
    const location = useLocation()
    const navigate = useNavigate()
    const isEdit = useSelector((state) => state.addProduct.editBillingDetail)



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


    // ======== get all country list data =======
    const [countryData, setCountryData] = useState([])
    const getAllCountryData = async () => {
        await axios.get("https://countriesnow.space/api/v0.1/countries/")
            .then((res) => {
                setCountryData(res.data.data)
            })
            .catch((err) => {
                console.log("country err", err)
            })
    }
    useEffect(() => {
        getAllCountryData()
    }, [])

    // ===== get all country states list data =====
    var countryValue = watch('country')
    const [stateData, setStateData] = useState([])
    const getAllStateData = async () => {

        await axios.post("https://countriesnow.space/api/v0.1/countries/states", { "country": countryValue })
            .then((res) => {
                setStateData(res.data.data.states)
            })
            .catch((err) => {
                console.log("state err", err)
            })
    }
    useEffect(() => {
        if (countryValue)
            getAllStateData()
    }, [countryValue])


    // ===== post billing data api =====
    const onSubmit = (data) => {
        setLoader(true)
        const config = {
            headers: {
                "Accept": "application/json, text/plain",
                "Authorization": `Bearer ${token}`,
            }
        }

        var formData = new FormData();
        formData.append("first_name", data.first_name)
        formData.append("last_name", data.last_name)
        formData.append("company_name", data.company_name)
        formData.append("country", data.country)
        formData.append("address_line", data.address)
        formData.append("city", data.city)
        formData.append("state", data.state)
        formData.append("postal_code", data.zip)
        formData.append("gstin", data.gst_in)

        axios.post(`${process.env.REACT_APP_BASE_URL}/get-order/billing-post-api/`, formData, config)
            .then((res) => {
                // console.log("billing res", res)

                if (res.data.status === 201) {
                    setTimeout(() => {
                        setLoader(false)
                        navigate("/payment_method")
                        reset()
                    }, 2000)
                }
            })
            .catch((err) => {
                console.log("err", err)
            })

    }


 return (
        <>
            {
                loader ? <div className="loader_wrap"><div className="loader"></div></div> : <div></div>
            }
            {
                isEdit ? <div className="billing_section">
                    <Container>
                        <Row className='justify-content-center'>
                            <Col lg={9} md={12}>
                                <Row>
                                    <Col lg={8} md={8}>

                                        <div className="billing_form mb-3">
                                            <div className="title">Billing Details</div>
                                            <hr />

                                            <form className='' onSubmit={handleSubmit(onSubmit)}>
                                                <Row className='mt-4'>
                                                    <Col lg={6} md={6} className="mb-3">
                                                        <label>First Name <span className='text-danger'>*</span></label>
                                                        <input type="text" className='form-control' {...register("first_name",
                                                            {
                                                                required: 'First Name is Required',
                                                                pattern: {
                                                                    value: /^[^\s].+[^\s]/,
                                                                    message: "Space not allowed"
                                                                }
                                                            })} />
                                                        {errors.first_name && (<small className='text-danger'>{errors.first_name.message}</small>)}
                                                    </Col>
                                                    <Col lg={6} md={6} className="mb-3">
                                                        <label>Last Name <span className='text-danger'>*</span></label>
                                                        <input type="text" className='form-control' {...register("last_name",
                                                            {
                                                                required: 'Last Name is Required',
                                                                pattern: {
                                                                    value: /^[^\s].+[^\s]/,
                                                                    message: "Space not allowed"
                                                                }
                                                            })} />
                                                        {errors.last_name && (<small className='text-danger'>{errors.last_name.message}</small>)}
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col lg={12} md={12} className="mb-3">
                                                        <label>Company Name</label>
                                                        <input type="text" className='form-control' {...register("company_name", {
                                                            pattern: {
                                                                value: /^[^\s].+[^\s]/,
                                                                message: "Space not allowed"
                                                            }
                                                        })} />
                                                         {errors.company_name && (<small className='text-danger'>{errors.company_name.message}</small>)}
                                                    </Col>

                                                    <Col lg={12} md={12} className="mb-3">
                                                        <label>Country <span className='text-danger'>*</span></label>
                                                        <select className='form-select'  {...register("country", { required: 'Country is Required' })}>
                                                            <option value="">-- Select --</option>
                                                            {
                                                                countryData.length > 0 ?
                                                                    countryData.map((e, i) => {
                                                                        return (
                                                                            <option value={e.country} key={i}>{e.country}</option>
                                                                        )
                                                                    })
                                                                    :
                                                                    <option></option>
                                                            }
                                                        </select>
                                                        {errors.country && (<small className='text-danger'>{errors.country.message}</small>)}

                                                    </Col>
                                                    <Col lg={12} md={12} className="mb-3">
                                                        <label>Address <span className='text-danger'>*</span></label>
                                                        <input type="text" className='form-control' {...register("address",
                                                            {
                                                                required: 'Address is Required',
                                                                pattern: {
                                                                    value: /^[^\s].+[^\s]/,
                                                                    message: "Space not allowed"
                                                                }
                                                            })} />
                                                        {errors.address && (<small className='text-danger'>{errors.address.message}</small>)}
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col lg={6} md={6} className="mb-3">
                                                        <label>City <span className='text-danger'>*</span></label>
                                                        <input type="text" className='form-control' {...register("city",
                                                            {
                                                                required: 'City is Required',
                                                                pattern: {
                                                                    value: /^[^\s].+[^\s]/,
                                                                    message: "Space not allowed"
                                                                }
                                                            })} />
                                                        {errors.city && (<small className='text-danger'>{errors.city.message}</small>)}
                                                    </Col>
                                                    <Col lg={6} md={6} className="mb-3">
                                                        <label>State / Province / Region <span className='text-danger'>*</span></label>
                                                        <select className='form-select' {...register("state", { required: 'State is Required' })}>
                                                            <option value="">-- Select --</option>
                                                            {
                                                                stateData.length > 0 ?
                                                                    stateData.map((e, i) => {
                                                                        return (
                                                                            <option value={e.name} key={i}>{e.name}</option>
                                                                        )
                                                                    })
                                                                    :
                                                                    <option></option>
                                                            }
                                                        </select>
                                                        {errors.state && (<small className='text-danger'>{errors.state.message}</small>)}
                                                    </Col>
                                                </Row>

                                                <Row>
                                                    <Col lg={6} md={6}>
                                                        <label>Zip / Postal Code</label>
                                                        <input type="number" className='form-control' {...register("zip", {
                                                            minLength: {
                                                                value: 5,
                                                                message: "Zipcode should consist of 5-9 alphanumeric characters"
                                                            },
                                                            maxLength: {
                                                                value: 9,
                                                                message: "Zipcode should consist of 5-9 alphanumeric characters"
                                                            },
                                                            pattern: {
                                                                value: /^[^\s].+[^\s]/,
                                                                message: "Space not allowed"
                                                            }
                                                        })} />
                                                        {errors.zip && (<small className='text-danger'>{errors.zip.message}</small>)}

                                                    </Col>
                                                    <Col lg={6} md={6}>
                                                        <label>GSTIN</label>
                                                        <input type="text" placeholder='22AAAAA2222A1Z5' className='form-control' {...register("gst_in", {
                                                            pattern: {
                                                                value: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
                                                                message: "GSTIN must be 15 numbers or uppercase letters, and start with your state code"
                                                            }
                                                        })} />
                                                        {errors.gst_in && (<small className='text-danger'>{errors.gst_in.message}</small>)}

                                                    </Col>
                                                </Row>

                                                <Row>
                                                    <Col lg={12} md={12} className="mt-4">
                                                        <div className="save_btn">
                                                            <button className='primary_btn' type="submit">Save and Continue</button>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </form>
                                        </div>
                                    </Col>
                                    <Col lg={4} md={4}>
                                        <OrderSummary />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                </div>
                    :
                    <EditBillingDetails />
            }

        </>
    )
}

export default BillingDetails