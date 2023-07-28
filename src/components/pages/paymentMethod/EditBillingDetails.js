import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import OrderSummary from '../PurchaseAccount/OrderSummary'
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios';

const EditBillingDetails = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const [loader, setLoader] = useState(false)
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [company, setCompany] = useState("")
    const [country, setCountry] = useState("")
    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [zip, setZip] = useState("")
    const [gstIn, setGstIn] = useState("")




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


    // ======== get billing details =======
    const getBillingData = () => {

        const config = {
            headers: {
                "Accept": "application/json, text/plain",
                "Authorization": `Bearer ${token}`,
            }
        }
        axios.get(`${process.env.REACT_APP_BASE_URL}/api-superuser/single-billing-details/`, config)
            .then((res) => {
                setFirstName(res.data.response[0].first_name)
                setLastName(res.data.response[0].last_name)
                setCompany(res.data.response[0].company_name)
                setCountry(res.data.response[0].country)
                setAddress(res.data.response[0].address_line)
                setCity(res.data.response[0].city)
                setState(res.data.response[0].state)
                setZip(res.data.response[0].postal_code)
                setGstIn(res.data.response[0].gstin)

            })
            .catch((err) => {
                console.log("err", err)
            })
    }
    useEffect(() => {
        if (token) {
            getBillingData()
        }
    }, [token])

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
    const [stateData, setStateData] = useState([])
    const getAllStateData = () => {
        axios.post("https://countriesnow.space/api/v0.1/countries/states", { "country": country.toString() })
            .then((res) => {
                setStateData(res.data.data.states)
            })
            .catch((err) => {
                console.log("state err", err)
            })
    }
    useEffect(() => {
        if (country) {
            getAllStateData()
        }
    }, [country])

    // ===== edit billing details api =====
    const handleEditDetails = () => {
        if (firstName == "") {
            document.getElementById("error1").style.display = "block"
            document.getElementById("nameSpaceErr").style.display = "none"
            return false

        }else if(!firstName.match(/^[^\s].+[^\s]/)){
            document.getElementById("nameSpaceErr").style.display = "block"
            document.getElementById("error1").style.display = "none"
            return false
        }
         else {
            document.getElementById("error1").style.display = "none"
            document.getElementById("nameSpaceErr").style.display = "none"
        }

        if (lastName == "") {
            document.getElementById("error2").style.display = "block"
            document.getElementById("lastnameSpaceErr").style.display = "none"
            return false
        }else if(!lastName.match(/^[^\s].+[^\s]/)){
            document.getElementById("lastnameSpaceErr").style.display = "block"
            document.getElementById("error2").style.display = "none"
            return false
        }
         else {
            document.getElementById("error2").style.display = "none"
            document.getElementById("lastnameSpaceErr").style.display = "none"
        }

        if(company && !company.match(/^[^\s].+[^\s]/)){
            document.getElementById("companySpaceErr").style.display = "block"
            return false
        }else{
            document.getElementById("companySpaceErr").style.display = "none" 
        }

        if (country == "") {
            document.getElementById("error3").style.display = "block"
            return false
        } else {
            document.getElementById("error3").style.display = "none"
        }

        if (address == "") {
            document.getElementById("error4").style.display = "block"
            document.getElementById("addressSpaceErr").style.display = "none"
            return false
        }else if(!address.match(/^[^\s].+[^\s]/)){
            document.getElementById("addressSpaceErr").style.display = "block"
            document.getElementById("error4").style.display = "none"
            return false
        }
        else {
            document.getElementById("error4").style.display = "none"
            document.getElementById("addressSpaceErr").style.display = "none"
        }

        if (city == "") {
            document.getElementById("error5").style.display = "block"
            document.getElementById("citySpaceErr").style.display = "none"
            return false
        }else if(!city.match(/^[^\s].+[^\s]/)){
            document.getElementById("citySpaceErr").style.display = "block"
            document.getElementById("error5").style.display = "none"
            return false
        }
         else {
            document.getElementById("error5").style.display = "none"
            document.getElementById("citySpaceErr").style.display = "none"
        }

      
        if (state == "") {
            document.getElementById("error6").style.display = "block"
            return false
        } else {
            document.getElementById("error6").style.display = "none"
        }

        if (zip.length && zip.length < 5 || zip.length > 9) {
            document.getElementById("errorzip").style.display = "block"
            return false
        } else {
            document.getElementById("errorzip").style.display = "none"
        }

        if (gstIn.length && !(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/).test(gstIn)) {
            document.getElementById("errorgst").style.display = "block"
            return false
        } else {
            document.getElementById("errorgst").style.display = "none"
        }
        setLoader(true)
        const config = {
            headers: {
                "Accept": "application/json, text/plain",
                "Authorization": `Bearer ${token}`,
            }
        }

        var formData = new FormData();
        formData.append("first_name", firstName)
        formData.append("last_name", lastName)
        formData.append("company_name", company)
        formData.append("country", country)
        formData.append("address_line", address)
        formData.append("city", city)
        formData.append("state", state)
        formData.append("postal_code", zip)
        formData.append("gstin", gstIn)

        axios.put(`${process.env.REACT_APP_BASE_URL}/get-order/billing-put-api/`, formData, config)
            .then((res) => {
                // console.log("edit billing res", res)

                if (res.data.status === 200) {

                    setTimeout(() => {
                        setLoader(false)
                        navigate("/payment_method")
                    }, 2000)
                }
            })
            .catch((err) => {
                console.log("err", err)
            })

    }


    const handleZip = (e) => {
        setZip(e.target.value)
    }

    const handleGstIn = (e) => {
        setGstIn(e.target.value)
    }


   
    return (
        <>
            {
                loader ? <div className="loader_wrap"><div className="loader"></div></div> : <div></div>
            }
            <div className="billing_section">
                <Container>
                    <Row className='justify-content-center'>
                        <Col lg={9} md={12}>
                            <Row>
                                <Col lg={8} md={8}>

                                    <div className="billing_form mb-3">
                                        <div className="title">Edit Billing Details</div>
                                        <hr />
                                        <Row className='mt-4'>
                                            <Col lg={6} md={6} className="mb-3">
                                                <label>First Name <span className='text-danger'>*</span></label>
                                                <input type="text" value={firstName} className='form-control' onChange={(e) => setFirstName(e.target.value)} />
                                                <small className='text-danger error' id='error1'>First name is required</small>
                                                <small className='text-danger error' id='nameSpaceErr'>Space not allowed</small>
                                            </Col>
                                            <Col lg={6} md={6} className="mb-3">
                                                <label>Last Name <span className='text-danger'>*</span></label>
                                                <input type="text" value={lastName} className='form-control' onChange={(e) => setLastName(e.target.value)} />
                                                <small className='text-danger error' id='error2'>Last name is required</small>
                                                <small className='text-danger error' id='lastnameSpaceErr'>Space not allowed</small>
                                            </Col>
                                        </Row>


                                        <Row>
                                            <Col lg={12} md={12} className="mb-3">
                                                <label>Company Name</label>
                                                <input type="text" value={company} className='form-control' onChange={(e) => setCompany(e.target.value)} />
                                                <small className='text-danger error' id='companySpaceErr'>Space not allowed</small>
                                            </Col>

                                            <Col lg={12} md={12} className="mb-3">
                                                <label>Country <span className='text-danger'>*</span></label>
                                                <select className='form-select' value={country} onChange={(e) => setCountry(e.target.value)}>
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
                                                <small className='text-danger error' id='error3'>Country is required</small>
                                            </Col>

                                            <Col lg={12} md={12} className="mb-3">
                                                <label>Address <span className='text-danger'>*</span></label>
                                                <input type="text" value={address} className='form-control' onChange={(e) => setAddress(e.target.value)} />
                                                <small className='text-danger error' id='error4'>Address is required</small>
                                                <small className='text-danger error' id='addressSpaceErr'>Space not allowed</small>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg={6} md={6} className="mb-3">
                                                <label>City <span className='text-danger'>*</span></label>
                                                <input type="text" value={city} className='form-control' onChange={(e) => setCity(e.target.value)} />
                                                <small className='text-danger error' id='error5'>City is required</small>
                                                <small className='text-danger error' id='citySpaceErr'>Space not allowed</small>
                                            </Col>
                                            <Col lg={6} md={6} className="mb-3">
                                                <label>State / Province / Region <span className='text-danger'>*</span></label>
                                                <select className='form-select' value={state} onChange={(e) => setState(e.target.value)}>
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
                                                <small className='text-danger error' id='error6'>State is required</small>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col lg={6} md={6}>
                                                <label>Zip / Postal Code</label>
                                                <input type="number" value={zip} className='form-control' onChange={handleZip} />
                                                <small className='text-danger error' id='errorzip'>Zipcode should consist of 5-9 alphanumeric characters</small>
                                            </Col>
                                            <Col lg={6} md={6}>
                                                <label>GSTIN</label>
                                                <input type="text" value={gstIn} placeholder='22AAAAA2222A1Z5' className='form-control' onChange={handleGstIn} />
                                                <small className='text-danger error' id='errorgst'>GSTIN must be 15 numbers or uppercase letters, and start with your state code</small>

                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col lg={12} md={12} className="mt-4">
                                                <div className="save_btn">
                                                    <button className='primary_btn' onClick={handleEditDetails}>Save and Continue</button>
                                                </div>
                                            </Col>
                                        </Row>

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
        </>
    )
}

export default EditBillingDetails

