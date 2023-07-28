import React, {useEffect, useState} from 'react'
import { Container, Row, Col, Tab, Nav } from 'react-bootstrap'
import {useLocation} from 'react-router-dom'
function AuthorHeader() {
  const location = useLocation()
  const [userName, setUserName] = useState("")
  useEffect(() => {
    var getSession = sessionStorage.getItem("accessToken");
    var getLoggedUser = sessionStorage.getItem("loggedInUser")
    var getRegisteredData = JSON.parse(localStorage.getItem("registerdData"))
    

    if (!getSession) {
      if (getRegisteredData) {
    
        setUserName(getRegisteredData.username)
      } 

    } else {
      setUserName(getLoggedUser)
     
    }
  }, [location])
  return (
    <>
      <div className="author_header_section">
        <Container>
          <Row className='justify-content-center'>
            <Col lg={12}>
              <div className="author_info_div">
                <div className="left">
                  <div className="author_img">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXnyNrVHRSwa2qqF-sPND83RjXEnJtV0cawAh6D3WZFMO-Ji9RvUIrDUaD5GplCwN5yFA&usqp=CAU" className='img-fluid' alt="user_img" />
                  </div>
                  <div className="author_name">
                    <h5>{userName}</h5>
                    <p></p>
                  </div>
                </div>

                <div className="right">
                  <div className="total_sales">Total Sales</div>
                  <div className="total_count">0</div>
                </div>
              </div>
            </Col>

         
          </Row>
        </Container>
      </div>
    </>
  )
}

export default AuthorHeader