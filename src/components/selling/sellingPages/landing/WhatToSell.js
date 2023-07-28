import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Steppers from './Stepper'
import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
import BeatLoader from "react-spinners/BeatLoader";
import { useDispatch, useSelector } from 'react-redux';
import { setCategory } from '../../../../redux/reducers/reducer';

var BASE_URL = process.env.REACT_APP_BASE_URL



function WhatToSell({handleNext}) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const allCategory = useSelector((state)=> state.addProduct.mainCategoryArray)
   
    const [speciality, setSpeciality] = useState("")
    const [isDisabled, setIsDisabled] = useState(true);

    const handleValueChange = (e) => {
        setSpeciality(e.target.value)
        setIsDisabled(false)
        dispatch(setCategory(e.target.value))
    }
    // const handleNext = () => {
    //     navigate("/join/what_to_sell_item_info")
    // }

    // const getCategory = async () => {
    //     try {
    //         const data = await axios.get(`${BASE_URL}/get-product`)
    //         setAllCategory(data.data.response)

    //     }
    //     catch (error) {
    //         console.log("error", error);
    //     }
    // }

    // useEffect(() => {
    //     getCategory()
    // }, [])


    return (
        <>
            {/* <Steppers activeStep={3} /> */}
            <div className="whatToSell_section">
                <Container>
                    <Row className="justify-content-center">
                        <Col lg={10}>
                            <div className="whatToSell_content">
                                <Row>
                                    <Col lg={6} md={12}>
                                        <div className="whatToSell_head">What’s your specialty?</div>

                                        <div className="whatToSell_select">
                                            {allCategory.length > 0 ?
                                                allCategory.map((e, i) => {
                                                    return (

                                                        <div className="form-check choose_cagory" key={i}>
                                                            <input className="form-check-input ms-1 me-3" type="radio" value={e.category} onChange={handleValueChange} name="flexRadioDefault" id={`flexRadioDefault${e.id}`} />
                                                            <label className="form-check-label" htmlFor={`flexRadioDefault${e.id}`}>
                                                                {e.category}
                                                            </label>
                                                        </div>
                                                    )
                                                })
                                                :
                                                <div className='ms-5 p-5'>
                                                    <BeatLoader color="#fedc00" />
                                                </div>
                                            }


                                            <div className="whatToSell_next_btn mt-5">
                                                <button className={speciality === "" ? 'disabled_btn' : 'primary_btn'} disabled={isDisabled} onClick={handleNext}>Next</button>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col lg={6} md={12}>
                                        <div className="whatToSell_img">
                                            <img src="https://author.envato.com/assets/sign_up/What_do_you_want_to_sell.svg?640e3a2e18999f15c917fb69e4724d66" className='img-fluid' alt="" />
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}

export default WhatToSell