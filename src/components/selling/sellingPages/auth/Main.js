import React, {useState} from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Steppers from '../landing/Stepper'
import SignIn from './SignIn'
import SignUp from './SignUp'
function Main({handleNext}) {
  const [show, setShow] = useState(true)
  return (
    <>
        {/* <Steppers activeStep={1} /> */}
       <div className="auth_section py-5" style={{backgroundColor:"#fff"}}>
            <Container>
                <Row className="justify-content-center">
                    <Col lg={6} md={12}>
                      { show ? <SignIn setShow={setShow} handleNext={handleNext} /> : <SignUp setShow={setShow} handleNext={handleNext} /> }
                    </Col>
                    <Col lg={6} md={12}>
                      <div className="auth_img">
                        <img src="https://thumbs.dreamstime.com/b/account-login-password-key-computer-man-near-vector-male-character-design-concept-landing-page-web-poster-banner-184009994.jpg" className='img-fluid' alt="img" />
                      </div>
                    </Col>
                </Row>
            </Container>
       </div>

    </>
  )
}

export default Main
