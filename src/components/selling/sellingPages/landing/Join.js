import { Container, Row, Col } from 'react-bootstrap'
import React, { useState } from 'react'
import { GiCheckMark } from 'react-icons/gi'
import Steppers from './Stepper';
import { useNavigate } from 'react-router-dom'

function Join({handleNext}) {
    const navigate = useNavigate()

    const [isDisabled, setIsDisabled] = useState(true);
    const [checked, setChecked] = useState(false);

    const dataSubmit = () => {
        return checked ? setIsDisabled(true) : setIsDisabled(false);
    };

    const onCheckboxClick = () => {
        setChecked(!checked);
        return dataSubmit();
    };


    // const handleContinue = () => {
    //     navigate("/join/sign_in")
    // }

    return (
        <>
            {/* <Steppers activeStep={0} /> */}
            <div className='join_section'>
                <Container>
                    <Row className='justify-content-center'>
                        <Col lg={10}>
                            <div className="join_content">
                                <Row>
                                    <Col lg={6} md={12}>
                                        <div className="join_head">Let's get started!</div>

                                        <div className="join_subhead">We are currently open for new authors who specialize in:</div>

                                        <div className="join_steps">
                                            <span><GiCheckMark /></span><label>Website themes and templates</label>
                                        </div>
                                        <div className="join_steps">
                                            <span><GiCheckMark /></span><label>Code scripts and plugins</label>
                                        </div>
                                        <div className="join_steps">
                                            <span><GiCheckMark /></span><label>Stock Video and Templates</label>
                                        </div>
                                        <div className="join_steps">
                                            <span><GiCheckMark /></span><label>Graphic design assets and Templates</label>
                                        </div>
                                        <div className="join_steps">
                                            <span><GiCheckMark /></span><label>3D Models</label>
                                        </div>

                                        <div className="text">If you are a <strong>Stock Photography</strong> author, please click here to apply for Envato Elements.</div>
                                        <div className="text">If you are specialized in <strong>Music Tracks and Sounds Effects</strong>, please note we are temporarily not accepting new authors. To express your interest for future opportunities, please proceed to the next step.</div>


                                        <div className="form-check check_div">
                                            <input className="form-check-input me-2 largerCheckbox" onClick={onCheckboxClick} type="checkbox" id="flexCheckChecked" />
                                            <label className="form-check-label" htmlFor="flexCheckChecked">
                                                By continuing you agree to the <a href='#'>Envato Market author terms</a>
                                            </label>
                                        </div>

                                        <div className="join_continue_btn mt-5">
                                            <button className={checked ? 'primary_btn' : 'disabled_btn'} disabled={isDisabled} onClick={handleNext}>Continue</button>
                                        </div>
                                    </Col>
                                    <Col lg={6} md={12}>
                                        <div className="join_img">
                                            <img src="https://author.envato.com/assets/sign_up/getstarted.svg?e1c1aa9383142a23ae47aa0edcd18f7c" className='img-fluid' alt="join_img" />
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

export default Join

