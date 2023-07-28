import React, {useState, useEffect} from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { FaAngleDoubleRight } from 'react-icons/fa'
import ContentUploadLeft from './SubComponent/ContentUploadLeft';
import ContentUploadRight from './SubComponent/ContentUploadRight';
import { useSelector } from 'react-redux';
import Cookies from 'js-cookie';
function ContentUpload() {
    const sellCategory = useSelector((state) => state.addProduct.sellerCategory);
    const getSwitchedCategory = useSelector((state)=> state.addProduct.switchCategory);

   
    const getSell_item = Cookies.get("sell_item")
    const getSwitchSell_item = Cookies.get("switchSell_item")
 

    useEffect(()=>{
        Cookies.set("sell_item", sellCategory, { expires: 7, path: '/' })
    }, [sellCategory])

    useEffect(()=>{
        Cookies.set("switchSell_item", getSwitchedCategory, { expires: 7, path: '/' })
    }, [getSwitchedCategory])

    return (
        <>
            <div className="content_upload_section">
                <Container>
                    <Row className=''>
                        <Col lg={12}>
                            <div className="breadCrumb_content">
                                <div className="head">Home <FaAngleDoubleRight />  My Account</div>
                                <h3 className="head_title">Upload an item to {(getSwitchedCategory === "") ? sellCategory : getSwitchedCategory} </h3>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className="upload_item_section">
                <Container>
                    <Row className=''>
                      <Col lg={8}>
                       <ContentUploadLeft/>
                      </Col>
                        <Col lg={4}>
                           <ContentUploadRight/>
                        </Col>
                       
                    </Row>
                </Container>
            </div>
        </>
    )
}

export default ContentUpload
